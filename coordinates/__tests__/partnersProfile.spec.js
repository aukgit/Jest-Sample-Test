const Coordinate = require('../coordinate').Coordinate;
const idealCoordinate = require('../partnersProfile').IdealCoordinate;
const PartnersProfile = require('../partnersProfile').PartnersProfile;
const path = '...';
const instance = new PartnersProfile(path);

const sampleProfiles = [
  {
    "id": 4,
    "urlName": "blue-square-360",
    "organization": "Blue Square 360",
    "customerLocations": "globally",
    "willWorkRemotely": true,
    "website": "http://www.bluesquare360.com/",
    "services": "Blue Square 360 provides a professionally managed service covering all areas of a 360° Feedback initiative. We're experienced in supporting projects of all sizes, and always deliver a personal service that provides the level of support you need to ensure your 360 initiative delivers results for the business.",
    "offices": [
      {
        "location": "Singapore",
        "address": "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
        "coordinates": "1.28304,103.85199319999992"
      },
      {
        "location": "London, UK",
        "address": "St Saviours Wharf, London SE1 2BE",
        "coordinates": "51.5014767,-0.0713608999999451"
      }
    ]
  },
  {
    "id": 13,
    "urlName": "gallus-consulting",
    "organization": "Gallus Consulting",
    "customerLocations": "across the UK",
    "willWorkRemotely": true,
    "website": "http://www.gallusconsulting.com/",
    "services": "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.",
    "offices": [
      {
        "location": "Northampton",
        "address": "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
        "coordinates": "52.277409,-0.877935999999977"
      },
      {
        "location": "London",
        "address": "No1 Royal Exchange, London, EC3V 3DG",
        "coordinates": "51.5136102,-0.08757919999993646"
      },
      {
        "location": "Manchester",
        "address": "3 Hardman Square, Spinningfields, Manchester, M3 3EB",
        "coordinates": "53.47990859999999,-2.2510892999999896"
      }
    ]
  },
];

