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
        className="absolute inset-0 bg-black/60"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div className="font-bold text-gray-900">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full grid place-items-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-72px)]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

