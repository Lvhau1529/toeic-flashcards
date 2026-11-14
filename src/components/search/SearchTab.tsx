import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import type { Word } from '../../types';
import type { Course } from '../../services/api';
import { removeVietnameseTones } from '../../utils/vietnamese';
import { speakEnglish } from '../../utils/speech';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

interface SearchTabProps {
  words: Word[];
  courses?: Course[];
  isLearned: (wordId: string, lessonId?: number, courseId?: number) => boolean;
  onToggleLearned: (word: Word) => boolean | void;
  onNavigateToLesson?: (courseId: number, lessonId: number) => void;
}

interface IndexedWord extends Word {
  _rawEn: string;
  _rawVi: string;
  _cleanEn: string;
  _cleanVi: string;
  _pos: string;
  _exViRaw: string;
  _exEnRaw: string;
  _exViClean: string;
  _exEnClean: string;
  _viTokensRaw: string[];
  _viTokensClean: string[];
  _enTokensRaw: string[];
  _enTokensClean: string[];
  _searchRaw: string;
  _searchClean: string;
}

const PAGE_SIZE = 36;

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

/**
 * Calculates a relevance score for a word given the search query
 * Gives highest priority to exact meaning/word matches, followed by word-boundary tokens,
 * starts-with, contains, and lastly example sentences.
 */
function calculateScore(
  word: IndexedWord,
  rawQ: string,
  cleanQ: string,
  hasDiacritics: boolean,
): number {
  let score = 0;

  // 1. Exact Match in Meaning or English word (Top Priority)
  if (word._rawVi === rawQ || word._rawEn === rawQ) {
    score += 10000;
  } else if (!hasDiacritics && (word._cleanVi === cleanQ || word._cleanEn === cleanQ)) {
    score += 8000;
  }

  // 2. Token / Word boundary match (e.g. 'thảm' is a distinct word in 'tấm thảm, chiếu')
  if (word._viTokensRaw.includes(rawQ) || word._enTokensRaw.includes(rawQ)) {
    score += 5000;
  } else if (!hasDiacritics && (word._viTokensClean.includes(cleanQ) || word._enTokensClean.includes(cleanQ))) {
    score += 3000;
  }

  // 3. Starts with in Meaning or English word
  if (word._rawVi.startsWith(rawQ) || word._rawEn.startsWith(rawQ)) {
    score += 3000;
  } else if (!hasDiacritics && (word._cleanVi.startsWith(cleanQ) || word._cleanEn.startsWith(cleanQ))) {
    score += 2000;
  }

  // 4. Substring contains in Meaning or English word
  if (word._rawVi.includes(rawQ) || word._rawEn.includes(rawQ)) {
    score += 1500;
  } else if (!hasDiacritics && (word._cleanVi.includes(cleanQ) || word._cleanEn.includes(cleanQ))) {
    score += 1000;
  }

  // 5. Part of speech match
  if (word._pos === cleanQ) {
    score += 200;
  }

  // 6. Example sentence matches (Lowest priority tier)
  if (hasDiacritics) {
    if (word._exViRaw.includes(rawQ) || word._exEnRaw.includes(rawQ)) {
      score += 50;
    }
  } else {
    if (word._exViClean.includes(cleanQ) || word._exEnClean.includes(cleanQ)) {
      score += 50;
    }
  }

  return score;
}

// Memoized individual card to prevent re-rendering unaffected cards on state changes
interface WordCardProps {
  word: IndexedWord;
  learned: boolean;
  onToggleLearned: (word: Word) => boolean | void;
  onNavigateToLesson?: (courseId: number, lessonId: number) => void;
}

