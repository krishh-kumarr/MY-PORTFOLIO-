import Image from 'next/image';

/** A small illustrative panel per project, built from real screenshots where they exist. */
export default function ProjectVisual({ project }) {
  if (project.slug === 'parentbud') {
    return (
      <div className="h-full flex items-end justify-center gap-3 pt-6">
        {['/shots/parentbud-4.webp', '/shots/parentbud-1.webp', '/shots/parentbud-3.webp'].map((src, i) => (
          <Image key={src} src={src} alt="" width={520} height={995} sizes="140px" className={`w-[30%] max-w-[130px] rounded-t-2xl border-2 border-b-0 border-ink ${i === 1 ? 'translate-y-0' : 'translate-y-5'}`} />
        ))}
      </div>
    );
  }
  if (project.slug === 'vibeout') {
    return (
      <div className="h-full flex items-end px-6 pt-6">
        <Image src="/shots/vibeout-dashboard.webp" alt="" width={1400} height={538} sizes="(min-width: 768px) 480px, 90vw" className="w-full rounded-t-xl border-2 border-b-0 border-ink" />
      </div>
    );
  }
  if (project.slug === 'sql-optimizer') {
    return (
      <div className="h-full flex flex-col justify-center gap-3 px-6 py-6 font-[ui-monospace,Menlo,monospace] text-[13px]">
        <div className="bg-white/70 border-2 border-ink rounded-lg px-3 py-2 line-through decoration-2 decoration-red-500/70">SELECT * FROM orders o WHERE o.id IN (SELECT …)</div>
        <div className="bg-white border-2 border-ink rounded-lg px-3 py-2">SELECT o.total FROM orders o JOIN users u ON …</div>
        <div className="self-start bg-ink text-white rounded-full px-3 py-1 font-sans font-semibold">32% faster on average</div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col justify-center gap-3 px-6 py-6">
      <div className="self-start max-w-[85%] bg-white border-2 border-ink rounded-2xl rounded-bl-sm px-3 py-2 text-sm">Your parcel is held. Pay ₹25 at bit.ly/… to release it</div>
      <div className="self-start flex items-center gap-2 bg-ink text-white rounded-full px-3 py-1 text-sm font-semibold">
        <span className="size-2.5 rounded-full bg-red-400" /> High risk: phishing link
      </div>
    </div>
  );
}
