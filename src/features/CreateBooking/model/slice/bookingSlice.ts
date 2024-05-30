import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createBooking } from '../services/createBooking/createBooking';
import { fetchBookingDates } from '../services/fetchBookingDates/fetchBookingDates';
import { fetchCities } from '../services/fetchCities/fetchCities';
import { BookingError, BookingSchema } from '../types/bookingSchema';

const initialState: BookingSchema = {
    cities: [],
    bookingDates: {},
    isLoading: false,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setErrors: (state, action: PayloadAction<BookingError[]>) => {
            state.errors = action.payload;
        },
        clearErrors: (state) => {
            state.errors = [];
        },
    },
     extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(fetchBookingDates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBookingDates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookingDates = action.payload.data;
            })
            .addCase(fetchBookingDates.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(createBooking.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(createBooking.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: bookingActions } = bookingSlice;

export const { reducer: bookingReducer } = bookingSlice;
