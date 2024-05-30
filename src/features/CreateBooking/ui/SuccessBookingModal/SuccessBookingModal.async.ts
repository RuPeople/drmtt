import { FC, lazy } from 'react';

import { SuccessBookingModalProps } from './SuccessBookingModal';

export const SuccessBookingModalAsync = lazy <FC<SuccessBookingModalProps>>(() => import('./SuccessBookingModal'));
