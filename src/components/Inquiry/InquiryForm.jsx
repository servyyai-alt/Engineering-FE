import React, { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaClipboardList, FaIndustry, FaPhoneAlt, FaUser } from 'react-icons/fa';
import api from '../../utils/api';

const SERVICE_TYPES = [
  'Aluminium Rolling Machine Manufacturing & Service',
  'New & Used Machine Buy / Sale',
  'Machine Service & Maintenance',
  'Complete Industrial Solutions',
  'Other',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  company: '',
  city: '',
  serviceType: SERVICE_TYPES[0],
  message: '',
};

const InquiryForm = ({ variant = 'section' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputClass = useMemo(
    () =>
      `w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl
       focus:bg-white/20 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50
       outline-none transition-all placeholder:text-white/40 text-white`,
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name';
    if (!/^[0-9]{10,15}$/.test(form.phone.trim())) return 'Please enter a valid phone number (10–15 digits)';
    if (!form.serviceType) return 'Please choose a service type';
    if (!form.message.trim()) return 'Please enter your requirement';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Please enter a valid email';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    setLoading(true);
    try {
      await api.post('/api/inquiries', {
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        city: form.city.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      toast.success('Inquiry submitted successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Wrapper = variant === 'modal' ? 'div' : 'section';

  if (success) {
    return (
      <Wrapper className="flex items-center justify-center md:p-6 p-2 min-h-[360px]">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/30 p-10 rounded-[40px] text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Request Received</h3>
          <p className="text-white/70 mb-7">We will contact you shortly.</p>
          <button
            onClick={() => {
              setForm(initialForm);
              setSuccess(false);
            }}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
          >
            Submit Another
          </button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      ref={ref}
      {...(variant !== 'modal' && { id: 'inquiry' })}
      className={`relative overflow-hidden ${variant === 'modal' ? 'py-4' : 'py-14 sm:py-20 px-4 sm:px-6 bg-slate-950'}`}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className={`relative max-w-7xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {variant !== 'modal' && (
          <div className="text-center mb-10">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}
            >
              Quick Inquiry
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Request a <span className="gold-text">Quote</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Share your requirement and we’ll get back with the right solution.
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1 flex items-center gap-2">
                  <FaUser className="text-white/50" /> Name *
                </label>
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-white/50" /> Phone *
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="10–15 digits" inputMode="numeric" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1">Company</label>
                <input name="company" value={form.company} onChange={handleChange} className={inputClass} placeholder="Company name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1">City</label>
                <input name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="City" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 ml-1 flex items-center gap-2">
                  <FaIndustry className="text-white/50" /> Service Type *
                </label>
                <select name="serviceType" value={form.serviceType} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  {SERVICE_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-slate-900">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/80 ml-1 flex items-center gap-2">
                <FaClipboardList className="text-white/50" /> Requirement *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} min-h-[140px] resize-y`}
                placeholder="Tell us what you need (machine details, service issue, location, timeline, etc.)"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-4 rounded-[20px] font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)', boxShadow: '0 12px 30px rgba(29,78,216,0.35)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Inquiry'
              )}
            </button>

            <p className="text-white/50 text-xs text-center">
              Prefer calling? Dial <span className="text-white/80 font-semibold">98849 57853</span> or{' '}
              <span className="text-white/80 font-semibold">94876 24853</span>.
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default InquiryForm;

