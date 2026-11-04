import React from 'react';
import { NoteItem } from '../types';
import { SVGS, STICKER_EMOJIS, HeartShapeSVG, DaisyShapeSVG } from './SVGAssets';

interface StickyCardProps {
  note: NoteItem;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onChange: (updated: Partial<NoteItem>) => void;
  onCheckSound?: () => void;
  onPopSound?: () => void;
}

export const StickyCard: React.FC<StickyCardProps> = ({
  note,
  isSelected,
  onSelect,
  onDelete,
  onChange,
  onCheckSound,
  onPopSound,
}) => {
  const getPatternClass = () => {
    switch (note.pattern) {
      case 'ruled':
        return 'pattern-ruled';
      case 'grid':
        return 'pattern-grid';
      case 'dots':
        return 'pattern-dots';
      default:
        return '';
    }
  };

  const getCornerClass = () => {
    switch (note.corner) {
      case 'tl':
        return 'corner-tl';
      case 'tr':
        return 'corner-tr';
      default:
        return '';
    }
  };

  // Checklist handler
  const handleCheckItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!note.checklist) return;
    const updated = note.checklist.map((item) => {
      if (item.id === id) {
        const next = !item.done;
        if (next && onCheckSound) onCheckSound();
        return { ...item, done: next };
      }
      return item;
    });
    onChange({ checklist: updated });
  };

  const handleItemTextChange = (id: string, text: string) => {
    if (!note.checklist) return;
    const updated = note.checklist.map((item) => (item.id === id ? { ...item, text } : item));
    onChange({ checklist: updated });
  };

  const handleAddChecklistItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    const list = note.checklist ? [...note.checklist] : [];
    list.push({ id: 'c_' + Date.now(), text: 'Nuova voce', done: false });
    onChange({ checklist: list });
    if (onPopSound) onPopSound();
  };

  const handleKeyDownItem = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!note.checklist) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const list = [...note.checklist];
      list.splice(index + 1, 0, { id: 'c_' + Date.now(), text: '', done: false });
      onChange({ checklist: list });
    } else if (e.key === 'Backspace' && note.checklist[index].text === '' && note.checklist.length > 1) {
      e.preventDefault();
      const list = note.checklist.filter((_, i) => i !== index);
      onChange({ checklist: list });
    }
  };

  // Shape specific base styling
  let shapeClass = 'shape-square';
  let cardStyle: React.CSSProperties = {
    backgroundColor: note.color,
  };

  if (note.shape === 'heart') {
    shapeClass = 'shape-heart';
    cardStyle = {
      color: note.color,
      backgroundColor: 'transparent',
    };
  } else if (note.shape === 'daisy') {
    shapeClass = 'shape-daisy';
    cardStyle = {
      backgroundColor: 'transparent',
    };
  } else if (note.shape === 'lined') {
    shapeClass = 'shape-lined';
  } else if (note.shape === 'checklist') {
    shapeClass = 'shape-checklist';
  } else if (note.shape === 'pennant') {
    shapeClass = 'shape-pennant';
  } else if (note.shape === 'bubble') {
    shapeClass = 'shape-bubble';
  }

  return (
    <div
      onClick={onSelect}
      className={`sticky-card ${shapeClass} ${getPatternClass()} ${getCornerClass()} ${
        isSelected ? 'selected' : ''
      }`}
      style={cardStyle}
    >
      {/* SVG Shapes */}
      {note.shape === 'heart' && <HeartShapeSVG color={note.color} />}
      {note.shape === 'daisy' && <DaisyShapeSVG />}

      {/* Top Header Bar */}
      <div className="card-header-bar relative z-10">
        <span className="card-pin-badge">POST-IT</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="card-del-btn"
          title="Elimina nota"
        >
          &times;
        </button>
      </div>

      {/* Content depending on shape */}
      {note.shape === 'checklist' ? (
        <div className="relative z-10 flex flex-col flex-1 w-full">
          <input
            type="text"
            className="checklist-pill-title"
            value={note.title || 'TO DO LIST'}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="TITOLO"
            onFocus={onSelect}
          />
          <div className="checklist-items-wrap flex-1 flex flex-col gap-1 overflow-y-auto max-h-[140px] pr-1">
            {(note.checklist || []).map((item, idx) => (
              <div key={item.id} className="checklist-row">
                <div
                  onClick={(e) => handleCheckItem(item.id, e)}
                  className={`chk-box ${item.done ? 'checked' : ''}`}
                />
                <input
                  type="text"
                  className={`chk-input ${item.done ? 'checked' : ''}`}
                  value={item.text}
                  onChange={(e) => handleItemTextChange(item.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDownItem(idx, e)}
                  onFocus={onSelect}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddChecklistItem}
            className="text-[11px] font-bold text-teal-800 text-left mt-1 hover:underline cursor-pointer"
          >
            + Aggiungi elemento
          </button>
        </div>
      ) : (
        <textarea
          className="card-textarea relative z-10"
          value={note.text || ''}
          placeholder="Scrivi qui..."
          onChange={(e) => onChange({ text: e.target.value })}
          onFocus={onSelect}
          style={{
            fontFamily: note.fontFamily,
            fontSize: note.fontSize,
            color: note.fontColor,
            textAlign: note.textAlign,
          }}
        />
      )}

      {/* Mascot Sticker */}
      {note.mascot && (
        <div
          className={`mascot-container ${
            note.shape === 'heart' ? 'mascot-bottom-center' : 'mascot-bottom-right'
          }`}
        >
          {SVGS[note.mascot] ? (
            <div dangerouslySetInnerHTML={{ __html: SVGS[note.mascot] }} />
          ) : (
            <span className="emoji-sticker">
              {STICKER_EMOJIS[note.mascot] || note.mascot}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
