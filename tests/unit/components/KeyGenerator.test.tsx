import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import KeyGenerator from '../../../src/components/KeyManagement/KeyGenerator';
import * as cryptoService from '../../../src/services/cryptoService';

// Mock the crypto service
jest.mock('../../../src/services/cryptoService', () => ({
  generateKeyPair: jest.fn().mockResolvedValue({
    publicKey: 'mockPublicKey',
    privateKey: 'mockPrivateKey',
    keyId: 'mockKeyId',
    algorithm: 'Ed25519',
    createdAt: new Date(),
  }),
}));

describe('KeyGenerator Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders KeyGenerator component', () => {
        render(<KeyGenerator onKeyGenerated={() => {}} />);
        expect(screen.getByRole('button', { name: /generate key pair/i })).toBeInTheDocument();
    });

    test('calls generateKeyPair to generate a key', async () => {
        render(<KeyGenerator onKeyGenerated={() => {}} />);
        const generateButton = screen.getByRole('button', { name: /generate key pair/i });
        
        await act(async () => {
            fireEvent.click(generateButton);
        });
        
        expect(cryptoService.generateKeyPair).toHaveBeenCalled();
    });

    test('displays generated key', async () => {
        (cryptoService.generateKeyPair as jest.Mock).mockResolvedValue({
            publicKey: 'mockGeneratedPublicKey',
            privateKey: 'mockGeneratedPrivateKey',
            createdAt: new Date('2023-01-01T00:00:00.000Z')
        });

        render(<KeyGenerator onKeyGenerated={() => {}} />);
        const generateButton = screen.getByRole('button', { name: /generate key pair/i });
        
        await act(async () => {
            fireEvent.click(generateButton);
        });
        
        const keyDisplay = await screen.findByText(/mockGeneratedPublicKey/);
        expect(keyDisplay).toBeInTheDocument();
    });

    test('handles error when key generation fails', async () => {
        (cryptoService.generateKeyPair as jest.Mock).mockRejectedValue(new Error('Generation failed'));

        render(<KeyGenerator onKeyGenerated={() => {}} />);
        const generateButton = screen.getByRole('button', { name: /generate key pair/i });
        
        await act(async () => {
            fireEvent.click(generateButton);
        });
        
        const errorMessage = await screen.findByText(/Generation failed/i);
        expect(errorMessage).toBeInTheDocument();
    });
});