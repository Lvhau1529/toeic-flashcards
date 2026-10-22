import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Volume2,
  CheckCircle2,
  Circle,
  BookOpen,
  Layers,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import type { Word } from '../../types';
import type { Course } from '../../services/api';
import { matchesSearch } from '../../utils/vietnamese';
import { speakEnglish } from '../../utils/speech';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface SearchTabProps {
  words: Word[];
  courses?: Course[];
  isLearned: (wordId: string, lessonId?: number, courseId?: number) => boolean;
  onToggleLearned: (word: Word) => boolean | void;
  onNavigateToLesson?: (courseId: number, lessonId: number) => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  words,
  courses = [],
  isLearned,
  onToggleLearned,
  onNavigateToLesson,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<number | 'all'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'learned'>('all');

  // Words count per course
  const courseCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    words.forEach((w) => {
      const cId = w.courseId || 1;
      counts[cId] = (counts[cId] || 0) + 1;
    });
    return counts;
  }, [words]);

  // Step 1: Filter words by Course
  const courseFilteredWords = useMemo(() => {
    if (selectedCourseFilter === 'all') return words;
    return words.filter((w) => (w.courseId || 1) === selectedCourseFilter);
  }, [words, selectedCourseFilter]);

  // Step 2: Filter by Text Search & Learned Status
  const filteredWords = useMemo(() => {
    return courseFilteredWords.filter((word) => {
      // Text Search matching (both English, Vietnamese tone-insensitive, and part of speech)
      const matches = matchesSearch(
        query,
        word.en,
        word.vi,
        word.pos,
        word.courseTitle,
        word.lessonTitle,
        word.example?.en,
        word.example?.vi,
      );
      if (!matches) return false;

      // Status filter
      const learned = isLearned(word.id, word.lessonId, word.courseId);
      if (filterMode === 'learned') return learned;
      if (filterMode === 'unlearned') return !learned;
      return true;
    });
  }, [courseFilteredWords, query, filterMode, isLearned]);

  // Learned count in current course filter
  const learnedCountInFilter = useMemo(() => {
    return courseFilteredWords.filter((w) => isLearned(w.id, w.lessonId, w.courseId)).length;
  }, [courseFilteredWords, isLearned]);

  const unlearnedCountInFilter = courseFilteredWords.length - learnedCountInFilter;

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

  const getCourseBadgeColor = (courseId?: number) => {
    if (courseId === 2) {
      return 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300';
    }
    return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-24 pt-4 md:max-w-3xl md:pb-12 lg:max-w-5xl">
      {/* Search Input Box */}
      <div className="relative mb-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm từ tiếng Anh, từ loại hoặc tiếng Việt không dấu (vd: drive, day, đẩy, hop dong)..."
          className="h-11 pl-10 pr-10 text-sm shadow-xs"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 my-auto mr-1 h-8 w-8 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Xóa tìm kiếm</span>
          </Button>
        )}
      </div>

      {/* Filter Row 1: Course Selector Chips */}
      <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
          <Layers className="h-3 w-3" />
          Khoá:
        </span>
        <Button
          variant={selectedCourseFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCourseFilter('all')}
          className="h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0"
        >
          Tất cả khoá ({words.length})
        </Button>

        {courses.length > 0 ? (
          courses.map((c) => (
            <Button
              key={c.id}
              variant={selectedCourseFilter === c.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCourseFilter(c.id)}
              className="h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0"
            >
              {c.title} ({courseCounts[c.id] || c.totalWords || 0})
            </Button>
          ))
        ) : (
          <>
            <Button
              variant={selectedCourseFilter === 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCourseFilter(1)}
              className="h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0"
            >
              Pre TOEIC ({courseCounts[1] || 225})
            </Button>
            <Button
              variant={selectedCourseFilter === 2 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCourseFilter(2)}
              className="h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0"
            >
              TOEIC 500+ ({courseCounts[2] || 550})
            </Button>
          </>
        )}
      </div>

      {/* Filter Row 2: Status Chips */}
      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
          <GraduationCap className="h-3 w-3" />
          Trạng thái:
        </span>
        <Button
          variant={filterMode === 'all' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setFilterMode('all')}
          className={`h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0 ${
            filterMode === 'all'
              ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
              : ''
          }`}
        >
          Tất cả ({courseFilteredWords.length})
        </Button>
        <Button
          variant={filterMode === 'unlearned' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setFilterMode('unlearned')}
          className={`h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0 ${
            filterMode === 'unlearned'
              ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
              : ''
          }`}
        >
          Chưa thuộc ({unlearnedCountInFilter})
        </Button>
        <Button
          variant={filterMode === 'learned' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setFilterMode('learned')}
          className={`h-7 rounded-xl px-2.5 text-xs font-semibold shrink-0 ${
            filterMode === 'learned'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
              : ''
          }`}
        >
          Đã thuộc ({learnedCountInFilter})
        </Button>
      </div>

      {/* Header Info */}
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            {selectedCourseFilter === 'all'
              ? 'Tìm kiếm trên tất cả khoá học'
              : `Khoá học: ${
                  courses.find((c) => c.id === selectedCourseFilter)?.title ||
                  (selectedCourseFilter === 2 ? 'TOEIC 500+' : 'Pre TOEIC')
                }`}
          </span>
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Tìm thấy {filteredWords.length} từ
        </span>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWords.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
              Không tìm thấy từ vựng phù hợp
            </p>
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              {query
                ? `Không có từ nào khớp với từ khoá "${query}".`
                : 'Thử chọn chế độ lọc khác để hiển thị từ vựng.'}
            </p>
            {(query || filterMode !== 'all' || selectedCourseFilter !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('');
                  setFilterMode('all');
                  setSelectedCourseFilter('all');
                }}
                className="mt-4 rounded-xl text-xs"
              >
                Đặt lại tất cả bộ lọc
              </Button>
            )}
          </div>
        ) : (
          filteredWords.map((word) => {
            const learned = isLearned(word.id, word.lessonId, word.courseId);
            const courseTitle =
              word.courseTitle || (word.courseId === 2 ? 'TOEIC 500+' : 'Pre TOEIC');

            return (
              <Card
                key={word.id}
                className="transition hover:border-emerald-300 hover:shadow-md dark:hover:border-emerald-700"
              >
                <CardContent className="flex flex-col justify-between p-3.5 h-full">
                  <div>
                    {/* Top row: Word + Pos + Course/Lesson Badge */}
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                        <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {word.en}
                        </h4>
                        <Badge
                          variant={getPosBadgeVariant(word.pos)}
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {word.pos}
                        </Badge>
                        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                          {word.ipa}
                        </span>
                      </div>

                      {/* Course & Lesson Badge */}
                      <Badge
                        variant="outline"
                        className={`shrink-0 px-1.5 py-0.5 text-[10px] font-medium ${getCourseBadgeColor(
                          word.courseId,
                        )}`}
                      >
                        {courseTitle} • B{word.lessonId}
                      </Badge>
                    </div>

                    {/* Vietnamese meaning */}
                    <p className="mt-1.5 text-xs font-medium text-slate-700 dark:text-slate-200">
                      {word.vi}
                    </p>

                    {/* Example sentence if available */}
                    {word.example && (
                      <div className="mt-1.5 rounded-lg bg-slate-50 p-2 text-[11px] text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                        <p className="line-clamp-2 italic">
                          <span className="font-semibold not-italic text-emerald-600 dark:text-emerald-400">
                            VD:
                          </span>{' '}
                          "{word.example.en}"
                        </p>
                        {word.example.vi && (
                          <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-400 dark:text-slate-500">
                            {word.example.vi}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions row */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
                    {/* Left: Quick Jump to Lesson */}
                    {onNavigateToLesson && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onNavigateToLesson(word.courseId || 1, word.lessonId)
                        }
                        className="h-7 gap-1 px-2 text-[11px] font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Học bài này</span>
                      </Button>
                    )}

                    {/* Right: Audio + Toggle Learned */}
                    <div className="flex items-center gap-1 ml-auto">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => speakEnglish(word.en)}
                            className="h-7 w-7 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Nghe phát âm</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Phát âm</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={learned ? 'secondary' : 'ghost'}
                            size="icon"
                            onClick={() => onToggleLearned(word)}
                            className={`h-7 w-7 rounded-lg ${
                              learned
                                ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-400'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            {learned ? (
                              <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-500 text-white dark:fill-emerald-400 dark:text-slate-900" />
                            ) : (
                              <Circle className="h-3.5 w-3.5" />
                            )}
                            <span className="sr-only">
                              {learned
                                ? 'Đã thuộc (Nhấp để bỏ)'
                                : 'Đánh dấu đã thuộc'}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {learned ? 'Đã thuộc (Bấm để bỏ)' : 'Đánh dấu đã thuộc'}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
