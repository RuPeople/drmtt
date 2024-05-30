import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { BookingError } from '../../types/bookingSchema';
import { fetchBookingDates } from './fetchBookingDates';

jest.mock('axios');

describe('fetchBookingDates', () => {
    test('success fetch', async () => {
        const responseValue = { data: { date: '2024-05-30' } };
        const thunk = new TestAsyncThunk(fetchBookingDates);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: responseValue }));
        const result = await thunk.callThunk({ cityId: '1' });

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseValue);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchBookingDates);
        thunk.api.get.mockReturnValue(Promise.reject(new Error('Error')));
        const result = await thunk.callThunk({ cityId: '1' });

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([BookingError.SERVER_ERROR]);
    });
});
