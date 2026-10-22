import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lessonTitle: string;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  lessonTitle,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-950/60">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <DialogHeader className="mt-2 text-center sm:text-center">
          <DialogTitle className="text-base font-bold">
            Xác nhận đặt lại tiến độ?
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs">
            Tất cả các từ đã đánh dấu "Đã thuộc" trong bài{' '}
            <strong className="text-slate-900 dark:text-slate-100">
              "{lessonTitle}"
            </strong>{' '}
            sẽ được xóa và đưa về trạng thái chưa học.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex-row gap-2 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại ngay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
