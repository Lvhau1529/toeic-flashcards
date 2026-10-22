import React from 'react';
import {
  Menu,
  Moon,
  Sun,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  LogIn,
  LogOut,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';
import type { ThemeMode } from '../../types';
import type { User } from '../../services/api';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface HeaderProps {
  selectedLessonId: number;
  onOpenDrawer: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  learnedCount: number;
  totalWordsInLesson: number;
  onOpenLearnedModal: () => void;
  onOpenResetModal: () => void;
  lessonTitle: string;
  courseTitle?: string;
  user: User | null;
  onOpenAuthModal: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
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
  lessonTitle,
  courseTitle = 'Pre TOEIC',
  user,
  onOpenAuthModal,
  onOpenAdmin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/90">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Drawer Trigger / Lesson Title */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                onClick={onOpenDrawer}
                className="h-10 w-10 rounded-2xl lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở danh sách bài học</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mở danh mục bài học</TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2.5">
            <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 sm:flex">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="font-mono text-[10px] font-bold"
                >
                  {courseTitle}
                </Badge>
                <h2 className="max-w-[180px] truncate text-sm font-bold text-slate-900 dark:text-white sm:max-w-xs md:max-w-md md:text-base">
                  {lessonTitle}
                </h2>
              </div>
              <p className="hidden text-[11px] text-slate-400 dark:text-slate-500 sm:block">
                {totalWordsInLesson} từ vựng trong danh sách
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Learned Badge / Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenLearnedModal}
                className="gap-1.5 border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-mono font-bold">{learnedCount}</span>
                <span className="text-[11px] opacity-70">
                  /{totalWordsInLesson} đã thuộc
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xem danh sách từ đã thuộc</TooltipContent>
          </Tooltip>

          {/* Reset Lesson Progress */}
          {selectedLessonId > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenResetModal}
                  className="hidden h-9 w-9 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 sm:flex"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Đặt lại tiến độ bài học này</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Đặt lại tiến độ bài học này</TooltipContent>
            </Tooltip>
          )}

          {/* Admin Dashboard shortcut button */}
          {user?.role === 'ADMIN' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenAdmin}
                  className="hidden items-center gap-1.5 border-purple-200 bg-purple-50 text-xs font-semibold text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300 sm:flex"
                >
                  <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span>Quản trị</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mở Trang Quản trị (Admin Portal)</TooltipContent>
            </Tooltip>
          )}

          {/* User Profile / Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs font-semibold"
                >
                  <Avatar className="h-5 w-5 rounded-md">
                    <AvatarFallback className="rounded-md bg-emerald-600 text-white">
                      <UserIcon className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[100px] truncate font-medium sm:inline">
                    {user.firstName || user.email.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-1.5 shadow-xl"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Vai trò:{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {user.role}
                      </strong>
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'ADMIN' && (
                  <DropdownMenuItem
                    onClick={onOpenAdmin}
                    className="cursor-pointer rounded-xl text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/60"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Trang Quản trị</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer rounded-xl text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/60"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={onOpenAuthModal}
              className="h-9 gap-1.5 px-3.5 text-xs font-semibold"
            >
              <LogIn className="h-4 w-4" />
              <span>Đăng nhập</span>
            </Button>
          )}

          {/* Dark Mode Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                onClick={onToggleTheme}
                className="h-9 w-9 rounded-xl"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700 transition-transform hover:-rotate-12" />
                )}
                <span className="sr-only">Chuyển đổi giao diện</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === 'dark'
                ? 'Chuyển sang giao diện Sáng'
                : 'Chuyển sang giao diện Tối'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
