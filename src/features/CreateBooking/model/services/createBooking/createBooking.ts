import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { BookingTimeSlot, City } from 'entities/Booking';

import { BookingError } from '../../types/bookingSchema';

type CreateBookingData = {
    cityId: City['id'];
    date: BookingTimeSlot['date'];
    time: string;
    phoneNumber: string;
    name: string
};

export const createBooking = createAsyncThunk<
    { message: string },
    CreateBookingData,
    ThunkConfig<BookingError[]>
>(
    'booking/createBooking',
    async (recoverPasswordData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<{ message: string }>('/bookings/create', recoverPasswordData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([BookingError.SERVER_ERROR]);
        }
    },
);
