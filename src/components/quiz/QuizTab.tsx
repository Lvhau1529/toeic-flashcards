import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  Flame,
  Award,
} from 'lucide-react';
import type { Word } from '../../types';
import { removeVietnameseTones } from '../../utils/vietnamese';
import { speakEnglish } from '../../utils/speech';
import { fireConfetti } from '../../utils/confetti';

interface QuizTabProps {
  words: Word[];
  lessonTitle: string;
}

export const QuizTab: React.FC<QuizTabProps> = ({ words, lessonTitle }) => {
  const [quizMode, setQuizMode] = useState<'vi-to-en' | 'en-to-vi'>('vi-to-en');
  const [quizList, setQuizList] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [status, setStatus] = useState<'answering' | 'correct' | 'incorrect'>(
    'answering',
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize a randomized 10-word quiz round (or deck size if smaller)
  const startNewQuiz = useCallback(() => {
    if (words.length === 0) return;
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const roundWords = shuffled.slice(0, Math.min(10, shuffled.length));
    setQuizList(roundWords);
    setCurrentIndex(0);
    setInputAnswer('');
    setStatus('answering');
    setScore(0);
    setStreak(0);
    setIsCompleted(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, [words]);

  useEffect(() => {
    startNewQuiz();
  }, [words, quizMode, startNewQuiz]);

  const currentQuestion = quizList[currentIndex];

  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex((prev) => prev + 1);
      setInputAnswer('');
      setStatus('answering');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    } else {
      setIsCompleted(true);
      fireConfetti();
    }
  }, [currentIndex, quizList.length]);

  // Validate answer
  const handleCheckAnswer = useCallback(() => {
    if (!currentQuestion || status !== 'answering' || !inputAnswer.trim())
      return;

    let isMatch = false;

    if (quizMode === 'vi-to-en') {
      // User typed English
      const userText = inputAnswer.trim().toLowerCase();
      // Target could have synonyms e.g. "look at = gaze at = stare at"
      const targetVariants = currentQuestion.en
        .toLowerCase()
        .split(/[\/=,]/)
        .map((s) => s.trim());

      isMatch =
        targetVariants.includes(userText) ||
        currentQuestion.en.toLowerCase().trim() === userText;
    } else {
      // User typed Vietnamese
      const userText = removeVietnameseTones(inputAnswer.trim());
      const targetVariants = currentQuestion.vi
        .split(/[\/=(,]/)
        .map((s) => removeVietnameseTones(s.trim()));

      isMatch =
        targetVariants.some(
          (t) =>
            t &&
            (t === userText || userText.includes(t) || t.includes(userText)),
        ) || removeVietnameseTones(currentQuestion.vi).includes(userText);
    }

    if (isMatch) {
      setStatus('correct');
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      fireConfetti();
      speakEnglish(currentQuestion.en);
    } else {
      setStatus('incorrect');
      setStreak(0);
    }
  }, [currentQuestion, status, inputAnswer, quizMode]);

  // Form submit handles both checking answer AND advancing to next question on subsequent Enter
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'answering') {
      handleCheckAnswer();
    } else {
      handleNextQuestion();
    }
  };

  // Global keydown listener so Enter transitions immediately even if input loses focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (isCompleted) {
          e.preventDefault();
          startNewQuiz();
        } else if (status !== 'answering') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, isCompleted, handleNextQuestion, startNewQuiz]);

  if (!currentQuestion || quizList.length === 0) {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center p-6 text-center">
        <BrainCircuit className="h-14 w-14 animate-pulse text-emerald-500" />
        <h3 className="mt-4 text-base font-bold text-gray-800 dark:text-gray-100">
          Chưa có từ vựng để bắt đầu Quiz!
        </h3>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-24 pt-4 md:max-w-xl md:pb-12 lg:max-w-2xl">
      {/* Quiz Mode Switcher */}
      <div className="mb-4 flex rounded-2xl bg-gray-100 p-1.5 shadow-inner dark:bg-gray-800/80">
        <button
          type="button"
          onClick={() => setQuizMode('vi-to-en')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all md:text-sm ${
            quizMode === 'vi-to-en'
              ? 'bg-white font-bold text-emerald-600 shadow-sm dark:bg-gray-700 dark:text-emerald-400'
              : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Nghĩa Việt → Gõ từ Anh
        </button>
        <button
          type="button"
          onClick={() => setQuizMode('en-to-vi')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all md:text-sm ${
            quizMode === 'en-to-vi'
              ? 'bg-white font-bold text-emerald-600 shadow-sm dark:bg-gray-700 dark:text-emerald-400'
              : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Từ Anh → Gõ nghĩa Việt
        </button>
      </div>

      {isCompleted ? (
        /* Quiz Completion Card */
        <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-800/90 md:p-12">
          <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Award className="h-10 w-10" />
          </div>
          <h3 className="mt-5 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
            Hoàn thành vòng Quiz!
          </h3>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 md:text-sm">
            Bạn đã xuất sắc ôn tập xong {quizList.length} từ vựng trong{' '}
            {lessonTitle}.
          </p>

          <div className="my-8 flex items-center justify-center gap-6 md:gap-10">
            <div className="min-w-[120px] rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/60 md:p-6">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 md:text-4xl">
                {score}/{quizList.length}
              </span>
              <p className="mt-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 md:text-sm">
                Đúng {Math.round((score / quizList.length) * 100)}%
              </p>
            </div>
            <div className="min-w-[120px] rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/60 md:p-6">
              <div className="flex items-center justify-center gap-1.5 text-3xl font-black text-amber-500 md:text-4xl">
                <Flame className="h-7 w-7 fill-amber-500" /> {streak}
              </div>
              <p className="mt-1 text-xs font-medium text-amber-800 dark:text-amber-300 md:text-sm">
                Chuỗi đúng cao nhất
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewQuiz}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Luyện tập vòng mới [Enter]
          </button>
        </div>
      ) : (
        /* Active Quiz Question Card */
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-800/90 md:p-8">
          {/* Header row: Progress & Streak */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 text-xs dark:border-gray-700 md:text-sm">
            <span className="font-semibold text-gray-500 dark:text-gray-400">
              Câu {currentIndex + 1} / {quizList.length}
            </span>
            <div className="flex items-center gap-4">
              {streak > 0 && (
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Flame className="h-4 w-4 fill-amber-500" /> {streak} streak
                </span>
              )}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Điểm: {score}
              </span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="py-8 text-center">
            <span className="mb-3 inline-block rounded-xl bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {currentQuestion.pos}
            </span>

            {quizMode === 'vi-to-en' ? (
              /* Notice: IPA is hidden here to avoid giving away the answer */
              <div className="mt-1">
                <h3 className="px-2 text-2xl font-bold leading-snug text-gray-900 dark:text-white sm:text-3xl">
                  {currentQuestion.vi}
                </h3>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Nhớ lại và gõ từ vựng tiếng Anh tương ứng
                </p>
              </div>
            ) : (
              <div className="mt-1">
                <div className="flex items-center justify-center gap-2.5">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
                    {currentQuestion.en}
                  </h3>
                  <button
                    type="button"
                    onClick={() => speakEnglish(currentQuestion.en)}
                    className="rounded-full p-2 text-gray-400 transition hover:bg-emerald-50 hover:text-emerald-600 active:scale-90 dark:hover:bg-gray-700"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 font-mono text-sm text-emerald-600 dark:text-emerald-400">
                  {currentQuestion.ipa}
                </p>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                disabled={status !== 'answering'}
                autoComplete="off"
                spellCheck="false"
                placeholder={
                  quizMode === 'vi-to-en'
                    ? 'Nhập từ tiếng Anh...'
                    : 'Nhập nghĩa tiếng Việt...'
                }
                className={`w-full rounded-2xl border px-4 py-3.5 text-center text-base font-semibold shadow-inner transition focus:outline-none md:py-4 md:text-lg ${
                  status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : status === 'incorrect'
                      ? 'border-rose-500 bg-rose-50 text-rose-800 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-300'
                      : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white dark:border-gray-700 dark:bg-gray-900/60 dark:text-white'
                }`}
              />
            </div>

            {/* Status Feedback Result */}
            {status === 'correct' && (
              <div className="animate-in zoom-in-95 flex items-center justify-between rounded-2xl bg-emerald-100/70 p-3.5 text-xs font-bold text-emerald-800 duration-150 dark:bg-emerald-950/60 dark:text-emerald-300 md:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <span>Chính xác! </span>
                    <span className="font-mono font-normal opacity-85">
                      ({currentQuestion.en} - {currentQuestion.ipa})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => speakEnglish(currentQuestion.en)}
                  className="rounded-lg p-1 hover:bg-emerald-200/60 dark:hover:bg-emerald-900/60"
                  title="Phát âm"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {status === 'incorrect' && (
              <div className="animate-in zoom-in-95 space-y-1.5 rounded-2xl bg-rose-50 p-4 text-center text-xs text-rose-800 duration-150 dark:bg-rose-950/60 dark:text-rose-300 md:text-sm">
                <div className="flex items-center justify-center gap-1.5 font-bold">
                  <XCircle className="h-5 w-5 text-rose-600" /> Chưa chính xác!
                </div>
                <div className="pt-1">
                  Đáp án chuẩn:{' '}
                  <strong className="text-sm font-black text-rose-900 dark:text-rose-200 md:text-base">
                    {quizMode === 'vi-to-en'
                      ? currentQuestion.en
                      : currentQuestion.vi}
                  </strong>
                  <span className="ml-2 font-mono text-xs opacity-80">
                    {currentQuestion.ipa}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {status === 'answering' ? (
              <button
                type="submit"
                disabled={!inputAnswer.trim()}
                className="w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 md:text-sm"
              >
                Kiểm tra kết quả [Enter]
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-gray-800 active:scale-[0.99] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 md:text-sm"
              >
                Tiếp tục từ mới [Enter]
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
