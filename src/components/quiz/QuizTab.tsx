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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

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
        targetVariants.some((variant) => userText.includes(variant)) ||
        removeVietnameseTones(currentQuestion.vi).includes(userText);
    }

    if (isMatch) {
      setStatus('correct');
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      speakEnglish(currentQuestion.en);
    } else {
      setStatus('incorrect');
      setStreak(0);
    }
  }, [currentQuestion, status, inputAnswer, quizMode]);

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
        <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">
          Chưa có từ vựng để bắt đầu Quiz!
        </h3>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-24 pt-4 md:max-w-xl md:pb-12 lg:max-w-2xl">
      {/* Quiz Mode Switcher */}
      <div className="mb-4 flex gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/80">
        <Button
          variant={quizMode === 'vi-to-en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setQuizMode('vi-to-en')}
          className="flex-1 rounded-xl text-xs font-semibold"
        >
          Nghĩa Việt → Gõ từ Anh
        </Button>
        <Button
          variant={quizMode === 'en-to-vi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setQuizMode('en-to-vi')}
          className="flex-1 rounded-xl text-xs font-semibold"
        >
          Từ Anh → Gõ nghĩa Việt
        </Button>
      </div>

      {isCompleted ? (
        /* Quiz Completion Card */
        <Card className="p-6 text-center shadow-xl md:p-10">
          <CardContent className="p-0">
            <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Award className="h-10 w-10" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
              Hoàn thành vòng Quiz!
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 md:text-sm">
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

            <Button
              onClick={startNewQuiz}
              className="w-full gap-2 py-3.5 text-sm font-bold"
            >
              <RotateCcw className="h-4 w-4" />
              Luyện tập vòng mới [Enter]
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Active Quiz Question Card */
        <Card className="p-6 shadow-xl md:p-8">
          <CardContent className="p-0">
            {/* Header row: Progress & Streak */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 text-xs dark:border-slate-800 md:text-sm">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Câu {currentIndex + 1} / {quizList.length}
              </span>
              <div className="flex items-center gap-3">
                {streak > 0 && (
                  <Badge
                    variant="secondary"
                    className="gap-1 font-bold text-amber-500"
                  >
                    <Flame className="h-3.5 w-3.5 fill-amber-500" /> {streak}{' '}
                    streak
                  </Badge>
                )}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Điểm: {score}
                </span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="py-8 text-center">
              <Badge variant="secondary" className="mb-3 uppercase">
                {currentQuestion.pos}
              </Badge>

              {quizMode === 'vi-to-en' ? (
                <div className="mt-1">
                  <h3 className="px-2 text-2xl font-bold leading-snug text-slate-900 dark:text-white sm:text-3xl">
                    {currentQuestion.vi}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                    Nhớ lại và gõ từ vựng tiếng Anh tương ứng
                  </p>
                </div>
              ) : (
                <div className="mt-1">
                  <div className="flex items-center justify-center gap-2.5">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
                      {currentQuestion.en}
                    </h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => speakEnglish(currentQuestion.en)}
                          className="h-9 w-9 rounded-full text-slate-400 hover:text-emerald-600"
                        >
                          <Volume2 className="h-5 w-5" />
                          <span className="sr-only">Nghe phát âm</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Nghe phát âm</TooltipContent>
                    </Tooltip>
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
                <Input
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
                  className={`h-12 text-center text-base font-semibold md:h-14 md:text-lg ${
                    status === 'correct'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : status === 'incorrect'
                        ? 'border-red-500 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300'
                        : ''
                  }`}
                />
              </div>

              {/* Status Feedback Result */}
              {status === 'correct' && (
                <Alert variant="success" className="animate-in zoom-in-95">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Chính xác!
                  </AlertTitle>
                  <AlertDescription className="text-xs text-emerald-700 dark:text-emerald-400">
                    {currentQuestion.en} - {currentQuestion.ipa} (
                    {currentQuestion.vi})
                  </AlertDescription>
                </Alert>
              )}

              {status === 'incorrect' && (
                <Alert variant="destructive" className="animate-in zoom-in-95">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle className="text-xs font-bold text-red-800 dark:text-red-300">
                    Chưa chính xác!
                  </AlertTitle>
                  <AlertDescription className="text-xs text-red-700 dark:text-red-400">
                    Đáp án chuẩn:{' '}
                    <strong>
                      {quizMode === 'vi-to-en'
                        ? currentQuestion.en
                        : currentQuestion.vi}
                    </strong>{' '}
                    ({currentQuestion.ipa})
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              {status === 'answering' ? (
                <Button
                  type="submit"
                  disabled={!inputAnswer.trim()}
                  className="w-full py-3.5 text-xs font-bold md:text-sm"
                >
                  Kiểm tra kết quả [Enter]
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full gap-2 py-3.5 text-xs font-bold md:text-sm"
                >
                  Tiếp tục từ mới [Enter]
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
