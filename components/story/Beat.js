import Image from 'next/image';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

const styles = {
  low: 'bg-[#0F1B2D] text-white border-2 border-line shadow-[4px_4px_0_0_#000] [clip-path:polygon(0_6px,8%_0,22%_5px,40%_0,60%_6px,78%_0,92%_5px,100%_0,100%_100%,0_100%)] pt-6',
  next: 'bg-surface sticker border-l-[10px] border-l-mustard',
  win: 'bg-mustard sticker',
  note: 'bg-surface sticker',
};

/** One story moment, styled by kind. */
export default function Beat({ beat }) {
  const { kind, text, photo, link } = beat;
  return (
    <div data-kind={kind} className={`rounded-2xl p-5 sm:p-6 ${styles[kind]}`}>
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          sizes="(min-width: 1024px) 380px, 80vw"
          className={`mb-4 w-full h-auto max-h-[34dvh] object-contain rounded-lg border-2 border-line bg-surface ${kind === 'win' ? 'rotate-1' : '-rotate-1'}`}
        />
      )}
      <p className="text-lg sm:text-xl font-medium leading-snug flex gap-3">
        {kind === 'win' && <Trophy aria-hidden="true" className="shrink-0 mt-0.5" />}
        <span>{text}</span>
      </p>
      {link && (
        <Link href={link.href} className="mt-4 inline-block sticker sticker-hover rounded-full bg-surface text-fg px-4 py-1.5 font-semibold">
          {link.label}
        </Link>
      )}
    </div>
  );
}
