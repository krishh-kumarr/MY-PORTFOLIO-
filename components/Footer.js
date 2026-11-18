import { links } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t-2 border-line mt-10">
      <div className="mx-auto max-w-6xl px-5 py-8 pb-32 sm:pb-8 flex flex-wrap gap-4 items-center text-muted">
        <span className="mr-auto">© {new Date().getFullYear()} Krish Kumar</span>
        <a className="hover:text-fg underline-offset-4 hover:underline" href={links.github} target="_blank" rel="noopener">GitHub</a>
        <a className="hover:text-fg underline-offset-4 hover:underline" href={links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a className="hover:text-fg underline-offset-4 hover:underline" href={links.resume} target="_blank" rel="noopener">Resume</a>
      </div>
    </footer>
  );
}
