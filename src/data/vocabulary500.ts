import type { RawLesson, Word, LessonItem } from '../types';
import rawData from './toeic-500-data.json';

export const toeic500RawLessonsData = rawData as RawLesson[];

// Normalized all words for TOEIC 500+ with unique id
export const toeic500AllWords: Word[] = toeic500RawLessonsData.flatMap((lesson) =>
  lesson.words.map((w, index) => ({
    ...w,
    lessonId: lesson.lessonId,
    lessonTitle: lesson.lessonTitle,
    courseId: 2,
    courseTitle: 'TOEIC 500+',
    id: `c2_l${lesson.lessonId}_w${index + 1}_${w.en.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
  })),
);

export const toeic500Lessons: LessonItem[] = toeic500RawLessonsData.map((lesson) => ({
  lessonId: lesson.lessonId,
  lessonTitle: lesson.lessonTitle,
  words: toeic500AllWords.filter((w) => w.lessonId === lesson.lessonId),
}));
