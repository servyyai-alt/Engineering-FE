import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = ['All', 'Campus', 'Classrooms', 'Events', 'Activities'];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', category: 'Campus', label: 'School Building' },
  { src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80', category: 'Classrooms', label: 'Smart Classroom' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', category: 'Campus', label: 'School Grounds' },
  { src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80', category: 'Events', label: 'Annual Day' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', category: 'Classrooms', label: 'Science Lab' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', category: 'Activities', label: 'Sports Day' },
  { src: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=600&q=80', category: 'Events', label: 'Cultural Program' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', category: 'Activities', label: 'Student Activities' },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80', category: 'Classrooms', label: 'Computer Lab' },
  { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', category: 'Activities', label: 'Team Building' },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', category: 'Campus', label: 'Campus View' },
  { src: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80', category: 'Events', label: 'Prize Giving' },
];

const Gallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  const nextImg = () => setLightbox((lightbox + 1) % filtered.length);

  return (
    <section id="gallery" ref={ref} className="section-padding" style={{ background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            Our Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Life at <span className="gold-text">Annai Abirami</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Glimpses of our vibrant school life — from classrooms to playgrounds, events to achievements.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg, #1d4ed8, #1e40af)', color: 'white', boxShadow: '0 4px 15px rgba(29,78,216,0.3)' }
                : { background: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filtered.map((img, i) => (
            <div
              key={i}
              className="gallery-img relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
              style={{ aspectRatio: '4/3' }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(10,22,40,0.8))' }}>
                <span className="text-white font-medium text-sm p-3">{img.label}</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
                  style={{ background: 'rgba(29,78,216,0.8)' }}>{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            <FaChevronLeft />
          </button>
          <img
            src={filtered[lightbox].src.replace('w=600', 'w=1200')}
            alt={filtered[lightbox].label}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-4 text-white text-sm font-medium">
            {filtered[lightbox].label} · {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
