class Cordinate {
    constructor(cordinates) {
        this.cordinates = cordinates;

        if (!cordinate || cordinate.indexOf(',') < 0) {
            this.isValid = false;
            return;
        }

        
        this.cordinatesArray = cordinate.split(',');
        this.x = cordinatesArray[0];
        this.y = cordinatesArray[1];
        this.isValid = true;
    }

    getMeanEarthRadiusInRadians() {
        if(!this.isValid){
            throw new Error(
                'Given cordinates are not valid. Value: ' + this.cordinates);
        }

        if (this.getMeanEarthRadiusInRadiansValue) {
            return this.getMeanEarthRadiusInRadiansValue;
        }

        const converterUtility = require('./converterUtility').ConverterUtility;
        const xRad = converterUtility.convertDegreesToRadians(this.x);
        const yRad = converterUtility.convertDegreesToRadians(this.y);

        return (1 / 3) * ((2 * xRad) + yRad);
    }
}