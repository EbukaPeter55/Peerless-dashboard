import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/layout/sidebar/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
    const defaultProps = {
        collapsed: false,
        toggleCollapse: jest.fn(),
        isMobile: false,
        closeSidebar: jest.fn()
    };

    const renderSidebar = (props = {}) => {
        return render(
            <BrowserRouter>
                <Sidebar {...defaultProps} {...props} />
            </BrowserRouter>
        );
    };

    it('renders successfully', () => {
        renderSidebar();
        expect(screen.getByText('Taskify.')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Tasks')).toBeInTheDocument();
    });

    it('renders condensed view when collapsed', () => {
        renderSidebar({ collapsed: true });
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
        expect(screen.getByText('Taskify.')).toBeInTheDocument();
    });

    it('calls toggleCollapse when toggle button is clicked (desktop)', () => {
        const toggleCollapse = jest.fn();
        renderSidebar({ toggleCollapse, isMobile: false });

        const toggleBtn = screen.getByRole('button');
        fireEvent.click(toggleBtn);
        expect(toggleCollapse).toHaveBeenCalledTimes(1);
    });
});

