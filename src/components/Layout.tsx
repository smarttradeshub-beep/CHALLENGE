import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Target, Sparkles, BarChart3, Home, Zap } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useDarkMode();
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 transition-all duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-600/30 dark:from-blue-400/20 dark:to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-500/30 to-cyan-600/30 dark:from-indigo-400/20 dark:to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/15 dark:to-teal-400/15 rounded-full blur-3xl"
        />
      </div>

      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 dark:bg-gray-950/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-lg dark:shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                </motion.div>
                <div>
                  <motion.h1 
                    whileHover={{ scale: 1.02 }}
                    className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
                  >
                    Challenge Tracker Pro
                  </motion.h1>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.div>
                    <span>Professional Edition</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <motion.nav 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden md:flex items-center space-x-2 bg-slate-100/80 dark:bg-gray-800/80 rounded-2xl p-1.5 backdrop-blur-sm"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/' 
                      ? 'bg-white dark:bg-gray-700 shadow-lg text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Challenges</span>
                </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                  to="/analytics"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/analytics' 
                      ? 'bg-white dark:bg-gray-700 shadow-lg text-purple-600 dark:text-purple-400' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">Analytics</span>
                </Link>
                </motion.div>
              </motion.nav>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800">
                  <Home className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/analytics" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800">
                  <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Link>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="relative p-3 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-all duration-300 group shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  {isDark ? (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun className="w-5 h-5 text-amber-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Moon className="w-5 h-5 text-slate-700" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative mt-20 bg-slate-50/50 dark:bg-gray-950/80 backdrop-blur-sm border-t border-slate-200/50 dark:border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>© 2025 Challenge Tracker. Designed for peak performance.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}