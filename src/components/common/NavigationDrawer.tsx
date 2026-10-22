import React from 'react';
import {
  Sparkles,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Moon,
  Sun,
  GraduationCap,
  ShieldCheck,
  LogIn,
} from 'lucide-react';
import type { ThemeMode, Word, LessonItem } from '../../types';
import type { Course, User } from '../../services/api';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
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
  lessonsList: LessonItem[];
  allWordsList: Word[];
  courses: Course[];
  selectedCourseId: number;
  onSelectCourse: (id: number) => void;
  user: User | null;
  onOpenAuthModal: () => void;
  onOpenAdmin: () => void;
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

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="flex w-[82vw] max-w-sm flex-col p-0">
        {/* Drawer Header */}
        <SheetHeader className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <SheetTitle className="text-left text-sm font-extrabold text-slate-900 dark:text-white">
                TOEIC Vocab
              </SheetTitle>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Danh mục bài học
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* User Profile / Login status on mobile drawer */}
        <div className="border-b border-slate-100 px-5 py-3 dark:border-slate-800">
          {user ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {user.email}
                </div>
                <Badge
                  variant={user.role === 'ADMIN' ? 'purple' : 'success'}
                  className="mt-0.5 px-2 py-0 text-[9px]"
                >
                  {user.role}
                </Badge>
              </div>
              {user.role === 'ADMIN' && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="h-7 gap-1 text-xs text-purple-700 dark:text-purple-300"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="w-full gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <LogIn className="h-4 w-4" />
              Đăng nhập tài khoản
            </Button>
          )}
        </div>

        {/* Course Selector on Mobile */}
        {courses.length > 0 && (
          <div className="border-b border-slate-100 px-5 py-3 dark:border-slate-800">
            <label className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Chọn Khoá học
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

        {/* Overall Progress Widget */}
        <div className="mx-4 my-3 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 p-3.5 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-teal-950/20">
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
            onClick={() => {
              onClose();
              onOpenLearnedModal();
            }}
            className="shadow-xs mt-2.5 w-full gap-1.5 bg-white text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Danh sách từ đã thuộc
          </Button>
        </div>

        {/* Lessons List Navigation */}
        <div className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Danh mục bài học
          </div>

          {/* All Lessons Option */}
          <button
            type="button"
            onClick={() => {
              onSelectLesson(0);
              onClose();
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition ${
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

          {/* Lesson Items */}
          {lessonsList.map((lesson) => {
            const isSelected = selectedLessonId === lesson.lessonId;
            const learnedCount = getLearnedCount(lesson.lessonId);
            const totalWords = lesson.words.length;
            const pct = Math.round((learnedCount / (totalWords || 1)) * 100);

            return (
              <button
                key={lesson.lessonId}
                type="button"
                onClick={() => {
                  onSelectLesson(lesson.lessonId);
                  onClose();
                }}
                className={`flex w-full flex-col rounded-xl px-3.5 py-2.5 text-left text-xs transition ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
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

        {/* Drawer Footer */}
        <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">
          {selectedLessonId > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onOpenResetModal();
              }}
              className="w-full gap-1.5 border-rose-200 bg-rose-50/60 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Đặt lại tiến độ bài {selectedLessonId}
            </Button>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Giao diện
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
      </SheetContent>
    </Sheet>
  );
};
