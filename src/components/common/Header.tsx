import React from 'react';
import {
  Menu,
  Moon,
  Sun,
  RotateCcw,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { lessons, allWords } from '../../data/vocabulary';
import type { ThemeMode } from '../../types';

interface HeaderProps {
  selectedLessonId: number; // 0 for All
  onOpenDrawer: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  learnedCount: number;
  totalWordsInLesson: number;
  onOpenLearnedModal: () => void;
  onOpenResetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLessonId,
  onOpenDrawer,
  theme,
  onToggleTheme,
  learnedCount,
  totalWordsInLesson,
  onOpenLearnedModal,
  onOpenResetModal,
}) => {
  const currentLesson = lessons.find((l) => l.lessonId === selectedLessonId);
  const lessonDisplay =
    selectedLessonId === 0
      ? `Tất cả ${allWords.length} từ vựng`
      : `Bài ${selectedLessonId}: ${currentLesson?.lessonTitle || ''}`;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-gray-800/80 dark:bg-gray-900/90">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Hamburger button / Desktop Lesson title */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu button for Mobile/Tablet */}
          <button
            type="button"
            onClick={onOpenDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 lg:hidden"
            title="Mở danh bạ bài học"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Current Lesson Badge */}
          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 sm:flex">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="max-w-[200px] truncate text-sm font-bold text-gray-900 dark:text-white sm:max-w-xs md:max-w-md md:text-base">
                {lessonDisplay}
              </h2>
              <p className="hidden text-[11px] text-gray-400 dark:text-gray-500 sm:block">
                {totalWordsInLesson} từ vựng trong danh sách
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Learned list manager button with badge */}
          <button
            type="button"
            onClick={onOpenLearnedModal}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-95 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
            title="Xem danh sách từ đã thuộc"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>
              {learnedCount}
              <span className="opacity-70">/{totalWordsInLesson} đã thuộc</span>
            </span>
          </button>

          {/* Reset Lesson Progress (Visible on desktop header as well) */}
          {selectedLessonId > 0 && (
            <button
              type="button"
              onClick={onOpenResetModal}
              className="hidden h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-rose-50 hover:text-rose-600 active:scale-95 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 sm:flex"
              title="Reset tiến độ bài học này"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 active:scale-95 dark:bg-gray-800 dark:text-amber-400 dark:hover:bg-gray-700"
            title={
              theme === 'dark'
                ? 'Chuyển sang giao diện Sáng'
                : 'Chuyển sang giao diện Tối'
            }
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
