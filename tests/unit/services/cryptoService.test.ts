import { describe, it, expect } from '@jest/globals';
import { generateKeyPair, signMessage, verifySignature } from '../../../src/services/cryptoService';

describe('Crypto Service', () => {
    it('should generate a key pair', async () => {
        const keyPair = await generateKeyPair();
        expect(keyPair).toHaveProperty('publicKey');
        expect(keyPair).toHaveProperty('privateKey');
    });

    it('should sign a message', async () => {
        const keyPair = await generateKeyPair();
        const message = 'Hello, World!';
        const signature = await signMessage(message, keyPair.privateKey);
        expect(signature).toBeDefined();
    });

    it('should verify a signature', async () => {
        const keyPair = await generateKeyPair();
        const message = 'Hello, World!';
        const signature = await signMessage(message, keyPair.privateKey);
        const result = await verifySignature(message, signature.signature, keyPair.publicKey);
        expect(result.isValid).toBe(true);
    });

    it('should return false for an invalid signature', async () => {
        const keyPair = await generateKeyPair();
        const message = 'Hello, World!';
        const invalidSignature = 'invalid_signature';
        const result = await verifySignature(message, invalidSignature, keyPair.publicKey);
        expect(result.isValid).toBe(false);
    });
});