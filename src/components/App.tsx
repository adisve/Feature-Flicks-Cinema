import React, { ReactNode } from 'react';
import { BootstrapNavbar } from './nav/BootstrapNavbar';
import '../scss/App.scss'
import { Footer } from './footer/Footer';

interface AppProps {
  children: ReactNode;
}

/**
 * Main app entry point
 * 
 * @param children: ReactNode containing the current page content
 * @returns: Main application
 */
export const App = ({ children }: AppProps) => {
  return (
    <main id="app">
      <BootstrapNavbar />
      {children}
    </main>
  );
};
