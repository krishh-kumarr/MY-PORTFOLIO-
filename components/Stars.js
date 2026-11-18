/** Decorative stars and shards echoing the avatar artwork background. */
export default function Stars({ className = '' }) {
  const star = 'M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z';
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 400 400" fill="none">
      <rect x="250" y="-30" width="190" height="150" rx="10" transform="rotate(14 250 -30)" fill="#7FD6CF" opacity=".55" />
      <rect x="-60" y="250" width="180" height="200" rx="10" transform="rotate(-10 -60 250)" fill="#7FD6CF" opacity=".45" />
      <path d={star} transform="translate(40 60) scale(2.2) rotate(-12 12 12)" fill="#7BB8E0" />
      <path d={star} transform="translate(320 170) scale(1.8) rotate(10 12 12)" fill="#7BB8E0" />
      <path d={star} transform="translate(60 300) scale(1.4)" fill="#5CC3BA" />
      <circle cx="130" cy="40" r="6" fill="#5CC3BA" />
    </svg>
  );
}
