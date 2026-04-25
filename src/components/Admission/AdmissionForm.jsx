import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { FaUpload, FaCheckCircle, FaUser, FaIdCard, FaMapMarkerAlt, FaFileAlt, FaGraduationCap } from 'react-icons/fa';
import api from '../../utils/api';

const admissionClasses = ['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Others'];

const docFields = [
  { key: 'birthCertificate', label: 'Birth Certificate', required: true },
  { key: 'aadhaarProof', label: 'Aadhaar Proof', required: true },
  { key: 'casteCertificate', label: 'Caste Certificate', required: false },
  { key: 'transferCertificate', label: 'Transfer Certificate', required: false },
  { key: 'passportPhoto', label: 'Passport Size Photos', required: true },
];

const initialForm = {
  admissionClass: '', studentName: '', parentName: '', address: '',
  contactNumber: '', bloodGroup: '', aadhaarNumber: '', fatherOccupation: '',
  fatherIncome: '', motherOccupation: '', motherIncome: '', caste: '', religion: '',
};

const AdmissionForm = ({ variant = 'section' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFiles((prev) => ({ ...prev, [key]: file }));
    } else if (file) {
      toast.error('File size must be under 5MB');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.admissionClass) newErrors.admissionClass = 'Required';
    if (!form.studentName) newErrors.studentName = 'Required';
    if (!form.parentName) newErrors.parentName = 'Required';
    if (!form.contactNumber || !/^\d{10}$/.test(form.contactNumber)) newErrors.contactNumber = 'Invalid 10-digit number';
    if (!form.address) newErrors.address = 'Required';
    if (!files.birthCertificate) newErrors.birthCertificate = 'Required';
    if (!files.aadhaarProof) newErrors.aadhaarProof = 'Required';
    if (!files.passportPhoto) newErrors.passportPhoto = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error('Please check required fields');

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      Object.entries(files).forEach(([k, v]) => formData.append(k, v));
      await api.post('/api/admission', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl 
                      focus:bg-white/20 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 
                      outline-none transition-all placeholder:text-white/40 text-white`;

  const Wrapper = variant === 'modal' ? 'div' : 'section';

  if (success) {
    return (
      <Wrapper className="flex items-center justify-center p-6 min-h-[400px]">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/30 p-12 rounded-[40px] text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Application Submitted!</h3>
          <p className="text-white/70 mb-8">We will contact you within 2-3 working days.</p>
          <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">
            Submit Another
          </button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      ref={ref}
      {...(variant !== 'modal' && { id: 'admission' })}
      className={`relative overflow-hidden ${variant === 'modal' ? 'py-4' : 'py-20 px-4 bg-slate-950'}`}
    >
      {/* Decorative glass blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-32 w-[30rem] h-[30rem] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[35rem] h-[35rem] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-4 backdrop-blur-md">
            <FaGraduationCap className="animate-bounce" /> ADMISSION OPEN 2025-26
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Start Your <span className="text-blue-500">Journey</span>
          </h2>
        </div>

        {/* Form Container (The Glass Card) */}
        <div 
          className={`relative border border-white/20 bg-white/5 backdrop-blur-3xl rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 delay-200 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' }}
        >
          <div className="bg-white/5 backdrop-blur-md border-b border-white/10 px-8 py-6">
            <h3 className="text-white font-bold text-xl">Admission Application Form</h3>
            <p className="text-white/40 text-xs mt-1">Please provide accurate information for verification.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            {/* Student Info */}
            <section>
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <FaUser />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Student Information</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Admission Class *</label>
                  <select name="admissionClass" value={form.admissionClass} onChange={handleChange} className={`${inputClass} appearance-none`}>
                    <option value="" className="bg-slate-900">Select Class</option>
                    {admissionClasses.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                  </select>
                  {errors.admissionClass && <p className="text-red-400 text-[10px] ml-1">{errors.admissionClass}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Student Name *</label>
                  <input type="text" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
                  {errors.studentName && <p className="text-red-400 text-[10px] ml-1">{errors.studentName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Blood Group</label>
                  <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={`${inputClass} appearance-none`}>
                    <option value="" className="bg-slate-900">Select</option>
                    {bloodGroups.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Aadhaar Number</label>
                  <input type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="12-digit number" maxLength="12" className={inputClass} />
                </div>
              </div>
            </section>

            {/* Parent Info */}
            <section>
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <FaIdCard />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Parent/Guardian Information</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Parent Name *</label>
                  <input type="text" name="parentName" value={form.parentName} onChange={handleChange} className={inputClass} />
                  {errors.parentName && <p className="text-red-400 text-[10px] ml-1">{errors.parentName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white ml-1">Contact Number *</label>
                  <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} maxLength="10" className={inputClass} />
                  {errors.contactNumber && <p className="text-red-400 text-[10px] ml-1">{errors.contactNumber}</p>}
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <FaMapMarkerAlt />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Address</h4>
              </div>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Full residential address..." />
              {errors.address && <p className="text-red-400 text-[10px] ml-1">{errors.address}</p>}
            </section>

            {/* Documents */}
            <section>
              <div className="flex items-center gap-3 mb-6 text-blue-400">
                <FaFileAlt />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Upload Documents</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {docFields.map((doc) => (
                  <label key={doc.key} className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-dashed transition-all cursor-pointer group
                    ${files[doc.key] ? 'bg-green-500/20 border-green-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'}`}>
                    <input type="file" onChange={(e) => handleFile(e, doc.key)} className="hidden" />
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 ${files[doc.key] ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'}`}>
                      {files[doc.key] ? <FaCheckCircle /> : <FaUpload />}
                    </div>
                    <span className="text-[10px] font-bold text-white/80 text-center uppercase leading-tight">{doc.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-[24px] font-bold text-white shadow-2xl transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 text-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                  boxShadow: '0 20px 40px -10px rgba(37,99,235,0.5)' 
                }}
              >
                {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse { animation: pulse 10s ease-in-out infinite; }
      `}</style>
    </Wrapper>
  );
};

export default AdmissionForm;
