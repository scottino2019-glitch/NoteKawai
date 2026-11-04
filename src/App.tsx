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

  // Section & View mode
  const [currentSection, setCurrentSection] = useState<SectionType>('notes');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'left';
    }
    return 'both';
  });

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

  // Adjust view mode dynamically on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === 'both') {
        setViewMode('left');
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f5ece1] relative select-none">
      {/* Offline connectivity indicator */}
      {!isOnline && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Modalità Offline • Dati salvati in locale</span>
        </div>
      )}

      {/* When Cover is Closed: Show Realistic Tactile Cover */}
      {!isCoverOpen ? (
        <div className="flex-1 flex flex-col justify-center items-center py-8 px-3">
          <NotebookCover onOpen={handleOpenCover} isOpening={isOpeningAnim} />

          {/* Quick bottom toolbar when closed */}
          <div className="mt-4 flex items-center gap-3">
            {isInstallable && (
              <button
                type="button"
                onClick={install}
                className="px-4 py-2 rounded-xl bg-pink-600 text-white font-bold text-xs shadow-md hover:bg-pink-700 transition flex items-center gap-1.5"
              >
                <span>📲</span>
                <span>Installa come PWA</span>
              </button>
            )}

            {isIOS && (
              <button
                type="button"
                onClick={() => setShowIOSGuide(true)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 font-bold text-xs shadow-sm hover:bg-pink-50 transition flex items-center gap-1.5"
              >
                <span>📲</span>
                <span>Installa su iPhone</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playPop();
              }}
              className="p-2 rounded-xl bg-white border border-pink-200 text-pink-700 shadow-sm hover:bg-pink-50 transition text-sm font-bold"
              title="Suoni"
            >
              {soundEnabled ? '🔊 Suoni On' : '🔇 Suoni Off'}
            </button>
          </div>
        </div>
      ) : (
        /* When Cover is Open: Show Complete Interactive Notebook */
        <>
          {/* Header */}
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

          {/* Note Contextual Formatting Toolbar (when in notes section) */}
          {currentSection === 'notes' && (
            <NoteToolbar
              activeNote={activeNote}
              onUpdateNote={handleUpdateActiveNote}
              onDuplicate={handleDuplicateNote}
              onDelete={handleDeleteNote}
              onPopSound={playPop}
            />
          )}

          {/* Mobile Page Turn Bar (When single page is viewed, e.g. on phones) */}
          {viewMode !== 'both' && (
            <div className="bg-pink-100/70 border-b border-pink-200 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-pink-800">
              <button
                type="button"
                disabled={viewMode === 'left'}
                onClick={() => {
                  setViewMode('left');
                  playPageFlip();
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
                  viewMode === 'left'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-pink-700 hover:bg-pink-50'
                }`}
              >
                <span>◀</span>
                <span>Pagina Sinistra (1)</span>
              </button>

              <span className="text-[11px] text-pink-600 font-semibold hidden sm:inline">
                Tocca per girare pagina
              </span>

              <button
                type="button"
                disabled={viewMode === 'right'}
                onClick={() => {
                  setViewMode('right');
                  playPageFlip();
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
                  viewMode === 'right'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-pink-700 hover:bg-pink-50'
                }`}
              >
                <span>Pagina Destra (2)</span>
                <span>▶</span>
              </button>
            </div>
          )}

          {/* Main Notebook Workspace Canvas */}
          <main className="flex-1 p-2 sm:p-4 pb-20 flex justify-center items-start overflow-x-auto">
            <div className="notebook-wrapper relative w-full max-w-[960px] flex justify-center drop-shadow-[0_16px_26px_rgba(50,20,35,0.18)]">
              {/* Outer Notebook Cover Base */}
              <div 
                className="notebook-cover-base relative w-full p-2.5 sm:p-3.5 sm:pr-7 rounded-2xl shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),inset_0_-4px_7px_rgba(0,0,0,0.35)]"
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
                {/* Side / Top Binder Tab Dividers */}
                {/* On desktop: vertical tabs on the right side */}
                <div className="hidden md:flex absolute -right-3.5 top-8 flex-col gap-2 z-30">
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

                {/* On mobile: horizontal tab bar above the spread */}
                <div className="md:hidden flex items-center justify-between gap-1 mb-2 overflow-x-auto scrollbar-none py-1">
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('notes')}
                    className={`px-3 py-1 rounded-lg text-xs font-black text-white shrink-0 shadow-sm transition ${
                      currentSection === 'notes' ? 'bg-pink-600 scale-105 ring-2 ring-white' : 'bg-pink-400 opacity-80'
                    }`}
                  >
                    🌸 NOTE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('weekly')}
                    className={`px-3 py-1 rounded-lg text-xs font-black text-white shrink-0 shadow-sm transition ${
                      currentSection === 'weekly' ? 'bg-purple-600 scale-105 ring-2 ring-white' : 'bg-purple-400 opacity-80'
                    }`}
                  >
                    📅 SETT.
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('daily')}
                    className={`px-3 py-1 rounded-lg text-xs font-black text-white shrink-0 shadow-sm transition ${
                      currentSection === 'daily' ? 'bg-sky-600 scale-105 ring-2 ring-white' : 'bg-sky-400 opacity-80'
                    }`}
                  >
                    ☀️ DAY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('diary')}
                    className={`px-3 py-1 rounded-lg text-xs font-black text-white shrink-0 shadow-sm transition ${
                      currentSection === 'diary' ? 'bg-emerald-600 scale-105 ring-2 ring-white' : 'bg-emerald-400 opacity-80'
                    }`}
                  >
                    📖 DIARY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSection('habits')}
                    className={`px-3 py-1 rounded-lg text-xs font-black text-white shrink-0 shadow-sm transition ${
                      currentSection === 'habits' ? 'bg-amber-600 scale-105 ring-2 ring-white' : 'bg-amber-400 opacity-80'
                    }`}
                  >
                    🎯 HABIT
                  </button>
                </div>

                {/* Elastic band on right */}
                <div className="hidden md:block absolute -right-2 top-[70%] w-4 h-18 bg-[#eeb311] rounded-r-lg shadow-md z-30 pointer-events-none" />

                {/* Open Pages Spread */}
                <div className="notebook-spread bg-[#fdfbf7] rounded-xl relative min-h-[660px] overflow-hidden shadow-inner">
                  {currentSection === 'notes' && (
                    <NotesSection
                      notes={notes}
                      activeNoteId={activeNoteId}
                      onSelectNote={(id) => setActiveNoteId(id)}
                      onDeleteNote={(id) => handleDeleteNote(id)}
                      onUpdateNote={(id, updates) =>
                        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)))
                      }
                      onPopSound={playPop}
                      onCheckSound={playCheck}
                      viewMode={viewMode}
                    />
                  )}

                  {currentSection === 'weekly' && (
                    <WeeklySection
                      data={weeklyData}
                      onChange={(upd) => setWeeklyData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onCheckSound={playCheck}
                    />
                  )}

                  {currentSection === 'daily' && (
                    <DailySection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                    />
                  )}

                  {currentSection === 'diary' && (
                    <DiarySection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                    />
                  )}

                  {currentSection === 'habits' && (
                    <HabitSection
                      data={plannerData}
                      onChange={(upd) => setPlannerData((prev) => ({ ...prev, ...upd }))}
                      viewMode={viewMode}
                      onPopSound={playPop}
                      onCheckSound={playCheck}
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
