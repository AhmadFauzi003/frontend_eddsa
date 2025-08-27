// src/utils/validation.ts

export const validateKey = (key: string): boolean => {
    const keyPattern = /^[A-Fa-f0-9]{64}$/; // Example pattern for a 64-character hex key
    return keyPattern.test(key);
};

export const validateSignature = (signature: string): boolean => {
    const signaturePattern = /^[A-Fa-f0-9]{128}$/; // Example pattern for a 128-character hex signature
    return signaturePattern.test(signature);
};

export const validateInput = (input: string): boolean => {
    return input.trim().length > 0; // Check if input is not empty
};