import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import duraiLogo from '../../assets/durai_logo.svg';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get Quote', href: '#inquiry' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);

    if (href === '#inquiry' && onOpenInquiry) {
      onOpenInquiry();
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
      style={{ background: scrolled ? 'rgba(10,22,40,0.97)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <div className="rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}>
              <img src={duraiLogo} alt="Durai Engineering Works" className="w-12 h-12" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                DURAI ENG WORKS
              </div>
              <div className="text-xs leading-tight" style={{ color: '#f59e0b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Aluminium Rolling Machines
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeLink === link.href
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={activeLink === link.href ? { color: '#f59e0b' } : {}}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#inquiry')}
              className="ml-4 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e40af)', boxShadow: '0 4px 15px rgba(29,78,216,0.4)' }}
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden mt-4 pb-4 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(13,31,60,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-6 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                style={activeLink === link.href ? { color: '#f59e0b' } : {}}
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <button
                onClick={() => handleNavClick('#inquiry')}
                className="w-full py-3 rounded-full text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
