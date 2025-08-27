import * as ed25519 from '@noble/ed25519';
import {
  KeyPair,
  Signature,
  VerificationResult,
  StoredKey,
} from '../types/crypto.types';

// Simple in-memory storage for demo purposes
// In a real app, this would be in localStorage or a proper storage system
let storedKeys: StoredKey[] = [];

/**
 * Generate a new Ed25519 key pair
 */
export const generateKeyPair = async (): Promise<KeyPair> => {
  try {
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = await ed25519.getPublicKey(privateKey);

    const keyPair: KeyPair = {
      publicKey: bytesToHex(publicKey),
      privateKey: bytesToHex(privateKey),
      keyId: generateKeyId(),
      algorithm: 'Ed25519',
      createdAt: new Date(),
    };

    // Store the key for later retrieval
    const storedKey: StoredKey = {
      keyId: keyPair.keyId,
      publicKey: keyPair.publicKey,
      createdAt: keyPair.createdAt,
      isImported: false,
    };
    storedKeys.push(storedKey);

    return keyPair;
  } catch (error) {
    throw new Error(
      `Failed to generate key pair: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Get all stored keys
 */
export const getKeys = async (): Promise<StoredKey[]> => {
  return [...storedKeys];
};

/**
 * Sign a message using Ed25519 private key
 */
export const signMessage = async (
  message: string,
  privateKeyHex: string
): Promise<Signature> => {
  try {
    validatePrivateKey(privateKeyHex);

    const privateKey = hexToBytes(privateKeyHex);
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = await ed25519.sign(messageBytes, privateKey);

    const publicKey = await ed25519.getPublicKey(privateKey);

    return {
      id: generateSignatureId(),
      message,
      signature: bytesToHex(signatureBytes),
      publicKey: bytesToHex(publicKey),
      timestamp: new Date(),
      verified: false,
    };
  } catch (error) {
    throw new Error(
      `Failed to sign message: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Verify a signature against a message and public key
 */
export const verifySignature = async (
  message: string,
  signatureHex: string,
  publicKeyHex: string
): Promise<VerificationResult> => {
  try {
    validatePublicKey(publicKeyHex);
    validateSignature(signatureHex);

    const signature = hexToBytes(signatureHex);
    const publicKey = hexToBytes(publicKeyHex);
    const messageBytes = new TextEncoder().encode(message);

    const isValid = await ed25519.verify(signature, messageBytes, publicKey);

    return {
      isValid,
      message: isValid ? 'Signature is valid' : 'Signature is invalid',
    };
  } catch (error) {
    return {
      isValid: false,
      message: `Verification failed: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    };
  }
};

/**
 * Create a signature for a given data and private key
 */
export const createSignature = async (
  data: string,
  privateKeyHex: string
): Promise<Signature> => {
  return signMessage(data, privateKeyHex);
};

/**
 * Batch sign multiple messages
 */
export const batchSignMessages = async (
  messages: string[],
  privateKeyHex: string
): Promise<Signature[]> => {
  try {
    validatePrivateKey(privateKeyHex);

    const signatures = await Promise.all(
      messages.map((message) => signMessage(message, privateKeyHex))
    );

    return signatures;
  } catch (error) {
    throw new Error(
      `Failed to batch sign messages: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Batch verify multiple signatures
 */
export const batchVerifySignatures = async (
  verificationRequests: Array<{
    message: string;
    signature: string;
    publicKey: string;
  }>
): Promise<VerificationResult[]> => {
  try {
    const results = await Promise.all(
      verificationRequests.map(({ message, signature, publicKey }) =>
        verifySignature(message, signature, publicKey)
      )
    );

    return results;
  } catch (error) {
    throw new Error(
      `Failed to batch verify signatures: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

// Utility functions
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function generateKeyId(): string {
  return 'key_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSignatureId(): string {
  return 'sig_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function validatePrivateKey(privateKeyHex: string): void {
  if (!privateKeyHex || typeof privateKeyHex !== 'string') {
    throw new Error('Private key is required and must be a string');
  }

  if (privateKeyHex.length !== 64) {
    throw new Error('Private key must be 64 characters (32 bytes)');
  }

  if (!/^[0-9a-fA-F]+$/.test(privateKeyHex)) {
    throw new Error('Private key must be a valid hex string');
  }
}

function validatePublicKey(publicKeyHex: string): void {
  if (!publicKeyHex || typeof publicKeyHex !== 'string') {
    throw new Error('Public key is required and must be a string');
  }

  if (publicKeyHex.length !== 64) {
    throw new Error('Public key must be 64 characters (32 bytes)');
  }

  if (!/^[0-9a-fA-F]+$/.test(publicKeyHex)) {
    throw new Error('Public key must be a valid hex string');
  }
}

function validateSignature(signatureHex: string): void {
  if (!signatureHex || typeof signatureHex !== 'string') {
    throw new Error('Signature is required and must be a string');
  }

  if (signatureHex.length !== 128) {
    throw new Error('Signature must be 128 characters (64 bytes)');
  }

  if (!/^[0-9a-fA-F]+$/.test(signatureHex)) {
    throw new Error('Signature must be a valid hex string');
  }
}

// Export utility functions for testing
export const utils = {
  bytesToHex,
  hexToBytes,
  generateKeyId,
  generateSignatureId,
  validatePrivateKey,
  validatePublicKey,
  validateSignature,
};
