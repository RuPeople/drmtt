import React, {
KeyboardEventHandler,
    memo, useEffect, useMemo, useRef, useState,
} from 'react';
import ArrowIcon from 'shared/assets/icons/arrow-right.svg';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import useClickOutside from 'shared/lib/hooks/useClickOutside';

import cls from './Select.module.scss';

export interface SelectOption<T> {
    id: number | string;
    value: T;
    content: string;
}

export interface SelectProps<V> {
    className?: string;
    options: SelectOption<V>[];
    onChange: (value: SelectOption<V>) => void;
    value?: V;
    placeholder?: string | null;
    readonly?: boolean;
    disabled?: boolean;
    error?: boolean;
    onBlur?: () => void;
}

const areValuesEqual = <
    V,
>(val1: V, val2: V): boolean => {
    if (typeof val1 !== typeof val2) return false;
    if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
        return JSON.stringify(val1) === JSON.stringify(val2);
    }
    return val1 === val2;
};

export const SelectComponent = <
    V,
>(props: SelectProps<V>) => {
    const {
        className,
        options,
        value,
        onChange,
        placeholder,
        disabled = false,
        readonly = false,
        error = false,
        onBlur,
    } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

    useClickOutside(selectRef, () => {
        setIsOpened(false);
        setFocusedOptionIndex(-1);
        if (onBlur) {
            onBlur();
        }
    }, isOpened);

    useEffect(() => {
        if (isOpened && focusedOptionIndex >= 0 && optionRefs.current[focusedOptionIndex]) {
            optionRefs.current[focusedOptionIndex]?.focus();
        }
    }, [isOpened, focusedOptionIndex]);

    const optionsList = useMemo(() => {
        const handleOnSelectOption = (option: SelectOption<V>) => {
            onChange?.(option);
            setIsOpened(false);
            setFocusedOptionIndex(-1);
            buttonRef.current?.focus();
            onBlur?.();
        };

        const handleOptionKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number, option: SelectOption<V>) => {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    onChange?.(option);
                    setIsOpened(false);
                    setFocusedOptionIndex(-1);
                    buttonRef.current?.focus();
                    onBlur?.();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (index < options.length - 1) {
                        setFocusedOptionIndex(index + 1);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (index > 0) {
                        setFocusedOptionIndex(index - 1);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpened(false);
                    setFocusedOptionIndex(-1);
                    buttonRef.current?.focus();
                    onBlur?.();
                    break;
                default:
                    break;
            }
        };

        return options.map((option, index) => (
            <li
                className={cls.option}
                key={option.id}
                onClick={() => handleOnSelectOption(option)}
                role="option"
                tabIndex={-1}
                ref={(el) => { optionRefs.current[index] = el; }}
                onKeyDown={(e) => handleOptionKeyDown(e, index, option)}
                aria-selected={value === option.value}
            >
                {option.content}
            </li>
        ));
    }, [options, onChange, onBlur, value]);

    const handleButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        switch (e.key) {
            case 'Enter':
            case 'ArrowDown':
                e.preventDefault();
                setIsOpened(true);
                setFocusedOptionIndex(0);
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpened(false);
                setFocusedOptionIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleOnSelectClick = () => {
        setIsOpened(!isOpened);
        setFocusedOptionIndex(0);
    };

    const selectMods: Mods = {
        [cls.disabled]: disabled,
        [cls.readonly]: readonly,
        [cls.error]: error,
    };

    const placeholderMods: Mods = {
        [cls.error]: error,
    };

    const wrapperMods: Mods = {
        [cls.disabled]: disabled,
    };

    const iconMods: Mods = {
        [cls.opened]: isOpened,
    };

    return (
        <div ref={selectRef} className={classNames(cls.Select, wrapperMods, [className])}>
            <button
                ref={buttonRef}
                className={classNames(cls.button, selectMods, [])}
                type="button"
                onClick={handleOnSelectClick}
                onKeyDown={handleButtonKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpened}
                aria-labelledby="select-label"
                disabled={disabled || readonly}
            >
                {!value && placeholder && (
                    <span className={classNames(cls.placeholder, placeholderMods)}>{placeholder}</span>
                )}
                {value && (
                    <span className={cls.value}>
                        {options.find((option) => areValuesEqual(option.value, value))?.content
                            || JSON.stringify(value)}
                    </span>
                )}
                <ArrowIcon className={classNames(cls.icon, iconMods)} />
            </button>
            {isOpened && options.length > 0 && (
                <ul className={cls.optionList} role="listbox">
                    {optionsList}
                </ul>
            )}
        </div>
    );
};

export const Select = memo(SelectComponent) as typeof SelectComponent;
