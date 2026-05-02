import React, { useState, useEffect } from 'react';
import {
  FaArrowRight,
  FaPhoneAlt,
  FaStar,
  FaCogs,
  FaIndustry,
  FaWrench,
  FaExchangeAlt,
} from 'react-icons/fa';
import heroBg from '../../assets/durai_poster.jpeg';

const highlights = [
  { icon: <FaIndustry />, label: 'Rolling Machine Specialists', color: '#f59e0b' },
  { icon: <FaCogs />, label: 'Manufacturing & Service', color: '#3b82f6' },
  { icon: <FaExchangeAlt />, label: 'New & Used Buy / Sale', color: '#10b981' },
  { icon: <FaWrench />, label: 'Maintenance & Spares', color: '#ef4444' },
];

export default function Hero({ onOpenInquiry }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative md:min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.05)',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a1628]/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-32">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-red-500/20 border border-red-400/40">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-200 text-sm font-semibold">
              FAST RESPONSE • FACTORY SUPPORT
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white font-black mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            DURAI ENG WORKS
          </h1>

          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: '#f59e0b',
              letterSpacing: '0.1em',
            }}
          >
            ALUMINIUM ROLLING MACHINE SPECIALISTS
          </h2>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-gray-300 text-sm">
              Trusted industrial partner
            </span>
          </div>

          {/* Tagline */}
          <h3
            className="italic mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            "Built for Production"
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
            Manufacturing, service, and complete solutions for aluminium rolling machines.
            Get support for new & used machines, preventive maintenance, and industrial requirements.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => (onOpenInquiry ? onOpenInquiry() : scrollTo('#inquiry'))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
            >
              Get Quote <FaArrowRight />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="border border-white/40 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10"
            >
              <FaPhoneAlt /> Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 FLOATING HIGHLIGHTS (BOTTOM FULL WIDTH) */}
      <div className="absolute bottom-6 left-0 hidden md:block w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-8">

          {highlights.map((h, i) => (
            <div
              key={i}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-3 hover:scale-105 transition"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                style={{ background: `${h.color}33`, color: h.color }}
              >
                {h.icon}
              </div>
              <span className="text-white text-sm font-semibold">
                {h.label}
              </span>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}