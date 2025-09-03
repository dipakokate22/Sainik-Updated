'use client';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaUser, FaSchool, FaCheck } from 'react-icons/fa';
import { registerUser } from '../../../services/authServices';

export default function SignupPage() {
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    agreeToTerms: boolean;
    website: string;
    image?: File | null;
    schoolName: string;
    currentClass?: string;
    appearingClass?: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeToTerms: false,
    website: '',
    image: null,
    schoolName: '',
    currentClass: '',
    appearingClass: ''
  });
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files && files.length > 0 ? files[0] : null
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Student validation
    if (isStudent) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }
      if (!formData.currentClass || !formData.currentClass.trim()) {
        errors.currentClass = 'Current class is required';
      }
      if (!formData.appearingClass || !formData.appearingClass.trim()) {
        errors.appearingClass = 'Appearing class is required';
      }
      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required for students';
      }
    } else {
      if (!formData.schoolName.trim()) {
        errors.schoolName = 'School name is required';
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone number validation (required for all)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    // Website validation for schools
    if (!isStudent) {
      if (!formData.website.trim()) {
        errors.website = 'Website is required for schools';
      }
    }
    // Image validation (optional, but check type/size if provided)
    if (formData.image) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.image.type)) {
        errors.image = 'Only JPG, JPEG, or PNG files are allowed';
      }
      if (formData.image.size > 2 * 1024 * 1024) {
        errors.image = 'Image size must be less than 2MB';
      }
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Validate form
    if (!validateForm()) {
      setError('Please fix the errors below and try again.');
      return;
    }

    setIsLoading(true);

    try {
      let firstName = '';
      let lastName = '';
      if (isStudent) {
        firstName = formData.firstName.trim();
        lastName = formData.lastName.trim();
      } else {
        const nameParts = formData.schoolName.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      const userData: any = {
        firstName,
        lastName,
        mobile: formData.phoneNumber || '',
        email: formData.email,
        role: isStudent ? 'student' : 'school',
        password: formData.password,
        image: formData.image || null
      };
      if (isStudent) {
        userData.current_class = formData.currentClass || '';
        userData.appearing_class = formData.appearingClass || '';
      }
      const result = await registerUser(userData);

      if (result.status || result.jwttoken) {
        // Registration successful
        alert('Registration successful!');
        window.dispatchEvent(new Event('authChanged'));
        router.push('/login');
      } else {
        // Show API error message
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      // Show API error message
      setError(error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1EE] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
             <Image 
            src="/Image/Sainik-logo.png" 
            alt="Sainik Logo" 
            width={160} 
            height={53} 
            className="w-[140px] sm:w-[160px]" 
          />
          </Link>
          <p className="text-gray-700 mt-2 font-medium">Create your account and join our community.</p>
        </div>

        {/* Signup Form Card */}
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student: First Name & Last Name */}
            {isStudent ? (
              <>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                      fieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                    required
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                      fieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                    required
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                  )}
                </div>
                {/* Current Class */}
                <div>
                  <label htmlFor="currentClass" className="block text-sm font-semibold text-gray-800 mb-2">
                    Current Class
                  </label>
                  <input
                    type="text"
                    id="currentClass"
                    name="currentClass"
                    value={formData.currentClass}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                      fieldErrors.currentClass ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your current class (e.g., 8th, 9th)"
                    required
                  />
                  {fieldErrors.currentClass && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.currentClass}</p>
                  )}
                </div>
                {/* Appearing Class */}
                <div>
                  <label htmlFor="appearingClass" className="block text-sm font-semibold text-gray-800 mb-2">
                    Appearing Class
                  </label>
                  <input
                    type="text"
                    id="appearingClass"
                    name="appearingClass"
                    value={formData.appearingClass}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                      fieldErrors.appearingClass ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter the class you are appearing for"
                    required
                  />
                  {fieldErrors.appearingClass && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.appearingClass}</p>
                  )}
                </div>
              </>
            ) : (
              // School: Only School Name
              <div>
                <label htmlFor="schoolName" className="block text-sm font-semibold text-gray-800 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                    fieldErrors.schoolName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter school name"
                  required
                />
                {fieldErrors.schoolName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.schoolName}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                  fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={`Enter your ${isStudent ? 'student' : 'official'} email`}
                required
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone Number Field (for schools) */}
            {!isStudent && (
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800 mb-2">
                   Phone Number
                 </label>
                <input
                   type="tel"
                   id="phoneNumber"
                   name="phoneNumber"
                   value={formData.phoneNumber}
                   onChange={handleInputChange}
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                     fieldErrors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                   }`}
                   placeholder="Enter school contact number"
                   required
                 />
                 {fieldErrors.phoneNumber && (
                   <p className="mt-1 text-sm text-red-600">{fieldErrors.phoneNumber}</p>
                 )}
              </div>
            )}

            {/* Phone Number Field (for students - required) */}
            {isStudent && (
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800 mb-2">
                   Phone Number
                 </label>
                <input
                   type="tel"
                   id="phoneNumber"
                   name="phoneNumber"
                   value={formData.phoneNumber}
                   onChange={handleInputChange}
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                     fieldErrors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                   }`}
                   placeholder="Enter your phone number"
                   required
                 />
                 {fieldErrors.phoneNumber && (
                   <p className="mt-1 text-sm text-red-600">{fieldErrors.phoneNumber}</p>
                 )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                    fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#257B5A] transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                    fieldErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#257B5A] transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Website Field (for schools) */}
            {!isStudent && (
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-800 mb-2">
                  School Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors text-gray-900 placeholder-gray-700 ${
                    fieldErrors.website ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter school website"
                  required
                />
                {fieldErrors.website && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.website}</p>
                )}
              </div>
            )}

            {/* Image Upload Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-800 mb-2">
                Profile Image (JPG/JPEG/PNG, max 2MB)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:border-transparent transition-colors placeholder-gray-700 ${
                  fieldErrors.image ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {fieldErrors.image && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.image}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex flex-col">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`w-4 h-4 text-[#257B5A] rounded focus:ring-[#257B5A] focus:ring-2 ${
                      fieldErrors.agreeToTerms ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700 font-medium">
                    I agree to the{' '}
                    <Link href="/terms?from=signup" className="text-[#257B5A] hover:underline font-semibold">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy?from=signup" className="text-[#257B5A] hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              {fieldErrors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.agreeToTerms}</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#257B5A] focus:ring-offset-2 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#257B5A] text-white hover:bg-[#1e6347]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                `Create ${isStudent ? 'Student' : 'School'} Account`
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#257B5A] font-semibold hover:underline">
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