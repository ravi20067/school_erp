import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function About() {
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

  const timeline = [
    { year: '1999', event: 'Academy Elite Founded with vision of educational excellence' },
    { year: '2005', event: 'Expanded facilities and introduced international curriculum' },
    { year: '2012', event: 'Achieved ISO certification and international recognition' },
    { year: '2020', event: 'Pioneered digital learning and hybrid education models' },
    { year: '2024', event: 'Became premier institution for holistic development' },
  ];

  const leadership = [
    {
      name: 'Dr. Rajesh Patel',
      position: 'Principal & Founder',
      image: '👨‍🎓',
      bio: 'EdD in Educational Leadership with 30+ years of experience',
    },
    {
      name: 'Prof. Anjali Sharma',
      position: 'Vice Principal - Academics',
      image: '👩‍🏫',
      bio: 'PhD in Curriculum Design, expert in modern pedagogy',
    },
    {
      name: 'Mr. Vikram Singh',
      position: 'Dean of Students',
      image: '👨‍💼',
      bio: 'Specialist in student development and mentorship',
    },
    {
      name: 'Ms. Priya Desai',
      position: 'Director of Admissions',
      image: '👩‍💼',
      bio: 'Focused on identifying and nurturing talented students',
    },
  ];

  const achievements = [
    { stat: '95%+', label: 'University Placement Rate', icon: Award },
    { stat: '40+', label: 'International Awards', icon: Globe },
    { stat: '500+', label: 'Alumni Worldwide', icon: Users },
    { stat: '98%', label: 'Student Satisfaction', icon: CheckCircle },
  ];

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Academy Elite</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              25 years of building leaders, fostering excellence, and transforming lives through quality education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 lg:p-10">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
              <Globe size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              To provide world-class education that develops academically excellent, ethically grounded, and socially responsible individuals capable of making a positive impact on the global community.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 lg:p-10">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              To be a leading institution recognized globally for fostering innovation, critical thinking, and character development in our students, preparing them to excel in an ever-changing world.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Principal's Message */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-lg"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="text-6xl">👨‍🎓</div>
              <div>
                <h3 className="text-2xl font-bold">Dr. Rajesh Patel</h3>
                <p className="text-gray-600 dark:text-gray-400">Principal & Founder</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              "At Academy Elite, we believe education extends far beyond textbooks and examinations. Our mission is to nurture curious minds, build confident leaders, and develop compassionate citizens who will contribute meaningfully to society."
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              "For over two decades, we have committed ourselves to providing an environment where each student discovers their unique potential and develops the skills necessary for success in the 21st century."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">A timeline of growth and achievement</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 ${index % 2 === 0 ? 'border-secondary' : 'border-primary'}`}>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">{item.event}</p>
                  </div>
                </div>
                <div className={`hidden lg:flex items-center justify-center w-16 h-16 rounded-full z-10 ${index % 2 === 0 ? 'bg-secondary' : 'bg-primary'} text-white font-bold text-lg flex-shrink-0`}>
                  {item.year}
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Experienced educators dedicated to excellence</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Achievements</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {achievement.stat}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {achievement.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Infrastructure */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">World-Class Infrastructure</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">State-of-the-art facilities for holistic development</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: '🏫', title: 'Smart Classrooms', desc: 'Interactive displays and digital learning tools' },
              { icon: '🧪', title: 'Science Labs', desc: 'Fully equipped for hands-on experimentation' },
              { icon: '💻', title: 'Computer Labs', desc: 'Latest technology for IT and coding education' },
              { icon: '📚', title: 'Digital Library', desc: '50,000+ books and online resources' },
              { icon: '🏃', title: 'Sports Complex', desc: 'Olympic-standard facilities and grounds' },
              { icon: '🎨', title: 'Arts Studio', desc: 'Dedicated spaces for creative expression' },
            ].map((facility, index) => (
              <motion.div
                key={facility.title}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{facility.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Take the first step towards an excellent educational journey
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
