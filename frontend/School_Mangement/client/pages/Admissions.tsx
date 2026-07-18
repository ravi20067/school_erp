import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Users, Calendar, DollarSign, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function Admissions() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const admissionSteps = [
    { step: '1', title: 'Application', desc: 'Submit completed application form with required documents' },
    { step: '2', title: 'Verification', desc: 'We review and verify your application details' },
    { step: '3', title: 'Entrance Test', desc: 'Take a customized entrance exam (online or on-campus)' },
    { step: '4', title: 'Interview', desc: 'Meet with our admission team for personal assessment' },
    { step: '5', title: 'Confirmation', desc: 'Receive offer letter and confirm your admission' },
  ];

  const feeStructure = [
    { grade: 'Primary (K-5)', annual: '$8,500', onetime: '$2,000' },
    { grade: 'Secondary (6-8)', annual: '$10,500', onetime: '$2,500' },
    { grade: 'Senior Secondary (9-12)', annual: '$12,500', onetime: '$3,000' },
  ];

  const documents = [
    'Birth Certificate',
    'Previous School Report Card',
    'Medical Records',
    'Immunization Certificate',
    'Parent ID Proof',
    'Passport (for international students)',
    'Passport-size photographs',
    'Transfer Certificate (if applicable)',
  ];

  const faqs = [
    {
      q: 'What is the minimum age for admission?',
      a: 'Students should be minimum 3 years old for Kindergarten. For other classes, age must correspond to the grade level per our guidelines.',
    },
    {
      q: 'Is financial aid available?',
      a: 'Yes, we offer merit-based scholarships and financial assistance programs for qualified students. Please contact our admissions office for details.',
    },
    {
      q: 'What is the class size?',
      a: 'Our average class size is 25-30 students, ensuring personalized attention and effective teaching-learning process.',
    },
    {
      q: 'Do you offer transportation?',
      a: 'Yes, we provide transportation services across the city with GPS tracking and trained supervisors.',
    },
    {
      q: 'When are admissions open?',
      a: 'Admissions are open year-round, but primary intake happens in December-March for the upcoming academic year.',
    },
    {
      q: 'What is the refund policy for fees?',
      a: 'Please refer to our admission agreement for detailed refund policies. Generally, non-refundable admission fees apply.',
    },
  ];

  const importantDates = [
    { event: 'Application Opens', date: 'December 1, 2024' },
    { event: 'Registration Deadline', date: 'March 15, 2025' },
    { event: 'Entrance Exams', date: 'March 20-25, 2025' },
    { event: 'Interview Round', date: 'April 1-10, 2025' },
    { event: 'Results Declaration', date: 'April 20, 2025' },
    { event: 'Admission Confirmation', date: 'May 15, 2025' },
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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join Academy Elite and start your journey towards excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Admission Process</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">5 Simple Steps to Join Us</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
            {admissionSteps.map((item, index) => (
              <motion.div key={item.step} variants={itemVariants} className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border-2 border-primary hover:shadow-lg transition-all h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={24} className="text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Eligibility */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Eligibility Criteria</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 lg:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle size={28} className="text-primary" />
                  Academic Requirements
                </h3>
                <ul className="space-y-4">
                  {[
                    'Minimum 60% aggregate in previous class',
                    'Strong fundamentals in core subjects',
                    'Active participation in school activities',
                    'No disciplinary issues',
                  ].map((req, index) => (
                    <li key={index} className="flex gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users size={28} className="text-secondary" />
                  Personal Qualities
                </h3>
                <ul className="space-y-4">
                  {[
                    'Eagerness to learn and grow',
                    'Good communication skills',
                    'Teamwork and leadership potential',
                    'Commitment to values and ethics',
                  ].map((req, index) => (
                    <li key={index} className="flex gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Fee Structure</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Transparent and competitive fees</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {feeStructure.map((item, index) => (
            <motion.div
              key={item.grade}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
            >
              <h3 className="text-2xl font-bold mb-6">{item.grade}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Annual Tuition Fee</p>
                  <p className="text-3xl font-bold text-primary">{item.annual}</p>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">One-time Registration Fee</p>
                  <p className="text-2xl font-bold">{item.onetime}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            💡 <strong>Financial Aid Available</strong> - Merit-based scholarships and assistance programs offered
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Contact for Financial Assistance
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Required Documents */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Required Documents</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {documents.map((doc, index) => (
              <motion.div
                key={doc}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-lg p-4 flex items-center gap-4 border-l-4 border-primary hover:shadow-lg transition-all"
              >
                <FileText size={28} className="text-primary flex-shrink-0" />
                <span className="font-medium">{doc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Important Dates</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {importantDates.map((item, index) => (
            <motion.div
              key={item.event}
              variants={itemVariants}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 flex items-center justify-between border border-primary/30"
            >
              <div className="flex items-center gap-4">
                <Calendar size={28} className="text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">{item.event}</h3>
              </div>
              <p className="text-lg font-bold text-primary">{item.date}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQs */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-left">{faq.q}</h3>
                  <ChevronDown
                    size={24}
                    className={`text-primary flex-shrink-0 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-slate-800"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Start your application today and take the first step towards an excellent education
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-2xl transition-all hover:scale-105">
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
