import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle,
  Volume2,
  Shuffle,
  Check,
} from 'lucide-react';
import type { Word } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { fireConfetti } from '../../utils/confetti';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface FlashcardDeckProps {
  words: Word[];
  isLearned: (wordId: string, lessonId: number) => boolean;
  onToggleLearned: (word: Word) => boolean | void;
  lessonTitle: string;
  isActiveTab: boolean;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  words,
  isLearned,
  onToggleLearned,
  lessonTitle,
  isActiveTab,
}) => {
  const [deck, setDeck] = useState<Word[]>(words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Auto-play audio preference persisted in localStorage
  const [autoPlayAudio, setAutoPlayAudio] = useLocalStorage<boolean>(
    'toeic_autoplay_audio',
    false,
  );

  // Sync deck when input words list changes
  useEffect(() => {
    setDeck(words);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words]);

  const currentWord = deck[currentIndex];
  const isCurrentLearned = currentWord
    ? isLearned(currentWord.id, currentWord.lessonId)
    : false;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePlayAudio = useCallback(() => {
    if (currentWord) {
      speakEnglish(currentWord.en);
    }
  }, [currentWord]);

  const handleNext = useCallback(() => {
    if (deck.length <= 1) return;
    setDirection('left');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    if (deck.length <= 1) return;
    setDirection('right');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  // Auto-play audio when card changes
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (autoPlayAudio && currentWord) {
      speakEnglish(currentWord.en);
    }
  }, [currentIndex, autoPlayAudio, currentWord]);

  const handleToggleLearnedAndNext = useCallback(() => {
    if (!currentWord) return;
    const willBeLearned = !isCurrentLearned;
    const result = onToggleLearned(currentWord);

    if (result === false) {
      return;
    }

    if (willBeLearned) {
      fireConfetti();
    }

    if (deck.length > 1) {
      setTimeout(() => {
        handleNext();
      }, 250);
    }
  }, [currentWord, isCurrentLearned, onToggleLearned, deck.length, handleNext]);

  const handleShuffle = useCallback(() => {
    if (deck.length <= 1) return;
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck]);

  // Keyboard navigation shortcuts
  useKeyboardShortcuts({
    onFlip: handleFlip,
    onNext: handleNext,
    onPrev: handlePrev,
    onEnter: handleToggleLearnedAndNext,
    onPlayAudio: handlePlayAudio,
    enabled: isActiveTab,
  });

  if (!currentWord || deck.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center p-6 text-center">
        <p className="text-base font-semibold text-slate-500">
          Chưa có từ vựng nào trong bài học này.
        </p>
      </div>
    );
  }

  const getPosBadgeVariant = (
    pos?: string,
  ): 'default' | 'secondary' | 'purple' | 'success' => {
    if (!pos) return 'secondary';
    const p = pos.toLowerCase();
    if (p.includes('v')) return 'default';
    if (p.includes('n')) return 'secondary';
    if (p.includes('adj')) return 'purple';
    return 'success';
  };

  const progressPercentage = Math.round(
    ((currentIndex + 1) / deck.length) * 100,
  );

  return (
    <div className="flex w-full flex-col items-center px-4 pb-12 pt-4">
      {/* Top Status & Controls: Progress Bar + Auto-Play Audio Switch */}
      <div className="mb-4 w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <div className="mb-2 flex items-center justify-between gap-2">
          {/* Lesson Title & Card index */}
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-xs font-semibold text-slate-600 dark:text-slate-300 md:text-sm">
              {lessonTitle}
            </span>
            <Badge
              variant="secondary"
              className="font-mono text-[11px] font-bold"
            >
              {currentIndex + 1} / {deck.length}
            </Badge>
          </div>

          {/* Auto-Play Audio Toggle Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="auto-play-audio"
              checked={autoPlayAudio}
              onCheckedChange={setAutoPlayAudio}
            />
            <Label
              htmlFor="auto-play-audio"
              className="cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Tự phát âm
            </Label>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* 3D Flashcard Container with Swipe Gestures */}
      <div className="perspective-1000 relative w-full max-w-sm select-none sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentWord.id + '_' + currentIndex}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -300) {
                handleNext();
              } else if (info.offset.x > 50 || info.velocity.x > 300) {
                handlePrev();
              } else if (Math.abs(info.offset.x) < 5) {
                handleFlip();
              }
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
            }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              x: direction === 'left' ? -80 : 80,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="cursor-pointer"
          >
            {/* Card Frame */}
            <div
              className={`preserve-3d relative aspect-[4/3] w-full transition-transform duration-500 sm:aspect-[16/10] ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ===== FRONT FACE (ENGLISH) ===== */}
              <div
                onClick={handleFlip}
                className={`backface-hidden absolute inset-0 grid grid-rows-[auto_1fr_auto] rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900/95 dark:to-slate-950 ${
                  isCurrentLearned ? 'ring-2 ring-emerald-500/50' : ''
                }`}
              >
                {/* Header row of Card Front */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant={getPosBadgeVariant(currentWord.pos)}
                    className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
                  >
                    {currentWord.pos}
                  </Badge>

                  <div className="flex items-center gap-2">
                    {isCurrentLearned && (
                      <Badge
                        variant="success"
                        className="gap-1 px-2 py-0.5 text-[11px] font-bold"
                      >
                        <Check className="h-3 w-3" /> Đã thuộc
                      </Badge>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio();
                          }}
                          className="h-9 w-9 rounded-2xl text-slate-700 hover:text-emerald-600 dark:text-slate-200"
                        >
                          <Volume2 className="h-4 w-4" />
                          <span className="sr-only">
                            Phát âm từ vựng (Phím [A])
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Phát âm từ vựng [A]</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Center Content: Word & IPA & Concise English Example */}
                <div className="my-auto flex flex-col items-center justify-center overflow-hidden py-3 text-center">
                  <h2 className="break-words px-2 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                    {currentWord.en}
                  </h2>
                  <p className="mt-2 font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400 sm:text-base md:text-lg">
                    {currentWord.ipa}
                  </p>

                  {/* Concise English Example */}
                  {currentWord.example && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 flex max-w-md items-center justify-center gap-1.5 px-2 text-center"
                    >
                      <p className="text-xs font-medium italic text-slate-500 dark:text-slate-400 sm:text-sm">
                        "{currentWord.example.en}"
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakEnglish(currentWord.example!.en);
                            }}
                            className="h-7 w-7 shrink-0 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Nghe câu ví dụ</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Nghe câu ví dụ</TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>

                {/* Footer Hint */}
                <div className="border-t border-slate-100/80 pt-3 text-center text-xs font-medium text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
                  <span>Nhấp vào thẻ hoặc bấm [Space] để xem nghĩa</span>
                </div>
              </div>

              {/* ===== BACK FACE (VIETNAMESE) ===== */}
              <div
                onClick={handleFlip}
                className={`backface-hidden rotate-y-180 absolute inset-0 grid grid-rows-[auto_1fr_auto] rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900/95 dark:to-slate-950 sm:p-8 ${
                  isCurrentLearned ? 'ring-2 ring-emerald-500/50' : ''
                }`}
              >
                {/* Header row of Card Back */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 md:text-sm">
                      Nghĩa tiếng Việt
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio();
                          }}
                          className="h-9 w-9 rounded-2xl text-slate-700 hover:text-emerald-600 dark:text-slate-200 md:h-10 md:w-10"
                        >
                          <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                          <span className="sr-only">
                            Phát âm tiếng Anh (Phím [A])
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Phát âm tiếng Anh [A]</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Center Content: Vietnamese translation & Example */}
                <div className="my-auto flex flex-col items-center justify-center overflow-hidden py-3 text-center">
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 md:text-sm">
                    {currentWord.en}
                  </div>
                  <p className="break-words px-2 text-2xl font-bold leading-snug text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
                    {currentWord.vi}
                  </p>

                  {/* Concise Example with Vietnamese Translation on Back Face */}
                  {currentWord.example && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 max-w-md px-2 text-center"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                          "{currentWord.example.en}"
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakEnglish(currentWord.example!.en);
                              }}
                              className="h-7 w-7 shrink-0 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Nghe câu ví dụ</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Nghe câu ví dụ</TooltipContent>
                        </Tooltip>
                      </div>
                      {currentWord.example.vi && (
                        <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 sm:text-sm">
                          → {currentWord.example.vi}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Hint */}
                <div className="border-t border-slate-100/80 pt-3 text-center text-xs font-medium text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
                  <span>Nhấp vào thẻ hoặc bấm [Space] để quay lại</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Bar - Centered with Tooltips */}
      <div className="mt-8 flex w-full max-w-sm items-center justify-between px-2 sm:max-w-md sm:px-6 md:max-w-xl lg:max-w-2xl">
        {/* Shuffle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShuffle}
              className="shadow-xs h-11 w-11 rounded-2xl"
            >
              <Shuffle className="h-4 w-4" />
              <span className="sr-only">Trộn ngẫu nhiên thẻ</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Trộn thẻ</TooltipContent>
        </Tooltip>

        {/* Previous Card Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="shadow-xs h-12 w-12 rounded-2xl"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Thẻ trước (←)</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Thẻ trước [←]</TooltipContent>
        </Tooltip>

        {/* Flip Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handleFlip}
              className="h-14 w-14 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-500"
            >
              <RotateCw
                className={`h-6 w-6 transition-transform duration-300 ${
                  isFlipped ? 'rotate-180' : ''
                }`}
              />
              <span className="sr-only">Lật thẻ (Phím Space)</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Lật thẻ [Space]</TooltipContent>
        </Tooltip>

        {/* Mark as Learned Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isCurrentLearned ? 'default' : 'outline'}
              size="icon"
              onClick={handleToggleLearnedAndNext}
              className={`shadow-xs h-12 w-12 rounded-2xl ${
                isCurrentLearned
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              <span className="sr-only">
                {isCurrentLearned ? 'Bỏ thuộc' : 'Đã thuộc [Enter]'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isCurrentLearned ? 'Bỏ thuộc' : 'Đã thuộc [Enter]'}
          </TooltipContent>
        </Tooltip>

        {/* Next Card Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="shadow-xs h-12 w-12 rounded-2xl"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Thẻ sau (→)</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Thẻ sau [→]</TooltipContent>
        </Tooltip>
      </div>

      {/* Keyboard Shortcuts Helper Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
            ← / →
          </kbd>
          Chuyển
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
            Space
          </kbd>
          Lật
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-emerald-400">
            A
          </kbd>
          Nghe phát âm
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
            Enter
          </kbd>
          Thuộc
        </span>
      </div>
    </div>
  );
};
