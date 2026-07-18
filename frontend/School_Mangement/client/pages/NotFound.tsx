import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Header from "@/components/LandingHeader";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-9xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              404
            </div>
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or removed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
            >
              <Home size={20} />
              Return to Home
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
              Contact Support
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
