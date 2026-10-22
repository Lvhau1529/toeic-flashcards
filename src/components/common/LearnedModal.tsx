import React from 'react';
import { Volume2, Trash2, CheckCircle2 } from 'lucide-react';
import type { Word } from '../../types';
import { speakEnglish } from '../../utils/speech';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

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
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-[85vh] max-w-md flex-col p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-50">
              Từ đã thuộc ({learnedWords.length})
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            {lessonTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Word List */}
        <div className="flex-1 space-y-2 overflow-y-auto py-2 pr-1">
          {learnedWords.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                Chưa có từ nào được đánh dấu là "Đã thuộc"
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Bấm phím [Enter] hoặc nút tick trên flashcard để đánh dấu từ đã
                thuộc nhé!
              </p>
            </div>
          ) : (
            learnedWords.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 transition-colors hover:bg-slate-100/80 dark:border-slate-800/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/70"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                      {word.en}
                    </span>
                    {word.pos && (
                      <Badge
                        variant="secondary"
                        className="px-1 py-0 text-[10px]"
                      >
                        {word.pos}
                      </Badge>
                    )}
                    {word.ipa && (
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {word.ipa}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-600 dark:text-slate-300">
                    {word.vi}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => speakEnglish(word.en)}
                    className="h-8 w-8 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    title="Phát âm"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUnmark(word.id, word.lessonId)}
                    className="h-8 w-8 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                    title="Bỏ đánh dấu đã thuộc"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button onClick={onClose} className="w-full">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
