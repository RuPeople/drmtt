import { memo } from 'react';
import { Link as BaseLink, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Link.module.scss';

export enum LinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    NAKED = 'naked',
}

interface AppLinkProps extends LinkProps {
    className?: string,
    theme?: LinkTheme
}

export const Link = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        theme = LinkTheme.PRIMARY,
        children,
        ...otherProps
    } = props;

    return (
        <BaseLink
            to={to}
            className={classNames(cls.Link, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </BaseLink>
    );
});
