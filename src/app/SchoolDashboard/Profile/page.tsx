'use client';

import React, { useState } from 'react';
import {
  School,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Award,
  BookOpen,
  Clock,
  Edit3,
  Save,
  X,
  Building,
  GraduationCap,
  Star,
  Trophy,
  Target,
  Shield,
  Heart,
  Zap,
} from 'lucide-react';

const SchoolProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    schoolName: 'Aurora International Sainik School',
    ownership: 'Private',
    board: 'CBSE',
    medium: 'English',
    category: 'Co-ed',
    address: 'Pune, Maharashtra – 411030',
    phone: '+91 98765 43210',
    email: 'info@sainikschoolpune.edu.in',
    website: 'www.sainikschoolpune.edu.in',
    principalName: 'Dr. Rajesh Kumar',
    classesOffered: 'Class I to XII',
    schoolHours: '10:00 AM - 4:00 PM',
    description: 'Sainik School Pune is one of India\'s premier military schools, committed to preparing young students for leadership roles in the Indian Armed Forces and beyond.',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const [facilities, setFacilities] = useState([
    { icon: BookOpen, name: 'Well-stocked Library', description: '15,000+ books' },
    { icon: Target, name: 'Science Laboratories', description: 'Modern equipment' },
    { icon: Users, name: 'Computer Lab', description: '50+ systems' },
    { icon: Shield, name: 'Smart Classrooms', description: 'Digital boards' },
    { icon: Trophy, name: 'Sports Complex', description: 'Multi-purpose grounds' },
    { icon: Heart, name: 'Medical Facility', description: '24/7 healthcare' },
  ]);

  const [achievements, setAchievements] = useState([
    { icon: Award, title: 'Best Military School 2023', description: 'National Education Awards' },
    { icon: Star, title: '95% Board Results', description: 'CBSE Excellence' },
    { icon: Trophy, title: '1000+ Defense Officers', description: 'Alumni Achievement' },
    { icon: Zap, title: 'NDA Preparation', description: 'Specialized Training' },
  ]);

  const [admissionCriteria, setAdmissionCriteria] = useState([
    'Class I to Class XII',
    'Age criteria as per CBSE norms',
    'Entrance examination required',
    'Medical fitness certificate',
    'Character certificate from previous school',
  ]);

  const [schoolHours, setSchoolHours] = useState([
    { day: 'Monday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Friday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Holiday' },
  ]);

  const handleFacilityChange = (index: number, field: string, value: string) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = { ...updatedFacilities[index], [field]: value };
    setFacilities(updatedFacilities);
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    setAchievements(updatedAchievements);
  };

  const handleCriteriaChange = (index: number, value: string) => {
    const updatedCriteria = [...admissionCriteria];
    updatedCriteria[index] = value;
    setAdmissionCriteria(updatedCriteria);
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const updatedSchedule = [...schoolHours];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setSchoolHours(updatedSchedule);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#257B5A] rounded-full flex items-center justify-center flex-shrink-0">
                <School className="text-white" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                  />
                ) : (
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">{profileData.schoolName}</h1>
                )}
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center gap-2 bg-[#257B5A] text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-[#1e6b4a] transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Basic Information */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* School Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building className="text-[#257B5A]" size={20} />
                School Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <School className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Ownership:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.ownership}
                        onChange={(e) => handleInputChange('ownership', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.ownership}</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Board:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.board}
                        onChange={(e) => handleInputChange('board', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.board}</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Medium:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.medium}
                        onChange={(e) => handleInputChange('medium', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.medium}</span>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <Users className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Category:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.category}</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Classes:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.classesOffered}
                        onChange={(e) => handleInputChange('classesOffered', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.classesOffered}</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#257B5A]" size={16} />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Hours:</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.schoolHours}
                        onChange={(e) => handleInputChange('schoolHours', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      />
                    ) : (
                      <span className="font-medium text-[#257B5A] text-sm sm:text-base">{profileData.schoolHours}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">About Our School</h2>
              {isEditing ? (
                <textarea
                  value={profileData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{profileData.description}</p>
              )}
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">School Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <facility.icon className="text-[#257B5A] mt-1 flex-shrink-0" size={18} />
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={facility.name}
                            onChange={(e) => handleFacilityChange(index, 'name', e.target.value)}
                            className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 mb-1 w-full text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={facility.description}
                            onChange={(e) => handleFacilityChange(index, 'description', e.target.value)}
                            className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-gray-800 text-sm sm:text-base break-words">{facility.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600 break-words">{facility.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-[#257B5A]/10 to-[#257B5A]/5 rounded-lg border border-[#257B5A]/20">
                    <achievement.icon className="text-[#257B5A] mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={achievement.title}
                            onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                            className="font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1 mb-1 w-full text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={achievement.description}
                            onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                            className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{achievement.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600 break-words">{achievement.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School Hours */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">School Hours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {schoolHours.map((schedule, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                    {isEditing ? (
                      <>
                        <div className="w-full">
                          <label className="block text-xs text-gray-500 mb-1">Day</label>
                          <input
                            type="text"
                            value={schedule.day}
                            onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                            className="w-full font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-xs text-gray-500 mb-1">Hours</label>
                          <input
                            type="text"
                            value={schedule.hours}
                            onChange={(e) => handleScheduleChange(index, 'hours', e.target.value)}
                            className="w-full text-[#257B5A] font-medium border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800 text-sm sm:text-base">{schedule.day}</span>
                          <span className="text-[#257B5A] font-medium text-sm sm:text-base">{schedule.hours}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Criteria */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Admission Criteria & Eligibility</h2>
              <ul className="space-y-2">
                {admissionCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#257B5A] rounded-full"></div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) => handleCriteriaChange(index, e.target.value)}
                        className="text-gray-700 border border-gray-300 rounded px-2 py-1 flex-1 focus:ring-2 focus:ring-[#257B5A] focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-700">{criteria}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#257B5A] mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">Address</p>
                    {isEditing ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base break-words">{profileData.address}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-[#257B5A] mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">Phone</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base break-words">{profileData.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#257B5A] mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base break-words">{profileData.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="text-[#257B5A] mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">Website</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-[#257B5A] hover:underline cursor-pointer text-sm sm:text-base break-all">{profileData.website}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Principal Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Administration</h2>
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#257B5A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="text-white" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">Principal</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.principalName}
                      onChange={(e) => handleInputChange('principalName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#257B5A] focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm sm:text-base break-words">{profileData.principalName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfilePage;