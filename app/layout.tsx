import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { RoleBanner } from '@/components/RoleBanner';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/components/ToastContainer';
import { HashRouteHandler } from '@/components/HashRouteHandler';

export const metadata: Metadata = {
  title: 'IlmFlow State 🌙 | Islamic Event & Competition Operating System',
  description:
    'Enterprise-grade, data-driven Islamic Event OS built for international Islamic summits, Holy Quran recitation championships, Hadith mastery tournaments, accredited parchment diplomas, and real-time secretariat administration.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <AppProvider>
            <HashRouteHandler />
            <Header />
            <RoleBanner />
            <main id="app" className="max-w-6xl mx-auto px-5 py-10 min-h-[70vh]">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
