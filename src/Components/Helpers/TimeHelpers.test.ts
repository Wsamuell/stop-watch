import { convertToDuration } from './TimeHelpers';
// BKMRKL make sure jest test are requirement to build

describe('convertToDuration', () => {
  test('should convert time to duration correctly', () => {
    const time = {
      days: 1,
      hours: 2,
      minutes: 30,
      seconds: 15,
    };

    const expectedDuration = {
      getDays: 1,
      getHours: 2,
      getMinutes: 30,
      getSeconds: 15,
    };

    const duration = convertToDuration(time);

    expect(duration).toEqual(expectedDuration);
  });

  test('should handle zero values', () => {
    const time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const expectedDuration = {
      getDays: 0,
      getHours: 0,
      getMinutes: 0,
      getSeconds: 0,
    };

    const duration = convertToDuration(time);

    expect(duration).toEqual(expectedDuration);
  });

  test('should handle large values', () => {
    const time = {
      days: 10,
      hours: 25,
      minutes: 80,
      seconds: 3665,
    };

    const expectedDuration = {
      getDays: 11,
      getHours: 3,
      getMinutes: 21,
      getSeconds: 5,
    };

    const duration = convertToDuration(time);

    expect(duration).toEqual(expectedDuration);
  });
});
