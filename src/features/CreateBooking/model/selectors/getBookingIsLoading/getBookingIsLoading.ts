import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingIsLoading = (state: StateSchema) => {
    return state?.booking?.isLoading || false;
};
