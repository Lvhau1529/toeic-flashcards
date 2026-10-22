import { useState, useCallback, useEffect } from 'react';
import type { Word } from '../types';
import { api } from '../services/api';

export function useProgress(
  allWordsList: Word[],
  currentCourseId = 1,
  isAuthenticated = false,
  allGlobalWordsList?: Word[],
) {
  // Map of lessonId -> Array of learned word IDs for the active course
  const [learnedMap, setLearnedMap] = useState<Record<number, string[]>>({});
  // Global set of all learned word IDs across all courses
  const [globalLearnedIds, setGlobalLearnedIds] = useState<Set<string>>(
    new Set(),
  );

  const fullWords = allGlobalWordsList && allGlobalWordsList.length > 0
    ? allGlobalWordsList
    : allWordsList;

  // Sync from backend or reset when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      setLearnedMap({});
      setGlobalLearnedIds(new Set());
      return;
    }

    let isMounted = true;

    // 1. Fetch global learned progress if available, otherwise fetch active course progress
    const fetchGlobalProgress = api.getAllLearnedProgress
      ? api.getAllLearnedProgress()
      : Promise.resolve(null);

    const fetchCourseProgress = api.getCourseProgress(currentCourseId);

    Promise.all([fetchGlobalProgress.catch(() => null), fetchCourseProgress.catch(() => null)])
      .then(([globalRes, courseRes]) => {
        if (!isMounted) return;

        const allLearnedNumSet = new Set<number>();
        if (globalRes?.learnedVocabularyIds) {
          globalRes.learnedVocabularyIds.forEach((id: number) =>
            allLearnedNumSet.add(id),
          );
        }
        if (courseRes?.learnedVocabularyIds) {
          courseRes.learnedVocabularyIds.forEach((id: number) =>
            allLearnedNumSet.add(id),
          );
        }

        const newGlobalSet = new Set<string>();
        const newMap: Record<number, string[]> = {};

        // Populate global set
        fullWords.forEach((w) => {
          const numId = w.numericId || (Number(w.id) ? Number(w.id) : null);
          if (numId && allLearnedNumSet.has(numId)) {
            newGlobalSet.add(w.id);
          }
        });

        // Populate active course map
        allWordsList.forEach((w) => {
          const numId = w.numericId || (Number(w.id) ? Number(w.id) : null);
          if (numId && allLearnedNumSet.has(numId)) {
            if (!newMap[w.lessonId]) newMap[w.lessonId] = [];
            newMap[w.lessonId].push(w.id);
          }
        });

        setGlobalLearnedIds(newGlobalSet);
        setLearnedMap(newMap);
      })
      .catch((err) => {
        console.warn('Failed to sync progress from BE:', err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, currentCourseId, allWordsList, fullWords]);

  // Keep localStorage in sync when learnedMap updates (only if authenticated)
  const persistLesson = useCallback(
    (lessonId: number, words: string[], courseId?: number) => {
      if (typeof window === 'undefined' || !isAuthenticated) return;
      const targetCourseId = courseId || currentCourseId;
      try {
        window.localStorage.setItem(
          `toeic_learned_c${targetCourseId}_lesson_${lessonId}`,
          JSON.stringify(words),
        );
      } catch (e) {
        console.error(`Failed to persist progress for lesson ${lessonId}`, e);
      }
    },
    [currentCourseId, isAuthenticated],
  );

  const isLearned = useCallback(
    (wordId: string, lessonId?: number): boolean => {
      if (!isAuthenticated) return false;
      if (globalLearnedIds.has(wordId)) return true;
      if (lessonId !== undefined) {
        const list = learnedMap[lessonId] || [];
        return list.includes(wordId);
      }
      return false;
    },
    [globalLearnedIds, learnedMap, isAuthenticated],
  );

  const toggleLearned = useCallback(
    (word: Word): boolean => {
      if (!isAuthenticated) {
        return false;
      }

      const wordCourseId = word.courseId || currentCourseId;
      const isAlready = globalLearnedIds.has(word.id) ||
        (learnedMap[word.lessonId] || []).includes(word.id);

      // Update global set
      setGlobalLearnedIds((prev) => {
        const next = new Set(prev);
        if (isAlready) {
          next.delete(word.id);
        } else {
          next.add(word.id);
        }
        return next;
      });

      // Update active course map if word belongs to current course
      if (wordCourseId === currentCourseId) {
        setLearnedMap((prev) => {
          const currentList = prev[word.lessonId] || [];
          const updated = isAlready
            ? currentList.filter((id) => id !== word.id)
            : [...currentList, word.id];

          persistLesson(word.lessonId, updated, wordCourseId);
          return {
            ...prev,
            [word.lessonId]: updated,
          };
        });
      } else {
        // If word belongs to another course, persist to that course's localStorage
        try {
          const storageKey = `toeic_learned_c${wordCourseId}_lesson_${word.lessonId}`;
          const raw = window.localStorage.getItem(storageKey);
          const currentList: string[] = raw ? JSON.parse(raw) : [];
          const updated = isAlready
            ? currentList.filter((id) => id !== word.id)
            : [...currentList, word.id];
          persistLesson(word.lessonId, updated, wordCourseId);
        } catch {
          // ignore
        }
      }

      // Sync with backend
      const numId =
        word.numericId || (Number(word.id) ? Number(word.id) : null);
      if (numId) {
        api.toggleLearned(numId).catch((err) => {
          console.warn('Backend toggle failed:', err.message);
        });
      }

      return true;
    },
    [globalLearnedIds, learnedMap, persistLesson, isAuthenticated, currentCourseId],
  );

  const markLearned = useCallback(
    (word: Word): boolean => {
      if (!isAuthenticated) return false;

      const wordCourseId = word.courseId || currentCourseId;

      setGlobalLearnedIds((prev) => {
        const next = new Set(prev);
        next.add(word.id);
        return next;
      });

      if (wordCourseId === currentCourseId) {
        setLearnedMap((prev) => {
          const currentList = prev[word.lessonId] || [];
          if (currentList.includes(word.id)) return prev;
          const updated = [...currentList, word.id];
          persistLesson(word.lessonId, updated, wordCourseId);
          return {
            ...prev,
            [word.lessonId]: updated,
          };
        });
      }

      const numId =
        word.numericId || (Number(word.id) ? Number(word.id) : null);
      if (numId) {
        api.toggleLearned(numId).catch(() => {});
      }
      return true;
    },
    [persistLesson, isAuthenticated, currentCourseId],
  );

  const unmarkLearned = useCallback(
    (wordId: string, lessonId: number): boolean => {
      if (!isAuthenticated) return false;

      setGlobalLearnedIds((prev) => {
        const next = new Set(prev);
        next.delete(wordId);
        return next;
      });

      setLearnedMap((prev) => {
        const currentList = prev[lessonId] || [];
        const updated = currentList.filter((id) => id !== wordId);
        persistLesson(lessonId, updated);
        return {
          ...prev,
          [lessonId]: updated,
        };
      });

      const foundWord = fullWords.find((w) => w.id === wordId);
      const numId =
        foundWord?.numericId ||
        (Number(foundWord?.id) ? Number(foundWord?.id) : null);
      if (numId) {
        api.toggleLearned(numId).catch(() => {});
      }
      return true;
    },
    [persistLesson, isAuthenticated, fullWords],
  );

  const resetLesson = useCallback(
    (lessonId: number): boolean => {
      if (!isAuthenticated) return false;

      setLearnedMap((prev) => {
        persistLesson(lessonId, []);
        return {
          ...prev,
          [lessonId]: [],
        };
      });

      if (lessonId > 0) {
        api.resetLesson(lessonId).catch((err) => {
          console.warn('Backend reset failed:', err.message);
        });
      }
      return true;
    },
    [persistLesson, isAuthenticated],
  );

  const getLearnedCount = useCallback(
    (lessonId?: number): number => {
      if (!isAuthenticated) return 0;
      if (lessonId !== undefined && lessonId > 0) {
        return (learnedMap[lessonId] || []).length;
      }
      // All lessons
      return Object.values(learnedMap).reduce(
        (sum, list) => sum + list.length,
        0,
      );
    },
    [learnedMap, isAuthenticated],
  );

  const getLearnedWordsList = useCallback(
    (lessonId?: number): Word[] => {
      if (!isAuthenticated) return [];
      if (lessonId !== undefined && lessonId > 0) {
        const ids = learnedMap[lessonId] || [];
        return allWordsList.filter(
          (w) => w.lessonId === lessonId && ids.includes(w.id),
        );
      }
      const allIds = new Set(Object.values(learnedMap).flat());
      return allWordsList.filter((w) => allIds.has(w.id));
    },
    [learnedMap, allWordsList, isAuthenticated],
  );

  return {
    learnedMap,
    isLearned,
    toggleLearned,
    markLearned,
    unmarkLearned,
    resetLesson,
    getLearnedCount,
    getLearnedWordsList,
  };
}
