import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaBullhorn, FaCalendarAlt, FaTrophy, FaBookOpen, FaRunning } from 'react-icons/fa';

const news = [
  {
    icon: <FaTrophy />,
    badge: 'Achievement',
    badgeColor: '#f59e0b',
    title: '100% Board Exam Results 2024-25',
    desc: 'All our Class X and XII students passed with distinction. 15 students secured above 95% marks in board examinations.',
    date: 'April 2025',
  },
  {
    icon: <FaBullhorn />,
    badge: 'Admission',
    badgeColor: '#ef4444',
    title: 'Admissions Open for 2025-26',
    desc: 'Applications are now being accepted for LKG through XII. Limited seats available. Apply early to secure your child\'s place.',
    date: 'May 2025',
  },
  {
    icon: <FaBookOpen />,
    badge: 'Academic',
    badgeColor: '#1d4ed8',
    title: 'New Smart Classroom Technology',
    desc: 'We have upgraded all classrooms with the latest interactive digital boards and high-speed internet connectivity.',
    date: 'March 2025',
  },
  {
    icon: <FaRunning />,
    badge: 'Sports',
    badgeColor: '#10b981',
    title: 'District Sports Champions 2025',
    desc: 'Our students won gold medals in Athletics, Kabaddi, and Volleyball at the District-level inter-school sports meet.',
    date: 'February 2025',
  },
];

const NewsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#f8faff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            News & <span className="gold-text">Announcements</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Stay updated with the latest happenings, achievements, and announcements from our school.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {news.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Top color bar */}
              <div className="h-1.5 w-full" style={{ background: item.badgeColor }} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${item.badgeColor}15`, color: item.badgeColor }}>
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaCalendarAlt className="text-xs" />
                    {item.date}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${item.badgeColor}15`, color: item.badgeColor }}>
                  {item.icon}
                </div>

                <h4 className="font-bold text-gray-900 mb-2 leading-snug text-sm">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Results Highlights Banner */}
        <div
          className={`mt-10 rounded-3xl p-6 md:p-8 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0a1628 60%, #f59e0b 200%)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-yellow-400 font-semibold text-sm mb-1 uppercase tracking-wide">🏆 Result Highlights 2024-25</div>
              <h3 className="text-white text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                100% Pass Rate · Top District Ranks · Proud Alumni
              </h3>
              <p className="text-blue-200 text-sm mt-2">
                Our students continue to excel year after year — in academics, sports, and life.
              </p>
            </div>
            <div className="flex gap-6 flex-shrink-0">
              {[
                { num: '100%', label: 'Pass Rate' },
                { num: '15+', label: 'Distinctions' },
                { num: '#1', label: 'District Rank' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black" style={{ color: '#f59e0b', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div className="text-blue-200 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
