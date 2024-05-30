import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { BookingPageError } from '../../types/bookingsPageSchema';
import { fetchBookingList } from './fetchBookingList';

jest.mock('axios');

describe('fetchBookingList', () => {
    test('success fetch booking list', async () => {
        const responseValue = { data: [{ id: '1', name: 'Booking 1' }] };
        const thunk = new TestAsyncThunk(fetchBookingList);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: responseValue }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBe(responseValue);
    });

    test('fetch booking list server error', async () => {
        const thunk = new TestAsyncThunk(fetchBookingList);
        thunk.api.get.mockReturnValue(Promise.reject(new Error()));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toStrictEqual([BookingPageError.SERVER_ERROR]);
    });
});
