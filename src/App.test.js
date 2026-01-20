import { render, screen } from '@testing-library/react';
import App from './App';
import siteConfig from './siteConfig';

test('renders app component without crashing', () => {
    render(<App />);
});

test('renders hero section with name from siteConfig', () => {
    render(<App />);
    const nameElement = screen.getByText(siteConfig.personal.name);
    expect(nameElement).toBeInTheDocument();
});

test('renders status badge', () => {
    render(<App />);
    const statusElement = screen.getByText(/Got room for your project/i);
    expect(statusElement).toBeInTheDocument();
});

test('siteConfig object has required properties', () => {
    expect(siteConfig).toHaveProperty('personal.name');
    expect(siteConfig).toHaveProperty('personal.role');
    expect(siteConfig.personal.name).toBeTruthy();
    expect(siteConfig.personal.role).toBeTruthy();
});
