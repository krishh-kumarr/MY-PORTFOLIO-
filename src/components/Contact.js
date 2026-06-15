import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ScrollReveal, FadeInUp } from '../ui/Animations';
import { GlassCard } from '../ui/Effects';
import { LampContainer } from '../ui/lamp';

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_0kgspep',
        'template_5zdd0ii',
        formRef.current,
        { publicKey: 'jhKGK2TSpEZaMkmnS' }
      );
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <LampContainer>
          <ScrollReveal className="text-center space-y-6">
            <div className="text-accent text-small font-medium tracking-widest uppercase">
              Contact
            </div>
            <h2 className="text-section text-text-primary max-w-xl mx-auto">
              Let's build something meaningful
            </h2>
            <p className="text-text-secondary text-body max-w-lg mx-auto">
              Have a project in mind, want to collaborate, or just want to say hello?
              I'd love to hear from you.
            </p>
          </ScrollReveal>
        </LampContainer>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <FadeInUp className="lg:col-span-3">
            <GlassCard className="p-8 lg:p-10">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-small font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="glass-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-small font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="glass-input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-small font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="Project discussion, collaboration, hiring..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-small font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="glass-input resize-none"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full"
                >
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'sent'
                      ? 'Sent Successfully!'
                      : status === 'error'
                        ? 'Failed — Try Again'
                        : 'Send Message'}
                </button>

                {status === 'sent' && (
                  <p className="text-success text-small text-center">
                    Thank you! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-small text-center">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </GlassCard>
          </FadeInUp>

          {/* Contact Info */}
          <FadeInUp className="lg:col-span-2 space-y-6" delay={0.15}>
            <GlassCard className="p-8 space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">
                Get in touch
              </h3>

              <div className="space-y-5">
                <a
                  href="mailto:krishneerajkumar@gmail.com"
                  className="block group"
                >
                  <div className="text-small text-text-tertiary mb-1">Email</div>
                  <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    krishneerajkumar@gmail.com
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/krish-kumar-1a119728a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="text-small text-text-tertiary mb-1">LinkedIn</div>
                  <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    /in/krish-kumar
                  </div>
                </a>

                <a
                  href="https://github.com/krishh-kumarr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="text-small text-text-tertiary mb-1">GitHub</div>
                  <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    /krishh-kumarr
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/__krish___2005/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="text-small text-text-tertiary mb-1">Instagram</div>
                  <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    @__krish___2005
                  </div>
                </a>
              </div>
            </GlassCard>

            <GlassCard className="p-8 space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Availability
              </h3>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-text-secondary text-small">
                  Open to projects & collaborations
                </span>
              </div>
              <div className="text-text-tertiary text-small">
                Response time: typically within 24 hours
                <br />
                Timezone: UTC+5:30 (IST)
              </div>
            </GlassCard>

            <a
              href="/Krish_Kumar.pdf"
              download="Krish_Kumar_Resume.pdf"
              className="btn-secondary w-full justify-center"
            >
              Download Resume
            </a>
          </FadeInUp>
        </div>
      </div>
    </div>
  );
};

export default Contact;
