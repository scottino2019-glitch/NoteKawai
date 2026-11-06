import React, { useState, useEffect } from 'react';
import {
  NoteItem,
  WeeklyData,
  PlannerData,
  SectionType,
  ViewMode,
  ShapeType,
} from './types';
import {
  getDefaultNotes,
  getDefaultWeekly,
  getDefaultPlannerData,
} from './data/defaultData';
import { useSound } from './hooks/useSound';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { NotebookCover } from './components/NotebookCover';
import { Header } from './components/Header';
import { NoteToolbar } from './components/NoteToolbar';
import { StickersDrawer } from './components/StickersDrawer';
import { NewNoteModal } from './components/NewNoteModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { NotesSection } from './components/sections/NotesSection';
import { WeeklySection } from './components/sections/WeeklySection';
import { DailySection } from './components/sections/DailySection';
import { DiarySection } from './components/sections/DiarySection';
import { HabitSection } from './components/sections/HabitSection';

const STORAGE_KEY_NOTES = 'pastel_sticky_notebook_v8_notes';
const STORAGE_KEY_WEEKLY = 'pastel_sticky_notebook_v8_weekly';
const STORAGE_KEY_PLANNER = 'pastel_sticky_notebook_v8_planner';
const STORAGE_KEY_COVER = 'pastel_sticky_notebook_v8_cover';
const STORAGE_KEY_VIEW = 'pastel_sticky_notebook_v8_viewmode';



