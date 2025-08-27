import React from 'react';
import { StoredKey } from '../../types/crypto.types';

interface KeyListProps {
  keys: StoredKey[];
  loading?: boolean;
}

export const KeyList: React.FC<KeyListProps> = ({ keys, loading = false }) => {
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

  if (loading) {
    return (
      <div className="key-list">
        <h2>Stored Keys</h2>
        <div className="loading">Loading keys...</div>
      </div>
    );
  }

  return (
    <div className="key-list">
      <h2>Stored Keys</h2>

      {keys.length === 0 ? (
        <p>No keys generated yet. Create your first key pair above.</p>
      ) : (
        <div className="keys-container">
          {keys.map((key) => (
            <div key={key.keyId} className="key-item-card">
              <div className="key-header">
                <h3>Key ID: {key.keyId}</h3>
                <span
                  className={`key-badge ${
                    key.isImported ? 'imported' : 'generated'
                  }`}
                >
                  {key.isImported ? 'Imported' : 'Generated'}
                </span>
              </div>

              <div className="key-details">
                <div className="detail-row">
                  <label>
                    <strong>Public Key:</strong>
                  </label>
                  <div className="key-value">
                    <span className="key-text">{key.publicKey}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(key.publicKey, 'Public Key')
                      }
                      className="button secondary small"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {key.alias && (
                  <div className="detail-row">
                    <label>
                      <strong>Alias:</strong>
                    </label>
                    <span>{key.alias}</span>
                  </div>
                )}

                <div className="detail-row">
                  <label>
                    <strong>Created:</strong>
                  </label>
                  <span>{key.createdAt.toLocaleString()}</span>
                </div>

                {key.lastUsed && (
                  <div className="detail-row">
                    <label>
                      <strong>Last Used:</strong>
                    </label>
                    <span>{key.lastUsed.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="key-actions">
                <button className="button secondary small">
                  Use for Signing
                </button>
                <button className="button danger small">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyList;
