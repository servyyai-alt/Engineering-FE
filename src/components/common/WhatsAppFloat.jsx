import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const waLink = "https://wa.me/919884957853?text=Hello%20Durai%20Eng%20Works%2C%20I%20need%20support%20for%20an%20aluminium%20rolling%20machine.";

  return (
    <div className="whatsapp-float">
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bottom-16 right-0 w-52 rounded-2xl p-3 shadow-2xl"
          style={{ background: '#fff', border: '1px solid #e5e7eb' }}
        >
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
            style={{ background: '#6b7280' }}
          >
            <FaTimes />
          </button>
          <p className="text-gray-700 text-xs font-medium leading-snug">
            💬 Chat with us on WhatsApp for quick machine support and quotes.
          </p>
        </div>
      )}

      {/* Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 relative"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 8px 30px rgba(37,211,102,0.5)' }}
        onClick={() => setShowTooltip(false)}
      >
        <FaWhatsapp className="text-3xl" />
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: '#25D366' }} />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
