import LocationService from '../LocationService';

describe('LocationService', () => {
  test('should return latitude & longitude from current location', async () => {
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
