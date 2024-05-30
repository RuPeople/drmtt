import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingCities = (state: StateSchema) => {
    return state?.booking?.cities || [];
};
