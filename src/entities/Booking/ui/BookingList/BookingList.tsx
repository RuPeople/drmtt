import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import BinIcon from 'shared/assets/icons/bin.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Skeleton } from 'shared/ui/Skeleton';
import { Text } from 'shared/ui/Text';

import { Booking } from '../../model/types/booking';
import cls from './BookingList.module.scss';

interface BookingListProps {
    className?: string;
    bookingList: Booking[];
    isLoading?: boolean;
    onDelete: (id: Booking['id']) => void;
}

const getSkeletons = (itemsCount?: number) => new Array(itemsCount || 9)
        .fill(0)
        .map((value, index) => (
            <tr key={`skeleton-${index + value}`}>
                <td aria-hidden="true"><Skeleton /></td>
                <td aria-hidden="true"><Skeleton /></td>
                <td aria-hidden="true"><Skeleton /></td>
                <td aria-hidden="true"><Skeleton /></td>
                <td aria-hidden="true"><Skeleton /></td>
                <td aria-hidden="true"><Skeleton /></td>
            </tr>
        ));

export const BookingList = (props: BookingListProps) => {
    const {
        className, bookingList, isLoading, onDelete,
    } = props;
    const { t } = useTranslation('bookingList');

    if (!isLoading && !bookingList.length) {
        return (
            <div
                className={classNames(cls.BookingList, {}, [
                    className,
                ])}
            >
                <Text>{t('Empty')}</Text>
            </div>
        );
    }

    return (
        <div className={classNames(cls.BookingList, {}, [className])}>
            <table className={cls.table}>
                <thead>
                    <tr>
                        <th className={classNames(cls.cell, {}, [cls.header])}>
                            {t('City')}
                        </th>
                        <th className={classNames(cls.cell, {}, [cls.header])}>
                            {t('Date')}
                        </th>
                        <th className={classNames(cls.cell, {}, [cls.header])}>
                            {t('Time')}
                        </th>
                        <th className={classNames(cls.cell, {}, [cls.header])}>
                            {t('Phone')}
                        </th>
                        <th className={classNames(cls.cell, {}, [cls.header])}>
                            {t('Name')}
                        </th>
                        <th className={classNames(cls.cell, {}, [cls.header])} aria-hidden="true" />
                    </tr>
                </thead>
                <tbody>
                {!isLoading && bookingList.map((booking) => (
                    <tr key={booking.id}>
                        <td className={cls.cell}>{booking.city.name}</td>
                        <td className={cls.cell}>{dayjs(booking.bookingSlot.date).format('dddd, D MMMM')}</td>
                        <td className={cls.cell}>
                            {booking.bookingSlot.begin}
                            {' '}
                            -
                            {' '}
                            {booking.bookingSlot.end}
                        </td>
                        <td className={cls.cell}>{booking.phoneNumber}</td>
                        <td className={cls.cell}>{booking.name}</td>
                        <td className={cls.cell}>
                            <Button
                                theme={ThemeButton.CLEAR}
                                className={cls.button}
                                onClick={() => onDelete(booking.id)}
                                aria-label={t('DeleteBooking')}
                            >
                                <BinIcon className={cls.icon} />
                            </Button>
                        </td>
                    </tr>
                ))}
                {isLoading && getSkeletons(bookingList.length)}
                </tbody>
            </table>
        </div>
    );
};
