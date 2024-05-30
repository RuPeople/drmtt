import { BookingsPage } from 'pages/BookingsPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
    isAuthOnly?: boolean;
};

export enum Routes {
    MAIN = 'main',
    BOOKINGS = 'bookings',

    // KEEP LAST
    NOT_FOUND = 'notFound',
}

export const RoutePath: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.BOOKINGS]: '/orders',
    [Routes.NOT_FOUND]: '*',
};

export const routeConfig: Record<Routes, AppRouteProps> = {
    [Routes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [Routes.BOOKINGS]: {
        path: RoutePath.bookings,
        element: <BookingsPage />,
    },
    [Routes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFoundPage />,
    },
};
