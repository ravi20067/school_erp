import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      subtext: 'Mon-Fri, 9:00 AM - 5:00 PM',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@academy-elite.edu',
      subtext: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Education Lane',
      subtext: 'City, State 12345',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      value: '8:00 AM - 6:00 PM',
      subtext: 'Monday to Friday',
    },
  ];

  const departments = [
    { name: 'Admissions', email: 'admissions@academy-elite.edu', phone: '+1 (555) 123-4568' },
    { name: 'Academic', email: 'academics@academy-elite.edu', phone: '+1 (555) 123-4569' },
    { name: 'Student Support', email: 'support@academy-elite.edu', phone: '+1 (555) 123-4570' },
    { name: 'Facilities', email: 'facilities@academy-elite.edu', phone: '+1 (555) 123-4571' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Get in touch with us today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">{info.title}</h3>
                <p className="text-center font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {info.value}
                </p>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {info.subtext}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Send us a Message</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="academic">Academic Questions</option>
                  <option value="facilities">Facilities & Infrastructure</option>
                  <option value="events">Events & Programs</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              {!submitted ? (
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Message Sent Successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Map & Department Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl overflow-hidden h-80 flex items-center justify-center text-white">
              <div className="text-center">
                <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold opacity-70">Interactive Map</p>
                <p className="text-sm opacity-60">(Google Maps integration ready)</p>
              </div>
            </div>

            {/* Department Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                  >
                    <h4 className="font-bold text-lg mb-2">{dept.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-center gap-2">
                        <Mail size={16} className="text-primary" />
                        <a href={`mailto:${dept.email}`} className="hover:text-primary transition-colors">
                          {dept.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={16} className="text-primary" />
                        <a href={`tel:${dept.phone}`} className="hover:text-primary transition-colors">
                          {dept.phone}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Timings */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Office Timings</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Visit us during our office hours
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border-2 border-primary"
            >
              <h3 className="text-2xl font-bold mb-4">Weekdays</h3>
              <p className="text-3xl font-bold text-primary mb-2">8:00 AM - 6:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Monday to Friday</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Weekends</h3>
              <p className="text-3xl font-bold text-secondary mb-2">9:00 AM - 1:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Saturday (Closed on Sunday)</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              📞 Emergency contact available 24/7 for urgent matters
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
