import Link from 'next/link';
import { links } from '@/lib/data';

const items = [['Work', '/#work'], ['Projects', '/#projects'], ['Recognition', '/#recognition'], ['Contact', '/#contact']];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b-2 border-ink">
      <nav aria-label="Main" className="mx-auto max-w-6xl px-5 h-16 flex items-center gap-6">
        <Link href="/" className="font-display font-bold text-lg tracking-tight mr-auto">Krish Kumar</Link>
        <ul className="hidden sm:flex items-center gap-6 font-medium">
          {items.map(([label, href]) => (
            <li key={href}><Link href={href} className="underline-offset-4 decoration-2 hover:underline">{label}</Link></li>
          ))}
        </ul>
        <a href={links.resume} target="_blank" rel="noopener" className="sticker sticker-hover rounded-full bg-mustard px-4 py-1.5 font-semibold">Resume</a>
      </nav>
    </header>
  );
}
