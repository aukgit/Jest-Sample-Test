class DeepCloner {
    /**
     * Convert given object to string using JSON.stringify
     * @param {*} original 
     */
    static objectToJsonString(original) {
        return JSON.stringify(original);
    }

    /**
     * Deep clones the given object.
     * @param {*} original deep copy the original object.
     */
    static deepClone(original) {
        return JSON.parse(this.objectToJsonString(original));
    }
}

module.exports = { DeepCloner };