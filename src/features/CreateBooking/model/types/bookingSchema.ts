import { BookingDate, City } from 'entities/Booking';

export enum BookingError {
    SERVER_ERROR = 'SERVER_ERROR',
    FETCH_CITIES_SERVER_ERROR = 'FETCH_CITIES_SERVER_ERROR',
    NO_DATA = 'NO_DATA',
}

export interface BookingSchema {
    cities: City[];
    bookingDates: BookingDate;
    isLoading: boolean;
    errors?: BookingError[];
}
