import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
    const { t } = useTranslation('notFound');

    return (
        <div className={classNames(cls.NotFoundPage)}>
            {t('Not found')}
        </div>
    );
});

export default NotFoundPage;
