import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/shared/Modal';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
    const mockOnClose = jest.fn();
    const defaultProps = {
        isOpen: true,
        onClose: mockOnClose,
        title: 'Test Modal',
        children: <div>Modal Content</div>
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully when open', () => {
        render(<Modal {...defaultProps} />);

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(<Modal {...defaultProps} isOpen={false} />);

        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(<Modal {...defaultProps} />);

        // Find the close button by looking for the button element
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
