'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { getSchoolInfo, createSchool } from '../../../../services/schoolDashboardServices';
import { getUserId } from '../../../../services/authServices';

type ProfileDataType = {
  schoolName: string;
  ownership: string;
  board: string;
  medium: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  principalName: string;
  classesOffered: string;
  schoolHours: string;
  description: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  profile_image: File | null;
};

const defaultProfileData: ProfileDataType = {
  schoolName: '',
  ownership: '',
  board: '',
  medium: '',
  category: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  principalName: '',
  classesOffered: '',
  schoolHours: '',
  description: '',
  latitude: '',
  longitude: '',
  city: '',
  state: '',
  profile_image: null,
};

const SchoolProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultProfileData);
  type FacilityType = {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    name: string;
    description: string;
  };
  
  const [facilities, setFacilities] = useState<FacilityType[]>([]);
  type AchievementType = {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    title: string;
    description: string;
  };
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [admissionCriteria, setAdmissionCriteria] = useState<string[]>([]);
  type SchoolHourType = { day: string; hours: string };
  const [schoolHours, setSchoolHours] = useState<SchoolHourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchSchool() {
      setLoading(true);
      try {
        const res: { data?: any } = await getSchoolInfo();
        if (res?.data) {
          const d = res.data;
          setProfileData({
            ...defaultProfileData,
            ...d.profileData,
            latitude: d.profileData.latitude || '',
            longitude: d.profileData.longitude || '',
            city: d.profileData.city || '',
            state: d.profileData.state || '',
            profile_image: null,
          });
          setFacilities(d.facilities || []);
          setAchievements(d.achievements || []);
          setAdmissionCriteria(d.admissionCriteria || []);
          setSchoolHours(d.schoolHours || []);
        }
      } catch (e) {
        // handle error
      }
      setLoading(false);
    }
    fetchSchool();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, profile_image: file }));
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFacilityChange = (index: number, field: string, value: string) => {
    const updatedFacilities = [...facilities];
    const currentFacility =
      typeof updatedFacilities[index] === 'object' &&
      updatedFacilities[index] !== null &&
      'icon' in updatedFacilities[index] &&
      'name' in updatedFacilities[index] &&
      'description' in updatedFacilities[index]
        ? updatedFacilities[index]
        : { icon: BookOpen, name: '', description: '' };
    updatedFacilities[index] = { ...currentFacility, [field]: value };
    setFacilities(updatedFacilities);
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...achievements];
    const currentAchievement =
      typeof updatedAchievements[index] === 'object' &&
      updatedAchievements[index] !== null
        ? updatedAchievements[index]
        : { icon: Award, title: '', description: '' };
    updatedAchievements[index] = { ...currentAchievement, [field]: value };
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

  // Add new items to arrays in edit mode
  const addFacility = () => setFacilities([...facilities, { icon: BookOpen, name: '', description: '' }]);
  const addAchievement = () => setAchievements([...achievements, { icon: Award, title: '', description: '' }]);
  const addAdmissionCriteria = () => setAdmissionCriteria([...admissionCriteria, '']);
  const addSchoolHour = () => setSchoolHours([...schoolHours, { day: '', hours: '' }]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const user_id = getUserId();
      // Build payload
      const payload: any = {
        name: profileData.schoolName,
        profile_image: profileData.profile_image,
        latitude: profileData.latitude,
        longitude: profileData.longitude,
        full_address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        mobile: profileData.phone,
        email: profileData.email,
        user_id,
      };
      // Optional fields
      if (profileData.website) payload.website = profileData.website;
      if (profileData.ownership) payload.ownership = profileData.ownership;
      if (profileData.medium) payload.medium = profileData.medium;
      if (profileData.board) payload.board = profileData.board;
      if (profileData.category) payload.category = profileData.category;
      if (profileData.description) payload.welcome_note = profileData.description;
      if (facilities.length) payload.academic_facilities = facilities;
      if (achievements.length) payload.key_highlights = achievements;
      if (admissionCriteria.length) payload.admission_criteria_eligibility = admissionCriteria;
      if (schoolHours.length) payload.school_hours = schoolHours;
      // ...other optional arrays if needed...

      await createSchool(payload);
      setIsEditing(false);
      // Optionally, refetch data
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#257B5A] rounded-full flex items-center justify-center flex-shrink-0">
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <School className="text-white" size={24} />
                )}
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
              disabled={loading}
            >
              {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          {isEditing && (
            <div className="mt-4 flex flex-col gap-2">
              <label className="font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="border border-gray-300 rounded px-2 py-1"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Latitude"
                  value={profileData.latitude}
                  onChange={e => handleInputChange('latitude', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-32"
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  value={profileData.longitude}
                  onChange={e => handleInputChange('longitude', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-32"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={profileData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-32"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={profileData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-32"
                />
              </div>
            </div>
          )}
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
              {isEditing && (
                <button
                  type="button"
                  className="mt-2 px-3 py-1 bg-[#257B5A] text-white rounded"
                  onClick={addFacility}
                >
                  Add Facility
                </button>
              )}
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
              {isEditing && (
                <button
                  type="button"
                  className="mt-2 px-3 py-1 bg-[#257B5A] text-white rounded"
                  onClick={addAchievement}
                >
                  Add Achievement
                </button>
              )}
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
              {isEditing && (
                <button
                  type="button"
                  className="mt-2 px-3 py-1 bg-[#257B5A] text-white rounded"
                  onClick={addSchoolHour}
                >
                  Add School Hour
                </button>
              )}
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
              {isEditing && (
                <button
                  type="button"
                  className="mt-2 px-3 py-1 bg-[#257B5A] text-white rounded"
                  onClick={addAdmissionCriteria}
                >
                  Add Criteria
                </button>
              )}
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