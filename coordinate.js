class Coordinate {
    constructor(coordinates) {
        this.coordinates = coordinates;
        const splitter = ',';

        if (!coordinates || coordinates.indexOf(splitter) < 0) {
            this.isValid = false;
            return;
        }

        this.coordinatesArray = coordinates.split(splitter);
        this.x = this.coordinatesArray[0];
        this.y = this.coordinatesArray[1];
        this.isValid = true;
    }

    throwIfInvalid() {
        if (!this.isValid) {
            const errorMessage =
                'Current cordinates(' + this.coordinates + ') are not valid. Value: ' + this.coordinates;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    getDistanceOf(anotherCoordinate) {
        this.throwIfInvalid();

        if (!anotherCoordinate || !anotherCoordinate.throwIfInvalid) {
            throw new Error(
                'Given cordinates are not valid. Value: ' + this.coordinates);
        }

        anotherCoordinate.throwIfInvalid();

        const converterUtility = require('./converterUtility').ConverterUtility;

        return converterUtility.getDistance(
            this.x,
            this.y,
            anotherCoordinate.x,
            anotherCoordinate.y);
    }

    toString(){
        return this.coordinates;
    }
}

module.exports = { Coordinate };