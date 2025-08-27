import React from 'react';
import KeyGenerator from '@components/KeyManagement/KeyGenerator';
import KeyList from '@components/KeyManagement/KeyList';
import { useState, useEffect } from 'react';
import { getKeys } from '@services/cryptoService';
import { StoredKey } from '../types/crypto.types';

const KeyManagement: React.FC = () => {
  const [keys, setKeys] = useState<StoredKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const fetchedKeys = await getKeys();
        setKeys(fetchedKeys);
      } catch (error) {
        console.error('Failed to fetch keys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  const handleKeyGenerated = async () => {
    // Refresh the key list when a new key is generated
    const updatedKeys = await getKeys();
    setKeys(updatedKeys);
  };

  return (
    <div className="key-management-page">
      <div className="container">
        <h1>Key Management</h1>
        <KeyGenerator onKeyGenerated={handleKeyGenerated} />
        <KeyList keys={keys} loading={loading} />
      </div>
    </div>
  );
};

export default KeyManagement;
