import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Github } from '@/components/BrandIcons';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Peek from '@/components/Peek';
import SetMood from '@/components/SetMood';
import { projects, galleries } from '@/lib/data';
import AutoCarousel from '@/components/AutoCarousel';
import ScrollTop from '@/components/ScrollTop';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name}, Krish Kumar`, description: p.summary } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const phone = p.slug === 'parentbud';
  const others = projects.filter((x) => x.slug !== p.slug);

  return (
    <>
      <ScrollTop key={slug} />
      <Nav />
      <SetMood mood="thoughtful" say={p.pitch} />
      <main id="main" className="mx-auto max-w-6xl px-5 py-12">
        <Link href="/#projects" className="inline-flex items-center gap-2 font-semibold hover:underline decoration-2 underline-offset-4"><ArrowLeft size={18} /> All projects</Link>
        <header className="mt-8 max-w-3xl">
          <p className="text-muted font-medium">{p.year}</p>
          <h1 className="mt-1 font-display font-extrabold tracking-tight text-5xl sm:text-6xl leading-[0.95]">{p.name}</h1>
          <p className="mt-6 text-xl sm:text-2xl leading-snug">{p.summary}</p>
          <p className="mt-4 inline-block bg-mustard sticker rounded-full px-4 py-1.5 font-semibold">{p.result}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
            {p.stack.map((s) => <li key={s} className="bg-surface border-2 border-line rounded-full px-3 py-1 font-medium">{s}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            {p.code && <a href={p.code} target="_blank" rel="noopener" className="inline-flex items-center gap-2 sticker sticker-hover rounded-full bg-surface px-5 py-2.5 font-semibold"><Github size={18} aria-hidden="true" /> View the code</a>}
            {p.extra && <a href={p.extra.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 sticker sticker-hover rounded-full bg-surface px-5 py-2.5 font-semibold"><Github size={18} aria-hidden="true" /> {p.extra.label}</a>}
          </div>
        </header>

        {galleries[p.slug]?.length > 0 && <div className="mt-12"><AutoCarousel key={p.slug} items={galleries[p.slug]} /></div>}

        <section aria-labelledby="built" className="mt-14 max-w-3xl">
          <h2 id="built" className="font-display font-bold text-3xl">What I built</h2>
          <ul className="mt-5 space-y-4 text-lg list-disc pl-6 marker:text-mustard">
            {p.points.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </section>


        <nav aria-labelledby="more" className="mt-20">
          <h2 id="more" className="font-display font-bold text-2xl">More projects</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => <li key={o.slug}><Link href={`/projects/${o.slug}`} className="block sticker sticker-hover rounded-full bg-surface px-4 py-2 font-semibold">{o.short}</Link></li>)}
          </ul>
        </nav>
      </main>
      <Footer />
      <Peek always />
    </>
  );
}
