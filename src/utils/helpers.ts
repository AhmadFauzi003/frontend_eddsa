// src/utils/helpers.ts

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const isValidKey = (key: string): boolean => {
    // Implement key validation logic here
    return key.length === 64; // Example: Check if the key length is 64 characters
};

export const isValidSignature = (signature: string): boolean => {
    // Implement signature validation logic here
    return signature.length === 128; // Example: Check if the signature length is 128 characters
};