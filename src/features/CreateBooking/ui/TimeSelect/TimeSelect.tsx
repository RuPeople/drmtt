import { StateSchema } from 'app/providers/StoreProvider';
import { useCallback, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Select, SelectOption } from 'shared/ui/Select';

import { getBookingDates } from '../../model/selectors/getBookingDates/getBookingDates';

const TimeSelect = ({ disabled }: { disabled: boolean }) => {
    const { t } = useTranslation('bookingForm');
    const { control, setValue, trigger } = useFormContext();
    const bookingDates = useSelector((state: StateSchema) => getBookingDates(state));
    const selectedDate = useWatch({ control, name: 'selectedDate' });

    const availableTimeOptions: SelectOption<string>[] = useMemo(() => {
        if (!selectedDate || !bookingDates[selectedDate]) {
            return [];
        }
        return Object.values(bookingDates[selectedDate])
            .filter((booking: any) => !booking.isBooked)
            .map((booking: any) => ({
                id: booking.date,
                value: booking.date,
                content: `${booking.begin} - ${booking.end}`,
            }));
    }, [bookingDates, selectedDate]);

    const handleTimeChange = useCallback((option: SelectOption<string>) => {
        setValue('selectedTime', option.value);
    }, [setValue]);

    return (
        <Controller
            name="selectedTime"
            control={control}
            rules={{ required: t('TimeRequiredError') }}
            render={({ field, fieldState }) => (
                <Select<string>
                    options={availableTimeOptions}
                    placeholder={t('TimeSelectPlaceholder')}
                    onChange={handleTimeChange}
                    onBlur={() => trigger('selectedTime')}
                    value={field.value}
                    disabled={disabled || !selectedDate}
                    error={Boolean(fieldState.error)}
                />
            )}
        />
    );
};

export default TimeSelect;
