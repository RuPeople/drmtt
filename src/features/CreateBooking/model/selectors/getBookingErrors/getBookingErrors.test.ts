import { StateSchema } from 'app/providers/StoreProvider';

import { BookingError } from '../../types/bookingSchema';
import { getBookingErrors } from './getBookingErrors';

describe('getBookingErrors', () => {
    test('should return errors from state', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {
                errors: [BookingError.SERVER_ERROR],
            },
        };
        expect(getBookingErrors(state as StateSchema)).toEqual([BookingError.SERVER_ERROR]);
    });

    test('should return empty array if errors are not defined', () => {
        const state: DeepPartial<StateSchema> = {
            booking: {},
        };
        expect(getBookingErrors(state as StateSchema)).toEqual([]);
    });
});
