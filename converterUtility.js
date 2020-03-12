class ConverterUtility {
    static convertDegreesToRadians(deg) {
        if(!deg || isNaN(deg) ){
            return 0;
        }

        return parseFloat(deg) * Math.PI / 180;
    }  
}

module.exports = { ConverterUtility };