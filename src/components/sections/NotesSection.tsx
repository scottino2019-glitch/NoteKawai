import React from 'react';
import { NoteItem, ViewMode } from '../../types';
import { StickyCard } from '../StickyCard';
import { SpiralWire } from '../SpiralWire';

interface NotesSectionProps {
  notes: NoteItem[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, updates: Partial<NoteItem>) => void;
  onPopSound?: () => void;
  onCheckSound?: () => void;
  viewMode: ViewMode;
  onNavigatePage?: (page: 'left' | 'right') => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  activeNoteId,
  onSelectNote,
  onDeleteNote,
  onUpdateNote,
  onPopSound,
  onCheckSound,
  viewMode,
  onNavigatePage,
}) => {
  const leftNotes = notes.filter((n) => n.page === 'left');
  const rightNotes = notes.filter((n) => n.page === 'right');

  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  return (
    <div className={`flex ${viewMode === 'both' ? 'flex-col md:flex-row' : 'flex-col'} w-full min-h-0`}>
      {/* Left Page: Pink */}
      {showLeft && (
        <div
          className={`notebook-page page-left flex-1 relative p-3 sm:p-5 pb-8 min-h-[540px] sm:min-h-[640px] ${
            viewMode === 'left' ? 'rounded-xl shadow-md' : 'rounded-t-xl md:rounded-tr-none md:rounded-l-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-pink)',
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Note washi tape header banner */}
          <div className="note-washi-tape">NOTE</div>

          {/* Grid for notes */}
          <div className="page-left-grid mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {leftNotes.map((note) => (
              <div key={note.id} className="w-full">
                <StickyCard
                  note={note}
                  isSelected={note.id === activeNoteId}
                  onSelect={() => onSelectNote(note.id)}
                  onDelete={() => onDeleteNote(note.id)}
                  onChange={(updates) => onUpdateNote(note.id, updates)}
                  onPopSound={onPopSound}
                  onCheckSound={onCheckSound}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && (
        <div className="hidden md:flex">
          <SpiralWire />
        </div>
      )}

      {/* Right Page: Lilac */}
      {showRight && (
        <div
          className={`notebook-page page-right flex-1 relative p-3 sm:p-5 pb-8 min-h-[540px] sm:min-h-[640px] ${
            viewMode === 'right' ? 'rounded-xl shadow-md' : 'rounded-b-xl md:rounded-bl-none md:rounded-r-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-lilac)',
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          <div className="page-right-grid mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center justify-items-center">
            {rightNotes.map((note) => (
              <div key={note.id} className="w-full flex items-center justify-center">
                <StickyCard
                  note={note}
                  isSelected={note.id === activeNoteId}
                  onSelect={() => onSelectNote(note.id)}
                  onDelete={() => onDeleteNote(note.id)}
                  onChange={(updates) => onUpdateNote(note.id, updates)}
                  onPopSound={onPopSound}
                  onCheckSound={onCheckSound}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
