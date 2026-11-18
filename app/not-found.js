import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center px-5 text-center">
      <div>
        <Image src="/avatar/surprised.webp" alt="Surprised cartoon Krish" width={640} height={790} className="w-48 h-auto mx-auto" />
        <h1 className="mt-6 font-display font-extrabold text-4xl">This page doesn’t exist</h1>
        <p className="mt-3 text-muted text-lg">The link may be old or mistyped.</p>
        <Link href="/" className="mt-8 inline-block sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold">Go to the homepage</Link>
      </div>
    </main>
  );
}
