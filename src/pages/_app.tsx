import '@/styles/globals.css';
import THEME from '@/themes/mui';
import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <div className={inter.className}>
          <Navbar />
          <main className="flex flex-col min-h-screen items-center justify-center">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
