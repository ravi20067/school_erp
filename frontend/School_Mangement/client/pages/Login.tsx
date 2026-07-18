import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';
import { loginAuth } from "@/services/authService";
import { useEffect } from "react";
import { useAuth } from "@/services/authContext";

export default function Login() {
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, isAuthenticated, getDashboardRoute } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardRoute());
    }
  }, [isAuthenticated, navigate]);

  const portals = [
    {
      id: 'student',
      title: 'Student Portal',
      icon: '👨‍🎓',
      description: 'Access your grades, assignments, and school information',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['View Grades & Reports', 'Submit Assignments', 'Check Announcements', 'Access Resources'],
    },
    {
      id: 'teacher',
      title: 'Teacher Portal',
      icon: '👩‍🏫',
      description: 'Manage classes, upload materials, and track student progress',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Manage Classes', 'Post Assignments', 'Track Attendance', 'Share Resources'],
    },
    {
      id: 'device',
      title: 'Device Portal',
      icon: '👔',
      description: 'Attendence',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Attendence', 'Staff Reports']
    },
    {
      id: 'admin',
      title: 'Administrator Portal',
      icon: '🔐',
      description: 'Full system management and institutional control',
      color: 'from-red-500 to-orange-500',
      benefits: ['System Management', 'User Administration', 'Reports & Analytics', 'Configuration'],
    },
  ];

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await loginAuth(username, password);
      login(data.token);
      navigate(getDashboardRoute());

    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMsg("Invalid credentials");
      } else {
        setErrorMsg("Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Portal Login</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Select your portal to access the Academy Elite ERP system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {!activePortal ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Choose Your Portal</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Select the appropriate portal for your role
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {portals.map((portal) => (
                <motion.div
                  key={portal.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setActivePortal(portal.id)}
                >
                  <div
                    className={`bg-gradient-to-br ${portal.color} rounded-2xl p-8 text-white h-full hover:shadow-2xl transition-all hover:scale-105 transform`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl">{portal.icon}</div>
                      <ArrowRight size={28} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-3xl font-bold mb-3">{portal.title}</h3>
                    <p className="text-white/90 mb-6 leading-relaxed">{portal.description}</p>

                    <div className="space-y-2 mb-6">
                      {portal.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-white/80">
                          <span className="text-lg">✓</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all">
                      Login as {portal.title.split(' ')[0]}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setActivePortal(null);
                setUsername('');
                setPassword('');
              }}
              className="mb-8 flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              ← Back to Portal Selection
            </button>

            {(() => {
              const portal = portals.find(p => p.id === activePortal);
              if (!portal) return null;

              return (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  {/* Portal Header */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{portal.icon}</div>
                    <h2 className="text-3xl font-bold mb-2">{portal.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-6">
                    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
                    {/* Username Field */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Username</label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold">Password</label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                      <ArrowRight size={20} />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                    <span className="text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                  </div>

                  {/* Help Section */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center text-sm text-gray-700 dark:text-gray-300">
                    <p className="mb-2">
                      <strong>First time logging in?</strong>
                    </p>
                    <p className="mb-3">
                      Your credentials have been sent to your registered email. If you haven't received them, please contact the administration office.
                    </p>
                    <a href="/contact" className="text-primary font-semibold hover:underline">
                      Contact Support
                    </a>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      {!activePortal && (
        <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">ERP Platform Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Comprehensive tools for education management
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                { icon: '📊', title: 'Real-time Analytics', desc: 'Track progress with detailed reports' },
                { icon: '📱', title: 'Mobile Access', desc: 'Login from anywhere, anytime' },
                { icon: '🔒', title: 'Secure & Safe', desc: 'Bank-level security for your data' },
                { icon: '⚡', title: 'Fast & Reliable', desc: '99.9% uptime guarantee' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center hover:shadow-lg transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
