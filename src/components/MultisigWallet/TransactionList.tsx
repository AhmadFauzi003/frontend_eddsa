import React, { useEffect, useState } from 'react';

interface Transaction {
  id: string;
  walletId: string;
  recipient: string;
  amount: number;
  status: 'pending' | 'signed' | 'executed' | 'rejected';
  requiredSignatures: number;
  currentSignatures: number;
  createdAt: string;
  message?: string;
}

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

        // Mock data for demo
        const mockTransactions: Transaction[] = [
          {
            id: 'tx_1',
            walletId: 'wallet_1',
            recipient: 'recipient_address_1',
            amount: 100,
            status: 'pending',
            requiredSignatures: 2,
            currentSignatures: 1,
            createdAt: new Date().toISOString(),
            message: 'Payment for services',
          },
          {
            id: 'tx_2',
            walletId: 'wallet_1',
            recipient: 'recipient_address_2',
            amount: 50,
            status: 'executed',
            requiredSignatures: 2,
            currentSignatures: 2,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            message: 'Monthly allowance',
          },
        ];

        setTransactions(mockTransactions);
      } catch (err) {
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusBadge = (status: Transaction['status']) => {
    const statusMap = {
      pending: { className: 'status-pending', text: 'Pending' },
      signed: { className: 'status-signed', text: 'Signed' },
      executed: { className: 'status-executed', text: 'Executed' },
      rejected: { className: 'status-rejected', text: 'Rejected' },
    };

    const statusInfo = statusMap[status];
    return (
      <span className={`status-badge ${statusInfo.className}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="transactions">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-header">
                <span className="transaction-id">ID: {transaction.id}</span>
                {getStatusBadge(transaction.status)}
              </div>

              <div className="transaction-details">
                <div className="detail-row">
                  <strong>Recipient:</strong> {transaction.recipient}
                </div>
                <div className="detail-row">
                  <strong>Amount:</strong> {transaction.amount}
                </div>
                <div className="detail-row">
                  <strong>Signatures:</strong> {transaction.currentSignatures}/
                  {transaction.requiredSignatures}
                </div>
                <div className="detail-row">
                  <strong>Created:</strong>{' '}
                  {new Date(transaction.createdAt).toLocaleString()}
                </div>
                {transaction.message && (
                  <div className="detail-row">
                    <strong>Message:</strong> {transaction.message}
                  </div>
                )}
              </div>

              {transaction.status === 'pending' && (
                <div className="transaction-actions">
                  <button className="button primary small">
                    Sign Transaction
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
