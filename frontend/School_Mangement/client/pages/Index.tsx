import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Zap, Globe, FolderOpen } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function Index() {
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

  const highlights = [
    { label: 'Total Students', value: '2,500+', icon: Users },
    { label: 'Expert Teachers', value: '150+', icon: BookOpen },
    { label: 'Success Rate', value: '98%', icon: Award },
    { label: 'Years of Excellence', value: '25+', icon: Zap },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Rigorous curriculum designed for global competence',
    },
    {
      icon: Zap,
      title: 'Smart Classrooms',
      description: 'State-of-the-art technology-integrated learning spaces',
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: 'Highly qualified teachers with international credentials',
    },
    {
      icon: Globe,
      title: 'Sports Facilities',
      description: 'Olympic-standard athletic and recreational facilities',
    },
    {
      icon: FolderOpen,
      title: 'Advanced Library',
      description: 'Digital and physical resources for enhanced learning',
    },
    {
      icon: Award,
      title: 'Technology Integration',
      description: 'Cutting-edge tools for 21st-century learning',
    },
  ];

  const programs = [
    {
      title: 'Primary Education',
      description: 'Grades K-5: Building strong foundations with play-based and structured learning',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Secondary Education',
      description: 'Grades 6-8: Developing critical thinking and leadership skills',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Senior Secondary',
      description: 'Grades 9-12: Preparing students for global universities and careers',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const testimonials = [
    {
      quote: "Academy Elite has transformed my child's educational journey. The teachers are exceptional and the facilities are world-class.",
      author: 'Parent - Sarah Johnson',
      role: 'Parent',
    },
    {
      quote: "The supportive environment and rigorous academics have prepared me well for university. I feel confident in my future.",
      author: 'Student - Aisha Patel',
      role: 'Class XII',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Content */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
              >
                <span className="text-primary font-semibold text-sm">Welcome to Excellence</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Building Future Leaders Through Excellence
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Join our community of over 2,500 students who are discovering their potential, developing critical thinking, and preparing to make a global impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/admissions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
                  Explore Campus
                </button>
              </div>
            </motion.div>

            {/* Illustration Placeholder */}
            <motion.div
              variants={itemVariants}
              className="relative h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <div className="text-white text-center">
                <Globe size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold opacity-70">3D Campus Model</p>
                <p className="text-sm opacity-60">(Spline integration ready)</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.label}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {highlight.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {highlight.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Why Choose Academy Elite?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine academic excellence with holistic development to shape tomorrow's leaders.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 hover:shadow-xl transition-all group border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Programs</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Carefully designed curriculum for each stage of development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div
                className={`bg-gradient-to-br ${program.color} rounded-2xl p-8 text-white h-full flex flex-col justify-between hover:shadow-2xl transition-all group-hover:scale-105`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                  <p className="text-white/90 leading-relaxed">{program.description}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Hear from our students and parents about their Academy Elite experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6 text-gray-100">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Admissions Are Open!</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Join our community of learners and leaders. Limited seats available for the upcoming academic year.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
