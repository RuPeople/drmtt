import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { Text } from 'shared/ui/Text';

import cls from './SuccessBookingModal.module.scss';

export interface SuccessBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessBookingModal = memo(({ isOpen, onClose }: SuccessBookingModalProps) => {
    const { t } = useTranslation('bookingForm');
    const navigate = useNavigate();

    const handleOnButtonClick = useCallback(() => {
        navigate(RoutePath.bookings);
    }, [navigate]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
            <div className={cls.SuccessBookingModal}>
                <Text className={cls.title} as="h2">{t('SuccessBookingModal.Title')}</Text>
                <Button onClick={handleOnButtonClick}>{t('SuccessBookingModal.Button')}</Button>
            </div>
        </Modal>
    );
});

export default SuccessBookingModal;
