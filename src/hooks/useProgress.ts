import { useState, useCallback } from 'react';
import type { Word } from '../types';
import { allWords, lessons } from '../data/vocabulary';

export function useProgress() {
  // State holds map of lessonId -> Set of learned word IDs
  const [learnedMap, setLearnedMap] = useState<Record<number, string[]>>(() => {
    if (typeof window === 'undefined') return {};
    const map: Record<number, string[]> = {};
    lessons.forEach((lesson) => {
      try {
        const item = window.localStorage.getItem(
          `toeic_learned_lesson_${lesson.lessonId}`,
        );
        map[lesson.lessonId] = item ? JSON.parse(item) : [];
      } catch {
        map[lesson.lessonId] = [];
      }
    });
    return map;
  });

  // Keep localStorage in sync when learnedMap updates
  const persistLesson = useCallback((lessonId: number, words: string[]) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        `toeic_learned_lesson_${lessonId}`,
        JSON.stringify(words),
      );
    } catch (e) {
      console.error(`Failed to persist progress for lesson ${lessonId}`, e);
    }
  }, []);

  const isLearned = useCallback(
    (wordId: string, lessonId: number): boolean => {
      const list = learnedMap[lessonId] || [];
      return list.includes(wordId);
    },
    [learnedMap],
  );

  const toggleLearned = useCallback(
    (word: Word) => {
      setLearnedMap((prev) => {
        const currentList = prev[word.lessonId] || [];
        const isAlready = currentList.includes(word.id);
        const updated = isAlready
          ? currentList.filter((id) => id !== word.id)
          : [...currentList, word.id];

        persistLesson(word.lessonId, updated);
        return {
          ...prev,
          [word.lessonId]: updated,
        };
      });
    },
    [persistLesson],
  );

  const markLearned = useCallback(
    (word: Word) => {
      setLearnedMap((prev) => {
        const currentList = prev[word.lessonId] || [];
        if (currentList.includes(word.id)) return prev;
        const updated = [...currentList, word.id];
        persistLesson(word.lessonId, updated);
        return {
          ...prev,
          [word.lessonId]: updated,
        };
      });
    },
    [persistLesson],
  );

  const unmarkLearned = useCallback(
    (wordId: string, lessonId: number) => {
      setLearnedMap((prev) => {
        const currentList = prev[lessonId] || [];
        const updated = currentList.filter((id) => id !== wordId);
        persistLesson(lessonId, updated);
        return {
          ...prev,
          [lessonId]: updated,
        };
      });
    },
    [persistLesson],
  );

  const resetLesson = useCallback(
    (lessonId: number) => {
      setLearnedMap((prev) => {
        persistLesson(lessonId, []);
        return {
          ...prev,
          [lessonId]: [],
        };
      });
    },
    [persistLesson],
  );

  const getLearnedCount = useCallback(
    (lessonId?: number): number => {
      if (lessonId !== undefined && lessonId > 0) {
        return (learnedMap[lessonId] || []).length;
      }
      // All lessons
      return Object.values(learnedMap).reduce(
        (sum, list) => sum + list.length,
        0,
      );
    },
    [learnedMap],
  );

  const getLearnedWordsList = useCallback(
    (lessonId?: number): Word[] => {
      if (lessonId !== undefined && lessonId > 0) {
        const ids = learnedMap[lessonId] || [];
        return allWords.filter(
          (w) => w.lessonId === lessonId && ids.includes(w.id),
        );
      }
      const allIds = new Set(Object.values(learnedMap).flat());
      return allWords.filter((w) => allIds.has(w.id));
    },
    [learnedMap],
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
