import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingErrors = (state: StateSchema) => {
    return state?.booking?.errors || [];
};
