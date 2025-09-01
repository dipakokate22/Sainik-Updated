'use client';
import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import { Edit, Mail, Phone, MapPin, Calendar, Globe, User, GraduationCap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getStudentProfile, updateStudentProfile } from '../../../../services/studentServices';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const classOptions = ['12th', '11th ', '10th ','9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'];
const stateOptions = ['Maharashtra', 'Delhi', 'Karnataka'];
const countryOptions = ['India', 'USA', 'UK'];

const ProfilePage = () => {
  const studentId = typeof window !== 'undefined' ? localStorage.getItem('studentId') : null;
  type Profile = {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    mobile?: string;
    country?: string;
    street_address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    current_class?: string;
    student_id?: string;
    academic_year?: string;
    admission_date?: string;
    image?: string; // <-- added
  };
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageUploading, setImageUploading] = useState(false); // <-- added

  useEffect(() => {
    if (!studentId) return;
    getStudentProfile(studentId).then(data => {
      const profileData = data.data || data;
      setProfile(profileData);
      // Store image, name, email in localStorage
      if (typeof window !== 'undefined') {
        if (profileData.image) localStorage.setItem('studentImage', profileData.image);
        if (profileData.firstName) localStorage.setItem('studentName', profileData.firstName);
        if (profileData.email) localStorage.setItem('studentEmail', profileData.email);
      }
    });
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Send only changed field as JSON
      const updated = { ...profile, [editingField!]: fieldValue };
      const res = await updateStudentProfile(studentId, updated);
      setProfile(updated);
      setMessage('Saved!');
      setEditingField(null);
    } catch {
      setMessage('Failed to update');
    }
    setLoading(false);
  };

  // Image upload handler
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !studentId) return;
    setImageUploading(true);
    setMessage('');
    try {
      // Send image and studentId as FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('student_id', studentId); // add student_id if backend expects it
      const res = await updateStudentProfile(studentId, formData);
      // Try to get the image URL from different possible response keys
      const newImage =
        res.data?.image ||
        res.image ||
        res.data?.url ||
        res.url ||
        (typeof res === 'string' ? res : undefined);
      setProfile(prev => ({ ...prev!, image: newImage }));
      if (typeof window !== 'undefined' && newImage) {
        localStorage.setItem('studentImage', newImage);
      }
      setMessage('Profile image updated!');
    } catch {
      setMessage('Failed to update image');
    }
    setImageUploading(false);
  };

  // Modern Indian Army medal loader
  const SainikLoader = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F1EE]">
      <div className="flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="mb-4 sainik-medal-loader">
          {/* Medal base */}
          <circle cx="40" cy="40" r="24" fill="#257B5A" stroke="#FFD700" strokeWidth="4" />
          {/* Animated rays */}
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x="39"
              y="8"
              width="2"
              height="14"
              rx="1"
              fill="#FFD700"
              style={{
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: '40px 40px'
              }}
            >
              <animate
                attributeName="height"
                values="14;22;14"
                dur="1.2s"
                repeatCount="indefinite"
                begin={`${i * 0.1}s`}
              />
            </rect>
          ))}
          {/* Center star */}
          <polygon points="40,28 43,37 52,37 45,42 48,51 40,46 32,51 35,42 28,37 37,37"
            fill="#FFD700" />
          {/* Pulse effect */}
          <circle cx="40" cy="40" r="24" fill="none" stroke="#257B5A" strokeWidth="4">
            <animate
              attributeName="r"
              values="24;28;24"
              dur="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;0.2;0.7"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div className="text-[#257B5A] text-lg font-semibold">Preparing your dashboard...</div>
        <div className="text-gray-500 text-sm mt-2">Excellence. Honour. Discipline.</div>
      </div>
      <style jsx>{`
        .sainik-medal-loader {
          animation: medal-pulse 1.2s infinite;
        }
        @keyframes medal-pulse {
          0% { filter: drop-shadow(0 0 0px #FFD700); }
          50% { filter: drop-shadow(0 0 8px #FFD700); }
          100% { filter: drop-shadow(0 0 0px #FFD700); }
        }
      `}</style>
    </div>
  );

  if (!profile) return <SainikLoader />;

  const personalInfo = [
    { label: 'Email Address', value: profile.email, icon: <Mail size={16} /> },
    { label: 'Date of Birth', value: profile.dob, icon: <Calendar size={16} /> },
    { label: 'Contact Number', value: profile.mobile, icon: <Phone size={16} /> },
    { label: 'Country', value: profile.country, icon: <Globe size={16} /> },
    { label: 'Street Address', value: profile.street_address, icon: <MapPin size={16} /> },
    { label: 'City', value: profile.city, icon: <MapPin size={16} /> },
    { label: 'State', value: profile.state, icon: <MapPin size={16} /> },
    { label: 'Zip Code', value: profile.zip_code, icon: <MapPin size={16} /> },
  ];

  const academicInfo = [
    { label: 'Current Class', value: profile.current_class },
    { label: 'Student ID', value: profile.student_id || 'SK2025001' },
    { label: 'Academic Year', value: profile.academic_year },
    { label: 'Admission Date', value: profile.admission_date || '-' },
  ];

  // Helper for rendering inline editable field
  const renderEditableField = (
    field: string,
    value: string | undefined,
    icon?: React.ReactNode,
    type: 'text' | 'date' | 'select' = 'text',
    options?: string[]
  ) => {
    const isEditing = editingField === field;
    return (
      <div className="group flex items-center gap-2 w-full">
        {icon && <span className="text-[#257B5A]">{icon}</span>}
        <p className="text-sm font-medium text-gray-500">{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
        <div className="flex-1 ml-2 flex items-center">
          {isEditing ? (
            <div className="flex items-center gap-2">
              {type === 'select' ? (
                <select
                  className="border rounded-lg px-2 py-1 text-gray-900 bg-gray-50"
                  value={fieldValue}
                  onChange={e => setFieldValue(e.target.value)}
                >
                  <option value="">Select</option>
                  {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type={type}
                  className="border rounded-lg px-2 py-1 text-gray-900 bg-gray-50"
                  value={fieldValue}
                  onChange={e => setFieldValue(e.target.value)}
                />
              )}
              <button
                className="text-green-600 hover:bg-green-100 rounded-full p-1"
                onClick={handleSave}
                disabled={loading}
                title="Save"
              >
                ✓
              </button>
              <button
                className="text-red-600 hover:bg-red-100 rounded-full p-1"
                onClick={() => {
                  setEditingField(null);
                  setFieldValue('');
                }}
                disabled={loading}
                title="Cancel"
              >
                ✗
              </button>
            </div>
          ) : (
            <>
              <span className="text-gray-800 font-medium">{value || '-'}</span>
              <button
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#257B5A] hover:bg-gray-100 rounded-full p-1"
                onClick={() => {
                  setEditingField(field);
                  setFieldValue(value || '');
                  setMessage('');
                }}
                title="Edit"
              >
                <Edit size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
      <Sidebar activePage="Profile" />
      <main className="flex flex-col min-h-screen md:ml-[270px] overflow-y-auto">
        <Header />
        <div className="px-8 py-8 space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#257B5A] shadow-lg">
                  <Image
                    src={profile.image ? profile.image.replace(/^http:/, 'https:') : "/student_dashboard/profile-picture.jpg"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#257B5A] rounded-full flex items-center justify-center text-white hover:bg-[#1e6b4a] transition-colors shadow-lg cursor-pointer" title="Edit Image">
                  <Edit size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={imageUploading}
                  />
                </label>
                {imageUploading && (
                  <div className="absolute left-0 right-0 bottom-[-28px] text-xs text-[#257B5A] text-center">Uploading...</div>
                )}
              </div>
              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-col gap-2">
                      {renderEditableField('firstName', profile.firstName)}
                      {renderEditableField('lastName', profile.lastName)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3 mt-2">
                      <GraduationCap size={18} className="text-[#257B5A]" />
                      <div className="flex-1">
                        {renderEditableField('current_class', profile.current_class, undefined, 'select', classOptions)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <User size={14} />
                      <span>Student ID: {profile.student_id || 'SK2025001'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Academic Information Card */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap size={20} className="text-[#257B5A]" />
                Academic Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderEditableField('academic_year', profile.academic_year)}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Student ID</p>
                  <p className="text-gray-800 font-medium">{profile.student_id || 'SK2025001'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Admission Date</p>
                  <p className="text-gray-800 font-medium">{profile.admission_date || '-'}</p>
                  <p className="text-xs text-gray-400 mt-1">Admission date is set at creation and cannot be changed.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User size={20} className="text-[#257B5A]" />
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderEditableField('email', profile.email, <Mail size={16} />)}
                {renderEditableField('dob', profile.dob, <Calendar size={16} />, 'date')}
                {renderEditableField('mobile', profile.mobile, <Phone size={16} />)}
                {renderEditableField('country', profile.country, <Globe size={16} />, 'select', countryOptions)}
                {renderEditableField('street_address', profile.street_address, <MapPin size={16} />)}
                {renderEditableField('city', profile.city, <MapPin size={16} />)}
                {renderEditableField('state', profile.state, <MapPin size={16} />, 'select', stateOptions)}
                {renderEditableField('zip_code', profile.zip_code, <MapPin size={16} />)}
              </div>
            </div>
          </div>
          {message && <div className="mt-4 text-center text-green-700 font-semibold">{message}</div>}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
