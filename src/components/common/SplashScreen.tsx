import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  minDuration?: number; // Minimum display time in ms (default: 650ms)
  onFinished: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  minDuration = 650,
  onFinished,
}) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Smooth progress simulation
    const pTimer1 = setTimeout(() => setProgress(65), 180);
    const pTimer2 = setTimeout(() => setProgress(100), minDuration - 150);

    // Minimum display timer
    const exitTimer = setTimeout(() => {
      setShow(false);
    }, minDuration);

    return () => {
      clearTimeout(pTimer1);
      clearTimeout(pTimer2);
      clearTimeout(exitTimer);
    };
  }, [minDuration]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex select-none flex-col items-center justify-center bg-slate-50 transition-colors dark:bg-slate-950"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          {/* Animated Logo Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-500/25">
              <BookOpen className="h-10 w-10" />
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'easeInOut',
                }}
                className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-amber-950 shadow-md"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </div>

            {/* App Brand Name */}
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              TOEIC Vocab
            </h1>
            <p className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500">
              Flashcard & Quiz Master
            </p>
          </motion.div>

          {/* Progress Bar with minimum duration transition */}
          <div className="mt-8 w-56 sm:w-64">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200/80 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center font-mono text-[11px] text-gray-400 dark:text-gray-500">
              Đang tải dữ liệu từ vựng...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
