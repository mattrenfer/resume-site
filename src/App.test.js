import { render, screen } from '@testing-library/react';
import App from './App';
import siteConfig from './siteConfig';

test('renders app component without crashing', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />);
});

test('renders hero section with name from siteConfig', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />);
    const nameElement = screen.getByText(siteConfig.personal.name);
    expect(nameElement).toBeInTheDocument();
});

test('siteConfig object has required properties', () => {
    expect(siteConfig).toHaveProperty('personal.name');
    expect(siteConfig).toHaveProperty('personal.role');
    expect(siteConfig.personal.name).toBeTruthy();
    expect(siteConfig.personal.role).toBeTruthy();
});
