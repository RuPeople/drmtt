import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { BookingDate, City } from 'entities/Booking';

import { BookingError } from '../../types/bookingSchema';

export const fetchBookingDates = createAsyncThunk<
    { data: BookingDate },
    { cityId: City['id'] },
    ThunkConfig<BookingError[]>
>(
    'booking/fetchBookings',
    async (fetchBookingsData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const { cityId } = fetchBookingsData;

        try {
            const response = await extra.api.get<{ data: BookingDate }>(`/bookingDates/get/${cityId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([BookingError.SERVER_ERROR]);
        }
    },
);
