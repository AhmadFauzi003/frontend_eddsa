import React from 'react';
import Navigation from './Navigation';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="app-layout">
      <header>
        <Navigation />
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
