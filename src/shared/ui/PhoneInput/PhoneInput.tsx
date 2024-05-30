import {
ForwardedRef, forwardRef,
memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { clearPhoneNumber } from 'shared/lib/helpers/clearPhoneNumber';

import { Input, InputProps } from '../Input/Input';

interface PhoneInputProps extends InputProps {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
}

const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    let formatted = '+7 (';
    if (cleaned.length > 1) {
        formatted += cleaned.slice(1, 4);
    }
    if (cleaned.length >= 4) {
        formatted += `) ${cleaned.slice(4, 7)}`;
    }
    if (cleaned.length >= 7) {
        formatted += `-${cleaned.slice(7, 9)}`;
    }
    if (cleaned.length >= 9) {
        formatted += `-${cleaned.slice(9, 11)}`;
    }

    return formatted;
};

export const PhoneInputComponent = (props: PhoneInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
        value, onChange, onBlur, disabled, ...restProps
    } = props;
    const [internalValue, setInternalValue] = useState(value || '');

    useEffect(() => {
        setInternalValue(value || '');
    }, [value]);

    const hasFocused = useRef(false);

    const handleInputChange = useCallback((inputValue: string) => {
        let rawValue = clearPhoneNumber(inputValue);
        const isBackspace = (internalValue.length) > inputValue.length;

        if (isBackspace) {
            rawValue = rawValue.slice(0, -1);
        }

        const formattedPhoneNumber = formatPhoneNumber(rawValue);

        setInternalValue(formattedPhoneNumber);
        onChange(formattedPhoneNumber);
    }, [internalValue, onChange]);

    const handleFocus = useCallback(() => {
        if (!hasFocused.current) {
            hasFocused.current = true;
        }
        if (internalValue === '' || internalValue === '+7 (') {
            setInternalValue('+7 (');
        }
    }, [internalValue]);

    const handleBlur = useCallback(() => {
        if (internalValue === '+7 (') {
            setInternalValue('');
        }
        onBlur?.();
    }, [internalValue, onBlur]);

    return (
        <Input
            ref={ref}
            value={internalValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder="+7 (___) ___-__-__"
            {...restProps}
        />
    );
};

export const PhoneInput = memo(forwardRef(PhoneInputComponent));
