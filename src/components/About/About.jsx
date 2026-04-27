import React from "react";
import { useInView } from "react-intersection-observer";
import {
  FaCogs,
  FaBullseye,
  FaShieldAlt,
  FaHandshake,
  FaQuoteLeft,
  FaMedal,
} from "react-icons/fa";
import workshopImage from "../../assets/durai_poster.jpeg";

const values = [
  {
    icon: <FaBullseye />,
    title: "Focus",
    desc: "Specialists in aluminium rolling machines with practical, production-first engineering support.",
    color: "#1d4ed8",
  },
  {
    icon: <FaCogs />,
    title: "Capability",
    desc: "Manufacturing, service, and retrofit solutions—designed to keep your line running reliably.",
    color: "#f59e0b",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality & Safety",
    desc: "Precision work, tested components, and safe service practices at every stage of delivery.",
    color: "#10b981",
  },
  {
    icon: <FaHandshake />,
    title: "Support",
    desc: "Clear communication, quick turnaround, and on-site assistance when you need it most.",
    color: "#8b5cf6",
  },
];

const milestones = [
  {
    year: "01",
    title: "Consult",
    desc: "Share your requirement and production goals. We recommend the right solution.",
  },
  {
    year: "02",
    title: "Build / Service",
    desc: "Manufacture, service, or supply used machines with the right spares and tooling.",
  },
  {
    year: "03",
    title: "Install & Run",
    desc: "On-site support for installation, commissioning, and operator guidance.",
  },
  {
    year: "04",
    title: "Maintain",
    desc: "Preventive maintenance and quick troubleshooting to minimize downtime.",
  },
];

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
      }}
    >
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
            About Durai Eng Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Precision Engineering for <span className="gold-text">Industry</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Durai Engineering Works provides end-to-end support for aluminium rolling machines—manufacturing,
            service, maintenance, and complete industrial solutions tailored to your needs.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image + Stats */}
          <div
            className={`relative transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={workshopImage}
                alt="Durai Engineering Works workshop"
                className="w-full h-80 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(10,22,40,0.8) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {[
                  { num: "MANUFACTURING", label: "Machines & Spares" },
                  { num: "SERVICE", label: "On-site Support" },
                  { num: "BUY/SALE", label: "New & Used" },
                  { num: "SOLUTIONS", label: "Industrial Needs" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center glass rounded-xl py-3"
                  >
                    <div
                      className="text-lg font-black"
                      style={{
                        color: "#f59e0b",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-white text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating award badge */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              <FaMedal className="text-2xl mb-1" />
              <span className="text-xs font-bold text-center leading-tight">
                TRUSTED
                <br />SUPPORT
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <FaQuoteLeft
              className="text-4xl mb-4"
              style={{ color: "#dbeafe" }}
            />
            <h3
              className="text-3xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Proprietor's Message
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4 text-base">
              "We focus on practical engineering solutions that keep production moving.
              Whether you need a new machine, a used machine, or urgent service support—our team is ready."
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              "Our goal is simple: quality workmanship, transparent communication, and reliable after-service."
            </p>
            <div
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                DR
              </div>
              <div>
                <div className="font-bold text-gray-900">S. Durai Rajendran</div>
                <div className="text-sm text-gray-500">
                  Proprietor, Durai Engineering Works
                </div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#f59e0b" }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 text-center border border-gray-100 bg-white shadow-md"
              style={{ "--card-color": v.color }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: `${v.color}15`, color: v.color }}
              >
                {v.icon}
              </div>
              <h4
                className="font-bold text-gray-900 text-lg mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {v.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Work Process Timeline */}
        <div
          className={`transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3
            className="text-3xl font-black text-center text-gray-900 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How We <span className="gold-text">Work</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="card-hover bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-full">
                  <div
                    className="text-4xl font-black mb-3"
                    style={{
                      color: "#f59e0b",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {m.year}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{m.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                {i < milestones.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px"
                    style={{ background: "#1d4ed8" }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{ background: "#f59e0b" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
