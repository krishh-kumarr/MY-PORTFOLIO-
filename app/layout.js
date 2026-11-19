import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { AvatarProvider } from '@/components/AvatarProvider';
import { THEME_SCRIPT } from '@/components/ThemeToggle';
import Pointer from '@/components/Pointer';
import Ambient from '@/components/Ambient';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://portfolio2-three-lime.vercel.app'),
  title: 'Krish Kumar, iOS and ML developer',
  description: 'Computer science student at SRM University building iOS apps, data pipelines and ML systems. Previously at Infosys and Samsung PRISM.',
  openGraph: {
    title: 'Krish Kumar, iOS and ML developer',
    description: 'iOS apps, data pipelines and ML systems.',
    images: ['/avatar/confident.webp'],
  },
};

export const viewport = { themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0A0F18' }, { media: '(prefers-color-scheme: light)', color: '#F3F5F9' }] };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${bricolage.variable} ${instrument.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-surface focus:px-4 focus:py-2 sticker rounded-lg">Skip to content</a>
        <Ambient />
        <AvatarProvider>{children}</AvatarProvider>
        <Pointer />
      </body>
    </html>
  );
}
