const cloningUtility = require('./cloningUtility').CloningUtility;

cloningUtility.performClone();

console.log('-------------')
console.log('')
console.log('')
console.log('-------------')
const PartnersProfile = require('./partnersProfile').PartnersProfile;
const partnersProfileStreamer = new PartnersProfile('./data/partners.json');

partnersProfileStreamer.debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName();