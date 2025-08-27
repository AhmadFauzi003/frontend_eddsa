import React from 'react';
import SignatureCreator from '@components/Signatures/SignatureCreator';
import SignatureVerifier from '@components/Signatures/SignatureVerifier';

const Signatures: React.FC = () => {
  return (
    <div className="signatures-page">
      <div className="container">
        <h1>Digital Signatures</h1>
        <p>Create and verify EDDSA signatures using Ed25519 algorithm.</p>

        <div className="signatures-sections">
          <div className="section">
            <SignatureCreator />
          </div>

          <div className="section">
            <SignatureVerifier />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signatures;
