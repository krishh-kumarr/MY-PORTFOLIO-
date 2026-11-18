import Image from 'next/image';

/** Shows an image inside a device: 'mac' laptop, 'ipad' tablet, 'phone', or a tilted 'photo' print. */
export default function DeviceFrame({ im, sizes = '(min-width: 1024px) 60vw, 90vw' }) {
  const img = (cls) => <Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes={sizes} className={cls} />;
  if (im.frame === 'mac') return (
    <div className="w-full max-w-[880px]">
      <div className="rounded-t-[18px] border-[10px] border-b-[14px] border-[#1b1d22] bg-black shadow-2xl">
        <div className="aspect-[16/10] overflow-hidden bg-black">{img('h-full w-full object-contain')}</div>
      </div>
      <div className="mx-auto h-3 w-[112%] -ml-[6%] rounded-b-[14px] bg-gradient-to-b from-[#cfd3da] to-[#8d939c]" />
    </div>
  );
  if (im.frame === 'ipad') return (
    <div className="w-full max-w-[720px] rounded-[30px] border-[14px] border-[#1b1d22] bg-black shadow-2xl">
      <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-black">{img('h-full w-full object-contain')}</div>
    </div>
  );
  if (im.frame === 'phone') return (
    <div className="relative h-[min(62dvh,560px)] aspect-[9/19.5] rounded-[42px] border-[10px] border-[#1b1d22] bg-black shadow-2xl overflow-hidden">
      <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      {img('h-full w-full object-cover')}
    </div>
  );
  return (
    <div className="rotate-[-2deg] rounded-sm bg-white p-3 pb-10 shadow-2xl">
      {img('max-h-[58dvh] w-auto max-w-full object-contain')}
    </div>
  );
}
