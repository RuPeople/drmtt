import dayjs from 'dayjs';

export const loadLocale = async (locale: string) => {
    switch (locale) {
        case 'ru':
            await import('dayjs/locale/ru');
            dayjs.locale('ru');
            break;
        case 'en':
        default:
            await import('dayjs/locale/en');
            dayjs.locale('en');
            break;
    }
};
