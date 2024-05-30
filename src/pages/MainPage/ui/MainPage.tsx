import { BookingFormAsync, SuccessBookingModalAsync } from 'features/CreateBooking';
import {
 memo, Suspense, useCallback, useState,
} from 'react';
import { Loader } from 'shared/ui/Loader';

import cls from './MainPage.module.scss';

const MainPage = memo(() => {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleModalClose = useCallback(() => {
        setIsModalOpened(false);
    }, []);

    return (
        <div className={cls.MainPage}>
            <BookingFormAsync className={cls.bookingForm} onSuccess={() => setIsModalOpened(true)} />
            <Suspense fallback={<Loader />}>
                <SuccessBookingModalAsync
                    isOpen={isModalOpened}
                    onClose={handleModalClose}
                />
            </Suspense>
        </div>
    );
});

export default MainPage;
