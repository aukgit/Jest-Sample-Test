const converterUtility = require('../utilities/converterUtility').ConverterUtility;

class Coordinate {
    constructor(coordinates) {
        if (!coordinates || typeof (coordinates) !== 'string') {
            throw new Error('Given cordinate is not valid.');
        }

        this.coordinates = coordinates;
        const splitter = ',';

        if (coordinates.indexOf(splitter) < 0) {
            this.isValid = false;
            return;
        }

        this.coordinatesArray = coordinates.split(splitter);
        this.x = this.coordinatesArray[0];
        this.y = this.coordinatesArray[1];

        if (isNaN(this.x) || isNaN(this.y) || !this.x || !this.y) {
            throw new Error('Given cordinate is not valid.');
        }

        this.x = parseFloat(this.x.trim());
        this.y = parseFloat(this.y.trim());

        this.isValid = true;
    }

    throwIfInvalid() {
        if (!this.isValid) {
            const errorMessage =
                'Current cordinates(' + this.coordinates + ') are not valid. Value: ' + this.coordinates;
            throw new Error(errorMessage);
        }
    }

    getDistanceOf(anotherCoordinate) {
        this.throwIfInvalid();

        if (!anotherCoordinate || !anotherCoordinate.throwIfInvalid) {
            throw new Error('Given cordinates are not valid.');
        }

        anotherCoordinate.throwIfInvalid();

        if(this === anotherCoordinate){
            return 0;
        }

        return converterUtility.getDistance(
            this.x,
            this.y,
            anotherCoordinate.x,
            anotherCoordinate.y);
    }

    toString() {
        return this.coordinates;
    }
}

module.exports = { Coordinate };