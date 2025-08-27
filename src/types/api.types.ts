// API types for EDDSA Multisig System

// Base API response structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Key Management API Types
export interface CreateKeyRequest {
  algorithm?: 'Ed25519';
  alias?: string;
}

export interface CreateKeyResponse {
  keyId: string;
  publicKey: string;
  privateKey: string;
  algorithm: 'Ed25519';
  createdAt: string;
}

export interface KeyListResponse {
  keyId: string;
  publicKey: string;
  alias?: string;
  algorithm: 'Ed25519';
  createdAt: string;
  lastUsed?: string;
}

export interface ImportKeyRequest {
  privateKey: string;
  alias?: string;
}

export interface ExportKeyRequest {
  keyId: string;
  includePrivateKey?: boolean;
}

// Signature API Types
export interface CreateSignatureRequest {
  message: string;
  keyId: string;
  format?: 'hex' | 'base64';
}

export interface CreateSignatureResponse {
  signatureId: string;
  signature: string;
  message: string;
  publicKey: string;
  timestamp: string;
}

export interface VerifySignatureRequest {
  message: string;
  signature: string;
  publicKey: string;
}

export interface VerifySignatureResponse {
  isValid: boolean;
  message: string;
  details?: {
    algorithm: 'Ed25519';
    timestamp: string;
  };
}

export interface BatchSignRequest {
  messages: string[];
  keyId: string;
}

export interface BatchVerifyRequest {
  verifications: Array<{
    message: string;
    signature: string;
    publicKey: string;
  }>;
}

// Multisig Wallet API Types
export interface CreateWalletRequest {
  name: string;
  participants: string[]; // Public keys
  requiredSignatures: number;
  description?: string;
}

export interface CreateWalletResponse {
  walletId: string;
  name: string;
  participants: string[];
  requiredSignatures: number;
  totalParticipants: number;
  createdAt: string;
  createdBy: string;
}

export interface WalletSummary {
  walletId: string;
  name: string;
  requiredSignatures: number;
  totalParticipants: number;
  pendingTransactions: number;
  totalTransactions: number;
  createdAt: string;
}

export interface WalletDetails extends WalletSummary {
  participants: WalletParticipant[];
  description?: string;
  createdBy: string;
}

export interface WalletParticipant {
  publicKey: string;
  alias?: string;
  joinedAt: string;
  isActive: boolean;
}

// Transaction API Types
export interface CreateTransactionRequest {
  walletId: string;
  recipient: string;
  amount: number;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateTransactionResponse {
  transactionId: string;
  walletId: string;
  recipient: string;
  amount: number;
  message?: string;
  status: TransactionStatus;
  requiredSignatures: number;
  currentSignatures: number;
  createdAt: string;
  createdBy: string;
}

export interface Transaction {
  transactionId: string;
  walletId: string;
  recipient: string;
  amount: number;
  message?: string;
  status: TransactionStatus;
  requiredSignatures: number;
  currentSignatures: number;
  signatures: TransactionSignature[];
  createdAt: string;
  createdBy: string;
  executedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface TransactionSignature {
  signatureId: string;
  participantPublicKey: string;
  signature: string;
  signedAt: string;
  isValid: boolean;
}

export interface SignTransactionRequest {
  transactionId: string;
  keyId: string;
}

export interface SignTransactionResponse {
  signatureId: string;
  signature: string;
  participantPublicKey: string;
  signedAt: string;
  transaction: {
    currentSignatures: number;
    requiredSignatures: number;
    status: TransactionStatus;
  };
}

// Enums and Union Types
export type TransactionStatus =
  | 'pending'
  | 'partially_signed'
  | 'fully_signed'
  | 'executed'
  | 'rejected'
  | 'expired';

export type WalletStatus = 'active' | 'inactive' | 'deprecated';

export type SignatureAlgorithm = 'Ed25519';

// Request/Response wrappers
export interface ListKeysRequest {
  page?: number;
  limit?: number;
  algorithm?: SignatureAlgorithm;
}

export interface ListWalletsRequest {
  page?: number;
  limit?: number;
  status?: WalletStatus;
  participantPublicKey?: string;
}

export interface ListTransactionsRequest {
  page?: number;
  limit?: number;
  walletId?: string;
  status?: TransactionStatus;
  createdBy?: string;
}

export interface ListSignaturesRequest {
  page?: number;
  limit?: number;
  keyId?: string;
  publicKey?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Utility types for forms
export interface WalletFormData {
  name: string;
  participants: string[];
  requiredSignatures: number;
  description?: string;
}

export interface TransactionFormData {
  recipient: string;
  amount: number;
  message?: string;
}

export interface SignatureFormData {
  message: string;
  keyId: string;
}

// WebSocket types for real-time updates
export interface WebSocketMessage<T = unknown> {
  type: string;
  data: T;
  timestamp: string;
}

export interface TransactionUpdateMessage {
  transactionId: string;
  walletId: string;
  status: TransactionStatus;
  currentSignatures: number;
  newSignature?: TransactionSignature;
}

export interface WalletUpdateMessage {
  walletId: string;
  type: 'new_transaction' | 'transaction_signed' | 'transaction_executed';
  data: Transaction | TransactionSignature;
}
