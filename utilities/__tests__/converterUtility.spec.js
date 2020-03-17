const converterUtility = require('../converterUtility').ConverterUtility;
const expectedDigitsToMatch = 5;

describe('ConverterUtility class tests.', () => {
  /**
   * See reference : https://www.rapidtables.com/convert/number/degrees-to-radians.html
   */
  describe('.convertDegreesToRadians(degree) converts given number as degrees to radians', () => {
    const testCases = [
      [0, 0],
      [30, 0.5235987756],
      [120, 2.0943951024],
      [360, 6.2831853072]
    ]

    test.each(testCases)('[Integration] .convertDegreesToRadians(%s) should return %s', (input, expected) => {
      // Act
      const actual = converterUtility.convertDegreesToRadians(input);

      // Assert
      expect(actual).toBeCloseTo(expected, expectedDigitsToMatch);
    });
  });

  /**
   * Reference   : https://en.wikipedia.org/wiki/Great-circle_distance
   * Reference 2 : https://www.geeksforgeeks.org/program-distance-two-points-earth/
   * 
   */
  describe('.getDistance(lat1, long1, lat2, long2) gives a distance in between coordinates.', () => {
    const testCases = [
      [
        53.32055555555556,
        -1.7297222222222221,
        53.31861111111111,
        -1.6997222222222223,
        2.0043678382716137 // expected
      ]
    ]

    /**
     * Input : Latitude 1: 53.32055555555556
     * Longitude 1: -1.7297222222222221
     * Latitude 2: 53.31861111111111
     * Longitude 2: -1.6997222222222223
     * Output: Distance is: 2.0043678382716137 Kilometers
     */
    test.each(testCases)('[Integration] .getDistance(\n\t\tlat1:%s, \n\t\tlong1: %s, \n\t\tlat2: %s, \n\t\tlong2:%s) -> should return %s', (lat1, long1, lat2, long2, expected) => {
      // Act
      const actual = converterUtility.getDistance(lat1, long1, lat2, long2);

      // Assert
      expect(actual).toBeCloseTo(expected, expectedDigitsToMatch);
    });

    test('[Mutation with Mock] .getDistance() should call it\'s inner method with expected call numbers', () => {
      // Arrange 
      const radiansConverterMock = jest.spyOn(converterUtility, converterUtility.convertDegreesToRadians.name);
      radiansConverterMock.mockImplementation(_ => 5);
      const expectedCalls  = 4;

      // Act
      const actual = converterUtility.getDistance(1, 1, 1, 1);

      // Assert
      expect(radiansConverterMock).toHaveBeenCalledTimes(expectedCalls);
      expect(actual).toBe(0);
    });
  });

});