import React from 'react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border-2 border-pink-100 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📲</span>
          <h3 className="text-base font-bold text-gray-900 font-['Mali',cursive]">
            Installa su iPhone o iPad
          </h3>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Per utilizzare questa applicazione come vera e propria app a schermo intero anche offline:
        </p>

        <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside bg-pink-50/60 p-3 rounded-xl border border-pink-200">
          <li>
            Tocca l&apos;icona di <strong className="text-pink-700">Condivisione (Share ⬆️)</strong> nella barra del browser Safari in basso.
          </li>
          <li>
            Scorri verso il basso nel menu e seleziona <strong className="text-pink-700">&quot;Aggiungi alla schermata Home&quot; ➕</strong>.
          </li>
          <li>
            Conferma toccando <strong className="text-pink-700">&quot;Aggiungi&quot;</strong> in alto a destra.
          </li>
        </ol>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-xl bg-pink-600 py-2.5 text-xs font-bold text-white hover:bg-pink-700 transition"
        >
          Ho capito ✨
        </button>
      </div>
    </div>
  );
};
