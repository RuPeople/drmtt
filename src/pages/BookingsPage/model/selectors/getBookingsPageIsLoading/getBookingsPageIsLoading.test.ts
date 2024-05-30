import { StateSchema } from 'app/providers/StoreProvider';

import { getBookingsPageIsLoading } from './getBookingsPageIsLoading';

describe('getBookingsPageIsLoading', () => {
    test('should return isLoading true', () => {
        const state: DeepPartial<StateSchema> = {
            bookingsPage: { isLoading: true },
        };
        expect(getBookingsPageIsLoading(state as StateSchema)).toBe(true);
    });

    test('should return isLoading false', () => {
        const state: DeepPartial<StateSchema> = {
            bookingsPage: { isLoading: false },
        };
        expect(getBookingsPageIsLoading(state as StateSchema)).toBe(false);
    });
});
