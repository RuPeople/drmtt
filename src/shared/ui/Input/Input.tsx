import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import {
    ForwardedRef, forwardRef, InputHTMLAttributes, memo, useEffect,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly'
>;

export interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readonly?: boolean;
    error?: boolean
}

export const InputComponent = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
        className,
        value,
        onChange,
        type,
        disabled = false,
        autoFocus = false,
        readonly = false,
        error = false,
        ...otherProps
    } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== value) {
            onChange?.(e.target.value);
        }
    };

    useEffect(() => {
        if (autoFocus) {
            (ref as React.RefObject<HTMLInputElement>).current?.focus();
        }
    }, [autoFocus, ref]);

    const inputMods: Mods = {
        [cls.disabled]: disabled,
        [cls.readonly]: readonly,
        [cls.error]: error,
    };

    return (
        <input
            ref={ref}
            className={
                classNames(cls.Input, inputMods, [className])
            }
            value={value}
            type={type}
            readOnly={readonly}
            onChange={handleOnChange}
            disabled={disabled}
            {...otherProps}
        />
    );
};

export const Input = memo(forwardRef(InputComponent));
