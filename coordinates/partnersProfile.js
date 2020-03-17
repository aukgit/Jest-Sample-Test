const Coordinate = require('./coordinate').Coordinate;
const idealCoordinateString = '51.515419,-0.141099';
const idealCoordinate = new Coordinate(idealCoordinateString);
const fs = require('fs');

class PartnersProfile {
    /**
     * @param {string} profilePath : Provide an absolute path to the partners file.
     */
    constructor(profilePath) {
        if (!profilePath || typeof (profilePath) !== 'string') {
            throw new Error('Given profile path is empty or invalid.');
        }

        this.profilePath = profilePath;
    }

    readFileUsingRequire(path) {
        return require(path);
    }

    /**
     * reading json file from file system and returns the JSON of partners as object.
     */
    getPartnerProfiles() {
        if (!fs.existsSync(this.profilePath)) {
            const errorMessage = `File (${this.profilePath}) doesn't exist in the fil system.`;
            throw new Error(errorMessage);
        }

        try {
            /*
            * Note: For this purpose we are using system operation.
            *       non sync/async one whould be non-IO blocking.
            *       However, for this case it is not important.
            *       To keep things simple non-async one is used.
            * */

            return this.readFileUsingRequire(this.profilePath);
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    /**
     * If the cordinate distance is within 100km then 
     * returns true or else false.
     * @param {PartnerProfile} partnerProfile 
     */
    filterPartnerProfileWithinHundredKilometers(partnerProfile) {
        const isInvalidPartnerProfile = !partnerProfile ||
            !partnerProfile.offices ||
            !partnerProfile.offices.length;

        if (isInvalidPartnerProfile) {
            return false;
        }

        // if any office address within range then returns true for that office
        let returningResult = false;
        const officeAddressesLength = partnerProfile.offices.length;

        for (let officeIndex = officeAddressesLength - 1; officeIndex >= 0; officeIndex--) {
            if (this.isCurrentAddressWithinHundredKilomitersRangeExceptDropAddress(partnerProfile, officeIndex)) {
                returningResult = true;
            }
        }

        return returningResult;
    }

    /**
     * If address is within 100km range then return true and attaches distance with the office
     * If address is not within rage then remove office from the profile given.
     * Warning: Mutation occurs on given profile on certain condition.
     * @param partnerProfile 
     * @param officeIndex
     */
    isCurrentAddressWithinHundredKilomitersRangeExceptDropAddress(partnerProfile, officeIndex) {
        const coordinates = partnerProfile.offices[officeIndex].coordinates;
        const currentCordinate = new Coordinate(coordinates);
        const distance = idealCoordinate.getDistanceOf(currentCordinate);
        const isWithinRange = distance <= 100;

        if (!isWithinRange) {
            // remove from list.
            partnerProfile.offices.splice(officeIndex, 1);

            return false;
        }

        // Attaching the distance for future access or debugging or testing.
        partnerProfile.offices[officeIndex].distance = distance;
        return true;
    }

    getQuickestDistanseProfilesWithinHundredKilometers() {
        const profiles = this.getPartnerProfiles();

        // Note: Not using profiles.filter, because 
        //       this.filterPartnerProfileWithinHundredKilometers calls other functions from inside.
        if (!profiles || !profiles.length) {
            console.log('No partners profile found');
            
            return;
        }

        const results = [];

        profiles.forEach(profile => {
            if (this.filterPartnerProfileWithinHundredKilometers(profile)) {
                results.push(profile);
            }
        });

        return results;
    }

    partnerProfileOrderByCompanyNameAscending(firstProfile, secondProfile) {
        const isInvalid = !firstProfile ||
            !secondProfile ||
            !firstProfile.organization ||
            !secondProfile.organization;

        if (isInvalid) {
            const message = 'Given profile is either invalid or doesn\' have "organization" property.';
            console.error(message);

            throw new Error(message);
        }

        return firstProfile.organization - secondProfile.organization;
    }

    getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay() {
        const profilesWithinFilter = this.getQuickestDistanseProfilesWithinHundredKilometers();

        if (!profilesWithinFilter || !profilesWithinFilter.length) {
            console.warn('No filter data found within 100km rage.');

            return;
        }

        const orderByProfiles = profilesWithinFilter.sort(this.partnerProfileOrderByCompanyNameAscending);
        const results = [];

        orderByProfiles.forEach(profile => {
            (profile.offices || []).forEach(office => {
                const distance = office.distance;
                const distanceDisplay = ',\n ---- (lat, long) = (' + office.coordinates + '), Distance: ' + distance;
                const display = ' Company/Organization Name: "' + profile.organization + '",\n --- Address: "' + office.address + '"' + distanceDisplay;
                results.push(display);
            });
        });

        return results;
    }

    debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName() {
        const profilesDisplay = this.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay();

        if (!profilesDisplay || !profilesDisplay.length) {
            console.log('No records found within range.');

            return;
        }

        profilesDisplay.forEach(profileDisplay => {
            console.log(profileDisplay);
        });
    }
}

module.exports = { PartnersProfile, IdealCoordinate: idealCoordinate };