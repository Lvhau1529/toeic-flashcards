import React from 'react';
import { Layers, Search, BrainCircuit } from 'lucide-react';
import type { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const tabs = [
    {
      id: 'flashcard' as TabType,
      label: 'Flashcard',
      icon: Layers,
    },
    {
      id: 'search' as TabType,
      label: 'Tra cứu',
      icon: Search,
    },
    {
      id: 'quiz' as TabType,
      label: 'Quiz',
      icon: BrainCircuit,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-colors duration-200 dark:border-gray-800/80 dark:bg-gray-900/95 lg:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-1 flex-col items-center justify-center py-1 text-center transition-all duration-200 ${
                isActive
                  ? 'scale-105 font-semibold text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 transition-transform" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                )}
              </div>
              <span className="mt-1 text-[11px] tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
