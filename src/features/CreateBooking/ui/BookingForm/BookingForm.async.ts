import { FC, lazy } from 'react';

import { BookingFormProps } from './BookingForm';

export const BookingFormAsync = lazy <FC<BookingFormProps>>(() => import('./BookingForm'));
