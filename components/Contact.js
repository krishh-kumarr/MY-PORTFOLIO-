'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail } from 'lucide-react';
import { Github, Linkedin, Instagram } from './BrandIcons';
import Section from './Section';
import { useAvatar } from './AvatarProvider';
import { links } from '@/lib/data';

const field = 'w-full bg-surface border-2 border-line rounded-xl px-4 py-3 focus-visible:outline-offset-2';

export default function Contact() {
  const form = useRef(null);
  const [state, setState] = useState('idle');
  const { react } = useAvatar();

  const send = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      await emailjs.sendForm('service_0kgspep', 'template_5zdd0ii', form.current, { publicKey: 'jhKGK2TSpEZaMkmnS' });
      setState('sent');
      form.current.reset();
      react('excited', 'Got it, thank you! I’ll reply soon.', 4000);
    } catch {
      setState('error');
      react('surprised', 'That didn’t send. Try again, or email me directly.', 4000);
    }
  };

  const direct = [
    [Mail, 'Email', links.email, `mailto:${links.email}`],
    [Linkedin, 'LinkedIn', 'krish-kumar', links.linkedin],
    [Github, 'GitHub', 'krishh-kumarr', links.github],
    [Instagram, 'Instagram', '__krish___2005', links.instagram],
  ];

  return (
    <Section id="contact" title="Let’s talk" intro="Internships, projects or a hackathon team: send a message and it lands straight in my inbox." mood="laughing" say="Say hi! The form goes straight to my inbox.">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
        <ul className="space-y-3">
          {direct.map(([Icon, label, value, href]) => (
            <li key={label}>
              <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener" className="flex items-center gap-4 bg-surface sticker sticker-hover rounded-2xl px-5 py-4">
                <Icon aria-hidden="true" />
                <span><span className="block text-sm text-muted">{label}</span><span className="font-semibold break-all">{value}</span></span>
              </a>
            </li>
          ))}
        </ul>
        <form ref={form} onSubmit={send} className="bg-surface sticker rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block"><span className="block font-semibold mb-1.5">Name</span><input name="user_name" required autoComplete="name" className={field} /></label>
            <label className="block"><span className="block font-semibold mb-1.5">Email</span><input name="user_email" type="email" required autoComplete="email" className={field} /></label>
          </div>
          <label className="block"><span className="block font-semibold mb-1.5">Message</span><textarea name="message" required rows={5} className={field} /></label>
          <button type="submit" disabled={state === 'sending'} className="sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold text-lg disabled:opacity-60 cursor-pointer">
            {state === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" className="font-medium min-h-6">
            {state === 'sent' && 'Message sent. Thanks for reaching out!'}
            {state === 'error' && <>Message didn’t send. Try again or email <a className="underline" href={`mailto:${links.email}`}>{links.email}</a>.</>}
          </p>
        </form>
      </div>
    </Section>
  );
}
