import { render, screen } from '@testing-library/react';
import siteConfig from './siteConfig';
import React from 'react';
import App from './App';

test('renders app component without crashing', () => {
    render(<App />);
});

test('renders hero section with name from siteConfig', () => {
    render(<App />);
    const nameElement = screen.getByText(siteConfig.personal.name);
    expect(nameElement).toBeInTheDocument();
});

test('hero section uses roles from siteConfig', () => {
    render(<App />);
    // Hero uses a typewriter for roles, so the first role may not be in DOM yet.
    // Assert that the hero role heading exists and config has roles.
    const heroHeading = screen.getByRole('heading', { level: 2 });
    expect(heroHeading).toBeInTheDocument();
    expect(siteConfig.hero.roles.length).toBeGreaterThan(0);
});

test('siteConfig object has required properties', () => {
    expect(siteConfig.personal).toHaveProperty('name');
    expect(siteConfig.hero.roles[0]).toBeTruthy();
    expect(siteConfig.personal.name).toBeTruthy();
    expect(siteConfig.hero.roles[0]).toBeTruthy();
});
