import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap, FaInstagram, FaFacebook, FaWhatsapp,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight
} from 'react-icons/fa';
import school_icon from '../../assets/school_icon.png';


const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Admission', href: '#admission' },
  { label: 'Contact', href: '#contact' },
];

const Footer = ({ onOpenAdmission }) => {
  const scrollTo = (href) => {
    if (href === '#admission' && onOpenAdmission) {
      onOpenAdmission();
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
                            {/* <FaGraduationCap className="text-white text-xl" /> */}
                            <img src={school_icon} alt="School Logo" className="w-12 h-12" />
                          </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ANNAI ABIRAMI
                </div>
                <div className="text-xs" style={{ color: '#f59e0b' }}>NATIONAL HR. SEC. SCHOOL</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Born to Win. Shaping extraordinary futures through quality education, 
              strong values, and unwavering dedication since 1995.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/ANNAI_ABIRAMI_SCHOOL_OFFICAL" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(225,48,108,0.2)', color: '#e1306c' }}>
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/AnnaiAbirami" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(66,103,178,0.2)', color: '#4267B2' }}>
                <FaFacebook />
              </a>
              <a href="https://wa.me/919787298569?text=Thank%20you%20choosing%20Annai%20Abirami%20School.%20How%20can%20I%20help%20you%3F"
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

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Programs
            </h4>
            <ul className="space-y-2">
              {['LKG & UKG', 'Classes I – V', 'Classes VI – X', 'Class XI – Group 1 (Bio)', 'Class XI – Group 2 (CS)', 'Class XI – Group 3 (Science)', 'Class XII Board Exam'].map((p) => (
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
                  No.3, Kamarajar Salai, Kottucherry, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone style={{ color: '#10b981' }} className="flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:9787298569" className="text-gray-400 hover:text-white transition-colors block">9787298569</a>
                  <a href="tel:9842270628" className="text-gray-400 hover:text-white transition-colors block">9842270628</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: '#60a5fa' }} className="flex-shrink-0" />
                <a href="mailto:annaiabiraminationalschool@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                  annaiabiraminationalschool@gmail.com
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
            © 2025 Annai Abirami National Hr. Sec. School. All rights reserved.
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
