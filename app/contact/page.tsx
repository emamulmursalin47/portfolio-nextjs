/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-32" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">Get in Touch</h1>
            <p className="text-gray-300 mb-12">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300">emamulmursalin.ice@gmail.com</p>
                  <p className="text-gray-300">emamulmursalin47@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300">+8801738753102 - WhatsApp</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-300">Rajshahi, Bangladesh</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/in/mdemamulmursalin' },
                  { icon: <Github className="w-5 h-5" />, href: 'https://github.com/emamulmursalin47' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/30 backdrop-blur-md rounded-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'subject'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-white mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    //@ts-ignore
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        
      </motion.div>
    </div>
  );
};

export default Contact;
