import React from 'react';
import {
  Layers,
  Search,
  BrainCircuit,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Moon,
  Sun,
  BookOpen,
  LogIn,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import type { TabType, ThemeMode, Word, LessonItem } from '../../types';
import type { Course, User } from '../../services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

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
  lessonsList: LessonItem[];
  allWordsList: Word[];
  courses: Course[];
  selectedCourseId: number;
  onSelectCourse: (id: number) => void;
  user: User | null;
  onOpenAuthModal: () => void;
  onOpenAdmin: () => void;
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
  lessonsList,
  allWordsList,
  courses,
  selectedCourseId,
  onSelectCourse,
  user,
  onOpenAuthModal,
  onOpenAdmin,
}) => {
  const totalLearnedAll = getLearnedCount(0);
  const totalPercentage = Math.round(
    (totalLearnedAll / (allWordsList.length || 1)) * 100,
  );

  const navTabs = [
    { id: 'flashcard' as TabType, label: 'Luyện Flashcard', icon: Layers },
    { id: 'search' as TabType, label: 'Tra cứu từ vựng', icon: Search },
    { id: 'quiz' as TabType, label: 'Kiểm tra Quiz', icon: BrainCircuit },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-900/95 lg:flex">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                TOEIC Vocab
              </h1>
              <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                PRO
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Học từ vựng thông minh
            </p>
          </div>
        </div>

        {user ? (
          <div className="flex flex-col items-end">
            <Badge
              variant={user.role === 'ADMIN' ? 'purple' : 'success'}
              className="px-2 py-0 text-[9px]"
            >
              {user.role}
            </Badge>
            <span className="max-w-[75px] truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {user.firstName || user.email.split('@')[0]}
            </span>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAuthModal}
            className="h-8 gap-1 border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
          >
            <LogIn className="h-3.5 w-3.5" />
            Đăng nhập
          </Button>
        )}
      </div>

      {/* Course Selector */}
      {courses.length > 0 && (
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Khoá học đang chọn
          </label>
          <Select
            value={String(selectedCourseId)}
            onValueChange={(val) => onSelectCourse(Number(val))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn khoá học..." />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.title} ({c.level || c.targetScore})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="px-4 pb-2 pt-3">
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
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
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
            Tiến độ khoá học
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {totalLearnedAll}/{allWordsList.length} ({totalPercentage}%)
          </span>
        </div>
        <div className="mt-2">
          <Progress value={totalPercentage} />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenLearnedModal}
          className="shadow-xs mt-2.5 w-full gap-1.5 bg-white text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          Danh sách từ đã thuộc
        </Button>
      </div>

      {/* Lessons List with Scroll */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Danh mục bài học
        </div>

        {/* All Lessons */}
        <button
          type="button"
          onClick={() => onSelectLesson(0)}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
            selectedLessonId === 0
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Tất cả {allWordsList.length} từ vựng
          </span>
          <span className="font-mono text-[11px] opacity-80">
            {allWordsList.length} từ
          </span>
        </button>

        {/* Lessons */}
        {lessonsList.map((lesson) => {
          const isSelected = selectedLessonId === lesson.lessonId;
          const learnedCount = getLearnedCount(lesson.lessonId);
          const totalWords = lesson.words.length;
          const pct = Math.round((learnedCount / (totalWords || 1)) * 100);

          return (
            <button
              key={lesson.lessonId}
              type="button"
              onClick={() => onSelectLesson(lesson.lessonId)}
              className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left text-xs transition ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
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
      <div className="shrink-0 space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">
        {selectedLessonId > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResetModal}
            className="w-full gap-2 border-rose-200 bg-rose-50/60 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại tiến độ bài {selectedLessonId}
          </Button>
        )}

        {user?.role === 'ADMIN' && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAdmin}
            className="w-full gap-1.5 border-purple-200 bg-purple-50/70 text-xs font-semibold text-purple-700 hover:bg-purple-100 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300"
          >
            <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Trang Quản trị (Admin)
          </Button>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Chế độ giao diện
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            className="gap-1.5 text-xs font-medium"
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
          </Button>
        </div>
      </div>
    </aside>
  );
};
