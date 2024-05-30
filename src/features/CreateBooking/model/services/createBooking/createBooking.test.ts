import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { BookingError } from '../../types/bookingSchema';
import { createBooking } from './createBooking';

jest.mock('axios');

describe('createBooking', () => {
    test('success create', async () => {
        const responseValue = { message: 'Booking created' };
        const thunk = new TestAsyncThunk(createBooking);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: responseValue }));
        const result = await thunk.callThunk({
            cityId: '1',
            date: '2024-05-30',
            time: '12:00',
            phoneNumber: '1234567890',
            name: 'Name',
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseValue);
    });

    test('error create', async () => {
        const thunk = new TestAsyncThunk(createBooking);
        thunk.api.post.mockReturnValue(Promise.reject(new Error('Error')));
        const result = await thunk.callThunk({
            cityId: '1',
            date: '2024-05-30',
            time: '12:00',
            phoneNumber: '1234567890',
            name: 'Name',
        });

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([BookingError.SERVER_ERROR]);
    });
});
