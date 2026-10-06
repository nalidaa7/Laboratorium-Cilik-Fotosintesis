import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';

interface TopNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenMicroscope: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onOpenMicroscope,
}) => {
  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.enabled = !next;
    if (!next) {
      sound.playClick();
    }
  };

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'welcome', label: 'Beranda' },
    { id: 'simulator', label: 'Eksperimen' },
    { id: 'guide', label: 'Tahapan Sains' },
    { id: 'quiz', label: 'Kuis & Sertifikat' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('welcome');
          }}
          className="text-left font-display font-bold text-xl sm:text-2xl text-emerald-800 tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap focus:outline-hidden"
        >
          Laboratorium Cilik
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-semibold text-slate-600 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'text-emerald-800 bg-emerald-100/70 font-bold'
                    : 'hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenMicroscope();
            }}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
            title="Buka Mikroskop Daun"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="whitespace-nowrap">Mikroskop Daun</span>
          </button>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className="p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-slate-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
