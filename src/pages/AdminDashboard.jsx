import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  FaGraduationCap, FaUsers, FaClipboardList, FaSignOutAlt,
  FaDownload, FaEye, FaSearch, FaFilter, FaFilePdf,
  FaImage, FaFile, FaCheckCircle, FaClock, FaTrash,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaCalendarAlt
} from 'react-icons/fa';

const statusColors = {
  pending: { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' },
  approved: { bg: '#f0fdf4', text: '#059669', border: '#6ee7b7' },
  rejected: { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/applications', { headers });
      setApplications(res.data.applications);
      const total = res.data.applications.length;
      const pending = res.data.applications.filter(a => a.status === 'pending').length;
      const approved = res.data.applications.filter(a => a.status === 'approved').length;
      const rejected = res.data.applications.filter(a => a.status === 'rejected').length;
      setStats({ total, pending, approved, rejected });
    } catch (err) {
      toast.error('Failed to fetch applications');
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`/api/admin/applications/${id}/status`, { status }, { headers });
      toast.success(`Application ${status}`);
      fetchApplications();
      if (selectedApp?._id === id) setSelectedApp({ ...selectedApp, status });
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application permanently?')) return;
    try {
      await axios.delete(`/api/admin/applications/${id}`, { headers });
      toast.success('Application deleted');
      setSelectedApp(null);
      fetchApplications();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast.info('Logged out successfully');
  };

  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    link.click();
  };

  const downloadCSV = () => {
    const headers_csv = ['Student Name', 'Admission Class', 'Parent Name', 'Contact', 'Blood Group', 'Religion', 'Caste', 'Status', 'Date'];
    const rows = filtered.map(a => [
      a.studentName, a.admissionClass, a.parentName, a.contactNumber,
      a.bloodGroup, a.religion, a.caste, a.status,
      new Date(a.createdAt).toLocaleDateString()
    ]);
    const csv = [headers_csv, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admissions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filtered = applications.filter(app => {
    const matchSearch =
      app.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      app.parentName?.toLowerCase().includes(search.toLowerCase()) ||
      app.contactNumber?.includes(search);
    const matchClass = filterClass ? app.admissionClass === filterClass : true;
    const matchStatus = filterStatus ? app.status === filterStatus : true;
    return matchSearch && matchClass && matchStatus;
  });

  const docLabels = {
    birthCertificate: 'Birth Certificate',
    aadhaarProof: 'Aadhaar Proof',
    casteCertificate: 'Caste Certificate',
    transferCertificate: 'Transfer Certificate',
    passportPhoto: 'Passport Photo',
  };

  return (
    <div className="min-h-screen" style={{ background: '#f1f5f9' }}>
      {/* Sidebar + Main layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col" style={{ background: '#0a1628' }}>
          {/* Logo */}
          <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}>
                <FaGraduationCap className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Admin Panel</div>
                <div className="text-xs" style={{ color: '#f59e0b' }}>Annai Abirami School</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 px-3">Menu</div>
            {[
              { icon: <FaClipboardList />, label: 'Applications', active: true },
              { icon: <FaUsers />, label: 'Students' },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all
                  ${item.active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                style={item.active ? { background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' } : {}}
              >
                {item.icon} {item.label}
                {item.active && <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{stats.total}</span>}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all text-sm font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0' }}>
            <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admission Applications
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                <FaDownload /> Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#ef4444' }}
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Applications', value: stats.total, icon: <FaClipboardList />, color: '#1d4ed8', bg: '#eff6ff' },
                { label: 'Pending Review', value: stats.pending, icon: <FaClock />, color: '#d97706', bg: '#fffbeb' },
                { label: 'Approved', value: stats.approved, icon: <FaCheckCircle />, color: '#059669', bg: '#f0fdf4' },
                { label: 'Rejected', value: stats.rejected, icon: <FaTimes />, color: '#dc2626', bg: '#fef2f2' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 shadow-sm" style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}20`, color: s.color }}>
                      {s.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-black" style={{ color: s.color, fontFamily: "'Playfair Display', serif" }}>
                    {s.value}
                  </div>
                  <div className="text-gray-500 text-sm font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-48">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <select
                value={filterClass}
                onChange={e => setFilterClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 text-gray-600"
              >
                <option value="">All Classes</option>
                {['LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 text-gray-600"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <span className="text-gray-500 text-sm font-medium ml-auto">{filtered.length} records</span>
            </div>

            {/* Applications Table */}
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <FaClipboardList className="text-5xl mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No applications found</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: '#f8faff', borderBottom: '2px solid #e2e8f0' }}>
                        {['#', 'Student', 'Class', 'Parent', 'Contact', 'Date', 'Status', 'Actions'].map(h => (
                          <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((app, i) => {
                        const sc = statusColors[app.status] || statusColors.pending;
                        return (
                          <tr
                            key={app._id}
                            className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="px-4 py-3.5 text-gray-400 text-sm font-medium">{i + 1}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}>
                                  {app.studentName?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-gray-900 text-sm">{app.studentName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                                style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                                Class {app.admissionClass}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 text-sm">{app.parentName}</td>
                            <td className="px-4 py-3.5 text-gray-600 text-sm">{app.contactNumber}</td>
                            <td className="px-4 py-3.5 text-gray-400 text-xs">
                              {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : '-'}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="px-3 py-1 rounded-full text-xs font-bold capitalize"
                                style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                                {app.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setSelectedApp(app)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                  style={{ background: '#eff6ff', color: '#1d4ed8' }}
                                  title="View Details"
                                >
                                  <FaEye className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDelete(app._id)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                  style={{ background: '#fef2f2', color: '#dc2626' }}
                                  title="Delete"
                                >
                                  <FaTrash className="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedApp(null); }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ border: '1px solid #e2e8f0' }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b"
              style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a5c)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div>
                <h2 className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedApp.studentName}
                </h2>
                <p className="text-gray-400 text-sm">Admission Application · Class {selectedApp.admissionClass}</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Status Buttons */}
                <button
                  onClick={() => handleStatusChange(selectedApp._id, 'approved')}
                  disabled={selectedApp.status === 'approved'}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 disabled:opacity-40"
                  style={{ background: '#10b981' }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApp._id, 'rejected')}
                  disabled={selectedApp.status === 'rejected'}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 disabled:opacity-40"
                  style={{ background: '#ef4444' }}
                >
                  ✗ Reject
                </button>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold capitalize"
                  style={{
                    background: statusColors[selectedApp.status]?.bg,
                    color: statusColors[selectedApp.status]?.text,
                    border: `1px solid ${statusColors[selectedApp.status]?.border}`,
                  }}>
                  {selectedApp.status} Application
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </span>
              </div>

              {/* Info Grid */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#1d4ed8' }}>S</span>
                  Student Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Full Name', selectedApp.studentName],
                    ['Admission Class', `Class ${selectedApp.admissionClass}`],
                    ['Blood Group', selectedApp.bloodGroup || '—'],
                    ['Aadhaar No.', selectedApp.aadhaarNumber || '—'],
                    ['Religion', selectedApp.religion || '—'],
                    ['Caste', selectedApp.caste || '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: '#f8faff' }}>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{label}</div>
                      <div className="text-gray-900 font-semibold text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#f59e0b' }}>P</span>
                  Parent Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Parent/Guardian', selectedApp.parentName],
                    ['Contact Number', selectedApp.contactNumber],
                    ['Father\'s Occupation', selectedApp.fatherOccupation || '—'],
                    ['Father\'s Income', selectedApp.fatherIncome ? `₹ ${selectedApp.fatherIncome}` : '—'],
                    ['Mother\'s Occupation', selectedApp.motherOccupation || '—'],
                    ['Mother\'s Income', selectedApp.motherIncome ? `₹ ${selectedApp.motherIncome}` : '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: '#fffbeb' }}>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{label}</div>
                      <div className="text-gray-900 font-semibold text-sm">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3 mt-3" style={{ background: '#f0fdf4' }}>
                  <div className="text-gray-400 text-xs font-medium mb-0.5 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" /> Address
                  </div>
                  <div className="text-gray-900 font-semibold text-sm">{selectedApp.address || '—'}</div>
                </div>
              </div>

              {/* Documents */}
              {selectedApp.documents && Object.keys(selectedApp.documents).length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#10b981' }}>D</span>
                    Uploaded Documents
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(selectedApp.documents).map(([key, url]) => {
                      if (!url) return null;
                      const isPdf = url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('pdf');
                      return (
                        <div key={key}
                          className="flex items-center justify-between p-3 rounded-xl border"
                          style={{ background: '#f8faff', borderColor: '#e2e8f0' }}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{ background: isPdf ? '#fef2f2' : '#eff6ff' }}>
                              {isPdf
                                ? <FaFilePdf className="text-red-500" />
                                : <FaImage className="text-blue-600" />}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{docLabels[key] || key}</div>
                              <div className="text-xs text-gray-400">{isPdf ? 'PDF Document' : 'Image File'}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                              style={{ background: '#eff6ff', color: '#1d4ed8' }}
                            >
                              <FaEye /> View
                            </a>
                            <button
                              onClick={() => downloadFile(url, `${selectedApp.studentName}_${key}`)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                              style={{ background: '#f0fdf4', color: '#059669' }}
                            >
                              <FaDownload /> Download
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
