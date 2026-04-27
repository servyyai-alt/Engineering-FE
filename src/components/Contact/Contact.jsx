import React from "react";
import { useInView } from "react-intersection-observer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkedAlt,
} from "react-icons/fa";
import locationQr from "../../assets/location_qr.jpeg";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Durai%20Engineering%20Works%2C%20Wall%20Tax%20Road%2C%20Chennai%20600079";

const contactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: "Our Address",
    lines: ["Office: No.113, Hood Wharf 1st Lane,", "V.O.C Road, Wall Tax Road, Chennai - 600079"],
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    icon: <FaPhone className="text-2xl" />,
    title: "Phone Numbers",
    lines: ["98849 57853", "94876 24853"],
    color: "#10b981",
    bg: "#f0fdf4",
    href: "tel:9884957853",
  },
  {
    icon: <FaEnvelope className="text-2xl" />,
    title: "Email Address",
    lines: ["duraiengineeringworks", "@example.com"],
    color: "#1d4ed8",
    bg: "#eff6ff",
    href: "mailto:duraiengineeringworks@example.com",
  },
  {
    isQr: true,
    icon: <FaMapMarkedAlt className="text-2xl" />,
    title: "Scan for Location",
    color: "#6366f1",
    bg: "#f5f3ff",
  },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
            }}
          >
            Get In Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact <span className="blue-text">Us</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Reach out for machine requirements, service support, and industrial solutions.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {contactInfo.map((c, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 text-center border border-gray-100 flex flex-col items-center"
              style={{ background: c.bg }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${c.color}15`, color: c.color }}
              >
                {c.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{c.title}</h4>
              
              {c.isQr ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={locationQr}
                    alt="Location QR code"
                    className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white p-1"
                    loading="lazy"
                  />
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-tighter hover:underline"
                    style={{ color: c.color }}
                  >
                    Open in Maps
                  </a>
                </div>
              ) : c.href ? (
                <a
                  href={c.href}
                  className="font-medium text-sm"
                  style={{ color: c.color }}
                >
                  {c.lines.map((l, j) => (
                    <div key={j}>{l}</div>
                  ))}
                </a>
              ) : (
                c.lines.map((l, j) => (
                  <div key={j} className="text-gray-600 text-sm">
                    {l}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Map + Social */}
        <div
          className={`grid lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Google Map */}
          <div
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl"
            style={{ minHeight: "350px" }}
          >
            <iframe
              src="https://www.google.com/maps?q=Durai%20Engineering%20Works%2C%20Wall%20Tax%20Road%2C%20Chennai%20600079&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Durai Engineering Works Location"
            />
          </div>

          {/* Social + Download */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6 h-full"
              style={{
                background: "linear-gradient(135deg, #0a1628, #1a3a5c)",
              }}
            >
              <h4
                className="text-white font-bold text-lg mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Connect With Us
              </h4>

              <div className="space-y-3 mb-6">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(225,48,108,0.15)",
                    border: "1px solid rgba(225,48,108,0.3)",
                  }}
                >
                  <FaInstagram
                    className="text-2xl"
                    style={{ color: "#e1306c" }}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Instagram
                    </div>
                    <div className="text-gray-400 text-xs">
                      Add your Instagram
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(66,103,178,0.15)",
                    border: "1px solid rgba(66,103,178,0.3)",
                  }}
                >
                  <FaFacebook
                    className="text-2xl"
                    style={{ color: "#4267B2" }}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Facebook
                    </div>
                    <div className="text-gray-400 text-xs">
                      Add your Facebook
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919884957853?text=Hello%20Durai%20Eng%20Works%2C%20I%20need%20support%20for%20an%20aluminium%20rolling%20machine."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(37,211,102,0.15)",
                    border: "1px solid rgba(37,211,102,0.3)",
                  }}
                >
                  <FaWhatsapp
                    className="text-2xl"
                    style={{ color: "#25D366" }}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">
                      WhatsApp
                    </div>
                    <div className="text-gray-400 text-xs">
                      Chat with us: 98849 57853
                    </div>
                  </div>
                </a>
              </div>

              {/* Download Brochure */}
              <button
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                }}
              >
                Request Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
