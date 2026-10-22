import React from 'react';
import { LogIn, CheckCircle2, ShieldCheck, Cloud, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  title?: string;
  description?: string;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  title = 'Đăng nhập để lưu từ đã thuộc',
  description = 'Tính năng đánh dấu từ vựng đã thuộc và theo dõi tiến độ chỉ dành cho người dùng đã đăng nhập tài khoản.',
}) => {
  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6">
        {/* Icon & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <DialogHeader className="mt-3 text-center sm:text-center">
            <DialogTitle className="text-lg font-black tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Benefits List */}
        <div className="my-3 space-y-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <Cloud className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Lưu trữ tiến độ học tập trên máy chủ vĩnh viễn</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <Zap className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Lọc nhanh từ đã thuộc để tập trung từ chưa nhớ</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-purple-500" />
            <span>
              Đồng bộ tiến độ học trên mọi thiết bị máy tính, điện thoại
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <Button
            type="button"
            onClick={handleLoginClick}
            className="w-full gap-2 text-sm font-bold"
          >
            <LogIn className="h-4 w-4" />
            Đăng nhập ngay
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Để sau, tôi sẽ tiếp tục xem thẻ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
