import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaInstagram, FaFacebook, FaWhatsapp, FaClock
} from 'react-icons/fa';

const contactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: 'Our Address',
    lines: ['No.3, Kamarajar Salai,', 'Kottucherry, Tamil Nadu'],
    color: '#ef4444',
    bg: '#fef2f2',
  },
  {
    icon: <FaPhone className="text-2xl" />,
    title: 'Phone Numbers',
    lines: ['9787298569', '9842270628'],
    color: '#10b981',
    bg: '#f0fdf4',
    href: 'tel:9787298569',
  },
  {
    icon: <FaEnvelope className="text-2xl" />,
    title: 'Email Address',
    lines: ['annaiabiraminationalschool', '@gmail.com'],
    color: '#1d4ed8',
    bg: '#eff6ff',
    href: 'mailto:annaiabiraminationalschool@gmail.com',
  },
  {
    icon: <FaClock className="text-2xl" />,
    title: 'Office Hours',
    lines: ['Mon – Sat: 8:00 AM – 4:00 PM', 'Sunday: Closed'],
    color: '#f59e0b',
    bg: '#fffbeb',
  },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact <span className="blue-text">Us</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We'd love to hear from you. Reach out for admissions, queries, or just to say hello!
          </p>
        </div>

        {/* Contact Cards */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {contactInfo.map((c, i) => (
            <div key={i} className="card-hover rounded-2xl p-6 text-center border border-gray-100"
              style={{ background: c.bg }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${c.color}15`, color: c.color }}>
                {c.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{c.title}</h4>
              {c.href
                ? <a href={c.href} className="font-medium text-sm" style={{ color: c.color }}>
                    {c.lines.map((l, j) => <div key={j}>{l}</div>)}
                  </a>
                : c.lines.map((l, j) => <div key={j} className="text-gray-600 text-sm">{l}</div>)
              }
            </div>
          ))}
        </div>

        {/* Map + Social */}
        <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Google Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: '350px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62758.57369753044!2d79.59637!3d10.20737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5531a0a6c1b0c7%3A0x1a6a7e2e0e5e4b1a!2sKottucherry%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            />
          </div>

          {/* Social + Download */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6 h-full"
              style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a5c)' }}>
              <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Connect With Us
              </h4>

              <div className="space-y-3 mb-6">
                <a
                  href="https://www.instagram.com/ANNAI_ABIRAMI_SCHOOL_OFFICAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(225,48,108,0.15)', border: '1px solid rgba(225,48,108,0.3)' }}
                >
                  <FaInstagram className="text-2xl" style={{ color: '#e1306c' }} />
                  <div>
                    <div className="text-white font-semibold text-sm">Instagram</div>
                    <div className="text-gray-400 text-xs">@ANNAI_ABIRAMI_SCHOOL_OFFICAL</div>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/AnnaiAbirami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(66,103,178,0.15)', border: '1px solid rgba(66,103,178,0.3)' }}
                >
                  <FaFacebook className="text-2xl" style={{ color: '#4267B2' }} />
                  <div>
                    <div className="text-white font-semibold text-sm">Facebook</div>
                    <div className="text-gray-400 text-xs">AnnaiAbirami School</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919787298569?text=Thank%20you%20choosing%20Annai%20Abirami%20School.%20How%20can%20I%20help%20you%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}
                >
                  <FaWhatsapp className="text-2xl" style={{ color: '#25D366' }} />
                  <div>
                    <div className="text-white font-semibold text-sm">WhatsApp</div>
                    <div className="text-gray-400 text-xs">Chat with us: 9787298569</div>
                  </div>
                </a>
              </div>

              {/* Download Brochure */}
              <button
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                📥 Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
