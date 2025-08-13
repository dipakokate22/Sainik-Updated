'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaLock, FaCheckCircle } from 'react-icons/fa';


const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newErrors: {[key: string]: string} = {};
    
    if (!passwordValidation.isValid) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F7F1EE] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-[#1C1F24] text-[32px] font-poppins font-bold">Sainik</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-[20px] shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-[#257B5A] text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
            <Link href="/login">
              <button className="w-full bg-[#257B5A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e6347] transition-colors focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:ring-offset-2">
                Continue to Login
              </button>
            </Link>
          </div>
          
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© 2024 Sainik. All rights reserved.</p>
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
          <p className="text-gray-600 mt-2">Enter your new password below to complete the reset process.</p>
        </div>

        {/* Reset Password Form Card */}
        <div className="bg-white rounded-[20px] shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#257B5A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-[#257B5A] text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
          </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FaCheckCircle className={passwordValidation.minLength ? 'text-green-500' : 'text-gray-300'} />
                        At least 8 characters
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FaCheckCircle className={passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-300'} />
                        One uppercase letter
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FaCheckCircle className={passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-300'} />
                        One lowercase letter
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordValidation.hasNumbers ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FaCheckCircle className={passwordValidation.hasNumbers ? 'text-green-500' : 'text-gray-300'} />
                        One number
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FaCheckCircle className={passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-300'} />
                        One special character
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
                className="w-full bg-[#257B5A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e6347] transition-colors focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Resetting Password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link href="/login" className="text-[#257B5A] hover:underline text-sm">
                Back to Login
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Security Notice</h4>
                <p className="text-sm text-blue-700">
                  For your security, this reset link will expire in 24 hours. If you didn't request this password reset, please contact our support team immediately.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© 2024 Sainik. All rights reserved.</p>
          </div>
        </div>
      </div>
    

  );
};

export default ResetPassword;