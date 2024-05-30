import { City } from 'entities/Booking';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { formatPhoneNumber } from 'shared/lib/helpers/formatPhoneNumber';
import { formatPrice } from 'shared/lib/helpers/formatPrice';
import { Link } from 'shared/ui/Link';
import { Skeleton } from 'shared/ui/Skeleton';
import { Text } from 'shared/ui/Text';

import cls from './SelectedCity.module.scss';

export interface SelectedCityProps {
    className?: string;
    selectedCity?: City | null;
}

const SelectedCity = memo(({ selectedCity, className }: SelectedCityProps) => {
    const { t } = useTranslation('bookingForm');

    if (!selectedCity) {
        return (
            <div className={classNames(cls.SelectedCity, {}, [className])}>
                <Skeleton height={24} />
                <Skeleton height={24} />
                <Skeleton height={24} />
            </div>
        );
    }

    return (
        <div className={cls.SelectedCity}>
            <Text>{selectedCity.address}</Text>
            <div className={cls.phonesWrapper}>
                {selectedCity.phones.map((cityPhone, index) => (
                    <Fragment key={cityPhone}>
                        <Link to={`tel:${cityPhone}`}>
                            {formatPhoneNumber(cityPhone)}
                        </Link>
                        {index !== selectedCity.phones.length - 1 && (
                            <>
                                ,
                                {' '}
                            </>
                        )}
                    </Fragment>
                ))}
            </div>
            <Text>
                {t('SelectedCity.PriceTitle')}
                {' '}
                {formatPrice(selectedCity.price)}
            </Text>
        </div>
    );
});

export default SelectedCity;
