import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to the EDDSA Multisig System</h1>
          <p className="hero-description">
            A secure and user-friendly platform for managing Ed25519 keys,
            creating digital signatures, and handling multisig wallets.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🔑 Key Management</h3>
            <p>Generate, import, and manage Ed25519 key pairs securely.</p>
            <Link to="/keys" className="button primary">
              Manage Keys
            </Link>
          </div>

          <div className="feature-card">
            <h3>✍️ Digital Signatures</h3>
            <p>Create and verify EDDSA signatures with ease.</p>
            <Link to="/signatures" className="button primary">
              Create Signatures
            </Link>
          </div>

          <div className="feature-card">
            <h3>🏦 Multisig Wallets</h3>
            <p>
              Set up and manage multi-signature wallets for enhanced security.
            </p>
            <Link to="/wallets" className="button primary">
              Manage Wallets
            </Link>
          </div>
        </div>

        <div className="info-section">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h4>🔒 Secure by Design</h4>
              <p>
                All cryptographic operations are performed client-side. Your
                private keys never leave your browser.
              </p>
            </div>

            <div className="feature-item">
              <h4>⚡ Fast & Efficient</h4>
              <p>
                Built with modern web technologies for optimal performance and
                user experience.
              </p>
            </div>

            <div className="feature-item">
              <h4>🔄 Real-time Updates</h4>
              <p>
                Get instant notifications about transaction status and signature
                requirements.
              </p>
            </div>

            <div className="feature-item">
              <h4>📱 Responsive Design</h4>
              <p>
                Works seamlessly across desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
