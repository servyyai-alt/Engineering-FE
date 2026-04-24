import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPhoneAlt, FaStar, FaUsers, FaTrophy, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const highlights = [
  { icon: <FaBook />, label: 'LKG to XII', color: '#3b82f6' },
  { icon: <FaChalkboardTeacher />, label: 'Smart Classrooms', color: '#f59e0b' },
  { icon: <FaUsers />, label: 'Experienced Teachers', color: '#10b981' },
  { icon: <FaTrophy />, label: 'Best Results', color: '#ef4444' },
];

const Hero = ({ onOpenAdmission }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    'https://res.cloudinary.com/drbw02kdu/image/upload/v1777028666/WhatsApp_Image_2026-04-24_at_4.21.43_PM_1_ykr2gr.jpg',
    'https://res.cloudinary.com/drbw02kdu/image/upload/v1777012395/207.jpg_fosipe.jpg',
    'https://res.cloudinary.com/drbw02kdu/image/upload/v1777012395/194.jpg_tmuuye.jpg',
  ];

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Images */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1500"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentBg === i ? 1 : 0,
          }}
        />
      ))}

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
          {/* Admission Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', transitionDelay: '0.1s' }}>
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300 text-sm font-semibold tracking-wide">ADMISSION OPEN 2025-26</span>
          </div>

          {/* School Name */}
          <h1
            className={`text-white font-black leading-tight mb-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transitionDelay: '0.2s',
            }}
          >
            ANNAI ABIRAMI
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
            NATIONAL HR. SEC. SCHOOL
          </h2>

          {/* Stars */}
          <div className={`flex items-center gap-1 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.35s' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-base" />
            ))}
            <span className="text-gray-300 text-sm ml-2">Premium Educational Institution</span>
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
              "Born to Win"
            </span>
          </div>

          <p
            className={`text-gray-300 text-lg mb-10 max-w-xl leading-relaxed transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            Empowering young minds from LKG to XII with world-class education, 
            discipline, and values. Where every child's potential becomes their 
            greatest achievement.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <button
              onClick={() => (onOpenAdmission ? onOpenAdmission() : scrollTo('#admission'))}
              className="btn-primary flex items-center gap-2"
            >
              Apply Admission <FaArrowRight className="text-sm" />
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
            📢 NEWS
          </span>
          <div className="overflow-hidden flex-1">
            <div className="news-ticker text-white text-sm whitespace-nowrap">
              🎉 Admission Open for 2025-26 Academic Year &nbsp;&nbsp;|&nbsp;&nbsp; 
              🏆 100% Board Exam Results Achieved &nbsp;&nbsp;|&nbsp;&nbsp; 
              📚 Smart Classrooms with Digital Learning &nbsp;&nbsp;|&nbsp;&nbsp; 
              🌟 Join us for Excellence in Education &nbsp;&nbsp;|&nbsp;&nbsp;
              📞 Call: 9787298569 / 9842270628 &nbsp;&nbsp;|&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
