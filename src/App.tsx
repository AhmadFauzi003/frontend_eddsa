import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import Layout from '@components/common/Layout';
import Home from '@pages/Home';
import KeyManagement from '@pages/KeyManagement';
import Signatures from '@pages/Signatures';
import MultisigWallet from '@pages/MultisigWallet';
import Settings from '@pages/Settings';
import Help from '@pages/Help';
import NotFound from '@pages/NotFound';
import '@styles/globals.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/keys" element={<KeyManagement />} />
            <Route path="/signatures" element={<Signatures />} />
            <Route path="/wallets" element={<MultisigWallet />} />
            <Route path="/wallets/:walletId" element={<MultisigWallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
