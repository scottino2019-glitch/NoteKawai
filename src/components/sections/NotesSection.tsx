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
}) => {
  const leftNotes = notes.filter((n) => n.page === 'left');
  const rightNotes = notes.filter((n) => n.page === 'right');

  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  return (
    <div className="flex w-full min-h-[660px]">
      {/* Left Page: Pink */}
      {showLeft && (
        <div
          className={`notebook-page page-left flex-1 relative p-4 min-h-[660px] ${
            viewMode === 'left' ? 'rounded-xl shadow-md' : 'rounded-l-xl'
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
          <div className="page-left-grid mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leftNotes.map((note) => (
              <StickyCard
                key={note.id}
                note={note}
                isSelected={note.id === activeNoteId}
                onSelect={() => onSelectNote(note.id)}
                onDelete={() => onDeleteNote(note.id)}
                onChange={(updates) => onUpdateNote(note.id, updates)}
                onPopSound={onPopSound}
                onCheckSound={onCheckSound}
              />
            ))}
          </div>
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && <SpiralWire />}

      {/* Right Page: Lilac */}
      {showRight && (
        <div
          className={`notebook-page page-right flex-1 relative p-4 min-h-[660px] ${
            viewMode === 'right' ? 'rounded-xl shadow-md' : 'rounded-r-xl'
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
          <div className="page-right-grid mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-items-center">
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
