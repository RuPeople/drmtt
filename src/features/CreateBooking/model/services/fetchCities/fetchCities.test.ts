import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { BookingError } from '../../types/bookingSchema';
import { fetchCities } from './fetchCities';

jest.mock('axios');

describe('fetchCities', () => {
    test('success fetch', async () => {
        const responseValue = [{ id: '1', name: 'City1' }];
        const thunk = new TestAsyncThunk(fetchCities);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: responseValue }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseValue);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchCities);
        thunk.api.get.mockReturnValue(Promise.reject(new Error('Error')));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([BookingError.FETCH_CITIES_SERVER_ERROR]);
    });
});
