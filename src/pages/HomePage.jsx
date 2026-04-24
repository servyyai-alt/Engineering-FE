import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import AboutUs from '../components/About/About';
import Courses from '../components/Courses/Courses';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Gallery from '../components/Gallery/Gallery';
import NewsSection from '../components/common/NewsSection';
import Testimonials from '../components/common/Testimonials';
import AdmissionForm from '../components/Admission/AdmissionForm';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import Modal from '../components/common/Modal';

const HomePage = () => {
  const [admissionOpen, setAdmissionOpen] = useState(true);

  const openAdmission = () => setAdmissionOpen(true);
  const closeAdmission = () => setAdmissionOpen(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenAdmission={openAdmission} />
      <Hero onOpenAdmission={openAdmission} />
      <AboutUs />
      <Courses onOpenAdmission={openAdmission} />
      <WhyChooseUs />
      <Gallery />
      <NewsSection />
      <Testimonials />
      <Contact />
      <Footer onOpenAdmission={openAdmission} />
      <WhatsAppFloat />

      {admissionOpen && (
        <Modal title="Online Admission Form" onClose={closeAdmission}>
          <AdmissionForm variant="modal" />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
