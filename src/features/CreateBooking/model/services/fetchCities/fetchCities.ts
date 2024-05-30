import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { City } from 'entities/Booking';

import { BookingError } from '../../types/bookingSchema';

export const fetchCities = createAsyncThunk<
    City[],
    void,
    ThunkConfig<BookingError[]>
>(
    'booking/fetchCities',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<City[]>('/cities/get');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([BookingError.FETCH_CITIES_SERVER_ERROR]);
        }
    },
);
