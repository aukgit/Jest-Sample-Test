const cloningUtility = require('./utilities/cloningUtility').CloningUtility;

cloningUtility.performClone();

console.log('-------------')
console.log('')
console.log('')
console.log('-------------')
const path = require( "path" );

var partnersProfileJSONPath = path.resolve("./data/partners.json");
console.log('reading partners from: ' + partnersProfileJSONPath);
const PartnersProfile = require('./coordinates/partnersProfile').PartnersProfile;
const partnersProfileStreamer = new PartnersProfile(partnersProfileJSONPath);

partnersProfileStreamer.debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName();