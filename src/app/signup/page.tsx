'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaUser, FaSchool } from 'react-icons/fa';

export default function LoginPage() {
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { ...formData, userType: isStudent ? 'student' : 'school' });
  };

  return (
    <div className="min-h-screen bg-[#F7F1EE] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-[#1C1F24] text-[32px] font-poppins font-bold">Sainik</span>
          </Link>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-[20px] shadow-lg p-8">
          {/* User Type Toggle */}
          <div className="mb-6">
            <div className="bg-[#F7F1EE] rounded-full p-1 flex">
              <button
                onClick={() => setIsStudent(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full transition-all duration-300 ${
                  isStudent
                    ? 'bg-[#257B5A] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#257B5A]'
                }`}
              >
                <FaUser size={16} />
                <span className="font-medium">Student</span>
              </button>
              <button
                onClick={() => setIsStudent(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full transition-all duration-300 ${
                  !isStudent
                    ? 'bg-[#257B5A] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#257B5A]'
                }`}
              >
                <FaSchool size={16} />
                <span className="font-medium">School</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors"
                placeholder={`Enter your ${isStudent ? 'student' : 'school'} email`}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#257B5A] transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#257B5A] border-gray-300 rounded focus:ring-[#257B5A] focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#257B5A] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#257B5A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e6347] transition-colors focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:ring-offset-2"
            >
              Sign In as {isStudent ? 'Student' : 'School'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#257B5A] font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Sainik. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}