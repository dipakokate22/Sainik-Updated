'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F7F1EE] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[20px] shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#257B5A] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link href="/login">
              <button className="w-full bg-[#257B5A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e6347] transition-colors">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1EE] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-[#1C1F24] text-[32px] font-poppins font-bold">Sainik</span>
          </Link>
          <p className="text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Forgot Password Form Card */}
        <div className="bg-white rounded-[20px] shadow-lg p-8">
          {/* Back to Login */}
          <div className="mb-6">
            <Link href="/login" className="flex items-center text-[#257B5A] hover:underline">
              <FaArrowLeft className="mr-2" size={14} />
              <span className="text-sm">Back to Login</span>
            </Link>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#257B5A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e6347] transition-colors focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </form>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <Link href="/login" className="text-[#257B5A] hover:underline">
                Sign in here
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