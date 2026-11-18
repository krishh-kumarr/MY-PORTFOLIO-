import Image from 'next/image';
import { links } from '@/lib/data';

/** Sign-off: links, then the crew illustration with the avatar, and the name set large underneath. */
export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-14 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl">See you around.</h2>
          <p className="mt-3 text-muted">Krish Kumar · iOS, data and ML engineer</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 content-start text-muted">
          {[['Work', '/#work'], ['Projects', '/#projects'], ['Skills', '/#skills'], ['Recognition', '/#recognition'], ['Contact', '/#contact'], ['Resume', links.resume]].map(([l, h]) => (
            <a key={l} href={h} className="hover:text-fg w-fit">{l}</a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-muted">
          <a href={`mailto:${links.email}`} className="hover:text-fg break-all">{links.email}</a>
          <a href={links.github} target="_blank" rel="noopener" className="hover:text-fg">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noopener" className="hover:text-fg">LinkedIn</a>
          <a href={links.instagram} target="_blank" rel="noopener" className="hover:text-fg">Instagram</a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 mt-12">
        <div className="relative rounded-3xl border border-line overflow-hidden">
          <Image src="/art/crew-selfie.webp" alt="Illustration of Krish’s friends" width={1024} height={768} sizes="(min-width: 1152px) 1100px, 95vw" className="w-full h-auto footer-crowd" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <Image src="/avatar/body-front.webp" alt="" width={254} height={898} sizes="140px" className="absolute bottom-0 left-[4%] h-[58%] w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,.5)]" />
        </div>
      </div>

      <p aria-hidden="true" className="mx-auto max-w-6xl px-5 -mb-[3.2vw] mt-6 font-display font-extrabold leading-none tracking-tighter text-[19vw] lg:text-[13rem] text-fg/[.07] select-none text-center">KRISH</p>
      <p className="relative border-t border-line px-5 py-4 text-center text-sm text-muted bg-night">© {new Date().getFullYear()} Krish Kumar</p>
    </footer>
  );
}
