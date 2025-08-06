'use client';
import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import { Edit, Mail, Phone, MapPin, Calendar, Globe, User, GraduationCap } from 'lucide-react';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const ProfilePage = () => {
  const personalInfo = [
    { label: 'Email Address', value: 'krishna.kumar@gmail.com', icon: <Mail size={16} /> },
    { label: 'Date of Birth', value: '12-04-2007', icon: <Calendar size={16} /> },
    { label: 'Contact Number', value: '+91 9887766543', icon: <Phone size={16} /> },
    { label: 'Country', value: 'India', icon: <Globe size={16} /> },
    { label: 'Street Address', value: '123, Shivaji Nagar, Andheri West', icon: <MapPin size={16} /> },
    { label: 'City', value: 'Mumbai', icon: <MapPin size={16} /> },
    { label: 'State', value: 'Maharashtra', icon: <MapPin size={16} /> },
    { label: 'Zip Code', value: '400058', icon: <MapPin size={16} /> },
  ];

  const academicInfo = [
    { label: 'Current Class', value: '12th Standard' },
    { label: 'Student ID', value: 'SK2025001' },
    { label: 'Academic Year', value: '2024-2025' },
    { label: 'Admission Date', value: '15-06-2024' },
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
                    alt="Krishna Kumar"
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
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Krishna Kumar</h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <GraduationCap size={18} className="text-[#257B5A]" />
                      <span className="text-lg">Class 12th Standard</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>Student ID: SK2025001</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-4 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6b4a] transition-colors flex items-center gap-2">
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

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:border-[#257B5A] hover:bg-green-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Edit size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Update Profile</p>
                    <p className="text-sm text-gray-500">Edit personal details</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:border-[#257B5A] hover:bg-green-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Contact Support</p>
                    <p className="text-sm text-gray-500">Get help & assistance</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:border-[#257B5A] hover:bg-green-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Academic Records</p>
                    <p className="text-sm text-gray-500">View your progress</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
