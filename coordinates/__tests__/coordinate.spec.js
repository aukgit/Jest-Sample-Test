const Coordinate = require('../coordinate').Coordinate;
const idealCoordinate = require('../partnersProfile').IdealCoordinate;

describe('Coordinate class tests', () => {
  describe('Coordinate.constructor(string)', () => {
    // Arrange (Global for this method only)
    const errorMessage = 'Given cordinate is not valid.';

    const invalidTestCases = [
      [null, null],
      [undefined, undefined],
      [1, 'AnyNumber'],
      [{}, '{}(AnyObject)'],
      ['x,1', 'x,1'],
      ['x, 1', 'x, 1'],
      ['1, x', '1,x'],
      ['x,y', 'x,y'],
      ['1.5,y', '1.5,y'],
    ];

    test.each(invalidTestCases)('Invlaid input(%p->%s) -> Coordinate.constructor(string) throws error.', (input) => {
      // Arrange
      let actualThrownError = null;
      let createdCoordinate;

      // Act
      try {
        createdCoordinate = new Coordinate(input);
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(createdCoordinate).not.toBe(null);
      expect(actualThrownError).not.toBe(null);
      expect(actualThrownError.message).toBe(errorMessage);
    });


    test('Invlaid string input("any thing which doesn\'t have coma") -> Coordinate.constructor(string) keeps isValid flag to false.', () => {
      // Arrange
      const input = 'anystring';

      // Act
      const actual = new Coordinate(input);

      // Assert
      expect(actual.isValid).toBeFalsy();
    });

    const validTestCases = [
      ['1,2'],
      ['5.1,2.5'],
      ['5.1, 2.5']
    ];

    test.each(validTestCases)('Valid string input("%p") -> Coordinate.constructor(string) keeps isValid flag to true.', (input) => {
      // Arrange
      const splitArray = input.split(',');
      const first = parseFloat(splitArray[0].trim());
      const second = parseFloat(splitArray[1].trim());

      // Act
      const actual = new Coordinate(input);

      // Assert
      expect(actual.isValid).toBeTruthy();
      expect(actual.x).toBe(first);
      expect(actual.y).toBe(second);
    });
  });

  describe('Coordinate.throwIfInvalid()', () => {
    test('throws if flag is not valid.', () => {
      // Arrange
      const input = 'anystring';
      let actualThrownError;
      const errorMessage =
        'Current cordinates(' + input + ') are not valid. Value: ' + input;

      // Act
      try {
        const actual = new Coordinate(input);
        actual.throwIfInvalid();
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(actualThrownError).not.toBe(null);
      expect(actualThrownError.message).toBe(errorMessage);
    });
  });

  describe('Coordinate.toString()', () => {
    test('Coordinate("1, 2") returns given cordinates string("1, 2").', () => {
      // Arrange
      const input = '1, 2';

      // Act
      const actual = new Coordinate(input);

      // Assert
      expect(actual.toString()).toBe(input);
    });
  });

  describe('Coordinate.getDistanceOf(anotherCoordinate) || Coordinate.throwIfInvalid()', () => {
    const methodsTotest = [
      'getDistanceOf',
      'throwIfInvalid'
    ];

    test.each(methodsTotest)('%p() -> throws if flag is not valid.', (methodName) => {
      // Arrange
      const input = 'anystring';
      let actualThrownError;
      const errorMessage =
        'Current cordinates(' + input + ') are not valid. Value: ' + input;

      // Act
      try {
        const actual = new Coordinate(input);
        actual[methodName]();
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(actualThrownError).not.toBe(null);
      expect(actualThrownError.message).toBe(errorMessage);
    });


    // Test Cases
    let anotherCoordinate = new Coordinate(idealCoordinate.coordinates);
    anotherCoordinate.throwIfInvalid = undefined;

    const inValidTestCasesForGetDistanceOf = [
      null,
      undefined,
      anotherCoordinate,
    ];

    test.each(inValidTestCasesForGetDistanceOf)('getDistanceOf(%p) -> throws if flag is not valid.', (input) => {
      // Arrange
      let actualThrownError;
      const errorMessage = 'Given cordinates are not valid.';

      // Act
      try {
        const actual = new Coordinate(idealCoordinate.coordinates);
        actual.getDistanceOf(input);
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(actualThrownError).not.toBe(null);
      expect(actualThrownError.message).toBe(errorMessage);
    });

    test('.throwIfInvalid() -> , converterUtility.getDistance() mutation verification and same one return 0 distance.', () => {
      // Arrange
      const input = '1, 2';
      const input2 = '1, 3';
      const expected = 0;
      const instance = new Coordinate(input);
      const anotherInstance = new Coordinate(input2);
      const throwIfInValidMock = jest.spyOn(instance, 'throwIfInvalid');
      throwIfInValidMock.mockImplementation(_ => { });
      // same.getDistanceOf(same) -> 2, another.getDistanceOf(same) -> 1
      const expectedCallsForthrowIfInValidMock = 3;
      const expectedCallsForgetDistanceUtilityMock = 1;
      const converterUtility = require('../../utilities/converterUtility').ConverterUtility;
      const getDistanceUtilityMock = jest.spyOn(converterUtility, converterUtility.getDistance.name);
      getDistanceUtilityMock.mockImplementation(_ => 0);

      // Act
      const actual = instance.getDistanceOf(instance);
      const actualSecond = anotherInstance.getDistanceOf(instance);

      // Assert
      expect(actual).toBe(expected);
      expect(actualSecond).toBe(expected);
      expect(throwIfInValidMock).toHaveBeenCalledTimes(expectedCallsForthrowIfInValidMock);
      expect(getDistanceUtilityMock).toHaveBeenCalledTimes(expectedCallsForgetDistanceUtilityMock);

      // Mock-Restore / Tear down
      throwIfInValidMock.mockRestore();
      getDistanceUtilityMock.mockRestore();
    });
  });
});