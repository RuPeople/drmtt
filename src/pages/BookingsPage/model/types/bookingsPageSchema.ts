import { Booking } from 'entities/Booking';

export enum BookingPageError {
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface BookingsPageSchema {
    bookings?: Booking[]
    isLoading?: boolean;
    errors?: BookingPageError[];
}
