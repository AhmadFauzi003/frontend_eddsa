import { utils } from '../../../src/services/cryptoService';

describe('Crypto Service Utils', () => {
  describe('bytesToHex', () => {
    test('converts bytes to hex correctly', () => {
      const bytes = new Uint8Array([255, 0, 128]);
      const hex = utils.bytesToHex(bytes);
      expect(hex).toBe('ff0080');
    });
  });

  describe('hexToBytes', () => {
    test('converts hex to bytes correctly', () => {
      const hex = 'ff0080';
      const bytes = utils.hexToBytes(hex);
      expect(bytes).toEqual(new Uint8Array([255, 0, 128]));
    });

    test('throws error for invalid hex length', () => {
      expect(() => utils.hexToBytes('fff')).toThrow(
        'Hex string must have even length'
      );
    });
  });

  describe('generateKeyId', () => {
    test('generates unique key IDs', () => {
      const id1 = utils.generateKeyId();
      const id2 = utils.generateKeyId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^key_\d+_[a-z0-9]+$/);
    });
  });

  describe('validatePrivateKey', () => {
    test('validates correct private key', () => {
      const validKey =
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
      expect(() => utils.validatePrivateKey(validKey)).not.toThrow();
    });

    test('throws error for invalid key length', () => {
      expect(() => utils.validatePrivateKey('short')).toThrow(
        'Private key must be 64 characters'
      );
    });

    test('throws error for non-hex characters', () => {
      const invalidKey =
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdeg';
      expect(() => utils.validatePrivateKey(invalidKey)).toThrow(
        'Private key must be a valid hex string'
      );
    });
  });
});
