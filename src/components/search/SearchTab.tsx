import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Volume2,
  CheckCircle2,
  Circle,
  BookOpen,
} from 'lucide-react';
import type { Word } from '../../types';
import { matchesSearch } from '../../utils/vietnamese';
import { speakEnglish } from '../../utils/speech';

interface SearchTabProps {
  words: Word[];
  isLearned: (wordId: string, lessonId: number) => boolean;
  onToggleLearned: (word: Word) => void;
  selectedLessonId: number;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  words,
  isLearned,
  onToggleLearned,
  selectedLessonId,
}) => {
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'learned'>(
    'all',
  );

  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      // 1. Text Search matching (both English and Vietnamese tone-insensitive)
      const matches = matchesSearch(query, word.en, word.vi, word.pos);
      if (!matches) return false;

      // 2. Status filter
      const learned = isLearned(word.id, word.lessonId);
      if (filterMode === 'learned') return learned;
      if (filterMode === 'unlearned') return !learned;
      return true;
    });
  }, [words, query, filterMode, isLearned]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-24 pt-4 md:max-w-3xl md:pb-12 lg:max-w-5xl">
      {/* Search Input Box */}
      <div className="relative mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm từ tiếng Anh hoặc tiếng Việt không dấu (vd: drive, day, đẩy, lai xe)..."
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Mode Chips */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs md:text-sm">
        <button
          type="button"
          onClick={() => setFilterMode('all')}
          className={`rounded-xl px-3.5 py-2 font-medium transition ${
            filterMode === 'all'
              ? 'bg-emerald-600 font-semibold text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Tất cả ({words.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterMode('unlearned')}
          className={`rounded-xl px-3.5 py-2 font-medium transition ${
            filterMode === 'unlearned'
              ? 'bg-emerald-600 font-semibold text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Chưa thuộc
        </button>
        <button
          type="button"
          onClick={() => setFilterMode('learned')}
          className={`rounded-xl px-3.5 py-2 font-medium transition ${
            filterMode === 'learned'
              ? 'bg-emerald-600 font-semibold text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Đã thuộc
        </button>
      </div>

      {/* Result Count Info */}
      <div className="mb-3 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>Tìm thấy {filteredWords.length} từ vựng</span>
        {selectedLessonId > 0 && (
          <span className="flex items-center gap-1 font-medium">
            <BookOpen className="h-3.5 w-3.5" /> Bài {selectedLessonId}
          </span>
        )}
      </div>

      {/* Word List Items Grid (2 cols on desktop) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredWords.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 py-12 text-center dark:border-gray-800">
            <Search className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 text-xs font-semibold text-gray-600 dark:text-gray-400">
              Không tìm thấy từ vựng phù hợp
            </p>
            <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
              Hãy thử tìm bằng từ tiếng Anh hoặc tiếng Việt không dấu khác.
            </p>
          </div>
        ) : (
          filteredWords.map((word) => {
            const learned = isLearned(word.id, word.lessonId);

            return (
              <div
                key={word.id}
                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-800/80 dark:hover:border-emerald-800"
              >
                {/* Left: Word details */}
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                      {word.en}
                    </h4>
                    <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {word.pos}
                    </span>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                      {word.ipa}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-gray-600 dark:text-gray-300">
                    {word.vi}
                  </p>
                  {word.example && (
                    <p className="mt-1 line-clamp-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        VD:
                      </span>{' '}
                      "{word.example.en}"
                    </p>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => speakEnglish(word.en)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 dark:bg-gray-700/60 dark:text-gray-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleLearned(word)}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition active:scale-95 ${
                      learned
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100 dark:bg-gray-700/60 dark:text-gray-500 dark:hover:bg-gray-700'
                    }`}
                    title={
                      learned ? 'Đã thuộc (Nhấp để bỏ)' : 'Đánh dấu đã thuộc'
                    }
                  >
                    {learned ? (
                      <CheckCircle2 className="h-4 w-4 fill-emerald-500 text-white dark:fill-emerald-400 dark:text-gray-900" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
