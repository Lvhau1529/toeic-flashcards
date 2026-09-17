import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle,
  Volume2,
  VolumeX,
  Shuffle,
  Sparkles,
  Check,
} from 'lucide-react';
import type { Word } from '../../types';
import { speakEnglish } from '../../utils/speech';
import { fireConfetti } from '../../utils/confetti';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FlashcardDeckProps {
  words: Word[];
  isLearned: (wordId: string, lessonId: number) => boolean;
  onToggleLearned: (word: Word) => void;
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

  // Auto-play audio when card changes (skip on very first mount to avoid unwanted sound on reload)
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
    onToggleLearned(currentWord);

    if (willBeLearned) {
      fireConfetti();
    }

    // Small delay then auto advance if marking as learned
    if (willBeLearned && deck.length > 1) {
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  }, [currentWord, isCurrentLearned, onToggleLearned, deck.length, handleNext]);

  const handleShuffle = useCallback(() => {
    if (deck.length <= 1) return;
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck]);

  // Keyboard shortcuts integration: Left, Right, Space, Enter, A (Audio)
  useKeyboardShortcuts({
    onPrev: handlePrev,
    onNext: handleNext,
    onFlip: handleFlip,
    onEnter: handleToggleLearnedAndNext,
    onPlayAudio: handlePlayAudio,
    enabled: isActiveTab,
  });

  if (!currentWord || deck.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center p-6 text-center">
        <Sparkles className="h-12 w-12 animate-bounce text-emerald-500" />
        <h3 className="mt-4 text-base font-bold text-gray-800 dark:text-gray-100">
          Không có từ vựng nào trong bài học này!
        </h3>
      </div>
    );
  }

  // Calculate POS color badge
  const getPosBadgeColor = (pos: string) => {
    const p = pos.toLowerCase();
    if (p.includes('v'))
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    if (p.includes('n'))
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    if (p.includes('adj'))
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
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
            <span className="truncate text-xs font-semibold text-gray-600 dark:text-gray-300 md:text-sm">
              {lessonTitle}
            </span>
            <span className="shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {currentIndex + 1} / {deck.length}
            </span>
          </div>

          {/* Auto-Play Audio Toggle Switch */}
          <button
            type="button"
            onClick={() => setAutoPlayAudio((prev) => !prev)}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold transition active:scale-95 ${
              autoPlayAudio
                ? 'bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-500/30 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            title={
              autoPlayAudio
                ? 'Đang BẬT tự động phát âm khi chuyển thẻ (Nhấp để tắt)'
                : 'Đang TẮT tự động phát âm khi chuyển thẻ (Nhấp để bật)'
            }
          >
            {autoPlayAudio ? (
              <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-gray-400" />
            )}
            <span>Tự phát âm: {autoPlayAudio ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
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
            {/* Card Inner with 3D Flip */}
            <div
              className={`preserve-3d relative min-h-[380px] w-full rounded-3xl shadow-xl shadow-gray-200/50 transition-transform duration-500 dark:shadow-black/50 sm:min-h-[420px] md:min-h-[440px] lg:min-h-[460px] ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ===== FRONT FACE (ENGLISH) ===== */}
              <div
                onClick={handleFlip}
                className={`backface-hidden absolute inset-0 grid grid-rows-[auto_1fr_auto] rounded-3xl border border-gray-100/80 bg-gradient-to-b from-white to-gray-50/90 p-6 dark:border-gray-800 dark:from-gray-800/95 dark:to-gray-900 ${
                  isCurrentLearned ? 'ring-2 ring-emerald-500/50' : ''
                }`}
              >
                {/* Header row of Card Front */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-xl px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${getPosBadgeColor(
                      currentWord.pos,
                    )}`}
                  >
                    {currentWord.pos}
                  </span>

                  <div className="flex items-center gap-2">
                    {isCurrentLearned && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <Check className="h-3 w-3" /> Đã thuộc
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600 active:scale-90 dark:bg-gray-700/60 dark:text-gray-200 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
                      title="Phát âm từ vựng (Phím [A])"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Center Content: Word & IPA & Concise English Example */}
                <div className="my-auto flex flex-col items-center justify-center overflow-hidden py-3 text-center">
                  <h2 className="break-words px-2 text-3xl font-black leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                    {currentWord.en}
                  </h2>
                  <p className="mt-2 font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400 sm:text-base md:text-lg">
                    {currentWord.ipa}
                  </p>

                  {/* Concise English Example (No Vietnamese translation here so user doesn't guess the word) */}
                  {currentWord.example && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 flex max-w-md items-center justify-center gap-1.5 px-2 text-center"
                    >
                      <p className="text-xs font-medium italic text-gray-500 dark:text-gray-400 sm:text-sm">
                        "{currentWord.example.en}"
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(currentWord.example!.en);
                        }}
                        className="shrink-0 rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Hint */}
                <div className="border-t border-gray-100/60 pt-3 text-center text-xs font-medium text-gray-400 dark:border-gray-800/60 dark:text-gray-500">
                  <span>Nhấp vào thẻ hoặc bấm [Space] để xem nghĩa</span>
                </div>
              </div>

              {/* ===== BACK FACE (VIETNAMESE) ===== */}
              <div
                onClick={handleFlip}
                className={`backface-hidden rotate-y-180 absolute inset-0 grid grid-rows-[auto_1fr_auto] rounded-3xl border border-gray-100/80 bg-gradient-to-b from-white to-gray-50/90 p-6 dark:border-gray-800 dark:from-gray-800/95 dark:to-gray-900 sm:p-8 ${
                  isCurrentLearned ? 'ring-2 ring-emerald-500/50' : ''
                }`}
              >
                {/* Header row of Card Back */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 md:text-sm">
                      Nghĩa tiếng Việt
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600 active:scale-90 dark:bg-gray-700/60 dark:text-gray-200 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 md:h-10 md:w-10"
                      title="Phát âm tiếng Anh (Phím [A])"
                    >
                      <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>

                {/* Center Content: Vietnamese translation & Example with Vietnamese Meaning */}
                <div className="my-auto flex flex-col items-center justify-center overflow-hidden py-3 text-center">
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 md:text-sm">
                    {currentWord.en}
                  </div>
                  <p className="break-words px-2 text-2xl font-bold leading-snug text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                    {currentWord.vi}
                  </p>

                  {/* Concise Example with Vietnamese Translation on Back Face */}
                  {currentWord.example && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 max-w-md px-2 text-center"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                          "{currentWord.example.en}"
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(currentWord.example!.en);
                          }}
                          className="shrink-0 rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
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
                <div className="border-t border-gray-100/60 pt-3 text-center text-xs font-medium text-gray-400 dark:border-gray-800/60 dark:text-gray-500">
                  <span>Nhấp vào thẻ hoặc bấm [Space] để quay lại</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Bar - Centered with m-auto, shrink-0, tooltips */}
      <div className="mt-8 flex w-full max-w-sm items-center justify-between px-2 sm:max-w-md sm:px-6 md:max-w-xl lg:max-w-2xl">
        {/* Shuffle Button */}
        <div className="group relative">
          <button
            type="button"
            onClick={handleShuffle}
            className="m-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-200/80 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-gray-900 active:scale-90 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Trộn ngẫu nhiên thẻ"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block dark:bg-gray-700">
            Trộn thẻ
          </div>
        </div>

        {/* Previous Card Button */}
        <div className="group relative">
          <button
            type="button"
            onClick={handlePrev}
            className="m-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200/80 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-90 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Thẻ trước (←)"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block dark:bg-gray-700">
            Thẻ trước (←)
          </div>
        </div>

        {/* Flip Button */}
        <div className="group relative">
          <button
            type="button"
            onClick={handleFlip}
            className="m-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 active:scale-95"
            title="Lật thẻ (Phím Space)"
          >
            <RotateCw
              className={`h-6 w-6 transition-transform duration-300 ${
                isFlipped ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block dark:bg-gray-700">
            Lật thẻ [Space]
          </div>
        </div>

        {/* Mark as Learned Toggle Button */}
        <div className="group relative">
          <button
            type="button"
            onClick={handleToggleLearnedAndNext}
            className={`m-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition active:scale-90 ${
              isCurrentLearned
                ? 'border-emerald-400 bg-emerald-500 text-white'
                : 'border-gray-200/80 bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400'
            }`}
            title="Đánh dấu đã thuộc [Enter]"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block dark:bg-gray-700">
            {isCurrentLearned ? 'Bỏ thuộc' : 'Đã thuộc [Enter]'}
          </div>
        </div>

        {/* Next Card Button */}
        <div className="group relative">
          <button
            type="button"
            onClick={handleNext}
            className="m-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200/80 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-90 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Thẻ sau (→)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block dark:bg-gray-700">
            Thẻ sau (→)
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-gray-700 dark:bg-gray-800">
            ← / →
          </kbd>
          Chuyển
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-gray-700 dark:bg-gray-800">
            Space
          </kbd>
          Lật
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-emerald-400">
            A
          </kbd>
          Nghe phát âm
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-gray-700 dark:bg-gray-800">
            Enter
          </kbd>
          Thuộc
        </span>
      </div>
    </div>
  );
};
