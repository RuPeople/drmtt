import { StateSchema } from 'app/providers/StoreProvider';

import { getBookingCities } from './getBookingCities';

describe('getBookingCities', () => {
    test('should return cities from state', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {
                cities: [{ id: '1', name: 'City1' }],
            },
        };
        expect(getBookingCities(state as StateSchema)).toEqual([{ id: '1', name: 'City1' }]);
    });

    test('should return empty array if cities are not defined', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {},
        };
        expect(getBookingCities(state as StateSchema)).toEqual([]);
    });
});
