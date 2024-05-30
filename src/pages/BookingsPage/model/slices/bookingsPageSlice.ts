import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { deleteBooking } from '../services/deleteBooking/deleteBooking';
import { fetchBookingList } from '../services/fetchBookingList/fetchBookingList';
import { BookingPageError, BookingsPageSchema } from '../types/bookingsPageSchema';

const initialState: BookingsPageSchema = {
    bookings: [],
    isLoading: false,
};

export const bookingsPageSlice = createSlice({
    name: 'bookingsPage',
    initialState,
    reducers: {
        setErrors: (state, action: PayloadAction<BookingPageError[]>) => {
            state.errors = action.payload;
        },
        clearErrors: (state) => {
            state.errors = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBookingList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload.data;
            })
            .addCase(fetchBookingList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(deleteBooking.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: bookingsPageActions } = bookingsPageSlice;

export const { reducer: bookingsPageReducer } = bookingsPageSlice;
