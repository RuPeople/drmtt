import { StateSchema } from 'app/providers/StoreProvider';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Select, SelectOption } from 'shared/ui/Select';

import { getBookingDates } from '../../model/selectors/getBookingDates/getBookingDates';

const DateSelect = ({ disabled }: { disabled: boolean }) => {
    const { t } = useTranslation('bookingForm');
    const { control, setValue, trigger } = useFormContext();
    const bookingDates = useSelector((state: StateSchema) => getBookingDates(state));
    const selectedCity = useWatch({ control, name: 'selectedCity' });

    const bookingDateOptions: SelectOption<string>[] = useMemo(() => {
        return Object.keys(bookingDates).map((booking) => {
            const date = dayjs(booking);
            const formattedDate = date.format('dddd, D MMMM');

            return {
                id: booking,
                value: booking,
                content: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
            };
        });
    }, [bookingDates]);

    const handleDateChange = useCallback((option: SelectOption<string>) => {
        setValue('selectedDate', option.value);
        setValue('selectedTime', '');
    }, [setValue]);

    return (
        <Controller
            name="selectedDate"
            control={control}
            rules={{ required: t('DateRequiredError') }}
            render={({ field, fieldState }) => (
                <Select<string>
                    options={bookingDateOptions}
                    placeholder={t('DateSelectPlaceholder')}
                    onChange={handleDateChange}
                    onBlur={() => trigger('selectedDate')}
                    value={field.value}
                    disabled={disabled || !selectedCity}
                    error={Boolean(fieldState.error)}
                />
            )}
        />
    );
};

export default DateSelect;
