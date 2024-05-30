import { Booking, BookingList } from 'entities/Booking';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/store/useAppDispatch';

import { getBookingList } from '../model/selectors/getBookingList/getBookingList';
import { getBookingsPageIsLoading } from '../model/selectors/getBookingsPageIsLoading/getBookingsPageIsLoading';
import { deleteBooking } from '../model/services/deleteBooking/deleteBooking';
import { fetchBookingList } from '../model/services/fetchBookingList/fetchBookingList';
import { bookingsPageReducer } from '../model/slices/bookingsPageSlice';
import cls from './BookingsPage.module.scss';

const reducers: ReducersList = {
    bookingsPage: bookingsPageReducer,
};

const BookingsPage = memo(() => {
    const dispatch = useAppDispatch();
    const bookings = useSelector(getBookingList);
    const isLoading = useSelector(getBookingsPageIsLoading);

    useEffect(() => {
        dispatch(fetchBookingList());
    }, [dispatch]);

    const handleDelete = useCallback(async (id: Booking['id']) => {
        dispatch(deleteBooking(id));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={cls.BookingsPage}>
                <BookingList
                    bookingList={bookings}
                    isLoading={isLoading}
                    className={cls.bookingList}
                    onDelete={handleDelete}
                />
            </div>
        </DynamicModuleLoader>
    );
});

export default BookingsPage;
