import { deleteBooking } from '../services/deleteBooking/deleteBooking';
import { fetchBookingList } from '../services/fetchBookingList/fetchBookingList';
import { BookingPageError, BookingsPageSchema } from '../types/bookingsPageSchema';
import { bookingsPageActions, bookingsPageReducer } from './bookingsPageSlice';

describe('bookingsPageSlice', () => {
    test('setErrors', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: false, errors: [] };
        const action = bookingsPageActions.setErrors([BookingPageError.SERVER_ERROR]);
        const newState = bookingsPageReducer(state, action);
        expect(newState.errors).toEqual([BookingPageError.SERVER_ERROR]);
    });

    test('clearErrors', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: false, errors: [BookingPageError.SERVER_ERROR] };
        const action = bookingsPageActions.clearErrors();
        const newState = bookingsPageReducer(state, action);
        expect(newState.errors).toEqual([]);
    });

    test('fetchBookingList pending', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: false };
        const action = fetchBookingList.pending('', undefined);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(true);
    });

    test('fetchBookingList fulfilled', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: true };
        const action = fetchBookingList.fulfilled({
 data: [
            {
                id: 1,
                name: 'Booking 1',
                phoneNumber: 'phoneNumber',
                city: {
                    id: 'id',
                    name: 'name',
                    address: 'address',
                    phones: ['phone'],
                    price: 9999,
                },
                bookingSlot: {
                    day: 'day',
                    begin: 'begin',
                    end: 'end',
                    date: 'date',
                    isBooked: false,
                },
            }],
}, '', undefined);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.bookings).toEqual([
            {
                id: 1,
                name: 'Booking 1',
                phoneNumber: 'phoneNumber',
                city: {
                    id: 'id',
                    name: 'name',
                    address: 'address',
                    phones: ['phone'],
                    price: 9999,
                },
                bookingSlot: {
                    day: 'day',
                    begin: 'begin',
                    end: 'end',
                    date: 'date',
                    isBooked: false,
                },
            },
        ]);
    });

    test('fetchBookingList rejected', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: true };
        const action = fetchBookingList.rejected(null, '', undefined, [BookingPageError.SERVER_ERROR]);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.errors).toEqual([BookingPageError.SERVER_ERROR]);
    });

    test('deleteBooking pending', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: false, errors: undefined };
        const action = deleteBooking.pending('', 1);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(true);
    });

    test('deleteBooking fulfilled', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: true };
        const action = deleteBooking.fulfilled({ message: 'Booking deleted' }, '', 1);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(false);
    });

    test('deleteBooking rejected', () => {
        const state: BookingsPageSchema = { bookings: [], isLoading: true };
        const action = deleteBooking.rejected(null, '', 1, [BookingPageError.SERVER_ERROR]);
        const newState = bookingsPageReducer(state, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.errors).toEqual([BookingPageError.SERVER_ERROR]);
    });
});
