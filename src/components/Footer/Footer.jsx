import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInstagram, FaFacebook, FaWhatsapp,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight
} from 'react-icons/fa';
import duraiLogo from '../../assets/durai_logo.svg';


const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get Quote', href: '#inquiry' },
  { label: 'Contact', href: '#contact' },
];

const Footer = ({ onOpenInquiry }) => {
  const scrollTo = (href) => {
    if (href === '#inquiry' && onOpenInquiry) {
      onOpenInquiry();
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a1628 0%, #05101f 100%)' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
               <div className="rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}>
                            <img src={duraiLogo} alt="Durai Engineering Works" className="w-12 h-12" />
                          </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  DURAI ENG WORKS
                </div>
                <div className="text-xs" style={{ color: '#f59e0b' }}>Aluminium Rolling Machine Specialists</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Manufacturing, service, buy/sale, and complete industrial solutions for aluminium rolling machines.
            </p>
            <div className="flex gap-3">
              <a href="#" onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(225,48,108,0.2)', color: '#e1306c' }}>
                <FaInstagram />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(66,103,178,0.2)', color: '#4267B2' }}>
                <FaFacebook />
              </a>
              <a href="https://wa.me/9487624853?text=Hello%20Durai%20Eng%20Works%2C%20I%20need%20support%20for%20an%20aluminium%20rolling%20machine."
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(37,211,102,0.2)', color: '#25D366' }}>
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 hover:gap-3"
                  >
                    <FaArrowRight className="text-xs" style={{ color: '#f59e0b' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services
            </h4>
            <ul className="space-y-2">
              {[
                'Machine manufacturing & service',
                'New & used machine buy / sale',
                'Service & maintenance support',
                'Complete industrial solutions',
                'Spares & consumables',
                'On-site troubleshooting',
              ].map((p) => (
                <li key={p}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span style={{ color: '#f59e0b' }}>›</span> {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-lg mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                <span className="text-gray-400 text-sm">
                  Office: No.113, Hood Wharf 1st Lane, V.O.C Road, Wall Tax Road, Chennai - 600079
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone style={{ color: '#10b981' }} className="flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:9884957853" className="text-gray-400 hover:text-white transition-colors block">98849 57853</a>
                  <a href="tel:9487624853" className="text-gray-400 hover:text-white transition-colors block">94876 24853</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: '#60a5fa' }} className="flex-shrink-0" />
                <a href="mailto:duraiengineeringworks@example.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                  duraiengineeringworks@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Durai Engineering Works. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Admin Login
            </Link>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-xs">Privacy Policy</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-xs">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
