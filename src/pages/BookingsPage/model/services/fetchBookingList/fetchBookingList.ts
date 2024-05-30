import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Booking } from 'entities/Booking';

import { BookingPageError } from '../../types/bookingsPageSchema';

export const fetchBookingList = createAsyncThunk<
    { data: Booking[] },
    void,
    ThunkConfig<BookingPageError[]>
>(
    'booking/fetchBookings',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<{ data: Booking[] }>('/bookings/get');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([BookingPageError.SERVER_ERROR]);
        }
    },
);
