import { useState, useMemo } from 'react';
import type { TabType } from './types';
import { allWords, lessons } from './data/vocabulary';
import { useTheme } from './hooks/useTheme';
import { useProgress } from './hooks/useProgress';
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

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const {
    isLearned,
    toggleLearned,
    unmarkLearned,
    resetLesson,
    getLearnedCount,
    getLearnedWordsList,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<TabType>('flashcard');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1); // Default Lesson 1

  // Modals & Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLearnedModalOpen, setIsLearnedModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Filter words for active lesson or all lessons
  const currentWords = useMemo(() => {
    if (selectedLessonId === 0) return allWords;
    return allWords.filter((w) => w.lessonId === selectedLessonId);
  }, [selectedLessonId]);

  const currentLesson = lessons.find((l) => l.lessonId === selectedLessonId);
  const lessonTitle =
    selectedLessonId === 0
      ? `Tất cả ${allWords.length} từ vựng`
      : `Bài ${selectedLessonId}: ${currentLesson?.lessonTitle || ''}`;

  const currentLearnedCount = getLearnedCount(selectedLessonId);
  const learnedWordsList = getLearnedWordsList(selectedLessonId);

  return (
    <>
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
          onOpenResetModal={() => setIsResetModalOpen(true)}
          onOpenLearnedModal={() => setIsLearnedModalOpen(true)}
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
          onOpenResetModal={() => setIsResetModalOpen(true)}
          onOpenLearnedModal={() => setIsLearnedModalOpen(true)}
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
            totalWordsInLesson={currentWords.length}
            onOpenLearnedModal={() => setIsLearnedModalOpen(true)}
            onOpenResetModal={() => setIsResetModalOpen(true)}
          />

          {/* Main Tab Content */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'flashcard' && (
              <FlashcardDeck
                words={currentWords}
                isLearned={isLearned}
                onToggleLearned={toggleLearned}
                lessonTitle={lessonTitle}
                isActiveTab={
                  activeTab === 'flashcard' &&
                  !isLearnedModalOpen &&
                  !isResetModalOpen &&
                  !isDrawerOpen
                }
              />
            )}

            {activeTab === 'search' && (
              <SearchTab
                words={currentWords}
                isLearned={isLearned}
                onToggleLearned={toggleLearned}
                selectedLessonId={selectedLessonId}
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
        </div>
      </div>
    </>
  );
}
