import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Moon,
  Sun,
  RotateCcw,
} from 'lucide-react';
import { lessons, allWords } from '../../data/vocabulary';
import type { ThemeMode } from '../../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLessonId: number;
  onSelectLesson: (id: number) => void;
  getLearnedCount: (lessonId?: number) => number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResetModal: () => void;
  onOpenLearnedModal: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  selectedLessonId,
  onSelectLesson,
  getLearnedCount,
  theme,
  onToggleTheme,
  onOpenResetModal,
  onOpenLearnedModal,
}) => {
  const totalLearnedAll = getLearnedCount(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative flex h-full w-[82vw] max-w-sm flex-col border-r border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                    TOEIC Vocab
                  </h2>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Flashcard & Quiz Master
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Overall Progress Card */}
            <div className="m-4 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-teal-950/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  Tổng từ đã thuộc
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {totalLearnedAll} / {allWords.length}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-emerald-200/50 dark:bg-emerald-950">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${Math.round((totalLearnedAll / (allWords.length || 1)) * 100)}%`,
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLearnedModal();
                }}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-1.5 text-xs font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 dark:bg-gray-800 dark:text-emerald-300 dark:hover:bg-gray-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Quản lý từ đã thuộc
              </button>
            </div>

            {/* Lessons List Section */}
            <div className="flex-1 space-y-1 overflow-y-auto px-4 py-1">
              <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Chọn bài học
              </div>

              {/* All Lessons Option */}
              <button
                type="button"
                onClick={() => {
                  onSelectLesson(0);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
                  selectedLessonId === 0
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Tất cả bài học
                </span>
                <span className="text-[11px] opacity-80">
                  {allWords.length} từ
                </span>
              </button>

              {/* 7 Lessons */}
              {lessons.map((lesson) => {
                const isSelected = selectedLessonId === lesson.lessonId;
                const learnedCount = getLearnedCount(lesson.lessonId);
                const totalWords = lesson.words.length;
                const pct = Math.round((learnedCount / totalWords) * 100);

                return (
                  <button
                    key={lesson.lessonId}
                    type="button"
                    onClick={() => {
                      onSelectLesson(lesson.lessonId);
                      onClose();
                    }}
                    className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left text-xs transition ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span className="truncate pr-2">
                        <strong className="font-bold">
                          Bài {lesson.lessonId}:
                        </strong>{' '}
                        {lesson.lessonTitle}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] opacity-85">
                        {learnedCount}/{totalWords}
                      </span>
                    </div>

                    {/* Progress Bar under lesson item */}
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isSelected ? 'bg-white' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="space-y-2 border-t border-gray-100 p-4 dark:border-gray-800">
              {selectedLessonId > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenResetModal();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/60 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Đặt lại tiến độ bài {selectedLessonId}
                </button>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Giao diện
                </span>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" /> Sáng
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-slate-600" /> Tối
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
