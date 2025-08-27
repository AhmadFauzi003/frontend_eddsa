// Enhanced crypto types for EDDSA Multisig System

export interface KeyPair {
  publicKey: string;
  privateKey: string;
  keyId: string;
  algorithm: 'Ed25519';
  createdAt: Date;
}

export interface Signature {
  id: string;
  message: string;
  signature: string;
  publicKey: string;
  timestamp: Date;
  verified: boolean;
}

export interface VerificationResult {
  isValid: boolean;
  message?: string;
}

export interface SignatureData {
  signature: string;
  message: string;
  publicKey: string;
}

export interface BatchSignatureRequest {
  messages: string[];
  privateKey: string;
}

export interface BatchVerificationRequest {
  verifications: Array<{
    message: string;
    signature: string;
    publicKey: string;
  }>;
}

export interface CryptoError {
  code: string;
  message: string;
  details?: unknown;
}

export interface KeyGenerationOptions {
  algorithm?: 'Ed25519';
  format?: 'hex' | 'base64';
}

export interface SignatureOptions {
  format?: 'hex' | 'base64';
  includeTimestamp?: boolean;
}

export interface VerificationOptions {
  strict?: boolean;
  includeDetails?: boolean;
}

// Key management types
export interface StoredKey {
  keyId: string;
  publicKey: string;
  alias?: string;
  createdAt: Date;
  lastUsed?: Date;
  isImported: boolean;
}

export interface KeyExportData {
  keyId: string;
  publicKey: string;
  privateKey?: string; // Only included when explicitly requested
  algorithm: 'Ed25519';
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

// Signature verification result with detailed info
export interface DetailedVerificationResult extends VerificationResult {
  signature: string;
  publicKey: string;
  message: string;
  timestamp?: Date;
  algorithm: 'Ed25519';
}

// Multisig specific types
export interface MultisigSignature {
  signatureId: string;
  participantPublicKey: string;
  signature: string;
  timestamp: Date;
  messageHash: string;
}

export interface MultisigVerificationResult {
  isValid: boolean;
  validSignatures: number;
  requiredSignatures: number;
  invalidSignatures: string[];
  details: DetailedVerificationResult[];
}

// Utility types
export type KeyFormat = 'hex' | 'base64' | 'pem';
export type SignatureFormat = 'hex' | 'base64';
export type AlgorithmType = 'Ed25519';

// Error types
export class CryptoServiceError extends Error {
  constructor(public code: string, message: string, public details?: unknown) {
    super(message);
    this.name = 'CryptoServiceError';
  }
}

export class KeyValidationError extends CryptoServiceError {
  constructor(message: string, details?: unknown) {
    super('KEY_VALIDATION_ERROR', message, details);
    this.name = 'KeyValidationError';
  }
}

export class SignatureError extends CryptoServiceError {
  constructor(message: string, details?: unknown) {
    super('SIGNATURE_ERROR', message, details);
    this.name = 'SignatureError';
  }
}

export class VerificationError extends CryptoServiceError {
  constructor(message: string, details?: unknown) {
    super('VERIFICATION_ERROR', message, details);
    this.name = 'VerificationError';
  }
}
