import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import api from "../utils/api";
import duraiLogo from "../assets/durai_logo.svg";
import bg from "../assets/durai_poster.jpeg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error("Please enter credentials");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      if (status === 401) {
        toast.error(message || "Invalid credentials");
      } else {
        toast.error(message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="Durai Engineering Works"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        {/* Dark blur overlay to keep the focus on the card */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Your Decorative floating circles - Kept for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              background: i % 2 === 0 ? "#1d4ed8" : "#f59e0b",
              left: `${(i * 20) % 100}%`,
              top: `${(i * 15) % 100}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
              animation: `float ${10 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md z-20 transition-all duration-700 animate-in fade-in zoom-in-95">
        {/* Glass Card */}
        <div
          className="rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(30px)",
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          {/* Header Bar */}
          <div
            className="p-8 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(29,78,216,0.9), rgba(30,64,175,0.9))",
            }}
          >
            {/* Glossy shine effect on header */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20">
                <img
                  src={duraiLogo}
                  alt="Durai Engineering Works"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
            <h1
              className="text-white text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Portal
            </h1>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1 opacity-80">
              Durai Engineering Works
            </p>
          </div>

          {/* Form Area */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Admin ID"
                    className="w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-white/20 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.5)";
                      e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.backgroundColor = "rgba(255,255,255,0.05)";
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-4 rounded-2xl text-white placeholder-white/20 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.5)";
                      e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.backgroundColor = "rgba(255,255,255,0.05)";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-[20px] font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 mt-4 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1e40af)",
                  boxShadow: "0 15px 30px -10px rgba(37,99,235,0.5)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <a
                href="/"
                className="text-white/40 hover:text-white text-xs transition-all flex items-center justify-center gap-2"
              >
                <span className="text-lg">←</span> Back to Website
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
