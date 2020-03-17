const deepCloner = require('../deepCloner').DeepCloner;
const parseMethod = 'parse';
const mockJsonParse = jest.spyOn(JSON, parseMethod);

describe('deep copy/cloning', () => {
  describe('DeepCloner.objectToJsonString(object) takes object and converts to string', () => {
    // Arrange (Global for this method only)
    const errorMessage = 'Invalid type null/undefined/function/string/number.';
    const functionInTest = deepCloner.objectToJsonString;
    const functionName = functionInTest.name;

    test(`[Exist function with 1 parameter] '.${functionName}(arg)' exist and has one argumnet.`, () => {
      // Assert
      expect(typeof (functionInTest)).toBe('function');
      expect(functionInTest.length).toBe(1);
    });

    // Arrange
    const invalidTestCases = [
      [null, null],
      [undefined, undefined],
      [1, 1],
      ['', 'EmptyString("" or \'\')'],
      ['validString', 'validString'],
      [functionInTest, 'function f() {...}']
    ];

    test.each(invalidTestCases)('[Invalid] Input(%p->%s) should throw Error with message "' + errorMessage + '"', (input) => {
      let actualThrownError = null;

      // Act
      try {
        functionInTest(input);
      } catch (error) {
        actualThrownError = error;
      }

      // Assert
      expect(actualThrownError).not.toBeNull();
      expect(actualThrownError.message).toBe(errorMessage);
    });

    // Arrange
    const testCaseIdNull = { id: null };
    const testCaseIdStringEmpty = { id: '' };
    const testCaseEmptyObjectNotation = {};
    const testCaseEmptyArray = [];
    const testCaseComplexArray = [testCaseIdNull, testCaseEmptyObjectNotation];
    const validTestCases = [
      [testCaseIdNull, JSON.stringify(testCaseIdNull)],
      [testCaseIdStringEmpty, JSON.stringify(testCaseIdStringEmpty)],
      [testCaseEmptyObjectNotation, JSON.stringify(testCaseEmptyObjectNotation)],
      [testCaseEmptyArray, JSON.stringify(testCaseEmptyArray)],
      [testCaseComplexArray, JSON.stringify(testCaseComplexArray)],
    ];

    test.each(validTestCases)('[Valid] Input(%p) should return "%s"', (input, expected) => {
      // Act
      const actual = functionInTest(input);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('DeepCloner.deepClone(object) takes object and converts to JSON and then converts that to object (deep cloning).', () => {
    // Arrange (Global for this method only)
    const functionInTest = deepCloner.deepClone;
    const functionName = functionInTest.name;

    test(`[Exist function with 1 parameter] '.${functionName}(arg)' exist and has one argumnet.`, () => {
      // Assert
      expect(functionName).toBe('deepClone');
      expect(typeof (functionInTest)).toBe('function');
      expect(functionInTest.length).toBe(1);
    });

    test(`[Mocked, Mutation] '.${functionName}(arg)' invokes DeepCloner.objectToJsonString(object) at once.`, () => {
      // Arrange
      const expected = { id: 'called' };
      const input = {};
      const objectToJsonStringFunctionName = deepCloner.objectToJsonString.name;
      const objectToJsonStringMock = jest.spyOn(deepCloner, objectToJsonStringFunctionName);
      const expectedCalls = 1;

      objectToJsonStringMock.mockImplementation(_ => input);
      mockJsonParse.mockImplementation(_ => expected);
      deepCloner.objectToJsonString = objectToJsonStringMock;

      // Act
      const actual = deepCloner.deepClone(input);

      // Assert
      expect(objectToJsonStringMock).toHaveBeenCalledWith(input);
      expect(mockJsonParse).toHaveBeenCalledWith(input);

      expect(objectToJsonStringMock).toHaveBeenCalledTimes(expectedCalls);
      expect(mockJsonParse).toHaveBeenCalledTimes(expectedCalls);
      expect(actual).toBe(expected);

      // Mock-Restore / Tear down
      mockJsonParse.mockRestore();
      objectToJsonStringMock.mockRestore();
    });

    test(`[Integration] '.${functionName}(arg)' deep clones to nth level, at least 4th level json is cloned properly tested.`, () => {
      // Arrange
      const originalId = 'org-id-1';
      const originalLevel4Value = 'org-level-4';
      const propertyToVerify = 'level1.level2.level3.level4.value';

      const jsonSample = {
        id: originalId,
        level1: {
          value: 'org-level-1',
          level2: {
            value: 'org-level-2',
            level3: {
              value: 'org-level-3',
              level4: {
                value: originalLevel4Value,
              }
            }
          }
        }
      };

      const clonedId = 'cloned-id-1';
      const clonedLevel4Value = 'cloned-level-4';

      // Act
      const actual = deepCloner.deepClone(jsonSample);

      // modify all items in actual
      actual.id = clonedId;
      actual.level1.level2.level3.level4.value = clonedLevel4Value;

      // Assert
      // (jsonSample != actual) Just to confrim same memory object is not returned. 
      // Even with shadow copy it (jsonSample !== actual) will pass.
      expect(jsonSample).not.toBe(actual);
      expect(jsonSample.id).toBe(originalId);
      expect(actual.id).toBe(clonedId);
      expect(jsonSample).toHaveProperty(propertyToVerify, originalLevel4Value);
      expect(actual).toHaveProperty(propertyToVerify, clonedLevel4Value);
    });
  });
});