const WordCard = React.memo<WordCardProps>(({
  word,
  learned,
  onToggleLearned,
  onNavigateToLesson,
}) => {
  const courseTitle =
    word.courseTitle || (word.courseId === 2 ? 'TOEIC 500+' : 'Pre TOEIC');

  return (
    <Card className="transition hover:border-emerald-300 hover:shadow-md dark:hover:border-emerald-700">
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

          {/* Right: Audio + Toggle Learned (uses lightweight native title attributes for zero-overhead tooltips) */}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => speakEnglish(word.en)}
              title="Nghe phát âm"
              aria-label="Nghe phát âm"
              className="h-7 w-7 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant={learned ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onToggleLearned(word)}
              title={learned ? 'Đã thuộc (Bấm để bỏ)' : 'Đánh dấu đã thuộc'}
              aria-label={learned ? 'Đã thuộc (Bấm để bỏ)' : 'Đánh dấu đã thuộc'}
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
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
WordCard.displayName = 'WordCard';

export const SearchTab: React.FC<SearchTabProps> = ({
  words,
  courses = [],
  isLearned,
  onToggleLearned,
  onNavigateToLesson,
}) => {
  // Query state updates immediately with 0ms artificial debounce delay
  const [query, setQuery] = useState('');

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<number | 'all'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [showAllWords, setShowAllWords] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Pre-index normalized search strings ONCE per words update
  // Pre-indexing tokens & search keys enables instant scoring & ranking (< 0.3ms for 775 items)
  const indexedWords = useMemo<IndexedWord[]>(() => {
    return words.map((w) => {
      const rawEn = (w.en || '').trim().toLowerCase();
      const rawVi = (w.vi || '').trim().toLowerCase();
      const cleanEn = removeVietnameseTones(rawEn);
      const cleanVi = removeVietnameseTones(rawVi);
      const pos = (w.pos || '').trim().toLowerCase();

      const exEnRaw = (w.example?.en || '').trim().toLowerCase();
      const exViRaw = (w.example?.vi || '').trim().toLowerCase();
      const exEnClean = removeVietnameseTones(exEnRaw);
      const exViClean = removeVietnameseTones(exViRaw);

      const viTokensRaw = rawVi.split(/[\s,;/()\-.]+/).filter(Boolean);
      const viTokensClean = cleanVi.split(/[\s,;/()\-.]+/).filter(Boolean);
      const enTokensRaw = rawEn.split(/[\s,;/()\-.]+/).filter(Boolean);
      const enTokensClean = cleanEn.split(/[\s,;/()\-.]+/).filter(Boolean);

      const courseTitleRaw = (w.courseTitle || '').toLowerCase();
      const lessonTitleRaw = (w.lessonTitle || '').toLowerCase();

      const searchRaw = `${rawEn} ${rawVi} ${pos} ${courseTitleRaw} ${lessonTitleRaw} ${exEnRaw} ${exViRaw}`;
      const searchClean = `${cleanEn} ${cleanVi} ${pos} ${removeVietnameseTones(courseTitleRaw)} ${removeVietnameseTones(lessonTitleRaw)} ${exEnClean} ${exViClean}`;

      return {
        ...w,
        _rawEn: rawEn,
        _rawVi: rawVi,
        _cleanEn: cleanEn,
        _cleanVi: cleanVi,
        _pos: pos,
        _exViRaw: exViRaw,
        _exEnRaw: exEnRaw,
        _exViClean: exViClean,
        _exEnClean: exEnClean,
        _viTokensRaw: viTokensRaw,
        _viTokensClean: viTokensClean,
        _enTokensRaw: enTokensRaw,
        _enTokensClean: enTokensClean,
        _searchRaw: searchRaw,
        _searchClean: searchClean,
      };
    });
  }, [words]);

  // Words count per course
  const courseCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    indexedWords.forEach((w) => {
      const cId = w.courseId || 1;
      counts[cId] = (counts[cId] || 0) + 1;
    });
    return counts;
  }, [indexedWords]);

  // Step 1: Filter words by Course
  const courseFilteredWords = useMemo(() => {
    if (selectedCourseFilter === 'all') return indexedWords;
    return indexedWords.filter((w) => (w.courseId || 1) === selectedCourseFilter);
  }, [indexedWords, selectedCourseFilter]);

  // Step 2: Intelligent Filter by Text Search, Diacritic Precision & Relevance Scoring (0ms delay)
  const filteredWords = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    const cleanQ = removeVietnameseTones(rawQ);

    // When query is empty: instant return without scanning if filterMode is 'all'
    if (!cleanQ) {
      if (filterMode === 'all') return courseFilteredWords;
      return courseFilteredWords.filter((word) => {
        const learned = isLearned(word.id, word.lessonId, word.courseId);
        return filterMode === 'learned' ? learned : !learned;
      });
    }

    const hasDiacritics = rawQ !== cleanQ;
    const rawTokens = rawQ.split(/\s+/).filter(Boolean);
    const cleanTokens = cleanQ.split(/\s+/).filter(Boolean);

    // 1. Status Filter
    const statusFiltered = courseFilteredWords.filter((word) => {
      if (filterMode === 'all') return true;
      const learned = isLearned(word.id, word.lessonId, word.courseId);
      return filterMode === 'learned' ? learned : !learned;
    });

    // 2. Multi-tier Matching:
    // If the user typed with diacritics ("thảm"), prioritize strict diacritic matching so that
    // unrelated words with "tham gia", "tham quan" are filtered out.
    let matchedWords: IndexedWord[] = [];
    let isStrictMatch = false;

    if (hasDiacritics) {
      matchedWords = statusFiltered.filter((w) =>
        rawTokens.every((token) => w._searchRaw.includes(token))
      );
      if (matchedWords.length > 0) {
        isStrictMatch = true;
      }
    }

    // Fallback to tone-insensitive matching if not strict or no strict matches found
    if (!isStrictMatch) {
      matchedWords = statusFiltered.filter((w) =>
        cleanTokens.every((token) => w._searchClean.includes(token))
      );
    }

    // 3. Score & Rank: Exact meaning/word matches always float to the top
    const scored = matchedWords.map((word) => ({
      word,
      score: calculateScore(word, rawQ, cleanQ, isStrictMatch),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.map((item) => item.word);
  }, [courseFilteredWords, query, filterMode, isLearned]);

  // Determine if words list should be rendered in DOM:
  // - User has typed a query
  // - User selected a specific course or status filter
  // - User clicked "Hiển thị tất cả từ vựng"
  // When false: 0 cards are in DOM (saving 15,000+ DOM nodes!)
  const hasQuery = query.trim().length > 0;
  const hasSpecificFilter = selectedCourseFilter !== 'all' || filterMode !== 'all';
  const shouldRenderWords = hasQuery || hasSpecificFilter || showAllWords;

  // Reset pagination when search query or filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, selectedCourseFilter, filterMode]);

  // Infinite scroll auto-loader
  useEffect(() => {
    if (!shouldRenderWords) return;
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredWords.length));
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(currentSentinel);
    return () => observer.disconnect();
  }, [shouldRenderWords, filteredWords.length]);

  // Sliced words currently displayed in the DOM
  const visibleWords = useMemo(() => {
    if (!shouldRenderWords) return [];
    return filteredWords.slice(0, visibleCount);
  }, [shouldRenderWords, filteredWords, visibleCount]);

  // Learned count in current course filter
  const learnedCountInFilter = useMemo(() => {
    return courseFilteredWords.filter((w) => isLearned(w.id, w.lessonId, w.courseId)).length;
  }, [courseFilteredWords, isLearned]);

  const unlearnedCountInFilter = courseFilteredWords.length - learnedCountInFilter;

  const popularSuggestions = [
    'thảm',
    'hợp đồng',
    'interview',
    'noun',
    'verb',
    'marketing',
    'lái xe',
    'negotiate',
  ];

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
          placeholder="Tìm từ tiếng Anh, từ loại hoặc tiếng Việt (vd: thảm, carpet, hợp đồng, hop dong)..."
          className="h-11 pl-10 pr-10 text-sm shadow-xs"
          autoFocus
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setQuery('');
              setShowAllWords(false);
            }}
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

      {/* Header Info & Toggle Words Visibility */}
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

        <div className="flex items-center gap-2">
          {shouldRenderWords ? (
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Tìm thấy {filteredWords.length} từ
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Chưa hiển thị từ vựng (tiết kiệm DOM)
            </span>
          )}

          {/* Quick toggle button to hide / show words */}
          {shouldRenderWords && !hasQuery && !hasSpecificFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllWords(false)}
              className="h-6 gap-1 px-2 text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              title="Ẩn danh sách để giảm tải DOM"
            >
              <EyeOff className="h-3 w-3" />
              <span>Ẩn từ</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {!shouldRenderWords ? (
        /* Empty / Idle State: 0 Word Cards in DOM */
        <div className="rounded-3xl border border-dashed border-slate-200/90 bg-white/70 p-8 text-center shadow-xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Search className="h-7 w-7" />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">
            Tìm kiếm từ vựng ({words.length} từ)
          </h3>
          <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 dark:text-slate-400">
            Gõ từ tiếng Anh, từ loại hoặc tiếng Việt (có dấu hoặc không dấu) để tìm kiếm tức thì với độ chính xác cao nhất.
          </p>

          {/* Popular search suggestion chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 mr-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Gợi ý tìm nhanh:
            </span>
            {popularSuggestions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Browse all button */}
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800/80">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllWords(true)}
              className="gap-1.5 rounded-xl px-4 text-xs font-semibold text-slate-600 hover:border-emerald-300 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Xem tất cả {words.length} từ vựng</span>
            </Button>
          </div>
        </div>
      ) : (
        /* Word Cards Grid */
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('');
                  setFilterMode('all');
                  setSelectedCourseFilter('all');
                  setShowAllWords(false);
                }}
                className="mt-4 rounded-xl text-xs"
              >
                Đặt lại tất cả bộ lọc
              </Button>
            </div>
          ) : (
            visibleWords.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                learned={isLearned(word.id, word.lessonId, word.courseId)}
                onToggleLearned={onToggleLearned}
                onNavigateToLesson={onNavigateToLesson}
              />
            ))
          )}

          {/* Sentinel for infinite scroll */}
          {visibleWords.length < filteredWords.length && (
            <div
              ref={sentinelRef}
              className="col-span-full flex flex-col items-center justify-center gap-2 py-6 text-center"
            >
              <p className="text-xs text-slate-500">
                Đang hiển thị {visibleWords.length} / {filteredWords.length} từ
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredWords.length))
                }
                className="rounded-xl px-5 text-xs font-semibold shadow-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Hiển thị thêm ({filteredWords.length - visibleWords.length} từ còn lại)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
