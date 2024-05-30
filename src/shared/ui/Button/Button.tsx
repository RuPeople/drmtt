import React, {
    ButtonHTMLAttributes, memo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export enum ThemeButton {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINE = 'outline',
    OUTLINE_SECONDARY = 'outlineSecondary',
    CLEAR = 'clear',
}

export enum ButtonBorderRadius {
    ROUND_M = 'round_m',
    ROUND_L = 'round_l',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    borderRadius?: ButtonBorderRadius;
    disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        borderRadius = ButtonBorderRadius.ROUND_M,
        disabled = false,
        ...restProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[borderRadius]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
});
