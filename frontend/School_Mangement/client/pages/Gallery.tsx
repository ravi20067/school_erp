import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import Header from '@/components/LandingHeader';
import Footer from '@/components/Footer';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'campus', label: 'Campus' },
    { id: 'classroom', label: 'Classrooms' },
    { id: 'events', label: 'Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'culture', label: 'Cultural' },
  ];

  const galleryImages = [
    { id: 1, category: 'campus', title: 'Main Campus Building', emoji: '🏫', color: 'from-blue-400 to-blue-600' },
    { id: 2, category: 'classroom', title: 'Smart Classroom', emoji: '💻', color: 'from-purple-400 to-purple-600' },
    { id: 3, category: 'sports', title: 'Sports Ground', emoji: '⚽', color: 'from-green-400 to-green-600' },
    { id: 4, category: 'events', title: 'Annual Fest', emoji: '🎉', color: 'from-yellow-400 to-yellow-600' },
    { id: 5, category: 'culture', title: 'Dance Performance', emoji: '💃', color: 'from-pink-400 to-pink-600' },
    { id: 6, category: 'classroom', title: 'Science Lab', emoji: '🧬', color: 'from-orange-400 to-orange-600' },
    { id: 7, category: 'campus', title: 'Library', emoji: '📚', color: 'from-indigo-400 to-indigo-600' },
    { id: 8, category: 'events', title: 'Graduation Ceremony', emoji: '🎓', color: 'from-cyan-400 to-cyan-600' },
    { id: 9, category: 'sports', title: 'Swimming Pool', emoji: '🏊', color: 'from-teal-400 to-teal-600' },
    { id: 10, category: 'culture', title: 'Art Exhibition', emoji: '🎨', color: 'from-rose-400 to-rose-600' },
    { id: 11, category: 'classroom', title: 'Computer Lab', emoji: '🖥️', color: 'from-violet-400 to-violet-600' },
    { id: 12, category: 'events', title: 'Sports Day', emoji: '🏆', color: 'from-amber-400 to-amber-600' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore the beauty and vibrancy of life at Academy Elite
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {filteredImages.map((image, index) => {
            // Masonry layout with varied heights
            const heightClass = index % 4 === 0 ? 'sm:col-span-2 sm:row-span-2' : '';

            return (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${heightClass}`}
              >
                <div
                  className={`bg-gradient-to-br ${image.color} w-full h-64 sm:h-80 ${heightClass ? 'h-96 sm:h-[500px]' : ''} flex items-center justify-center relative overflow-hidden`}
                  onClick={() => setSelectedImage(image.id.toString())}
                >
                  {/* Background animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Emoji Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-6xl sm:text-8xl relative z-10 group-hover:scale-110 transition-transform"
                  >
                    {image.emoji}
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm">Click to view</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              No images in this category
            </p>
          </motion.div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            {(() => {
              const image = galleryImages.find(img => img.id.toString() === selectedImage);
              return (
                <div className={`bg-gradient-to-br ${image?.color} w-full aspect-video flex items-center justify-center rounded-2xl relative`}>
                  <div className="text-9xl">{image?.emoji}</div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h2 className="text-3xl font-bold">{image?.title}</h2>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Total Photos', value: '500+' },
              { label: 'Campus Events', value: '50+' },
              { label: 'Happy Moments', value: 'Infinite' },
              { label: 'Updated Regularly', value: '✓' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
