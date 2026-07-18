import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',

    // Address
    currentAddress: '',
    city: '',
    state: '',
    zipcode: '',

    // Academic Info
    currentGrade: '',
    currentSchool: '',
    gpa: '',

    // Parent Info
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    occupation: '',

    // Application
    applyingGrade: '',
    applyingProgram: '',
    essays: '',
    interests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    } else if (currentStep === 2) {
      if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';
    } else if (currentStep === 3) {
      if (!formData.currentSchool.trim()) newErrors.currentSchool = 'Current school is required';
      if (!formData.currentGrade) newErrors.currentGrade = 'Current grade is required';
      if (!formData.gpa) newErrors.gpa = 'GPA is required';
    } else if (currentStep === 4) {
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
      if (!formData.parentPhone) newErrors.parentPhone = 'Parent phone is required';
      if (!formData.parentEmail) newErrors.parentEmail = 'Parent email is required';
    } else if (currentStep === 5) {
      if (!formData.applyingGrade) newErrors.applyingGrade = 'Applying grade is required';
      if (!formData.applyingProgram) newErrors.applyingProgram = 'Program is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Application submitted:', formData);
      setSubmitted(true);
    }
  };

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Apply Now</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Take the first step towards joining Academy Elite
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{
                        scale: currentStep === step ? 1.2 : 1,
                        backgroundColor: currentStep >= step ? 'rgb(0, 104, 255)' : 'rgb(209, 213, 219)',
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-2 cursor-pointer"
                      onClick={() => step < currentStep && setCurrentStep(step)}
                    >
                      {step < currentStep ? '✓' : step}
                    </motion.div>
                    <p className="text-sm font-semibold text-center hidden sm:block">
                      {step === 1 && 'Personal'}
                      {step === 2 && 'Address'}
                      {step === 3 && 'Academic'}
                      {step === 4 && 'Parent'}
                      {step === 5 && 'Application'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(currentStep / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Personal Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g., Indian"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Address Information</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.currentAddress ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    />
                    {errors.currentAddress && <p className="text-red-500 text-sm mt-1">{errors.currentAddress}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Zipcode *</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="12345"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.zipcode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Academic Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Academic Information</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Current School *</label>
                    <input
                      type="text"
                      name="currentSchool"
                      value={formData.currentSchool}
                      onChange={handleChange}
                      placeholder="School Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.currentSchool ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    />
                    {errors.currentSchool && <p className="text-red-500 text-sm mt-1">{errors.currentSchool}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Grade *</label>
                      <select
                        name="currentGrade"
                        value={formData.currentGrade}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.currentGrade ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select Grade</option>
                        {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => (
                          <option key={g} value={g}>Grade {g}</option>
                        ))}
                      </select>
                      {errors.currentGrade && <p className="text-red-500 text-sm mt-1">{errors.currentGrade}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Current GPA *</label>
                      <input
                        type="number"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleChange}
                        placeholder="e.g., 3.8"
                        min="0"
                        max="4"
                        step="0.1"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.gpa ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.gpa && <p className="text-red-500 text-sm mt-1">{errors.gpa}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Parent Information */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Parent/Guardian Information</h2>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Parent/Guardian Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.parentName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    />
                    {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Parent Phone *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.parentPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.parentPhone && <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Parent Email *</label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        placeholder="parent@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.parentEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      />
                      {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Parent Occupation"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Application Details */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Application Details</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Applying for Grade *</label>
                      <select
                        name="applyingGrade"
                        value={formData.applyingGrade}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.applyingGrade ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select Grade</option>
                        {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => (
                          <option key={g} value={g}>Grade {g}</option>
                        ))}
                      </select>
                      {errors.applyingGrade && <p className="text-red-500 text-sm mt-1">{errors.applyingGrade}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Program *</label>
                      <select
                        name="applyingProgram"
                        value={formData.applyingProgram}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.applyingProgram ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select Program</option>
                        <option value="primary">Primary Education</option>
                        <option value="secondary">Secondary Education</option>
                        <option value="senior">Senior Secondary</option>
                      </select>
                      {errors.applyingProgram && <p className="text-red-500 text-sm mt-1">{errors.applyingProgram}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Why do you want to join Academy Elite?</label>
                    <textarea
                      name="essays"
                      value={formData.essays}
                      onChange={handleChange}
                      placeholder="Tell us about your aspirations and why you're interested in Academy Elite..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Areas of Interest</label>
                    <textarea
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Sports, Arts, Science, Technology, etc."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">Submit Required Documents</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                          After submitting this form, you'll be able to upload required documents (birth certificate, previous report cards, etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex-1 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-6">
              <CheckCircle size={80} className="text-green-500 mx-auto" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Thank you for applying to Academy Elite. Your application has been received. We will review your information and contact you within 3-5 business days.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto text-left">
              <h3 className="font-bold text-lg mb-4">Next Steps:</h3>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold text-primary">1.</span>
                  <span>We'll verify your application details</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">2.</span>
                  <span>You'll receive an invitation for the entrance exam</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">3.</span>
                  <span>Participate in the entrance test (online or on-campus)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">4.</span>
                  <span>Interview with our admission team</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">5.</span>
                  <span>Receive your admission decision</span>
                </li>
              </ol>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Return to Home
            </button>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
