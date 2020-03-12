var deepCloner = require("./deepCopy").DeepCloner;

class CloningUtility {
    /**
     * return a object
     * {
     *      name: "Paddy",
     *      address: {
     *          town: "Lerum",
     *          country: "Sweden"
     *      }
     *  }
     */
    static genericPerson() {
        return {
            name: "Paddy",
            address: {
                town: "Lerum",
                country: "Sweden"
            }
        };
    }

    /**
     * perform deep cloning and logs to console.
     */
    static performClone() {
        const person = this.genericPerson();
        let clonedObject = deepCloner.deepClone(person);

        clonedObject.address.town = 'my Town';
        clonedObject.name = 'Alim';

        console.log('Orginal Object:');
        console.log(person);
        console.log('Cloned Modified Object:');
        console.log(clonedObject);
    }
}

module.exports = { CloningUtility };