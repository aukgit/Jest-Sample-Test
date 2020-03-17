# Jest-Sample-Test by Md. Alim Ul Karim 

# Video (Demo)
- Demonstration: 

# Links

- Secret Gist Link:
- GitHub Repository (Private, can add collaborators)
- G Drive Link: https://drive.google.com/open?id=1HJv55cLCE-b2RyCYjJhuGLk6HCstn-lj
- Coverage : https://drive.google.com/open?id=19aPGLbHdmvueNrcNorOmRXG9yms_jm2y
- 

## Task : 01 (Deep Cloning)

Write a function called deepClone which takes an object and creates a copy of it. e.g. 
`{name: "Paddy", address: {town: "Lerum", country: "Sweden"}}` -> `{name: "Paddy", address: {town: "Lerum", country: "Sweden"}}`

### Task : 01 (Solution)
- Solution : `deepCloner.js` and specs `deepCloner.spec.js` (With 100% code coverage and mutation coverage.)
- `cloningUtility.js` is used for display and ignored from coverage.

**Notes**: 
Deep cloner takes any object and verifies if it is not a string, function or number then the given object is a valid one then converts to JSON string and then converts that string back to object returns a total deep clone of the object given.

## Task : 02 (Coordinates nearest for quick meal)

We'd like to contact partners with offices within 100km of central London (coordinates 51.515419, -0.141099) to invite them out for a meal.

