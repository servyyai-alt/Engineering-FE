import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPhoneAlt, FaStar, FaCogs, FaIndustry, FaWrench, FaExchangeAlt } from 'react-icons/fa';
import heroBg from '../../assets/durai_poster.jpeg';

const highlights = [
  { icon: <FaIndustry />, label: 'Rolling Machine Specialists', color: '#f59e0b' },
  { icon: <FaCogs />, label: 'Manufacturing & Service', color: '#3b82f6' },
  { icon: <FaExchangeAlt />, label: 'New & Used Buy / Sale', color: '#10b981' },
  { icon: <FaWrench />, label: 'Maintenance & Spares', color: '#ef4444' },
];

const Hero = ({ onOpenInquiry }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
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
      <div className="absolute inset-0 hero-overlay" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background: i % 2 === 0 ? '#f59e0b' : '#3b82f6',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-7xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', transitionDelay: '0.1s' }}>
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-200 text-sm font-semibold tracking-wide">FAST RESPONSE • FACTORY SUPPORT</span>
          </div>

          {/* Company Name */}
          <h1
            className={`text-white font-black leading-tight mb-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transitionDelay: '0.2s',
            }}
          >
            DURAI ENG WORKS
          </h1>
          <h2
            className={`font-bold mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
              color: '#f59e0b',
              letterSpacing: '0.1em',
              transitionDelay: '0.3s',
            }}
          >
            ALUMINIUM ROLLING MACHINE SPECIALISTS
          </h2>

          {/* Stars */}
          <div className={`flex items-center gap-1 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.35s' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-base" />
            ))}
            <span className="text-gray-200 text-sm ml-2">Trusted industrial partner</span>
          </div>

          {/* Tagline */}
          <div
            className={`mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <span
              className="text-5xl font-black italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              "Built for Production"
            </span>
          </div>

          <p
            className={`text-gray-300 text-lg mb-10 max-w-xl leading-relaxed transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            Manufacturing, service, and complete solutions for aluminium rolling machines.
            Get support for new & used machines, preventive maintenance, and industrial requirements.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <button
              onClick={() => (onOpenInquiry ? onOpenInquiry() : scrollTo('#inquiry'))}
              className="btn-primary flex items-center gap-2"
            >
              Get Quote <FaArrowRight className="text-sm" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-outline flex items-center gap-2"
            >
              <FaPhoneAlt className="text-sm" /> Contact Us
            </button>
          </div>

          {/* Quick Highlights */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.7s' }}
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
                  style={{ background: `${h.color}33`, color: h.color }}
                >
                  {h.icon}
                </div>
                <span className="text-white text-sm font-semibold">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      {/* News Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ background: 'rgba(29,78,216,0.9)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center py-3 px-4">
          <span className="text-white text-xs font-bold px-3 py-1 rounded-full mr-4 flex-shrink-0"
            style={{ background: '#f59e0b', color: '#0a1628' }}>
            UPDATES
          </span>
          <div className="overflow-hidden flex-1">
            <div className="news-ticker text-white text-sm whitespace-nowrap">
              Aluminium Rolling Machine Manufacturing & Service &nbsp;&nbsp;|&nbsp;&nbsp;
              New & Used Machine Buy / Sale &nbsp;&nbsp;|&nbsp;&nbsp;
              Service & Maintenance Support &nbsp;&nbsp;|&nbsp;&nbsp;
              Complete Solutions for Industrial Needs &nbsp;&nbsp;|&nbsp;&nbsp;
              Call: 98849 57853 / 94876 24853 &nbsp;&nbsp;|&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
