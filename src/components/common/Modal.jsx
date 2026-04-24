import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal'}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />

      {/* Decorative glass blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/10 backdrop-blur border-b border-white/15 px-5 py-4 flex items-center justify-between">
          <div className="font-bold text-white">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full grid place-items-center border border-white/15 bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-72px)] p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
