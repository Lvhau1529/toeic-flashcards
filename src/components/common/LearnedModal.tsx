import React from 'react';
import { X, Volume2, Trash2, CheckCircle2 } from 'lucide-react';
import type { Word } from '../../types';
import { speakEnglish } from '../../utils/speech';

interface LearnedModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnedWords: Word[];
  onUnmark: (wordId: string, lessonId: number) => void;
  lessonTitle: string;
}

export const LearnedModal: React.FC<LearnedModalProps> = ({
  isOpen,
  onClose,
  learnedWords,
  onUnmark,
  lessonTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className="animate-in fade-in slide-in-from-bottom-6 flex max-h-[85vh] w-full max-w-md flex-col rounded-t-3xl border border-gray-100 bg-white shadow-2xl transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Từ đã thuộc ({learnedWords.length})
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lessonTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Word List */}
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {learnedWords.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/50">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Chưa có từ nào được đánh dấu là "Đã thuộc"
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Bấm phím [Enter] hoặc nút tick xanh trên flashcard để đánh dấu
                từ đã thuộc nhé!
              </p>
            </div>
          ) : (
            learnedWords.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/70 p-3.5 transition hover:bg-gray-100/80 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-gray-900 dark:text-white">
                      {word.en}
                    </span>
                    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {word.pos}
                    </span>
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                      {word.ipa}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-600 dark:text-gray-300">
                    {word.vi}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => speakEnglish(word.en)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400"
                    title="Phát âm"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onUnmark(word.id, word.lessonId)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 dark:hover:text-rose-400"
                    title="Bỏ đánh dấu đã thuộc"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.99] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
