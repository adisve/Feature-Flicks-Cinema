import React, { ReactNode } from 'react';
import { BootstrapNavbar } from './nav/BootstrapNavbar';
import '../scss/App.scss'

interface AppProps {
  children: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return (
    <div id="app">
      <BootstrapNavbar />
      {children}
    </div>
  );
};
