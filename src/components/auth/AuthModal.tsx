import React, { useState } from 'react';
import { LogIn, UserPlus, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import type { User } from '../../services/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  login: (creds: { email: string; password: string }) => Promise<User>;
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<User>;
  noticeMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  login,
  register,
  noticeMessage,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (tab === 'login') {
        const user = await login({ email, password });
        onSuccess(user);
        onClose();
      } else {
        const user = await register({ email, password, firstName, lastName });
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: 'admin' | 'user') => {
    setError(null);
    setIsSubmitting(true);
    try {
      const creds =
        role === 'admin'
          ? { email: 'admin@toeic.com', password: 'Admin123456@' }
          : { email: 'user@toeic.com', password: 'User123456@' };
      const user = await login(creds);
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-lg font-bold">
            Tài khoản TOEIC Flashcards
          </DialogTitle>
          <DialogDescription className="text-xs">
            Đăng nhập để lưu trữ từ vựng đã học và đồng bộ tiến độ học tập.
          </DialogDescription>
        </DialogHeader>

        {/* Notice Message Banner */}
        {noticeMessage && !error && (
          <Alert variant="success" className="py-2.5">
            <Sparkles className="h-4 w-4" />
            <AlertDescription className="text-xs font-semibold">
              {noticeMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="py-2.5">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription className="text-xs font-semibold">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs for Login / Register */}
        <Tabs
          value={tab}
          onValueChange={(val) => {
            setTab(val as 'login' | 'register');
            setError(null);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="gap-1.5">
              <LogIn className="h-3.5 w-3.5" />
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-1.5">
              <UserPlus className="h-3.5 w-3.5" />
              Đăng ký
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <TabsContent value="register" className="mt-0 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Họ và tên đệm
                  </Label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nguyễn Văn"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tên
                  </Label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="An"
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="login" className="mt-0" />

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Mật khẩu
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 font-bold"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : tab === 'login' ? (
                'Đăng nhập'
              ) : (
                'Tạo tài khoản'
              )}
            </Button>
          </form>
        </Tabs>

        {/* Quick Login Test Accounts */}
        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Tài khoản mẫu thử nghiệm:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              disabled={isSubmitting}
              className="rounded-xl border border-purple-200/80 bg-purple-50/50 p-2.5 text-left text-xs font-semibold text-purple-700 transition hover:bg-purple-100/70 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300 dark:hover:bg-purple-900/50"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Badge variant="purple" className="px-1 py-0 text-[9px]">
                  ADMIN
                </Badge>
                <span className="truncate">admin@toeic.com</span>
              </div>
              <div className="mt-0.5 text-[10px] text-purple-600/70 dark:text-purple-400/70">
                Toàn quyền quản trị
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              disabled={isSubmitting}
              className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-2.5 text-left text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100/70 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Badge variant="success" className="px-1 py-0 text-[9px]">
                  USER
                </Badge>
                <span className="truncate">user@toeic.com</span>
              </div>
              <div className="mt-0.5 text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
                Học viên (Học từ)
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
