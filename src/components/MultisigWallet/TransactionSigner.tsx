import React, { useState } from 'react';

interface Transaction {
  id: string;
  walletId: string;
  recipient: string;
  amount: number;
  status: 'pending' | 'signed' | 'executed' | 'rejected';
  requiredSignatures: number;
  currentSignatures: number;
  message?: string;
}

interface TransactionSignerProps {
  transaction?: Transaction;
  onSign?: (signedTransaction: string) => void;
}

export const TransactionSigner: React.FC<TransactionSignerProps> = ({
  transaction,
  onSign,
}) => {
  const [selectedKeyId, setSelectedKeyId] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  // Mock transaction if none provided
  const defaultTransaction: Transaction = {
    id: 'tx_example',
    walletId: 'wallet_example',
    recipient: 'example_recipient',
    amount: 100,
    status: 'pending',
    requiredSignatures: 2,
    currentSignatures: 1,
    message: 'Example transaction',
  };

  const currentTransaction = transaction || defaultTransaction;

  const handleSign = async () => {
    if (!privateKey.trim()) {
      setError('Please provide your private key');
      return;
    }

    setLoading(true);
    setError(null);
    setSignature(null);

    try {
      // TODO: Implement actual transaction signing
      // This would normally create a signature for the transaction data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate signing

      const mockSignature = 'mock_signature_' + Date.now();
      setSignature(mockSignature);

      if (onSign) {
        onSign(mockSignature);
      }
    } catch (err) {
      setError('Failed to sign transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-signer">
      <h2>Sign Transaction</h2>

      <div className="transaction-details">
        <h3>Transaction Details</h3>
        <div className="detail-row">
          <strong>Transaction ID:</strong> {currentTransaction.id}
        </div>
        <div className="detail-row">
          <strong>Recipient:</strong> {currentTransaction.recipient}
        </div>
        <div className="detail-row">
          <strong>Amount:</strong> {currentTransaction.amount}
        </div>
        <div className="detail-row">
          <strong>Current Signatures:</strong>{' '}
          {currentTransaction.currentSignatures}/
          {currentTransaction.requiredSignatures}
        </div>
        {currentTransaction.message && (
          <div className="detail-row">
            <strong>Message:</strong> {currentTransaction.message}
          </div>
        )}
      </div>

      {currentTransaction.status === 'pending' && (
        <div className="signing-form">
          <div className="form-group">
            <label htmlFor="private-key">Your Private Key (hex):</label>
            <input
              id="private-key"
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter your private key"
            />
            <small className="help-text">
              ⚠️ Your private key is never sent to the server
            </small>
          </div>

          <button
            onClick={handleSign}
            disabled={loading || !privateKey.trim()}
            className="button primary"
          >
            {loading ? 'Signing...' : 'Sign Transaction'}
          </button>
        </div>
      )}

      {currentTransaction.status !== 'pending' && (
        <div className="status-message">
          <p>
            This transaction is {currentTransaction.status} and cannot be
            signed.
          </p>
        </div>
      )}

      {error && (
        <div className="result error">
          <p>{error}</p>
        </div>
      )}

      {signature && (
        <div className="result success">
          <h3>Transaction Signed Successfully!</h3>
          <p>
            <strong>Signature:</strong> {signature}
          </p>
          <p>Your signature has been added to the transaction.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionSigner;
