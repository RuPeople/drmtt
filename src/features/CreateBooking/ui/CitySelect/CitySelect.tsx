import { StateSchema } from 'app/providers/StoreProvider';
import { City } from 'entities/Booking';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/store/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select';
import { Text, TextTheme } from 'shared/ui/Text';

import { getBookingCities } from '../../model/selectors/getBookingCities/getBookingCities';
import { fetchBookingDates } from '../../model/services/fetchBookingDates/fetchBookingDates';
import { fetchCities } from '../../model/services/fetchCities/fetchCities';
import { bookingActions } from '../../model/slice/bookingSlice';

const DEFAULT_CITY_ID = 'd2bac15d-fdf0-4983-8b95-8a111f5b2232';

const CitySelect = ({ disabled }: { disabled: boolean }) => {
    const { t } = useTranslation('bookingForm');
    const dispatch = useAppDispatch();
    const cities = useSelector((state: StateSchema) => getBookingCities(state));
    const { control, setValue, trigger } = useFormContext();

    useEffect(() => {
        dispatch(fetchCities());
        return () => {
            dispatch(bookingActions.clearErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        if (cities.length > 0) {
            const defaultCity = cities.find((city) => city.id === DEFAULT_CITY_ID);

            if (defaultCity) {
                setValue('selectedCity', defaultCity);
                dispatch(fetchBookingDates({ cityId: defaultCity.id }));
            }
        }
    }, [cities, dispatch, setValue]);

    const citiesOptions: SelectOption<City>[] = useMemo(() => {
        return cities.map((city) => ({
            id: city.id,
            value: city,
            content: city.name,
        }));
    }, [cities]);

    const handleOnCityChange = useCallback((value: City) => {
        setValue('selectedCity', value);
        dispatch(fetchBookingDates({ cityId: value.id }));
        setValue('selectedDate', '');
        setValue('selectedTime', '');
    }, [dispatch, setValue]);

    return (
        <Controller
            name="selectedCity"
            control={control}
            rules={{ required: t('CityRequiredError') }}
            render={({ field, fieldState }) => (
                <>
                    <Select<City>
                        options={citiesOptions}
                        placeholder={t('CitySelectPlaceholder')}
                        onChange={(option) => handleOnCityChange(option.value)}
                        onBlur={() => trigger('selectedCity')}
                        value={field.value || undefined}
                        disabled={disabled}
                        error={Boolean(fieldState.error)}
                    />
                    {fieldState.error && <Text theme={TextTheme.DANGER}>{fieldState.error.message}</Text>}
                </>
            )}
        />
    );
};

export default CitySelect;
