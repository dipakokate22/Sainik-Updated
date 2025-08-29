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

const classOptions = ['12th Standard', '11th Standard', '10th Standard'];
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
  };
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<Profile>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!studentId) return;
    getStudentProfile(studentId).then(data => {
      setProfile(data.data || data); // adapt to API response
      setForm(data.data || data);
    });
  }, [studentId]);

  const handleEdit = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updateStudentProfile(studentId, form); // This calls the PUT service
      setMessage(res.message);
      setProfile(form);
      setEditOpen(false);
    } catch (e) {
      setMessage('Failed to update profile');
    }
    setLoading(false);
  };

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
                    src="/student_dashboard/profile-picture.jpg"
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#257B5A] rounded-full flex items-center justify-center text-white hover:bg-[#1e6b4a] transition-colors shadow-lg">
                  <Edit size={16} />
                </button>
              </div>
              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <GraduationCap size={18} className="text-[#257B5A]" />
                      <span className="text-lg">{profile.current_class}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>Student ID: {profile.student_id || 'SK2025001'}</span>
                    </div>
                  </div>
                  <button
                    className="mt-4 md:mt-0 px-4 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6b4a] transition-colors flex items-center gap-2"
                    onClick={handleEdit}
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
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
              <button className="p-2 text-gray-400 hover:text-[#257B5A] hover:bg-gray-50 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {academicInfo.map(({ label, value }, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                ))}
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
              <button className="p-2 text-gray-400 hover:text-[#257B5A] hover:bg-gray-50 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfo.map(({ label, value, icon }, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#257B5A]">{icon}</span>
                      <p className="text-sm font-medium text-gray-500">{label}</p>
                    </div>
                    <p className="text-gray-800 font-medium ml-6">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Modal Popup for Edit */}
        {editOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#257B5A] text-center">Edit Profile</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <input
                    name="firstName"
                    value={form.firstName || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  />
                  <input
                    name="lastName"
                    value={form.lastName || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  />
                </div>
                <input
                  name="email"
                  value={form.email || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded-lg px-3 py-2 w-full text-gray-900 text-base font-medium bg-gray-50"
                />
                <input
                  name="mobile"
                  value={form.mobile || ''}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="border rounded-lg px-3 py-2 w-full text-gray-900 text-base font-medium bg-gray-50"
                />
                <input
                  name="dob"
                  type="date"
                  value={form.dob || ''}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full text-gray-900 text-base font-medium bg-gray-50"
                />
                <input
                  name="street_address"
                  value={form.street_address || ''}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="border rounded-lg px-3 py-2 w-full text-gray-900 text-base font-medium bg-gray-50"
                />
                <div className="flex gap-4">
                  <input
                    name="city"
                    value={form.city || ''}
                    onChange={handleChange}
                    placeholder="City"
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  />
                  <select
                    name="state"
                    value={form.state || ''}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  >
                    <option value="">Select State</option>
                    {stateOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <input
                    name="zip_code"
                    value={form.zip_code || ''}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  />
                  <select
                    name="country"
                    value={form.country || ''}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <select
                    name="current_class"
                    value={form.current_class || ''}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  >
                    <option value="">Select Class</option>
                    {classOptions.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    name="academic_year"
                    value={form.academic_year || ''}
                    onChange={handleChange}
                    placeholder="Academic Year"
                    className="border rounded-lg px-3 py-2 w-1/2 text-gray-900 text-base font-medium bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-base"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-[#257B5A] text-white hover:bg-[#1e6b4a] font-semibold text-base"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
              {message && <div className="mt-4 text-center text-green-700 font-semibold">{message}</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
