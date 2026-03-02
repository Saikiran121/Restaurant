import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);

        // Test that the layout wrapper with 'layout-container' is rendered
        // Or that Staff and Admin buttons are rendered
        expect(screen.getByText('Staff')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
    });
});
