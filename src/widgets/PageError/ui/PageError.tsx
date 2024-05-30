import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';

import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string
}

export const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation('pageError');

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <h1 className={classNames(cls.title)}>{t('Uncaught error')}</h1>
            <Button onClick={reloadPage}>
                {t('Reload page')}
            </Button>
        </div>
    );
});
