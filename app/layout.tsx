import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeContext';
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('ilmflow_theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var t = isDark ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', t);
                  if (isDark) document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AppProvider>
              <HashRouteHandler />
              <Header />
              <RoleBanner />
              <main id="app" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 min-h-[70vh]">
                {children}
              </main>
              <Footer />
              <ToastContainer />
            </AppProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
