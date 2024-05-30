import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Booking } from 'entities/Booking';

import { BookingPageError } from '../../types/bookingsPageSchema';
import { fetchBookingList } from '../fetchBookingList/fetchBookingList';

export const deleteBooking = createAsyncThunk<
    { message: string },
    Booking['id'],
    ThunkConfig<BookingPageError[]>
>(
    'booking/deleteBooking',
    async (bookingId, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<{ message: string }>(`/bookings/delete/${bookingId}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchBookingList());

            return response.data;
        } catch (e) {
            return rejectWithValue([BookingPageError.SERVER_ERROR]);
        }
    },
);
