import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/keys">Key Management</Link>
        </li>
        <li>
          <Link to="/signatures">Signatures</Link>
        </li>
        <li>
          <Link to="/wallets">Multisig Wallet</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
