import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { IoIosArrowBack } from "react-icons/io";
import logo from '../assets/logo.svg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const returnUrl = location.state?.returnUrl || '/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend Validations
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const url = `${API_URL}${endpoint}`;
      
      // In a real scenario we use environment variables for the API URL
      const res = await axios.post(url, formData);

      if (res.status === 200 || res.status === 201) {
        dispatch(setCredentials(res.data));
        navigate(returnUrl); // Dynamically redirect to where they came from
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Authentication failed');
      } else {
        setError('Failed to connect to the server');
      }
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative flex flex-col items-center">

      {/* Logo Group */}
      <div className="flex flex-col items-center mt-[74px]">
        <div className="w-[104px] h-[64px]">
          <img src={logo} alt="Creative Upaay" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-[20px] font-bold text-black text-center mt-[20px] leading-[24px]">
          Creative Upaay <br />
          Hiring Assignment
        </h1>
      </div>

      {/* Toggle Button */}
      <div className="w-[342px] h-[35px] bg-[#EBEBEB] rounded-[5px] flex mt-[58px]">
        <button
          onClick={() => { setIsLogin(true); setError(''); }}
          className={`w-[171px] h-[35px] rounded-[5px] flex items-center justify-center transition-colors ${isLogin ? 'bg-white shadow-sm' : 'bg-[#EBEBEB]'}`}
        >
          <span className={`text-[16px] leading-[19px] ${isLogin ? 'font-bold text-[#121212]' : 'font-medium text-[#121212]'}`}>
            Login
          </span>
        </button>
        <button
          onClick={() => { setIsLogin(false); setError(''); }}
          className={`w-[171px] h-[35px] rounded-[5px] flex items-center justify-center transition-colors ${!isLogin ? 'bg-white shadow-sm' : 'bg-[#EBEBEB]'}`}
        >
          <span className={`text-[16px] leading-[19px] ${!isLogin ? 'font-bold text-[#121212]' : 'font-medium text-[#121212]'}`}>
            Sign Up
          </span>
        </button>
      </div>

      {/* Interviewer Test Account Notice */}
      {isLogin && (
        <div className="w-full max-w-[342px] mt-[30px] bg-[#F8FAFC] border border-[#E2E8F0] p-[16px] rounded-[8px] shadow-sm flex flex-col items-center mx-auto">
          <p className="text-[13px] text-[#475569] font-medium mb-[4px]">👋 Welcome Interviewer!</p>
          <p className="text-[12px] text-[#64748B] mb-[8px] text-center">You can use this test account to log in:</p>
          <div className="flex flex-col items-center text-[12px] font-mono text-[#0F172A] bg-white px-[12px] py-[6px] rounded border border-[#E2E8F0] w-full">
            <span>Email: test@mail.com</span>
            <span className="mt-[2px]">Pass: test123</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className={`w-full px-[24px] ${isLogin ? 'mt-[30px]' : 'mt-[48px]'}`}>
        <form onSubmit={handleSubmit} className="flex flex-col w-[342px] gap-[28px]">

          {!isLogin && (
            <div className="w-full h-[41px] flex items-center border-b border-[#C7C7C7] px-[10px]">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-full outline-none text-[14px] text-text bg-transparent placeholder-[#64748B]"
                required
              />
            </div>
          )}

          <div className="w-full h-[41px] flex items-center border-b border-[#C7C7C7] px-[10px]">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-full outline-none text-[14px] text-text bg-transparent placeholder-[#64748B]"
              required
            />
          </div>

          <div className="w-full h-[41px] flex items-center border-b border-[#C7C7C7] px-[10px]">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-full outline-none text-[14px] text-text bg-transparent placeholder-[#64748B]"
              required
            />
          </div>

          {!isLogin && (
            <div className="w-full h-[41px] flex items-center border-b border-[#C7C7C7] px-[10px]">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-full outline-none text-[14px] text-text bg-transparent placeholder-[#64748B]"
                required
              />
            </div>
          )}
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-[12px] mt-[12px] text-center">{error}</p>
        )}
      </div>

      {/* Fixed Submit Button */}
      <div className="absolute top-[650px] w-full px-[23px] flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-[345px] h-[37px] bg-primary rounded-[5px] flex items-center justify-center transition-opacity ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
        >
          <span className="text-[14px] font-semibold text-white leading-[17px]">
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </span>
        </button>
      </div>

    </div>
  );
};

export default Auth;
