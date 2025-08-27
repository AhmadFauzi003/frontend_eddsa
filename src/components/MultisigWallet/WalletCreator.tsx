import React, { useState } from 'react';

export const WalletCreator: React.FC = () => {
  const [walletName, setWalletName] = useState('');
  const [participants, setParticipants] = useState<string[]>(['']);
  const [requiredSignatures, setRequiredSignatures] = useState<number>(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleCreateWallet = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate inputs
    if (!walletName.trim()) {
      setError('Wallet name is required');
      setLoading(false);
      return;
    }

    const validParticipants = participants.filter((p) => p.trim());
    if (validParticipants.length < 2) {
      setError('At least 2 participants are required');
      setLoading(false);
      return;
    }

    if (requiredSignatures > validParticipants.length) {
      setError('Required signatures cannot exceed number of participants');
      setLoading(false);
      return;
    }

    try {
      // TODO: Implement actual wallet creation API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const walletId = 'wallet_' + Date.now();
      setSuccess(
        `Wallet "${walletName}" created successfully! ID: ${walletId}`
      );

      // Reset form
      setWalletName('');
      setParticipants(['']);
      setRequiredSignatures(1);
    } catch (err) {
      setError('Failed to create wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-creator">
      <h2>Create Multisig Wallet</h2>

      <div className="form-group">
        <label htmlFor="wallet-name">Wallet Name:</label>
        <input
          id="wallet-name"
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Enter wallet name"
        />
      </div>

      <div className="form-group">
        <label>Participants (Public Keys):</label>
        {participants.map((participant, index) => (
          <div key={index} className="participant-input">
            <input
              type="text"
              value={participant}
              onChange={(e) => handleParticipantChange(index, e.target.value)}
              placeholder="Enter public key in hex format"
            />
            {participants.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveParticipant(index)}
                className="button secondary small"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddParticipant}
          className="button secondary"
        >
          Add Participant
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="required-sigs">Required Signatures:</label>
        <input
          id="required-sigs"
          type="number"
          min="1"
          max={participants.filter((p) => p.trim()).length || 1}
          value={requiredSignatures}
          onChange={(e) => setRequiredSignatures(parseInt(e.target.value))}
        />
      </div>

      <button
        onClick={handleCreateWallet}
        disabled={loading}
        className="button primary"
      >
        {loading ? 'Creating...' : 'Create Wallet'}
      </button>

      {error && (
        <div className="result error">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="result success">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default WalletCreator;
