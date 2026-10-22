import { useState, useMemo, useEffect, useCallback } from 'react';
import type { TabType, Word, LessonItem } from './types';
import {
  allWords as defaultAllWords,
  lessons as defaultLessons,
} from './data/vocabulary';
import {
  toeic500AllWords,
  toeic500Lessons,
} from './data/vocabulary500';
import { useTheme } from './hooks/useTheme';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { api, type Course } from './services/api';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { NavigationDrawer } from './components/common/NavigationDrawer';
import { LearnedModal } from './components/common/LearnedModal';
import { ResetConfirmModal } from './components/common/ResetConfirmModal';
import { FlashcardDeck } from './components/flashcard/FlashcardDeck';
import { SearchTab } from './components/search/SearchTab';
import { QuizTab } from './components/quiz/QuizTab';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginPromptModal } from './components/common/LoginPromptModal';
import { TooltipProvider } from './components/ui/tooltip';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Auth Hook
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Courses & Lessons State
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Pre TOEIC',
      slug: 'pre-toeic',
      level: 'Cơ bản',
      targetScore: '350 - 500',
      orderIndex: 1,
      totalLessons: defaultLessons.length,
      totalWords: defaultAllWords.length,
    },
    {
      id: 2,
      title: 'TOEIC 500+',
      slug: 'toeic-500-plus',
      level: 'Trung cấp',
      targetScore: '500 - 750',
      orderIndex: 2,
      totalLessons: toeic500Lessons.length,
      totalWords: toeic500AllWords.length,
    },
  ]);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [courseLessons, setCourseLessons] =
    useState<LessonItem[]>(defaultLessons);
  const [courseWords, setCourseWords] = useState<Word[]>(defaultAllWords);

  // Words map per course for global search and caching
  const [coursesWordsMap, setCoursesWordsMap] = useState<
    Record<number, Word[]>
  >({
    1: defaultAllWords,
    2: toeic500AllWords,
  });

  // All words combined across all courses for global search
  const allGlobalWords = useMemo(() => {
    const list = Object.values(coursesWordsMap).flat();
    return list.length > 0 ? list : [...defaultAllWords, ...toeic500AllWords];
  }, [coursesWordsMap]);

  // Load courses from backend if available and prefetch all course words
  useEffect(() => {
    api
      .getCourses()
      .then(async (data) => {
        if (data && data.length > 0) {
          setCourses(data);
          // Preload words for all courses in background so search has everything right away
          data.forEach(async (c) => {
            try {
              const apiLessons = await api.getLessons(c.id);
              if (apiLessons && apiLessons.length > 0) {
                const detailedLessons = await Promise.all(
                  apiLessons.map((l) => api.getLesson(l.id)),
                );
                const loadedWords: Word[] = [];
                detailedLessons.forEach((l, lIdx) => {
                  const lessonNumber = l.orderIndex || lIdx + 1;
                  (l.vocabularies || []).forEach((v, vIdx) => {
                    loadedWords.push({
                      id: `c${c.id}_l${lessonNumber}_w${vIdx + 1}_${v.word.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
                      numericId: v.id,
                      en: v.word,
                      vi: v.meaning,
                      pos: v.partOfSpeech || 'v',
                      ipa: v.ipa || '',
                      lessonId: lessonNumber,
                      lessonTitle: l.title,
                      courseId: c.id,
                      courseTitle: c.title,
                      example: v.exampleSentence
                        ? {
                            en: v.exampleSentence,
                            vi: v.exampleTranslation || undefined,
                          }
                        : undefined,
                    });
                  });
                });
                setCoursesWordsMap((prev) => ({
                  ...prev,
                  [c.id]: loadedWords,
                }));
              }
            } catch {
              // fallback remains intact
            }
          });
        }
      })
      .catch(() => {
        // Fallback to default local courses
      });
  }, []);

  // Load lessons & vocabularies when course changes
  const loadCourseData = useCallback(async (courseId: number) => {
    try {
      const apiLessons = await api.getLessons(courseId);
      if (apiLessons && apiLessons.length > 0) {
        // Fetch detailed vocabularies for all lessons in this course
        const detailedLessons = await Promise.all(
          apiLessons.map((l) => api.getLesson(l.id)),
        );

        const targetCourse = courses.find((c) => c.id === courseId);
        const courseTitle =
          targetCourse?.title || (courseId === 2 ? 'TOEIC 500+' : 'Pre TOEIC');

        const words: Word[] = [];
        const lessonsData: LessonItem[] = detailedLessons.map((l, lIdx) => {
          const lessonNumber = l.orderIndex || lIdx + 1;
          const lessonWords: Word[] = (l.vocabularies || []).map((v, vIdx) => ({
            id: `c${courseId}_l${lessonNumber}_w${vIdx + 1}_${v.word.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
            numericId: v.id,
            en: v.word,
            vi: v.meaning,
            pos: v.partOfSpeech || 'v',
            ipa: v.ipa || '',
            lessonId: lessonNumber,
            lessonTitle: l.title,
            courseId: courseId,
            courseTitle: courseTitle,
            example: v.exampleSentence
              ? {
                  en: v.exampleSentence,
                  vi: v.exampleTranslation || undefined,
                }
              : undefined,
          }));

          words.push(...lessonWords);

          return {
            lessonId: lessonNumber,
            lessonTitle: l.title,
            words: lessonWords,
          };
        });

        setCourseLessons(lessonsData);
        setCourseWords(words);
        setCoursesWordsMap((prev) => ({
          ...prev,
          [courseId]: words,
        }));
        return;
      }
    } catch {
      // Backend not running or error, use fallback
    }

    // Fallback for Courses when offline/backend unavailable
    if (courseId === 1) {
      setCourseLessons(defaultLessons);
      setCourseWords(defaultAllWords);
      setCoursesWordsMap((prev) => ({
        ...prev,
        1: defaultAllWords,
      }));
    } else if (courseId === 2) {
      setCourseLessons(toeic500Lessons);
      setCourseWords(toeic500AllWords);
      setCoursesWordsMap((prev) => ({
        ...prev,
        2: toeic500AllWords,
      }));
    }
  }, [courses]);

  useEffect(() => {
    loadCourseData(selectedCourseId);
    setSelectedLessonId(1); // Reset to Lesson 1 on course switch
  }, [selectedCourseId, loadCourseData]);

  // Progress Hook (synced with active course & words, plus all global words)
  const {
    isLearned,
    toggleLearned,
    unmarkLearned,
    resetLesson,
    getLearnedCount,
    getLearnedWordsList,
  } = useProgress(
    courseWords,
    selectedCourseId,
    isAuthenticated,
    allGlobalWords,
  );

  const [activeTab, setActiveTab] = useState<TabType>('flashcard');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);

  // Modals & Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLearnedModalOpen, setIsLearnedModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [authNoticeMessage, setAuthNoticeMessage] = useState<
    string | undefined
  >(undefined);

  // Filter words for active lesson or all lessons
  const currentWords = useMemo(() => {
    if (selectedLessonId === 0) return courseWords;
    return courseWords.filter((w) => w.lessonId === selectedLessonId);
  }, [selectedLessonId, courseWords]);

  const currentLesson = courseLessons.find(
    (l) => l.lessonId === selectedLessonId,
  );
  const currentCourse = courses.find((c) => c.id === selectedCourseId);

  const lessonTitle =
    selectedLessonId === 0
      ? `Tất cả ${courseWords.length} từ vựng`
      : `Bài ${selectedLessonId}: ${currentLesson?.lessonTitle || ''}`;

  const currentLearnedCount = getLearnedCount(selectedLessonId);
  const learnedWordsList = getLearnedWordsList(selectedLessonId);

  // Intercept learned toggle: require login
  const handleToggleLearned = useCallback(
    (word: Word): boolean => {
      if (!isAuthenticated) {
        setAuthNoticeMessage(
          'Đăng nhập để lưu từ vựng đã thuộc và theo dõi tiến độ học tập của bạn!',
        );
        setIsLoginPromptOpen(true);
        return false;
      }
      return toggleLearned(word);
    },
    [isAuthenticated, toggleLearned],
  );

  // Intercept learned modal: require login
  const handleOpenLearnedModal = useCallback(() => {
    if (!isAuthenticated) {
      setAuthNoticeMessage(
        'Đăng nhập để xem danh sách các từ vựng bạn đã thuộc!',
      );
      setIsLoginPromptOpen(true);
      return;
    }
    setIsLearnedModalOpen(true);
  }, [isAuthenticated]);

  // Intercept reset modal: require login
  const handleOpenResetModal = useCallback(() => {
    if (!isAuthenticated) {
      setAuthNoticeMessage('Đăng nhập để quản lý và đặt lại tiến độ bài học!');
      setIsLoginPromptOpen(true);
      return;
    }
    setIsResetModalOpen(true);
  }, [isAuthenticated]);

  // If Admin View is active and user has ADMIN role, render Admin Dashboard
  if (isAdminView && user?.role === 'ADMIN') {
    return (
      <AdminDashboard
        onBackToApp={() => {
          setIsAdminView(false);
          loadCourseData(selectedCourseId);
        }}
        currentUser={user}
      />
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      {!isSplashDone && (
        <SplashScreen
          minDuration={650}
          onFinished={() => setIsSplashDone(true)}
        />
      )}

      <div className="flex min-h-screen w-full bg-slate-100/70 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        {/* 1. Desktop Dedicated Sidebar (Hidden on mobile/tablet, Visible on lg+) */}
        <Sidebar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          selectedLessonId={selectedLessonId}
          onSelectLesson={setSelectedLessonId}
          getLearnedCount={getLearnedCount}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResetModal={handleOpenResetModal}
          onOpenLearnedModal={handleOpenLearnedModal}
          lessonsList={courseLessons}
          allWordsList={courseWords}
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
          user={user}
          onOpenAuthModal={() => {
            setAuthNoticeMessage(undefined);
            setIsAuthModalOpen(true);
          }}
          onOpenAdmin={() => setIsAdminView(true)}
        />

        {/* 2. Mobile Slide-over Drawer (Hamburger Menu for < lg screens) */}
        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          selectedLessonId={selectedLessonId}
          onSelectLesson={setSelectedLessonId}
          getLearnedCount={getLearnedCount}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResetModal={handleOpenResetModal}
          onOpenLearnedModal={handleOpenLearnedModal}
          lessonsList={courseLessons}
          allWordsList={courseWords}
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
          user={user}
          onOpenAuthModal={() => {
            setAuthNoticeMessage(undefined);
            setIsAuthModalOpen(true);
          }}
          onOpenAdmin={() => setIsAdminView(true)}
        />

        {/* 3. Main Content Area */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-white shadow-sm dark:bg-slate-900">
          {/* Top Header */}
          <Header
            selectedLessonId={selectedLessonId}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
            learnedCount={currentLearnedCount}
            totalWordsInLesson={
              activeTab === 'search'
                ? allGlobalWords.length
                : currentWords.length
            }
            onOpenLearnedModal={handleOpenLearnedModal}
            onOpenResetModal={handleOpenResetModal}
            lessonTitle={
              activeTab === 'search'
                ? 'Tìm kiếm từ vựng (Tất cả khoá học)'
                : lessonTitle
            }
            courseTitle={
              activeTab === 'search'
                ? 'Tất cả khoá học'
                : currentCourse?.title || 'Pre TOEIC'
            }
            user={user}
            onOpenAuthModal={() => {
              setAuthNoticeMessage(undefined);
              setIsAuthModalOpen(true);
            }}
            onOpenAdmin={() => setIsAdminView(true)}
            onLogout={logout}
          />

          {/* Main Tab Content */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'flashcard' && (
              <FlashcardDeck
                words={currentWords}
                isLearned={isLearned}
                onToggleLearned={handleToggleLearned}
                lessonTitle={lessonTitle}
                isActiveTab={
                  activeTab === 'flashcard' &&
                  !isLearnedModalOpen &&
                  !isResetModalOpen &&
                  !isDrawerOpen &&
                  !isAuthModalOpen &&
                  !isLoginPromptOpen
                }
              />
            )}

            {activeTab === 'search' && (
              <SearchTab
                words={allGlobalWords}
                courses={courses}
                isLearned={isLearned}
                onToggleLearned={handleToggleLearned}
                onNavigateToLesson={(courseId, lessonId) => {
                  setSelectedCourseId(courseId);
                  setSelectedLessonId(lessonId);
                  setActiveTab('flashcard');
                }}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizTab words={currentWords} lessonTitle={lessonTitle} />
            )}
          </main>

          {/* Bottom Navigation (Only for mobile/tablet, hidden on lg screens) */}
          <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

          {/* Modals */}
          <LearnedModal
            isOpen={isLearnedModalOpen}
            onClose={() => setIsLearnedModalOpen(false)}
            learnedWords={learnedWordsList}
            onUnmark={unmarkLearned}
            lessonTitle={lessonTitle}
          />

          <ResetConfirmModal
            isOpen={isResetModalOpen}
            onClose={() => setIsResetModalOpen(false)}
            onConfirm={() => resetLesson(selectedLessonId)}
            lessonTitle={lessonTitle}
          />

          {/* Login Prompt Modal (Shown when unauthenticated user attempts learned action) */}
          <LoginPromptModal
            isOpen={isLoginPromptOpen}
            onClose={() => setIsLoginPromptOpen(false)}
            onOpenLogin={() => {
              setIsLoginPromptOpen(false);
              setIsAuthModalOpen(true);
            }}
          />

          {/* Auth Modal (Login / Register) */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={() => {
              loadCourseData(selectedCourseId);
            }}
            login={login}
            register={register}
            noticeMessage={authNoticeMessage}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