Write a NodeJS/JavaScript program that reads our list of partners (use the attached JSON
partners.zip or http://bit.ly/2wQaLyU) and outputs the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending).

You can use the first formula from this Wikipedia article (https://en.wikipedia.org/wiki/Great-circle_distance) to calculate distance. Don't forget to convert degrees to radians! Your program should be fully tested too.

### Task : 02 (Solution)
- Solution : 
  - `converterUtility.js` (Calculation logic for distance) 
  - `coordinate.js` (Coordinate class) 
  - `partnersProfile.js` (Logic to get the profiles within range) 
  - Specs are in respective files with 'spec' and 100% code coverage and 90% > mutation coverage.

### Code Coverage Screenshots
![image](https://user-images.githubusercontent.com/4561204/76790296-c5fd3200-67e8-11ea-8565-6f9b998cb5da.png)

![image](https://user-images.githubusercontent.com/4561204/76790282-be3d8d80-67e8-11ea-83af-45c8a9373321.png)

### Coverage Reports
https://drive.google.com/drive/folders/1HJv55cLCE-b2RyCYjJhuGLk6HCstn-lj?usp=sharing

Note: After running watch coverage reports will be found in the `coverage` folder of the root of the projects.

### Coverage Logs
```
Watch Usage: Press w to show more.
 PASS  coordinates/__tests__/coordinate.spec.js
  Coordinate class tests
    [Constructor Testing] Coordinate.constructor(string)
      √ [Invlaid] Input(null->null) -> Coordinate.constructor(string) throws error. (2ms)
      √ [Invlaid] Input(undefined->undefined) -> Coordinate.constructor(string) throws error. (1ms)
      √ [Invlaid] Input(1->AnyNumber) -> Coordinate.constructor(string) throws error.
      √ [Invlaid] Input({}->{}(AnyObject)) -> Coordinate.constructor(string) throws error. (1ms)
      √ [Invlaid] Input("x,1"->x,1) -> Coordinate.constructor(string) throws error.
      √ [Invlaid] Input("x, 1"->x, 1) -> Coordinate.constructor(string) throws error.
      √ [Invlaid] Input("1, x"->1,x) -> Coordinate.constructor(string) throws error. (1ms)
      √ [Invlaid] Input("x,y"->x,y) -> Coordinate.constructor(string) throws error.
      √ [Invlaid] Input("1.5,y"->1.5,y) -> Coordinate.constructor(string) throws error.
      √ [Invlaid] String input("any thing which doesn't have coma") -> Coordinate.constructor(string) keeps isValid flag to false. (1ms)
      √ [Valid] String input(""1,2"") -> Coordinate.constructor(string) keeps isValid flag to true.
      √ [Valid] String input(""5.1,2.5"") -> Coordinate.constructor(string) keeps isValid flag to true.
      √ [Valid] String input(""5.1, 2.5"") -> Coordinate.constructor(string) keeps isValid flag to true. (1ms)
    Coordinate.throwIfInvalid()
      √ [Integration] Throws if flag is not valid.
    Coordinate.toString()
      √ [Integration] Coordinate("1, 2").toString() returns given cordinates string ("1, 2").
    Coordinate.getDistanceOf(anotherCoordinate) || Coordinate.throwIfInvalid()
      √ [Invalid] "getDistanceOf"() -> throws if flag is not valid. (1ms)
      √ [Invalid] "throwIfInvalid"() -> throws if flag is not valid.
      √ [Error/Exception Testing] getDistanceOf(null) -> throws if flag is not valid.
      √ [Error/Exception Testing] getDistanceOf(undefined) -> throws if flag is not valid.
      √ [Error/Exception Testing] getDistanceOf({"coordinates": "51.515419,-0.141099", "coordinatesArray": [Array], "isValid": true, "throwIfInvalid": undefined, "x": 51.515419, "y": -0.141099}) -> throws if flag is not valid.
      √ [Mutation Verification] .throwIfInvalid() -> , converterUtility.getDistance() same one return 0 distance. (2ms)

 PASS  coordinates/__tests__/partnersProfile.spec.js
  PartnersProfile class tests
    √ [Integration] idealCoordinate should be "51.515419,-0.141099" (1ms)
    √ [Integration] .readFileUsingRequire() throws exception if invalid path given." (15ms)
    [Constructor Testing] .constructor(string)
      √ [Invlaid] Input(null -> null) -> PartnersProfile.constructor(string) throws error. (2ms)
      √ [Invlaid] Input(undefined -> undefined) -> PartnersProfile.constructor(string) throws error.
      √ [Invlaid] Input(1 -> AnyNumber) -> PartnersProfile.constructor(string) throws error.
      √ [Invlaid] Input({} -> {}(AnyObject)) -> PartnersProfile.constructor(string) throws error. (1ms)
      √ [Invlaid] String('anystring,$$##@') PartnersProfile.constructor(string -> meaning giving invalid path string) -> doesn't throw any error.
    .debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName() displays
      √ When (null), prints "No records found within range." (2ms)
      √ When (undefined), prints "No records found within range."
      √ When ([]), prints "No records found within range." (1ms)
      √ When (["Hello World1"]), prints "Hello World1"
    .partnerProfileOrderByCompanyNameAscending() ascending sorting (f.organization - l.organization)
      √ [Invalid] When ([null, null]), prints "Given profile is either invalid or doesn' have "organization" property." (1ms)
      √ [Invalid] When ([undefined, undefined]), prints "Given profile is either invalid or doesn' have "organization" property."
      √ [Invalid] When ([[Object], undefined]), prints "Given profile is either invalid or doesn' have "organization" property." (1ms)
      √ [Invalid] When ([[Object], [Object]]), prints "Given profile is either invalid or doesn' have "organization" property."
      √ [Integration, Valid] When (organization:5 - organization:3) returns 2.
    .getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay() gets filtered profiles display array.
      √ [Mutation] getQuickestDistanseProfilesWithinHundredKilometers() must be called at once. (1ms)
      √ [Integration] creates display string.
    .getQuickestDistanseProfilesWithinHundredKilometers() gets filtered profiles.
      √ [Mutation] getPartnerProfiles() must be called at once. (1ms)
      √ [Mutation] filterPartnerProfileWithinHundredKilometers() must be called at once for filtering.
    .isCurrentAddressWithinHundredKilomitersRangeExceptDropAddress(partnerProfile, officeIndex) returns true if within 100Km range and mutates or removes office address from array if not within range.
      √ [Within Range] Is within 100km range, adds distance and don't remove from office address. (1ms)
      √ [NOT Within Range] Is NOT within 100km range (> 100KM), removes address from the offices array.
    .getPartnerProfiles() reads profile json data file from file system.
      √ [Using Mock] Throws error if given path is not exist in the system. (1ms)
      √ [Integration] Throws error if given path is not exist in the system.
      √ [Valid Path, Using Mock] Returns JSON data.
      √ [Valid Path, Using Mock] Returns null and console log while have error during read. (1ms)
    .filterPartnerProfileWithinHundredKilometers() returns true if any address is within range of 100km from IdealCoordinate(51.515419,-0.141099).
      √ [Invalid, Integration] Returns false 'office' property doesn't exist or 'office'(undefined/null/[]) or profile is undefined/null.
      √ [Valid, Using Mock] If office address coordinate is not within range then returns false.
      √ [Valid Input, Using Mock] If office (any) address coordinate is not within range then returns 'true'.

 PASS  utilities/__tests__/converterUtility.spec.js
  ConverterUtility class tests.
    .convertDegreesToRadians(degree) converts given number as degrees to radians
      √ [Integration] .convertDegreesToRadians(0) should return 0 (1ms)
      √ [Integration] .convertDegreesToRadians(30) should return 0.5235987756
      √ [Integration] .convertDegreesToRadians(120) should return 2.0943951024
      √ [Integration] .convertDegreesToRadians(360) should return 6.2831853072
    .getDistance(lat1, long1, lat2, long2) gives a distance in between coordinates.
      √ [Integration] .getDistance(
                        lat1:53.32055555555556,
                        long1: -1.7297222222222222,
                        lat2: 53.31861111111111,
                        long2:-1.6997222222222224) -> should return '2.0043678382716137' (1ms)
      √ [Mutation with Mock] .getDistance() should call it's inner method with expected call numbers (1ms)

 PASS  cloner/__tests__/deepCloner.spec.js
  deep copy/cloning
    DeepCloner.objectToJsonString(object) takes object and converts to string
      √ [Exist function with 1 parameter] '.objectToJsonString(arg)' exist and has one argumnet. (2ms)
      √ [Invalid] Input(null->null) should throw Error with message "Invalid type null/undefined/function/string/number." (1ms)
      √ [Invalid] Input(undefined->undefined) should throw Error with message "Invalid type null/undefined/function/string/number."
      √ [Invalid] Input(1->1) should throw Error with message "Invalid type null/undefined/function/string/number." (1ms)
      √ [Invalid] Input(""->EmptyString("" or '')) should throw Error with message "Invalid type null/undefined/function/string/number."
      √ [Invalid] Input("validString"->validString) should throw Error with message "Invalid type null/undefined/function/string/number."
      √ [Invalid] Input([Function objectToJsonString]->function f() {...}) should throw Error with message "Invalid type null/undefined/function/string/number." (1ms)
      √ [Valid] Input({"id": null}) should return "{"id":null}"
      √ [Valid] Input({"id": ""}) should return "{"id":""}"
      √ [Valid] Input({}) should return "{}"
      √ [Valid] Input([]) should return "[]"
      √ [Valid] Input([[Object], [Object]]) should return "[{"id":null},{}]"
    DeepCloner.deepClone(object) takes object and converts to JSON and then converts that to object (deep cloning).
      √ [Exist function with 1 parameter] '.deepClone(arg)' exist and has one argumnet.
      √ [Mocked, Mutation] '.deepClone(arg)' invokes DeepCloner.objectToJsonString(object) at once. (3ms)
      √ [Integration] '.deepClone(arg)' deep clones to nth level, at least 4th level json is cloned properly tested. (1ms)

----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |    98.53 |     100 |     100 |
 cloner               |     100 |      100 |     100 |     100 |
  deepCloner.js       |     100 |      100 |     100 |     100 |
 coordinates          |     100 |    98.25 |     100 |     100 |
  coordinate.js       |     100 |      100 |     100 |     100 |
  partnersProfile.js  |     100 |     97.3 |     100 |     100 | 112
 utilities            |     100 |      100 |     100 |     100 |
  converterUtility.js |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------
Test Suites: 4 passed, 4 total
Tests:       71 passed, 71 total
Snapshots:   0 total
Time:        2.188s
Ran all test suites.
```


**Notes**: 
Reads the json file given and then filters out the office address which are not in range. Only those offices has a valid office address within range of 100km will be displayed.

### Implementation Screenshots
![image](https://user-images.githubusercontent.com/4561204/76823378-400bd600-683e-11ea-996b-86f3ea77e1ea.png)

```
PS D:\PersonalWork\Github\Jest-Sample-Test> node app
Orginal Object:
{ name: 'Paddy', address: { town: 'Lerum', country: 'Sweden' } }
Cloned Modified Object:
{ name: 'Alim',
  address: { town: 'my Town', country: 'Sweden' } }
-------------


-------------
reading partners from: D:\PersonalWork\Github\Jest-Sample-Test\data\partners.json
 Company/Organization Name: "Blue Square 360",
 --- Address: "St Saviours Wharf, London SE1 2BE",
 ---- (lat, long) = (51.5014767,-0.0713608999999451), Distance: 5.069289250892033
 Company/Organization Name: "Gallus Consulting",
 --- Address: "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
 ---- (lat, long) = (52.277409,-0.877935999999977), Distance: 98.66650647724738
 Company/Organization Name: "Gallus Consulting",
 --- Address: "No1 Royal Exchange, London, EC3V 3DG",
 ---- (lat, long) = (51.5136102,-0.08757919999993646), Distance: 3.708943084465606
 ```

## Running Commands
- `node run dev-all` will start development with watch.
- `node app` will start and run the application.

### Contact
[Md. Alim Ul Karim](https://www.linkedin.com/in/alimkarim) | [aukgit](https://github.com/aukgit/Jest-Sample-Test)
Email: devorg.bd@gmail.com
Ex-Crossover C#.NET Software Architect
