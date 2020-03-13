class ConverterUtility {
    /**
     * Convert degrees to radians
     * degree * PI / 180
     * @param {number} deg 
     */
    static convertDegreesToRadians(deg) {
        if (!deg || isNaN(deg)) {
            return 0;
        }

        return parseFloat(deg) * Math.PI / 180;
    }

    /**
     * Reference   : https://en.wikipedia.org/wiki/Great-circle_distance
     * Reference 2 : https://www.geeksforgeeks.org/program-distance-two-points-earth/
     * @param {*} lat1 (in degrees)
     * @param {*} long1 (in degrees)
     * @param {*} lat2 (in degrees)
     * @param {*} long2 (in degrees)
     */
    static getDistance(lat1, long1, lat2, long2) {
        const R = 6371;
        lat1 = this.convertDegreesToRadians(lat1);
        long1 = this.convertDegreesToRadians(long1);

        lat2 = this.convertDegreesToRadians(lat2);
        long2 = this.convertDegreesToRadians(long2);

        const dlong = long2 - long1;
        const dlat = lat2 - lat1;

        const difference = Math.pow(Math.sin(dlat / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.pow(Math.sin(dlong / 2), 2);

        const distance = 2 * Math.asin(Math.sqrt(difference));

        // Radius of Earth in  
        // Kilometers, R = 6371 
        // Use R = 3956 for miles
        // Calculate the result 
        const finalResult = distance * R;

        return finalResult;
    }
}

module.exports = { ConverterUtility };