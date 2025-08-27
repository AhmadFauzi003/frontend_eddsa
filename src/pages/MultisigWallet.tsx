import React from 'react';
import WalletCreator from '@components/MultisigWallet/WalletCreator';
import TransactionList from '@components/MultisigWallet/TransactionList';
import TransactionSigner from '@components/MultisigWallet/TransactionSigner';

const MultisigWallet: React.FC = () => {
  return (
    <div className="multisig-wallet-page">
      <div className="container">
        <h1>Multisig Wallet</h1>
        <p>Create and manage multisig wallets with threshold signatures.</p>

        <div className="wallet-sections">
          <div className="section">
            <WalletCreator />
          </div>

          <div className="section">
            <TransactionList />
          </div>

          <div className="section">
            <TransactionSigner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultisigWallet;
