import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { FaUpload, FaCheckCircle, FaUser, FaPhone, FaMapMarkerAlt, FaIdCard, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';

const admissionClasses = ['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Others'];

const docFields = [
  { key: 'birthCertificate', label: 'Birth Certificate', required: true },
  { key: 'aadhaarProof', label: 'Aadhaar Proof (Parents + Student)', required: true },
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
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB');
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.admissionClass) newErrors.admissionClass = 'Required';
    if (!form.studentName) newErrors.studentName = 'Required';
    if (!form.parentName) newErrors.parentName = 'Required';
    if (!form.contactNumber || !/^\d{10}$/.test(form.contactNumber)) newErrors.contactNumber = 'Enter valid 10-digit number';
    if (!form.address) newErrors.address = 'Required';
    if (!files.birthCertificate) newErrors.birthCertificate = 'Birth Certificate required';
    if (!files.aadhaarProof) newErrors.aadhaarProof = 'Aadhaar Proof required';
    if (!files.passportPhoto) newErrors.passportPhoto = 'Passport Photo required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      Object.entries(files).forEach(([k, v]) => formData.append(k, v));

      await axios.post('/api/admission', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setForm(initialForm);
      setFiles({});
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const Wrapper = variant === 'modal' ? 'div' : 'section';
    return (
      <Wrapper
        {...(variant === 'modal' ? {} : { id: 'admission' })}
        className={variant === 'modal' ? 'py-6' : 'section-padding'}
        style={variant === 'modal' ? {} : { background: '#f8faff' }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <FaCheckCircle className="text-white text-4xl" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Application Submitted!
            </h3>
            <p className="text-gray-600 mb-4 text-lg">
              Thank you for applying to <strong>Annai Abirami National Hr. Sec. School</strong>.
            </p>
            <p className="text-gray-500 mb-8">
              We will review your application and contact you within 2-3 working days.
              For urgent queries, call us at <strong className="text-blue-600">9787298569</strong>.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-primary"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  const Wrapper = variant === 'modal' ? 'div' : 'section';
  return (
    <Wrapper
      {...(variant === 'modal' ? {} : { id: 'admission' })}
      ref={ref}
      className={variant === 'modal' ? 'py-6' : 'section-padding'}
      style={variant === 'modal' ? {} : { background: '#f8faff' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 animate-pulse"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
            🎓 ADMISSION OPEN 2025-26
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Apply for <span className="blue-text">Admission</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Fill out the form below to begin your child's journey towards excellence.
          </p>
        </div>

        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Form Header Bar */}
          <div className="p-6" style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a5c)' }}>
            <h3 className="text-white font-bold text-lg">Online Admission Application Form</h3>
            <p className="text-gray-400 text-sm mt-1">All fields marked with * are mandatory</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            {/* Student Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <FaUser className="text-blue-600" />
                <h4 className="font-bold text-gray-900 text-lg">Student Information</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admission Class *
                  </label>
                  <select name="admissionClass" value={form.admissionClass} onChange={handleChange}
                    className={`form-input ${errors.admissionClass ? 'border-red-400' : ''}`}>
                    <option value="">Select Class</option>
                    {admissionClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.admissionClass && <p className="text-red-500 text-xs mt-1">{errors.admissionClass}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                  <input type="text" name="studentName" value={form.studentName} onChange={handleChange}
                    placeholder="Full name of student"
                    className={`form-input ${errors.studentName ? 'border-red-400' : ''}`} />
                  {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                  <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="form-input">
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
                  <input type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange}
                    placeholder="12-digit Aadhaar number" maxLength="12" className="form-input" />
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <FaIdCard className="text-blue-600" />
                <h4 className="font-bold text-gray-900 text-lg">Parent Information</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parent/Guardian Name *</label>
                  <input type="text" name="parentName" value={form.parentName} onChange={handleChange}
                    placeholder="Father's / Mother's name"
                    className={`form-input ${errors.parentName ? 'border-red-400' : ''}`} />
                  {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange}
                    placeholder="10-digit mobile number" maxLength="10"
                    className={`form-input ${errors.contactNumber ? 'border-red-400' : ''}`} />
                  {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Occupation</label>
                  <input type="text" name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange}
                    placeholder="e.g., Farmer, Business, Government" className="form-input" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Annual Income</label>
                  <input type="text" name="fatherIncome" value={form.fatherIncome} onChange={handleChange}
                    placeholder="Annual income in ₹" className="form-input" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mother's Occupation</label>
                  <input type="text" name="motherOccupation" value={form.motherOccupation} onChange={handleChange}
                    placeholder="e.g., Homemaker, Teacher" className="form-input" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mother's Annual Income</label>
                  <input type="text" name="motherIncome" value={form.motherIncome} onChange={handleChange}
                    placeholder="Annual income in ₹" className="form-input" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Caste</label>
                  <input type="text" name="caste" value={form.caste} onChange={handleChange}
                    placeholder="Caste (as per certificate)" className="form-input" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Religion</label>
                  <select name="religion" value={form.religion} onChange={handleChange} className="form-input">
                    <option value="">Select Religion</option>
                    {religions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <FaMapMarkerAlt className="text-blue-600" />
                <h4 className="font-bold text-gray-900 text-lg">Address</h4>
              </div>
              <textarea name="address" value={form.address} onChange={handleChange}
                placeholder="Full residential address..."
                rows={3}
                className={`form-input resize-none ${errors.address ? 'border-red-400' : ''}`} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Document Upload */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <FaFileAlt className="text-blue-600" />
                <h4 className="font-bold text-gray-900 text-lg">Upload Documents</h4>
                <span className="text-xs text-gray-500">(Max 5MB each - PDF, JPG, PNG)</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {docFields.map((doc) => (
                  <div key={doc.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {doc.label} {doc.required && <span className="text-red-500">*</span>}
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 border-dashed hover:border-blue-400 hover:bg-blue-50
                        ${errors[doc.key] ? 'border-red-400 bg-red-50' : files[doc.key] ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFile(e, doc.key)}
                        className="hidden"
                      />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${files[doc.key] ? 'bg-green-500' : 'bg-blue-100'}`}>
                        {files[doc.key]
                          ? <FaCheckCircle className="text-white text-sm" />
                          : <FaUpload className="text-blue-600 text-sm" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-700 truncate">
                          {files[doc.key] ? files[doc.key].name : 'Click to upload'}
                        </div>
                        <div className="text-xs text-gray-500">PDF, JPG, PNG</div>
                      </div>
                    </label>
                    {errors[doc.key] && <p className="text-red-500 text-xs mt-1">{errors[doc.key]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e40af)', boxShadow: '0 6px 30px rgba(29,78,216,0.4)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Application...
                </span>
              ) : (
                '🎓 Submit Admission Application'
              )}
            </button>

            <p className="text-center text-gray-500 text-xs mt-4">
              By submitting, you agree to be contacted by our admission team. 
              For queries call <strong>9787298569</strong>.
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdmissionForm;
