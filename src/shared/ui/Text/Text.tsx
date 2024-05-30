import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

interface TextProps {
    className?: string;
    as?: keyof Pick<
        JSX.IntrinsicElements,
        'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p'
    >;
    children?: ReactNode;
    theme?: TextTheme;
}

export enum TextTheme {
    PRIMARY = 'primary',
    DANGER = 'danger',
}

export const Text = memo((props: TextProps) => {
    const {
        className, as: ElementType = 'p', children, theme = TextTheme.PRIMARY,
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
    };

    return (
        <ElementType className={classNames(cls.Text, mods, [className])}>
            {children}
        </ElementType>
    );
});
