import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="animate-in fade-in zoom-in-95 w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl transition-all duration-150 dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-950/60">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Xác nhận đặt lại tiến độ?
          </h3>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Tất cả các từ đã đánh dấu "Đã thuộc" trong bài{' '}
            <strong className="text-gray-700 dark:text-gray-200">
              "{lessonTitle}"
            </strong>{' '}
            sẽ được xóa và đưa về trạng thái chưa học.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-500 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại ngay
          </button>
        </div>
      </div>
    </div>
  );
};
