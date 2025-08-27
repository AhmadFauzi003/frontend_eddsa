import '@testing-library/jest-dom';

// Add TextEncoder/TextDecoder to global scope for Node.js testing
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock crypto API for testing
const mockCrypto = {
  getRandomValues: jest.fn(() => new Uint8Array(32)),
  subtle: {
    generateKey: jest.fn(),
    sign: jest.fn(),
    verify: jest.fn(),
    digest: jest.fn(),
  },
  web: {
    subtle: {
      digest: jest.fn(),
    },
  },
};

Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
});

// Mock @noble/ed25519 for testing
jest.mock('@noble/ed25519', () => ({
  utils: {
    randomPrivateKey: () => new Uint8Array(32).fill(1),
    sha512Sync: jest.fn(),
    sha512: jest.fn().mockResolvedValue(new Uint8Array(64)),
  },
  getPublicKey: jest.fn().mockResolvedValue(new Uint8Array(32).fill(2)),
  sign: jest.fn().mockResolvedValue(new Uint8Array(64).fill(3)),
  verify: jest.fn().mockResolvedValue(true),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Silence console.error in tests unless it's an actual error
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
