'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, School, Users, Award, BookOpen } from 'lucide-react';
import Navbar from '../../Components/NavBar';
import Footer from '../../Components/Footer';

export default function SchoolProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    schoolName: 'Delhi Public School',
    principalName: 'Dr. Sarah Johnson',
    email: 'admin@dpsdelhi.edu.in',
    phone: '+91 98765 43210',
    address: '123 Education Street, New Delhi, India',
    established: '1985',
    affiliation: 'CBSE',
    website: 'www.dpsdelhi.edu.in',
    totalStudents: '2,500',
    totalTeachers: '150',
    grades: 'Pre-K to 12th',
    description: 'Delhi Public School is a premier educational institution committed to providing quality education and fostering holistic development of students. We focus on academic excellence, character building, and preparing students for global challenges.'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="px-3 sm:px-0 pt-28 pb-8">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#1C1F24] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-[#257B5A] rounded-full flex items-center justify-center">
              <School size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className="text-3xl font-bold bg-transparent border-b-2 border-[#257B5A] outline-none mb-2 w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2">{profileData.schoolName}</h1>
              )}
              <p className="text-gray-300 text-lg">{profileData.affiliation} Affiliated School</p>
              <p className="text-gray-400">Established {profileData.established}</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-[#257B5A] hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition"
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#257B5A] hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#1C1F24] mb-6 flex items-center gap-3">
                <User className="text-[#257B5A]" /> Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.principalName}
                        onChange={(e) => handleInputChange('principalName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-[#1C1F24] font-medium">{profileData.principalName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-[#1C1F24] flex items-center gap-2">
                        <Mail size={16} className="text-[#257B5A]" /> {profileData.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-[#1C1F24] flex items-center gap-2">
                        <Phone size={16} className="text-[#257B5A]" /> {profileData.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-[#1C1F24] flex items-start gap-2">
                        <MapPin size={16} className="text-[#257B5A] mt-1" /> {profileData.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-[#257B5A] hover:underline cursor-pointer">{profileData.website}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* School Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#1C1F24] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#257B5A]" /> About School
              </h2>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.description}</p>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#1C1F24] mb-6 flex items-center gap-3">
                <Award className="text-[#257B5A]" /> School Statistics
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-[#257B5A]" size={20} />
                    <span className="font-medium text-gray-700">Total Students</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.totalStudents}
                      onChange={(e) => handleInputChange('totalStudents', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-[#1C1F24]">{profileData.totalStudents}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="text-[#257B5A]" size={20} />
                    <span className="font-medium text-gray-700">Total Teachers</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.totalTeachers}
                      onChange={(e) => handleInputChange('totalTeachers', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-[#1C1F24]">{profileData.totalTeachers}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="text-[#257B5A]" size={20} />
                    <span className="font-medium text-gray-700">Grades Offered</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.grades}
                      onChange={(e) => handleInputChange('grades', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#1C1F24]">{profileData.grades}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="text-[#257B5A]" size={20} />
                    <span className="font-medium text-gray-700">Established</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.established}
                      onChange={(e) => handleInputChange('established', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#1C1F24]">{profileData.established}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-[#1C1F24] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-[#257B5A] hover:bg-green-700 text-white py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
                  <School size={16} /> View School Dashboard
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-[#1C1F24] py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
                  <Users size={16} /> Manage Students
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-[#1C1F24] py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
                  <BookOpen size={16} /> Academic Records
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}