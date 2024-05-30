import 'dayjs/locale/ru';
import 'dayjs/locale/en';

import { AppRouter } from 'app/providers/router';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import { useTheme } from './providers/ThemeProvider';

dayjs.locale('ru');

function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
