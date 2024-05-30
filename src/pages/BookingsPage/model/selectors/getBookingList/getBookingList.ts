import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingList = (state: StateSchema) => {
    return state?.bookingsPage?.bookings || [];
};
