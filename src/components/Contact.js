import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FadeInUp, 
  SlideInFromLeft, 
  SlideInFromRight,
  ScaleOnHover,
  GlitchText
} from '../ui/Animations';
import { F1Card, TechCard, NeonText } from '../ui/Effects';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, send the form data to your email address
    // Using a service like EmailJS, FormSpree, or your own backend
    console.log(`Sending form data to krishneerajkumar@gmail.com...`);
    console.log(formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      title: 'Email',
      value: 'krishneerajkumar@gmail.com',
      icon: '📧',
      color: 'from-bat-blue to-neon-cyan',
      link: 'mailto:krishneerajkumar@gmail.com'
    },
    {
      title: 'LinkedIn',
      value: '/in/krish-kumar-1a119728a',
      icon: '💼',
      color: 'from-neon-cyan to-neon-green',
      link: 'https://www.linkedin.com/in/krish-kumar-1a119728a/'
    },
    {
      title: 'GitHub',
      value: '/krishh-kumarr',
      icon: '👨‍💻',
      color: 'from-f1-blue to-f1-purple',
      link: 'https://github.com/krishh-kumarr'
    },
    {
      title: 'Instagram',
      value: '@__krish___2005',
      icon: '📱',
      color: 'from-bat-blue to-f1-purple',
      link: 'https://www.instagram.com/__krish___2005/'
    }
  ];

  const techSpecs = [
    { label: 'Response Time', value: '< 24 hours', unit: 'hrs' },
    { label: 'Availability', value: '24/7', unit: 'days' },
    { label: 'Time Zone', value: 'UTC+5:30', unit: 'IST' },
    { label: 'Languages', value: 'EN/HI', unit: 'spoken' }
  ];

  return (
    <div className="min-h-screen px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeInUp className="text-center space-y-6">
          <motion.div
            className="text-sm font-racing text-neon-cyan tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {'>'} ESTABLISHING CONNECTION...
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-racing font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan">
              CONTACT
            </span>
            <br />
            <GlitchText className="text-white">THE TECH EXPERT</GlitchText>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate on something extraordinary? Let's connect and create 
            <NeonText color="bat-blue"> championship-level solutions </NeonText> 
            together. The pit stop is open for business.
          </p>
        </FadeInUp>

        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <SlideInFromLeft className="lg:col-span-3">
            <div className="p-8 bg-bat-black backdrop-blur-md border border-neon-cyan/20 rounded-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-racing text-neon-cyan">
                    SECURE TRANSMISSION
                  </h2>
                  <p className="text-gray-400">
                    Fill out the form below to establish a direct communication channel.
                    All transmissions are encrypted and secured.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-racing text-neon-cyan mb-2">
                        IDENTITY
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-bat-black border border-neon-cyan/30 rounded-lg text-white focus:border-bat-blue focus:outline-none transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-racing text-neon-cyan mb-2">
                        COMMUNICATION CHANNEL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-bat-black border border-neon-cyan/30 rounded-lg text-white focus:border-bat-blue focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-racing text-neon-cyan mb-2">
                      MISSION OBJECTIVE
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-bat-black border border-neon-cyan/30 rounded-lg text-white focus:border-bat-blue focus:outline-none transition-colors"
                      placeholder="Project discussion, collaboration, hiring..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-racing text-neon-cyan mb-2">
                      DETAILED BRIEFING
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-bat-black border border-neon-cyan/30 rounded-lg text-white focus:border-bat-blue focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project, ideas, or how we can work together..."
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full f1-button rounded-lg py-4 text-lg relative overflow-hidden"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-bat-blue to-neon-cyan opacity-80"></span>
                    <span className="relative font-racing text-white">
                      {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                    </span>
                  </motion.button>

                  {submitted && (
                    <motion.div 
                      className="p-4 bg-bat-black border border-neon-cyan text-neon-cyan rounded-lg text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Message received! I'll respond as soon as possible.
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </SlideInFromLeft>
          
          {/* Contact Info */}
          <SlideInFromRight className="lg:col-span-2 space-y-6">
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-xl font-racing text-neon-cyan mb-4">COMMUNICATION CHANNELS</h3>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <ScaleOnHover key={index}>
                      <motion.a 
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="block"
                      >
                        <F1Card className="flex items-center gap-4 py-3">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${method.color} text-2xl`}>
                            {method.icon}
                          </div>
                          <div>
                            <div className="font-racing text-white">{method.title}</div>
                            <div className="text-sm text-gray-400">{method.value}</div>
                          </div>
                          <div className="ml-auto text-neon-cyan">→</div>
                        </F1Card>
                      </motion.a>
                    </ScaleOnHover>
                  ))}
                </div>
              </div>

              {/* Tech Specs */}
              <TechCard className="space-y-4">
                <h3 className="text-2xl font-racing text-bat-blue">
                  TECHNICAL SPECIFICATIONS
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {techSpecs.map((spec, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-racing text-neon-cyan">{spec.value}</div>
                      <div className="text-sm text-gray-400">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </TechCard>

              {/* Status Panel */}
              <TechCard className="space-y-4">
                <h3 className="text-xl font-racing text-neon-cyan">
                  CURRENT STATUS
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">System Status</span>
                    <span className="text-neon-cyan flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                      ONLINE
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Availability</span>
                    <span className="text-neon-cyan">ACCEPTING PROJECTS</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-bat-blue">RAPID DEPLOYMENT</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-neon-cyan">GLOBAL OPERATIONS</span>
                  </div>
                </div>
              </TechCard>
            </div>
          </SlideInFromRight>
        </div>

        {/* Call to Action */}
        <FadeInUp>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-racing text-white">
              LOOKING FORWARD TO HEARING FROM YOU
            </h3>
            <p className="text-gray-400">
              All project inquiries receive a response within 24 hours.
              Priority mode activated.
            </p>
            
            <div className="pt-4">
              <motion.a
                href="mailto:krishneerajkumar@gmail.com"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg font-racing hover:bg-neon-cyan hover:text-bat-black transition-all duration-300"
                >
                  INITIATE DIRECT CONTACT
                </button>
              </motion.a>
            </div>
          </div>
        </FadeInUp>

      </div>
    </div>
  );
};

export default Contact;
