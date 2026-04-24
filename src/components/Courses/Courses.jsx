import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaBook, FaFlask, FaLaptopCode, FaAtom, FaChild, FaUserGraduate, FaArrowRight } from 'react-icons/fa';

const courses = [
  {
    icon: <FaChild className="text-3xl" />,
    title: 'LKG to V',
    subtitle: 'Primary School',
    desc: 'Strong foundational education with activity-based learning, creativity, and value-based curriculum in a nurturing environment.',
    subjects: ['English', 'Tamil', 'Mathematics', 'EVS', 'Arts & Crafts', 'Physical Education'],
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-600',
    bg: '#f0fdf4',
  },
  {
    icon: <FaBook className="text-3xl" />,
    title: 'VI to X',
    subtitle: 'Upper Primary & Secondary',
    desc: 'Comprehensive secondary education with focus on critical thinking, science, mathematics, and language proficiency.',
    subjects: ['Science', 'Social Science', 'Mathematics', 'English', 'Tamil', 'Computer'],
    color: '#1d4ed8',
    gradient: 'from-blue-500 to-indigo-700',
    bg: '#eff6ff',
  },
  {
    icon: <FaUserGraduate className="text-3xl" />,
    title: 'XI & XII',
    subtitle: 'Higher Secondary',
    desc: 'Specialized higher secondary groups preparing students for professional careers and competitive entrance examinations.',
    subjects: ['Biology Group', 'Computer Science Group', 'Pure Science Group'],
    groups: [
      { icon: <FaFlask />, name: 'Group 1 – Biology', desc: 'Physics, Chemistry, Biology, Maths' },
      { icon: <FaLaptopCode />, name: 'Group 2 – Computer Science', desc: 'Physics, Chemistry, CS, Maths' },
      { icon: <FaAtom />, name: 'Group 3 – Pure Science', desc: 'Physics, Chemistry, Maths, Statistics' },
    ],
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-600',
    bg: '#fffbeb',
  },
];

const Courses = ({ onOpenAdmission }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToAdmission = () => {
    if (onOpenAdmission) {
      onOpenAdmission();
      return;
    }
    document.querySelector('#admission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="courses" ref={ref} className="section-padding" style={{ background: '#0a1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
            Academic Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Classes & <span className="gold-text">Courses Offered</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive education from kindergarten through higher secondary, 
            designed to nurture every stage of your child's development.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl cursor-default
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${0.2 + i * 0.15}s`,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-br ${course.gradient} text-white relative overflow-hidden`}>
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,255,255,0.25)' }}>
                    {course.icon}
                  </div>
                  <div className="text-sm font-semibold opacity-80 mb-1">{course.subtitle}</div>
                  <h3 className="text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>{course.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{course.desc}</p>

                {/* Groups (for XI & XII) or Subjects */}
                {course.groups ? (
                  <div className="space-y-3">
                    {course.groups.map((g, j) => (
                      <div key={j} className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="text-lg mt-0.5" style={{ color: course.color }}>{g.icon}</div>
                        <div>
                          <div className="text-white text-sm font-semibold">{g.name}</div>
                          <div className="text-gray-500 text-xs">{g.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((s, j) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: `${course.color}15`, color: course.color, border: `1px solid ${course.color}30` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={scrollToAdmission}
                  className="mt-6 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:gap-4"
                  style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}30` }}
                >
                  Apply Now <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
