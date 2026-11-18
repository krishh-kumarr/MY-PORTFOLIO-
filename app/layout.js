import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { AvatarProvider } from '@/components/AvatarProvider';

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

export const viewport = { themeColor: '#F6FBFD' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 sticker rounded-lg">Skip to content</a>
        <AvatarProvider>{children}</AvatarProvider>
      </body>
    </html>
  );
}
