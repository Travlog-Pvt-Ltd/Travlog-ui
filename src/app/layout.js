import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@context/AuthContext';
import SnackProvider from '@context/SnackbarContext';
import Navbar from '@components/navbar/Navbar';
import NavbarProvider from '@context/NavbarContext';
import Script from 'next/script';
import CacheProvider from '@context/CacheContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Travlog',
  description: 'Your travel guide and companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <Script src='https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js' />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavbarProvider>
            <SnackProvider>
              <CacheProvider>
                <Navbar />
                {children}
              </CacheProvider>
            </SnackProvider>
          </NavbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
