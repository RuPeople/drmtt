import { render, screen } from '@testing-library/react';
import { Modal } from 'shared/ui/Modal/Modal';

describe('Modal', () => {
    test('Test render', () => {
        render(<Modal isOpen>TEST</Modal>);
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
});
