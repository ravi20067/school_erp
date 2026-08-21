import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base group-hover:shadow-lg transition-shadow">
            AE
          </div>
          <span className="hidden sm:block font-bold text-lg text-primary dark:text-primary">
            Academy Elite
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-gray-700 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="px-4 py-2 text-primary font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            Login
          </Link>
          <Link to="/apply" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 sm:px-6 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/login"
                className="block px-4 py-3 text-center text-primary font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/apply"
                className="block px-4 py-3 text-center bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
                onClick={() => setIsOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
