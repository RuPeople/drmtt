import { StateSchema } from 'app/providers/StoreProvider';

import { getBookingList } from './getBookingList';

describe('getBookingList', () => {
    test('should return booking list', () => {
        const state: DeepPartial<StateSchema> = {
            bookingsPage: { bookings: [{ id: 1, name: 'Booking 1' }] },
        };
        expect(getBookingList(state as StateSchema)).toEqual([{ id: 1, name: 'Booking 1' }]);
    });

    test('should return empty list when no bookings', () => {
        const state: DeepPartial<StateSchema> = {
            bookingsPage: { bookings: [] },
        };
        expect(getBookingList(state as StateSchema)).toEqual([]);
    });
});
