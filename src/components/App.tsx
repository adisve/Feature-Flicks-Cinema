import React, { ReactNode } from 'react';
import { BootstrapNavbar } from './nav/BootstrapNavbar';

interface AppProps {
  children: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return (
    <div className="app">
      <BootstrapNavbar />
      {children}
    </div>
  );
};
