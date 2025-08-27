import React, { useState } from 'react';
import { verifySignature } from '@services/cryptoService';

export const SignatureVerifier: React.FC = () => {
  const [signature, setSignature] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    if (!signature.trim() || !message.trim() || !publicKey.trim()) {
      setError('Please provide signature, message, and public key');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const verificationResult = await verifySignature(
        message,
        signature,
        publicKey
      );
      setResult(verificationResult.isValid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signature-verifier">
      <h2>Signature Verifier</h2>
      <div className="form-group">
        <label htmlFor="verify-message">Message:</label>
        <textarea
          id="verify-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the original message"
          rows={4}
        />
      </div>
      <div className="form-group">
        <label htmlFor="verify-signature">Signature (hex):</label>
        <input
          id="verify-signature"
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter signature in hex format"
        />
      </div>
      <div className="form-group">
        <label htmlFor="verify-publickey">Public Key (hex):</label>
        <input
          id="verify-publickey"
          type="text"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="Enter public key in hex format"
        />
      </div>
      <button
        onClick={handleVerify}
        disabled={
          loading || !signature.trim() || !message.trim() || !publicKey.trim()
        }
        className="button primary"
      >
        {loading ? 'Verifying...' : 'Verify Signature'}
      </button>

      {result !== null && (
        <div className={`result ${result ? 'success' : 'error'}`}>
          <h3>Verification Result:</h3>
          <p>{result ? '✅ Valid Signature' : '❌ Invalid Signature'}</p>
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

export default SignatureVerifier;
