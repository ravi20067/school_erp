import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-100 dark:text-gray-200">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AE
              </div>
              <h3 className="text-lg font-bold">Academy Elite</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building future leaders through excellence in education and character development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Gallery', href: '/gallery' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@academy-elite.edu</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Education Lane, City, State 12345</span>
              </li>
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-white">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} Academy Elite. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
