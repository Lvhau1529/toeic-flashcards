import React from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Moon,
  Sun,
  RotateCcw,
  Layers,
  Search,
  BrainCircuit,
} from 'lucide-react';
import { lessons, allWords } from '../../data/vocabulary';
import type { TabType, ThemeMode } from '../../types';

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  selectedLessonId: number;
  onSelectLesson: (id: number) => void;
  getLearnedCount: (lessonId?: number) => number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResetModal: () => void;
  onOpenLearnedModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  selectedLessonId,
  onSelectLesson,
  getLearnedCount,
  theme,
  onToggleTheme,
  onOpenResetModal,
  onOpenLearnedModal,
}) => {
  const totalLearnedAll = getLearnedCount(0);
  const totalPercentage = Math.round(
    (totalLearnedAll / (allWords.length || 1)) * 100,
  );

  const navTabs = [
    { id: 'flashcard' as TabType, label: 'Luyện Flashcard', icon: Layers },
    { id: 'search' as TabType, label: 'Tra cứu từ vựng', icon: Search },
    { id: 'quiz' as TabType, label: 'Kiểm tra Quiz', icon: BrainCircuit },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-gray-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-gray-800/80 dark:bg-gray-900/95 lg:flex">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5 dark:border-gray-800">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
              TOEIC Vocab
            </h1>
            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              PRO
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Học từ vựng thông minh
          </p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="px-4 pb-2 pt-4">
        <div className="space-y-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/70'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Progress Widget */}
      <div className="mx-4 my-2 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 p-3.5 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-teal-950/20">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-900 dark:text-emerald-200">
            Tiến độ tổng quát
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {totalLearnedAll}/{allWords.length} ({totalPercentage}%)
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-200/60 dark:bg-emerald-950">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
        <button
          type="button"
          onClick={onOpenLearnedModal}
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-1.5 text-xs font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 dark:bg-gray-800 dark:text-emerald-300 dark:hover:bg-gray-700"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          Danh sách từ đã thuộc
        </button>
      </div>

      {/* Lessons List with Scroll */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Danh mục bài học
        </div>

        {/* All Lessons */}
        <button
          type="button"
          onClick={() => onSelectLesson(0)}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
            selectedLessonId === 0
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Tất cả {allWords.length} từ vựng
          </span>
          <span className="font-mono text-[11px] opacity-80">
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
              onClick={() => onSelectLesson(lesson.lessonId)}
              className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left text-xs transition ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between font-medium">
                <span className="truncate pr-2">
                  <strong className="font-bold">Bài {lesson.lessonId}:</strong>{' '}
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

      {/* Sidebar Footer */}
      <div className="shrink-0 space-y-2 border-t border-gray-100 p-4 dark:border-gray-800">
        {selectedLessonId > 0 && (
          <button
            type="button"
            onClick={onOpenResetModal}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/60 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại tiến độ bài {selectedLessonId}
          </button>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Chế độ giao diện
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
    </aside>
  );
};
