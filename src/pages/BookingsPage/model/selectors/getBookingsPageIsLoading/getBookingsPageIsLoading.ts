import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingsPageIsLoading = (state: StateSchema) => {
    return state?.bookingsPage?.isLoading || false;
};
