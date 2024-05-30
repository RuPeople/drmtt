import { City } from 'entities/Booking';
import { memo, useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import LogoIcon from 'shared/assets/icons/logo.svg';
import LogoTextIcon from 'shared/assets/icons/logoText.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { clearPhoneNumber } from 'shared/lib/helpers/clearPhoneNumber';
import { useAppDispatch } from 'shared/lib/store/useAppDispatch';
import { Button, ButtonBorderRadius } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { PhoneInput } from 'shared/ui/PhoneInput';
import { Text, TextTheme } from 'shared/ui/Text';

import { getBookingIsLoading } from '../../model/selectors/getBookingIsLoading/getBookingIsLoading';
import { createBooking } from '../../model/services/createBooking/createBooking';
import { bookingReducer } from '../../model/slice/bookingSlice';
import CitySelect from '../CitySelect/CitySelect';
import DateSelect from '../DateSelect/DateSelect';
import SelectedCity from '../SelectedCity/SelectedCity';
import TimeSelect from '../TimeSelect/TimeSelect';
import cls from './BookingForm.module.scss';

export interface BookingFormProps {
    className?: string;
    onSuccess?: () => void;
}

interface FormValues {
    selectedCity: City | null;
    selectedDate: string;
    selectedTime: string;
    phoneNumber: string;
    name: string;
}

const initialReducers: ReducersList = {
    booking: bookingReducer,
};

const BookingForm = memo(({ className, onSuccess }: BookingFormProps) => {
    const { t } = useTranslation('bookingForm');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getBookingIsLoading);

    const methods = useForm<FormValues>({
        defaultValues: {
            selectedCity: null,
            selectedDate: '',
            selectedTime: '',
            phoneNumber: '',
            name: '',
        },
    });

    const onSubmit = methods.handleSubmit(async (data) => {
        const {
            selectedTime, selectedDate, selectedCity, phoneNumber, name,
        } = data;

        const result = await dispatch(createBooking({
            cityId: selectedCity?.id || '',
            date: selectedDate,
            time: selectedTime,
            phoneNumber: clearPhoneNumber(phoneNumber),
            name,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            methods.reset();
            onSuccess?.();
        }
    });

    const logo = useMemo(() => (
        <div className={cls.logoWrapper}>
            {isLoading ? <Loader /> : <LogoIcon />}
            <LogoTextIcon />
        </div>
    ), [isLoading]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <FormProvider {...methods}>
                <form
                    className={classNames(cls.BookingForm, {}, [className])}
                    onSubmit={onSubmit}
                >
                    {logo}
                    <Text as="h2" className={cls.title}>{t('Title')}</Text>
                    <div className={cls.inputsWrapper}>
                        <CitySelect disabled={isLoading} />
                        <SelectedCity selectedCity={methods.watch('selectedCity')} />
                        <div className={cls.dateTimeInputsWrapper}>
                            <DateSelect disabled={isLoading} />
                            <TimeSelect disabled={isLoading} />
                        </div>
                        {(methods.formState.errors.selectedDate || methods.formState.errors.selectedTime) && (
                            <Text theme={TextTheme.DANGER}>
                                {methods.formState.errors.selectedDate?.message
                                    || methods.formState.errors.selectedTime?.message}
                            </Text>
                        )}
                        <Controller
                            name="phoneNumber"
                            control={methods.control}
                            rules={{
                                required: t('PhoneRequiredError'),
                                pattern: {
                                    value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                                    message: t('PhoneInvalidError'),
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <PhoneInput
                                        {...field}
                                        autoComplete="phone"
                                        disabled={isLoading}
                                        onBlur={() => methods.trigger('phoneNumber')}
                                        error={Boolean(fieldState.error)}
                                    />
                                    {fieldState.error && (
                                        <Text theme={TextTheme.DANGER}>{fieldState.error.message}</Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="name"
                            control={methods.control}
                            rules={{ required: t('NameRequiredError') }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        {...field}
                                        autoComplete="name"
                                        placeholder={t('NameInputPlaceholder')}
                                        disabled={isLoading}
                                        onBlur={() => methods.trigger('name')}
                                        error={Boolean(fieldState.error)}
                                    />
                                    {fieldState.error && (
                                        <Text theme={TextTheme.DANGER}>{fieldState.error.message}</Text>
                                    )}
                                </>
                            )}
                        />
                    </div>
                    <Button
                        className={cls.submitButton}
                        type="submit"
                        disabled={isLoading}
                        borderRadius={ButtonBorderRadius.ROUND_L}
                    >
                        {t('SubmitButtonTitle')}
                    </Button>
                </form>
            </FormProvider>
        </DynamicModuleLoader>
    );
});

export default BookingForm;