describe('PartnersProfile class tests', () => {
  describe('PartnersProfile.constructor(string)', () => {
    // Arrange (Global for this method only)
    const errorMessage = 'Given profile path is empty or invalid.';

    const invalidTestCases = [
      [null, null],
      [undefined, undefined],
      [1, 'AnyNumber'],
      [{}, '{}(AnyObject)'],
    ];

    test.each(invalidTestCases)('Invlaid input(%p->%s) -> PartnersProfile.constructor(string) throws error.', (input) => {
      // Arrange
      let actualThrownError = null;
      let actual = null;

      // Act
      try {
        actual = new PartnersProfile(input);
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(actualThrownError).not.toBe(null);
      expect(actualThrownError.message).toBe(errorMessage);
    });


    test('Invlaid string PartnersProfile.constructor(string -> meaning giving invalid path string) -> doesn\'t throw any error.', () => {
      // Arrange
      const input = 'anystring,$$##@';

      // Act
      const actual = new PartnersProfile(input);

      // Assert
      expect(actual).not.toBe(null);
      expect(actual).toBeDefined();
      expect(actual.profilePath).toBe(input);
    });
  });

  describe('PartnersProfile.debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName() displays ', () => {
    const expectedMessage = 'No records found within range.';
    const testCases = [
      [null, expectedMessage],
      [undefined, expectedMessage],
      [[], expectedMessage],
      [['Hello World1'], 'Hello World1']
    ]

    test.each(testCases)(`When (%p->%s), prints "%s"`, (returnArray, message) => {
      // Arrange
      const mockingMethodName = instance.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay.name;
      const getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplayMock = jest.spyOn(instance, mockingMethodName);
      getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplayMock.mockImplementation(_ => returnArray);
      const consoleLogMock = jest.spyOn(global.console, 'log');
      consoleLogMock.mockImplementation(_ => { });
      const expectedCalls = 1;
      const expectedConsoleCalls = 1;

      // Act
      instance.debugPrintPartnerProfilesWithinHundredKilometersOrderByCompanyName();

      // Assert
      expect(consoleLogMock).toHaveBeenCalledTimes(expectedConsoleCalls);
      expect(consoleLogMock).toHaveBeenCalledWith(message);
      expect(getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplayMock).toHaveBeenCalledTimes(expectedCalls);

      // Mock-Restore / Tear down
      consoleLogMock.mockRestore();
      getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplayMock.mockRestore();
    });
  });

  describe('PartnersProfile.partnerProfileOrderByCompanyNameAscending() ascending sorting (f.organization - l.organization) ', () => {
    const expectedMessage = 'Given profile is either invalid or doesn\' have "organization" property.';
    const validProfileWithOrganization = { organization: 5 };
    const validProfileWithOrganization2 = { organization: 3 };
    const inValidProfileWithOrganization = {};
    const invalidTestCases = [
      [[null, null], expectedMessage],
      [[undefined, undefined], expectedMessage],
      [[validProfileWithOrganization, undefined], expectedMessage],
      [[inValidProfileWithOrganization, validProfileWithOrganization], expectedMessage],
    ]

    test.each(invalidTestCases)(`[Invalid] When (%p->%s), prints "%s"`, (inputArray, message) => {
      // Arrange
      const consoleMock = jest.spyOn(global.console, 'error');
      consoleMock.mockImplementation(_ => { });
      const expectedConsoleCalls = 1;
      let actualError = null;

      // Act
      try {
        instance.partnerProfileOrderByCompanyNameAscending(inputArray[0], inputArray[1]);
      } catch (error) {
        actualError = error;
      }

      // Assert
      expect(actualError).not.toBe(null);
      expect(actualError.message).toBe(message);
      expect(consoleMock).toHaveBeenCalledTimes(expectedConsoleCalls);
      expect(consoleMock).toHaveBeenCalledWith(message);

      // Mock-Restore / Tear down
      consoleMock.mockRestore();
    });

    test(`[Valid] When (org:5- org:3) returns 2.`, () => {
      // Arrange
      const expected = 2;

      // Act
      const actual = instance.partnerProfileOrderByCompanyNameAscending(validProfileWithOrganization, validProfileWithOrganization2);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('PartnersProfile.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay() gets filtered profiles display array.', () => {
    test(`[Mutation] getQuickestDistanseProfilesWithinHundredKilometers() must be called at once.`, () => {
      // Arrange
      const expectedCalls = 1;
      const message = 'No filter data found within 100km rage.';
      const mock = jest.spyOn(instance, instance.getQuickestDistanseProfilesWithinHundredKilometers.name);
      mock.mockImplementation(_ => []);
      const consoleMock = jest.spyOn(global.console, 'warn');
      consoleMock.mockImplementation(_ => { });

      // Act
      instance.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay();

      // Assert
      expect(mock).toHaveBeenCalledTimes(expectedCalls);
      expect(consoleMock).toHaveBeenCalledWith(message);

      // Mock-Restore / Tear down
      mock.mockRestore();
      consoleMock.mockRestore();
    });

    test(`[Integration] getQuickestDistanseProfilesWithinHundredKilometers() creates display string.`, () => {
      // Arrange
      const expectedCalls = 1;
      const mock = jest.spyOn(instance, instance.getQuickestDistanseProfilesWithinHundredKilometers.name);
      mock.mockImplementation(_ => sampleProfiles);

      // Act
      const actualResults = instance.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay();

      // Assert
      expect(mock).toHaveBeenCalledTimes(expectedCalls);
      expect(actualResults).toBeDefined();

      for (let index = 0; index < actualResults.length; index++) {
        const profileDisplay = actualResults[index];
        expect(profileDisplay.indexOf(' Company/Organization Name: "') > -1).toBeTruthy();
      }

      // Mock-Restore / Tear down
      mock.mockRestore();
    });
  });

  describe('PartnersProfile.getQuickestDistanseProfilesWithinHundredKilometers() gets filtered profiles display array.', () => {
    test(`[Mutation] getQuickestDistanseProfilesWithinHundredKilometers() must be called at once.`, () => {
      // Arrange
      const expectedCalls = 1;
      const message = 'No filter data found within 100km rage.';
      const mock = jest.spyOn(instance, instance.getQuickestDistanseProfilesWithinHundredKilometers.name);
      mock.mockImplementation(_ => []);
      const consoleMock = jest.spyOn(global.console, 'warn');
      consoleMock.mockImplementation(_ => { });

      // Act
      instance.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay();

      // Assert
      expect(mock).toHaveBeenCalledTimes(expectedCalls);
      expect(consoleMock).toHaveBeenCalledWith(message);

      // Mock-Restore / Tear down
      mock.mockRestore();
      consoleMock.mockRestore();
    });

    test(`[Integration] getQuickestDistanseProfilesWithinHundredKilometers() creates display string.`, () => {
      // Arrange
      const expectedCalls = 1;
      const mock = jest.spyOn(instance, instance.getQuickestDistanseProfilesWithinHundredKilometers.name);
      mock.mockImplementation(_ => sampleProfiles);

      // Act
      const actualResults = instance.getPartnerProfilesWithinHundredKilometersOrderByCompanyNamesDisplay();

      // Assert
      expect(mock).toHaveBeenCalledTimes(expectedCalls);
      expect(actualResults).toBeDefined();

      for (let index = 0; index < actualResults.length; index++) {
        const profileDisplay = actualResults[index];
        expect(profileDisplay.indexOf(' Company/Organization Name: "') > -1).toBeTruthy();
      }

      // Mock-Restore / Tear down
      mock.mockRestore();
    });
  });

  it('idealCoordinate should be "51.515419,-0.141099"', () => {
    expect(idealCoordinate.coordinates).toBe('51.515419,-0.141099');
  });
});