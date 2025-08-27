import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/App';

// Mock the crypto service
jest.mock('@services/cryptoService', () => ({
  generateKeyPair: jest.fn(),
  signMessage: jest.fn(),
  verifySignature: jest.fn(),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div data-testid="route">{element}</div>,
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Just check that the app renders without throwing an error
    expect(document.body).toBeInTheDocument();
  });
});
