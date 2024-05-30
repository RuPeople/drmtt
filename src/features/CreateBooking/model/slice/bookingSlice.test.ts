import { createBooking } from '../services/createBooking/createBooking';
import { fetchBookingDates } from '../services/fetchBookingDates/fetchBookingDates';
import { fetchCities } from '../services/fetchCities/fetchCities';
import { BookingError, BookingSchema } from '../types/bookingSchema';
import { bookingActions, bookingSlice } from './bookingSlice';

jest.mock('axios');

describe('bookingSlice', () => {
    test('test setErrors', () => {
        const state: DeepPartial<BookingSchema> = {
            errors: [],
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            bookingActions.setErrors([BookingError.SERVER_ERROR]),
        )).toEqual({
            errors: [BookingError.SERVER_ERROR],
        });
    });

    test('test clearErrors', () => {
        const state: DeepPartial<BookingSchema> = {
            errors: [BookingError.SERVER_ERROR],
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            bookingActions.clearErrors(),
        )).toEqual({
            errors: [],
        });
    });

    test('fetchCities.pending', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: false,
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchCities.pending.type },
        )).toEqual({
            isLoading: true,
        });
    });

    test('fetchCities.fulfilled', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
            cities: [],
        };
        const cities = [{ name: 'City1' }, { name: 'City2' }];

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchCities.fulfilled.type, payload: cities },
        )).toEqual({
            isLoading: false,
            cities,
        });
    });

    test('fetchCities.rejected', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
            errors: [],
        };
        const error = BookingError.SERVER_ERROR;

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchCities.rejected.type, payload: error },
        )).toEqual({
            isLoading: false,
            errors: error,
        });
    });

    test('fetchBookingDates.pending', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: false,
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchBookingDates.pending.type },
        )).toEqual({
            isLoading: true,
        });
    });

    test('fetchBookingDates.fulfilled', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
            bookingDates: {},
        };
        const bookingDates = { date1: '2023-01-01', date2: '2023-01-02' };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchBookingDates.fulfilled.type, payload: { data: bookingDates } },
        )).toEqual({
            isLoading: false,
            bookingDates,
        });
    });

    test('fetchBookingDates.rejected', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
            errors: [],
        };
        const error = BookingError.SERVER_ERROR;

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: fetchBookingDates.rejected.type, payload: error },
        )).toEqual({
            isLoading: false,
            errors: error,
        });
    });

    test('createBooking.pending', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: false,
            errors: [BookingError.SERVER_ERROR],
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: createBooking.pending.type },
        )).toEqual({
            isLoading: true,
            errors: undefined,
        });
    });

    test('createBooking.fulfilled', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
        };

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: createBooking.fulfilled.type },
        )).toEqual({
            isLoading: false,
        });
    });

    test('createBooking.rejected', () => {
        const state: DeepPartial<BookingSchema> = {
            isLoading: true,
            errors: [],
        };
        const error = BookingError.SERVER_ERROR;

        expect(bookingSlice.reducer(
            state as BookingSchema,
            { type: createBooking.rejected.type, payload: error },
        )).toEqual({
            isLoading: false,
            errors: error,
        });
    });
});