export default function App() {
  // Audio sound effects
  const { soundEnabled, setSoundEnabled, playPop, playPageFlip, playCheck, playCoverSound } = useSound();

  // PWA Install & Offline
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Cover opening / closing state
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COVER);
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  // Section & View mode (defaults to Single Page on mobile / tablet < 1024px)
  const [currentSection, setCurrentSection] = useState<SectionType>('notes');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIEW);
      if (saved === 'left' || saved === 'right' || saved === 'both') {
        // If on small screen, ensure we don't start with squeezed both pages
        if (typeof window !== 'undefined' && window.innerWidth < 1024 && saved === 'both') {
          return 'left';
        }
        return saved;
      }
    } catch {}
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'left';
    }
    return 'both';
  });

  // Touch swipe gesture states for flipping pages on mobile
  const [touchStartInfo, setTouchStartInfo] = useState<{ x: number; y: number; time: number } | null>(null);

  // Data States
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return getDefaultNotes();
  });

  const [weeklyData, setWeeklyData] = useState<WeeklyData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEEKLY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return getDefaultWeekly();
  });

  const [plannerData, setPlannerData] = useState<PlannerData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLANNER);
      if (saved) return Object.assign(getDefaultPlannerData(), JSON.parse(saved));
    } catch {}
    return getDefaultPlannerData();
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(() => {
    return notes[0]?.id || null;
  });

  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    } catch {}
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEEKLY, JSON.stringify(weeklyData));
    } catch {}
  }, [weeklyData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLANNER, JSON.stringify(plannerData));
    } catch {}
  }, [plannerData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COVER, JSON.stringify(isCoverOpen));
    } catch {}
  }, [isCoverOpen]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIEW, viewMode);
    } catch {}
  }, [viewMode]);

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === 'both') {
        // Do not force if user explicitly wanted both, but on small screen single page is cleaner
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // Open & Close Cover
  const handleOpenCover = () => {
    playCoverSound(true);
    setIsOpeningAnim(true);
    setTimeout(() => {
      setIsCoverOpen(true);
      setIsOpeningAnim(false);
      playPageFlip();
      showToast('✨ Diario aperto!');
    }, 450);
  };

  const handleCloseCover = () => {
    playCoverSound(false);
    setIsCoverOpen(false);
    showToast('📕 Copertina chiusa');
  };

  // Section switcher
  const handleSwitchSection = (sec: SectionType) => {
    if (sec !== currentSection) {
      playPageFlip();
      setCurrentSection(sec);
    }
  };

  // Notes operations
  const activeNote = notes.find((n) => n.id === activeNoteId) || null;

  const handleUpdateActiveNote = (updates: Partial<NoteItem>) => {
    if (!activeNoteId) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, ...updates } : n))
    );
  };

  const handleDuplicateNote = () => {
    if (!activeNote) return;
    const copy: NoteItem = {
      ...JSON.parse(JSON.stringify(activeNote)),
      id: 'note-' + Date.now(),
    };
    setNotes((prev) => [...prev, copy]);
    setActiveNoteId(copy.id);
    playPop();
    showToast('📋 Nota duplicata!');
  };

  const handleDeleteNote = (id?: string) => {
    const targetId = id || activeNoteId;
    if (!targetId) return;
    setNotes((prev) => prev.filter((n) => n.id !== targetId));
    if (activeNoteId === targetId) {
      setActiveNoteId(null);
    }
    playPop();
    showToast('🗑️ Nota eliminata');
  };

  const handleCreateNewNote = (shape: ShapeType) => {
    const newId = 'note-' + Date.now();
    const leftCount = notes.filter((n) => n.page === 'left').length;
    const targetPage = viewMode === 'right' ? 'right' : (leftCount < 4 ? 'left' : 'right');

    let defColor = '#fef08a';
    let defFont = "'Caveat', cursive";
    let defText = 'Scrivi qui la tua nota... ✨';
    let defCorner: 'none' | 'tl' | 'tr' = 'tl';
    let mascot: string | null = null;

    if (shape === 'heart') {
      defColor = '#fbcfe8';
      defFont = "'Caveat', cursive";
      defText = 'Sei speciale! 💕';
      defCorner = 'none';
      mascot = 'cherries';
    } else if (shape === 'daisy') {
      defColor = '#ffffff';
      defFont = "'Comfortaa', cursive";
      defText = 'Sorridi! ☀️';
      defCorner = 'none';
    } else if (shape === 'checklist') {
      defColor = '#99f6e4';
      defFont = "'Quicksand', sans-serif";
      defText = '';
      defCorner = 'none';
      mascot = 'bee';
    } else if (shape === 'lined') {
      defColor = '#ffffff';
      defFont = "'Patrick Hand', cursive";
      defText = 'Appunti importanti...';
      defCorner = 'none';
    } else if (shape === 'pennant') {
      defColor = '#bae6fd';
      defFont = "'Itim', cursive";
      defText = 'Progetti ✨';
      defCorner = 'none';
      mascot = 'pens';
    } else if (shape === 'bubble') {
      defColor = '#fbcfe8';
      defFont = "'Kalam', cursive";
      defText = 'Nota al volo! 💬';
      defCorner = 'none';
    }

    const newNote: NoteItem = {
      id: newId,
      page: targetPage,
      shape: shape,
      color: defColor,
      fontFamily: defFont,
      fontSize: shape === 'daisy' ? '13px' : '16px',
      fontColor: shape === 'daisy' ? '#78350f' : shape === 'heart' ? '#831843' : '#1e293b',
      textAlign: shape === 'heart' || shape === 'daisy' ? 'center' : 'left',
      corner: defCorner,
      pattern: 'none',
      mascot: mascot,
      text: defText,
      title: shape === 'checklist' ? 'TO DO LIST' : '',
      checklist: shape === 'checklist' ? [
        { id: 'c1', text: 'Prima attività', done: false },
        { id: 'c2', text: 'Seconda attività', done: false }
      ] : []
    };

    setNotes((prev) => [...prev, newNote]);
    setActiveNoteId(newId);
    setCurrentSection('notes');
    playPop();
    showToast('✨ Nuova nota creata!');
  };

  const handleSelectSticker = (stickerKey: string) => {
    if (!activeNoteId) {
      if (notes.length > 0) {
        setActiveNoteId(notes[0].id);
        const target = notes[0].id;
        setNotes((prev) =>
          prev.map((n) =>
            n.id === target ? { ...n, mascot: stickerKey === 'none' ? null : stickerKey } : n
          )
        );
        playPop();
        showToast(stickerKey === 'none' ? 'Adesivo rimosso' : 'Adesivo applicato! ✨');
      }
      return;
    }
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId ? { ...n, mascot: stickerKey === 'none' ? null : stickerKey } : n
      )
    );
    playPop();
    showToast(stickerKey === 'none' ? 'Adesivo rimosso' : 'Adesivo applicato! ✨');
  };

  const handleResetToPhoto = () => {
    setNotes(getDefaultNotes());
    setWeeklyData(getDefaultWeekly());
    setPlannerData(getDefaultPlannerData());
    setCurrentSection('notes');
    setActiveNoteId('note-1');
    playPop();
    showToast('📸 Quaderno ripristinato come nella foto!');
  };

  const handleClearAllNotes = () => {
    setNotes([]);
    setActiveNoteId(null);
    playPop();
    showToast('🗑️ Tutte le note sono state cancellate');
  };

  // Page navigation helper
  const navigateToPage = (target: 'left' | 'right') => {
    if (viewMode !== target) {
      setViewMode(target);
      playPageFlip();
    }
  };

  // Touch Swipe handlers - carefully filtered to avoid conflicting with inner scrollable elements like habit table dots
  const onTouchStart = (e: React.TouchEvent) => {
    // Only track single touch
    if (e.touches.length !== 1) {
      setTouchStartInfo(null);
      return;
    }

    const target = e.target as HTMLElement | null;
    // Don't track swipe if touch originated on interactive or horizontally scrollable elements (e.g. habit table, dots, stickers, inputs)
    if (
      target &&
      target.closest(
        '.no-page-swipe, input, textarea, select, button, .habit-table, .overflow-x-auto, [data-no-swipe="true"]'
      )
    ) {
      setTouchStartInfo(null);
      return;
    }

    setTouchStartInfo({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartInfo) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartInfo.x - touchEndX;
    const diffY = touchStartInfo.y - touchEndY;
    const elapsed = Date.now() - touchStartInfo.time;

    setTouchStartInfo(null);

    // Only count as intentional page flip swipe if:
    // 1. Horizontal movement is at least 70px
    // 2. Horizontal movement is strictly dominant (> 1.8x vertical movement)
    // 3. Quick flick gesture (< 550ms)
    if (Math.abs(diffX) > 70 && Math.abs(diffX) > Math.abs(diffY) * 1.8 && elapsed < 550) {
      if (diffX > 0 && viewMode === 'left') {
        // Swiped Left -> go to Right Page (Page 2)
        navigateToPage('right');
      } else if (diffX < 0 && viewMode === 'right') {
        // Swiped Right -> go to Left Page (Page 1)
        navigateToPage('left');
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#f5ece1] relative">
      {/* When Cover is Closed: Show Realistic Tactile Cover Cleanly */}
      {!isCoverOpen ? (
        <div className="flex-1 flex flex-col justify-center items-center py-6 sm:py-12 px-3">
          <NotebookCover onOpen={handleOpenCover} isOpening={isOpeningAnim} />
        </div>
      ) : (
        /* When Cover is Open: Show Complete Interactive Notebook */
        <>
          {/* Authentic Cute Header with Unified Navigation */}
          <Header
            viewMode={viewMode}
            onChangeViewMode={(mode) => {
              setViewMode(mode);
              playPageFlip();
            }}
            currentSection={currentSection}
            onAddNote={() => setIsNewNoteModalOpen(true)}
            onResetPhoto={handleResetToPhoto}
            onClearNotes={handleClearAllNotes}
            soundEnabled={soundEnabled}
            onToggleSound={() => {
              setSoundEnabled(!soundEnabled);
              playPop();
            }}
            onCloseCover={handleCloseCover}
            isInstallable={isInstallable}
            isIOS={isIOS}
            onInstall={install}
            onShowIOSGuide={() => setShowIOSGuide(true)}
          />

          {/* Note Contextual Formatting Toolbar (compact single-row when in notes section) */}
          {currentSection === 'notes' && (
            <NoteToolbar
              activeNote={activeNote}
              onUpdateNote={handleUpdateActiveNote}
              onDuplicate={handleDuplicateNote}
              onDelete={handleDeleteNote}
              onClose={() => setActiveNoteId(null)}
              onPopSound={playPop}
            />
          )}

          {/* Main Notebook Workspace Canvas */}
          <main className="flex-1 p-1.5 sm:p-4 pb-20 flex justify-center items-start overflow-x-hidden">
            <div className="notebook-wrapper relative w-full max-w-[960px] flex justify-center drop-shadow-[0_16px_26px_rgba(50,20,35,0.18)]">
              {/* Outer Notebook Cover Base */}
              <div 
                className="notebook-cover-base relative w-full p-1.5 sm:p-3 sm:pr-6 md:pr-8 rounded-2xl shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),inset_0_-4px_7px_rgba(0,0,0,0.35)]"
                style={{
                  backgroundColor: '#5d93dc',
                  backgroundImage: `
                    radial-gradient(#ffffff 2px, transparent 2px),
                    radial-gradient(#fde047 3px, transparent 3px),
                    radial-gradient(#f472b6 2px, transparent 2px)
                  `,
                  backgroundSize: '44px 44px, 58px 58px, 50px 50px',
                  backgroundPosition: '0 0, 22px 22px, 12px 30px',
                }}
              >
                {/* On mobile: 5 authentic, comfortable Filofax binder tabs */}
                <div className="lg:hidden w-full flex items-end justify-between gap-1 sm:gap-1.5 mb-2 px-0.5 z-20">
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('notes')}
                    className={`binder-tab-mobile tab-color-notes ${currentSection === 'notes' ? 'active' : ''}`}
                  >
                    <span className="text-sm">🌸</span>
                    <span>NOTE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('weekly')}
                    className={`binder-tab-mobile tab-color-week ${currentSection === 'weekly' ? 'active' : ''}`}
                  >
                    <span className="text-sm">📅</span>
                    <span>SETT.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('daily')}
                    className={`binder-tab-mobile tab-color-day ${currentSection === 'daily' ? 'active' : ''}`}
                  >
                    <span className="text-sm">☀️</span>
                    <span>DAY</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('diary')}
                    className={`binder-tab-mobile tab-color-diary ${currentSection === 'diary' ? 'active' : ''}`}
                  >
                    <span className="text-sm">📖</span>
                    <span>DIARY</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('habits')}
                    className={`binder-tab-mobile tab-color-habits ${currentSection === 'habits' ? 'active' : ''}`}
                  >
                    <span className="text-sm">🎯</span>
                    <span>HABIT</span>
                  </button>
                </div>

                {/* Side Binder Tab Dividers (Desktop: vertical tabs on the right side) */}
                <div className="hidden lg:flex absolute -right-3.5 top-8 flex-col gap-2 z-30">
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('notes')}
                    className={`binder-tab tab-color-notes ${currentSection === 'notes' ? 'active' : ''}`}
                    title="Bacheca Note"
                  >
                    🌸 NOTE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('weekly')}
                    className={`binder-tab tab-color-week ${currentSection === 'weekly' ? 'active' : ''}`}
                    title="Settimana"
                  >
                    📅 SETT.
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('daily')}
                    className={`binder-tab tab-color-day ${currentSection === 'daily' ? 'active' : ''}`}
                    title="Giorno"
                  >
                    ☀️ DAY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('diary')}
                    className={`binder-tab tab-color-diary ${currentSection === 'diary' ? 'active' : ''}`}
                    title="Diario"
                  >
                    📖 DIARY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('habits')}
                    className={`binder-tab tab-color-habits ${currentSection === 'habits' ? 'active' : ''}`}
                    title="Abitudini"
                  >
                    🎯 HABIT
                  </button>
                </div>



                {/* Elastic band on right */}
                <div className="hidden lg:block absolute -right-2 top-[70%] w-4 h-18 bg-[#eeb311] rounded-r-lg shadow-md z-30 pointer-events-none" />

                {/* Open Pages Spread (No overflow-hidden to prevent cutting off!) */}
                <div 
                  className="notebook-spread bg-[#fdfbf7] rounded-xl relative min-h-[520px] sm:min-h-[640px] shadow-inner pb-6 touch-pan-y"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  {currentSection === 'notes' && (
                    <NotesSection
                      notes={notes}
                      activeNoteId={activeNoteId}
                      onSelectNote={(id) => setActiveNoteId((prev) => (prev === id ? prev : id))}
                      onDeleteNote={(id) => handleDeleteNote(id)}
                      onUpdateNote={(id, updates) =>
                        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)))
                      }
                      onPopSound={playPop}
                      onCheckSound={playCheck}
                      viewMode={viewMode}
                      onNavigatePage={navigateToPage}
                    />
                  )}

                  {currentSection === 'weekly' && (
                    <WeeklySection
                      data={weeklyData}
                      onChange={(upd) => setWeeklyData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onCheckSound={playCheck}
                      onNavigatePage={navigateToPage}
                    />
                  )}

                  {currentSection === 'daily' && (
                    <DailySection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onNavigatePage={navigateToPage}
                    />
                  )}

                  {currentSection === 'diary' && (
                    <DiarySection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onNavigatePage={navigateToPage}
                    />
                  )}

                  {currentSection === 'habits' && (
                    <HabitSection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onCheckSound={playCheck}
                      onNavigatePage={navigateToPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Stickers drawer (active in notes section) */}
          {currentSection === 'notes' && (
            <StickersDrawer onSelectSticker={handleSelectSticker} />
          )}

          {/* Modal to choose note shape */}
          <NewNoteModal
            isOpen={isNewNoteModalOpen}
            onClose={() => setIsNewNoteModalOpen(false)}
            onSelectShape={handleCreateNewNote}
          />
        </>
      )}

      {/* iOS Safari Installation Guide Modal */}
      <PWAInstallModal
        isOpen={showIOSGuide}
        onClose={() => setShowIOSGuide(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-pink-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
