import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingDates = (state: StateSchema) => {
    return state?.booking?.bookingDates || {};
};
