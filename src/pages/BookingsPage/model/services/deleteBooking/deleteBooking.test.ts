import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { BookingPageError } from '../../types/bookingsPageSchema';
import { deleteBooking } from './deleteBooking';

jest.mock('axios');

describe('deleteBooking', () => {
    test('success delete booking', async () => {
        const responseValue = { message: 'Booking deleted' };
        const thunk = new TestAsyncThunk(deleteBooking);
        thunk.api.delete.mockReturnValue(Promise.resolve({ data: responseValue }));
        const result = await thunk.callThunk(1);

        expect(thunk.api.delete).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBe(responseValue);
    });

    test('delete booking server error', async () => {
        const thunk = new TestAsyncThunk(deleteBooking);
        thunk.api.delete.mockReturnValue(Promise.reject(new Error()));

        const result = await thunk.callThunk(1);

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toStrictEqual([BookingPageError.SERVER_ERROR]);
    });
});
