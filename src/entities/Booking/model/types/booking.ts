export interface City {
    id: string;
    name: string;
    address: string;
    phones: string[];
    price: number;
}

export interface BookingTimeSlot {
    day: string;
    begin: string;
    end: string;
    date: string;
    isBooked: boolean;
}

export interface BookingDate {
    [date: string]: {
        [time: string]: BookingTimeSlot;
    };
}

export interface Booking {
    id: number;
    phoneNumber: string;
    name: string;
    city: City;
    bookingSlot: BookingTimeSlot
}
