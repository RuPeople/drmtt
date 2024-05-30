import { StateSchema } from 'app/providers/StoreProvider';

import { getBookingIsLoading } from './getBookingIsLoading';

describe('getBookingIsLoading', () => {
    test('should return isLoading from state', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {
                isLoading: true,
            },
        };
        expect(getBookingIsLoading(state as StateSchema)).toBe(true);
    });

    test('should return false if isLoading is not defined', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {},
        };
        expect(getBookingIsLoading(state as StateSchema)).toBe(false);
    });
});
