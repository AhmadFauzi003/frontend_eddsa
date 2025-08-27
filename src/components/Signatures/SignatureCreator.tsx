import React, { useState } from 'react';
import { signMessage } from '@services/cryptoService';

export const SignatureCreator: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateSignature = async () => {
    if (!message.trim() || !privateKey.trim()) {
      setError('Please provide both message and private key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const signatureData = await signMessage(message, privateKey);
      setSignature(signatureData.signature);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create signature'
      );
      setSignature(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signature-creator">
      <h2>Create Signature</h2>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign"
          rows={4}
        />
      </div>
      <div className="form-group">
        <label htmlFor="privateKey">Private Key (hex):</label>
        <input
          id="privateKey"
          type="password"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter private key in hex format"
        />
      </div>
      <button
        onClick={handleCreateSignature}
        disabled={loading || !message.trim() || !privateKey.trim()}
        className="button primary"
      >
        {loading ? 'Creating...' : 'Create Signature'}
      </button>

      {signature && (
        <div className="result success">
          <h3>Generated Signature:</h3>
          <p className="signature-output">{signature}</p>
        </div>
      )}

      {error && (
        <div className="result error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SignatureCreator;
