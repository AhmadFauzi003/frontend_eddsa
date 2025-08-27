import React, { useState } from 'react';
import { generateKeyPair } from '@services/cryptoService';
import { KeyPair } from '../../types/crypto.types';

interface KeyGeneratorProps {
  onKeyGenerated?: () => void;
}

export const KeyGenerator: React.FC<KeyGeneratorProps> = ({
  onKeyGenerated,
}) => {
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

  const handleGenerateKey = async () => {
    setLoading(true);
    setError(null);
    setKeyPair(null);

    try {
      const keys = await generateKeyPair();
      setKeyPair(keys);

      if (onKeyGenerated) {
        onKeyGenerated();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error generating keys. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`${type} copied to clipboard!`);
      })
      .catch(() => {
        alert('Failed to copy to clipboard');
      });
  };

  return (
    <div className="key-generator">
      <h2>Key Generator</h2>
      <p>Generate a new Ed25519 key pair for signing transactions.</p>

      <button
        onClick={handleGenerateKey}
        disabled={loading}
        className="button primary"
      >
        {loading ? 'Generating...' : 'Generate Key Pair'}
      </button>

      {error && (
        <div className="result error">
          <p>{error}</p>
        </div>
      )}

      {keyPair && (
        <div className="result success">
          <h3>Generated Keys:</h3>
          <div className="key-display">
            <div className="key-item">
              <label>
                <strong>Key ID:</strong>
              </label>
              <div className="key-value">
                <span>{keyPair.keyId}</span>
                <button
                  onClick={() => copyToClipboard(keyPair.keyId, 'Key ID')}
                  className="button secondary small"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="key-item">
              <label>
                <strong>Public Key:</strong>
              </label>
              <div className="key-value">
                <span className="key-text">{keyPair.publicKey}</span>
                <button
                  onClick={() =>
                    copyToClipboard(keyPair.publicKey, 'Public Key')
                  }
                  className="button secondary small"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="key-item">
              <label>
                <strong>Private Key:</strong>
              </label>
              <div className="key-value">
                <span className="key-text">
                  {showPrivateKey ? keyPair.privateKey : '•'.repeat(64)}
                </span>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="button secondary small"
                >
                  {showPrivateKey ? 'Hide' : 'Show'}
                </button>
                {showPrivateKey && (
                  <button
                    onClick={() =>
                      copyToClipboard(keyPair.privateKey, 'Private Key')
                    }
                    className="button secondary small"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>

            <div className="key-item">
              <label>
                <strong>Algorithm:</strong>
              </label>
              <span>{keyPair.algorithm}</span>
            </div>

            <div className="key-item">
              <label>
                <strong>Created:</strong>
              </label>
              <span>{keyPair.createdAt ? keyPair.createdAt.toLocaleString() : 'N/A'}</span>
            </div>
          </div>

          <div className="warning">
            <p>
              ⚠️ <strong>Important:</strong> Store your private key securely.
              Never share it with anyone!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyGenerator;
