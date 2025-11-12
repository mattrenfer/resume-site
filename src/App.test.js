import { render, screen } from '@testing-library/react';
import App from './App';
import resumeData from './resumeData';

test('renders app component without crashing', () => {
    render(<App />);
});

test('renders hero section with name from resumeData', () => {
    render(<App />);
    const nameElement = screen.getByText(resumeData.name);
    expect(nameElement).toBeInTheDocument();
});

test('renders hero section with role from resumeData', () => {
    render(<App />);
    const roleElement = screen.getByText(resumeData.role);
    expect(roleElement).toBeInTheDocument();
});

// test('renders navigation menu', () => {
//     render(<App />);
//     const homeLink = screen.getAllByText(/home/i);
//     const aboutLink = screen.getAllByText(/about/i);
//     const resumeLink = screen.getAllByText(/resume/i);
//     const portfolioLink = screen.getAllByText(/portfolio/i);
//     expect(homeLink).toBeInTheDocument();
//     expect(aboutLink).toBeInTheDocument();
//     expect(resumeLink).toBeInTheDocument();
//     expect(portfolioLink).toBeInTheDocument();
// });

test('resumeData object has required properties', () => {
    expect(resumeData).toHaveProperty('name');
    expect(resumeData).toHaveProperty('role');
    expect(resumeData.name).toBeTruthy();
    expect(resumeData.role).toBeTruthy();
});
