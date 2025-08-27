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
  const [showEditModal, setShowEditModal] = useState(false);

  // Dropdown options
  const ownershipOptions = ['', 'Private', 'Government', 'Aided'];
  const boardOptions = ['', 'CBSE', 'ICSE', 'State Board', 'IB', 'Other'];
  const mediumOptions = ['', 'English', 'Hindi', 'Regional', 'Other'];
  const categoryOptions = ['', 'Day School', 'Boarding', 'Co-ed', 'Girls', 'Boys', 'Other'];

  useEffect(() => {
    async function fetchSchool() {
      setLoading(true);
      try {
        const res: { data?: any } = await getSchoolInfo();
        if (res?.data && res.data.profileData) {
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
        } else {
          // No school info, fill from login response (localStorage)
          const firstName = localStorage.getItem('firstName') || '';
          const lastName = localStorage.getItem('lastName') || '';
          const schoolName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : '';
          const phone = localStorage.getItem('mobile') || '';
          const email = localStorage.getItem('email') || '';
          setProfileData({
            ...defaultProfileData,
            schoolName,
            phone,
            email,
          });
        }
      } catch (e) {
        // handle error
        // fallback to login response
        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        const schoolName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : '';
        const phone = localStorage.getItem('mobile') || '';
        const email = localStorage.getItem('email') || '';
        setProfileData({
          ...defaultProfileData,
          schoolName,
          phone,
          email,
        });
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

  // Modern Attractive Edit Modal
  const EditModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-0 overflow-y-auto max-h-[95vh] relative flex flex-col">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] rounded-t-3xl px-6 py-4 flex items-center justify-between shadow">
          <h2 className="text-xl font-bold text-white">Edit School Profile</h2>
          <button
            type="button"
            className="text-white hover:text-gray-200"
            onClick={() => setShowEditModal(false)}
          >
            <X size={28} />
          </button>
        </div>
        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <input
                  type="text"
                  value={profileData.schoolName}
                  onChange={e => handleInputChange('schoolName', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name</label>
                <input
                  type="text"
                  value={profileData.principalName}
                  onChange={e => handleInputChange('principalName', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter principal name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter website"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full"
                />
                {profileImagePreview && (
                  <img src={profileImagePreview} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-[#257B5A]" />
                )}
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={profileData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  type="text"
                  value={profileData.latitude}
                  onChange={e => handleInputChange('latitude', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter latitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  type="text"
                  value={profileData.longitude}
                  onChange={e => handleInputChange('longitude', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter longitude"
                />
              </div>
            </div>
          </div>
          {/* School Details */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">School Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ownership</label>
                <select
                  value={profileData.ownership}
                  onChange={e => handleInputChange('ownership', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                >
                  {ownershipOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Ownership'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                <select
                  value={profileData.board}
                  onChange={e => handleInputChange('board', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                >
                  {boardOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Board'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
                <select
                  value={profileData.medium}
                  onChange={e => handleInputChange('medium', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                >
                  {mediumOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Medium'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={profileData.category}
                  onChange={e => handleInputChange('category', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                >
                  {categoryOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Category'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes Offered</label>
                <input
                  type="text"
                  value={profileData.classesOffered}
                  onChange={e => handleInputChange('classesOffered', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  placeholder="Enter classes offered"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={profileData.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  className="border border-[#257B5A] rounded-xl px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  rows={2}
                  placeholder="Enter school description"
                />
              </div>
            </div>
          </div>
          {/* School Hours */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">School Hours</h3>
            <div className="space-y-2">
              {schoolHours.map((schedule, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Day"
                    value={schedule.day}
                    onChange={e => handleScheduleChange(idx, 'day', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 w-24 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Hours"
                    value={schedule.hours}
                    onChange={e => handleScheduleChange(idx, 'hours', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 w-32 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:bg-red-100 rounded-full p-1"
                    onClick={() => setSchoolHours(schoolHours.filter((_, i) => i !== idx))}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] text-white rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
                onClick={addSchoolHour}
              >
                <Clock size={18} /> Add School Hour
              </button>
            </div>
          </div>
          {/* Facilities */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">Facilities</h3>
            <div className="space-y-2">
              {facilities.map((facility, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Facility Name"
                    value={facility.name}
                    onChange={e => handleFacilityChange(idx, 'name', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 w-32 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={facility.description}
                    onChange={e => handleFacilityChange(idx, 'description', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 flex-1 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:bg-red-100 rounded-full p-1"
                    onClick={() => setFacilities(facilities.filter((_, i) => i !== idx))}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] text-white rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
                onClick={addFacility}
              >
                <BookOpen size={18} /> Add Facility
              </button>
            </div>
          </div>
          {/* Achievements */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">Achievements</h3>
            <div className="space-y-2">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Title"
                    value={achievement.title}
                    onChange={e => handleAchievementChange(idx, 'title', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 w-32 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={achievement.description}
                    onChange={e => handleAchievementChange(idx, 'description', e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 flex-1 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:bg-red-100 rounded-full p-1"
                    onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] text-white rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
                onClick={addAchievement}
              >
                <Award size={18} /> Add Achievement
              </button>
            </div>
          </div>
          {/* Admission Criteria */}
          <div className="bg-[#F7F9FA] rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#257B5A] mb-3">Admission Criteria</h3>
            <div className="space-y-2">
              {admissionCriteria.map((criteria, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Criteria"
                    value={criteria}
                    onChange={e => handleCriteriaChange(idx, e.target.value)}
                    className="border border-[#257B5A] rounded-xl px-3 py-2 flex-1 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#257B5A] focus:outline-none"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:bg-red-100 rounded-full p-1"
                    onClick={() => setAdmissionCriteria(admissionCriteria.filter((_, i) => i !== idx))}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] text-white rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
                onClick={addAdmissionCriteria}
              >
                <Star size={18} /> Add Criteria
              </button>
            </div>
          </div>
          {/* Save/Cancel */}
          <div className="flex gap-4 mt-6">
            <button
              className="bg-gradient-to-r from-[#257B5A] to-[#1e6b4a] text-white px-8 py-3 rounded-xl font-semibold flex-1 shadow hover:scale-105 transition flex items-center justify-center gap-2"
              onClick={async () => {
                setLoading(true);
                await handleSave();
                setShowEditModal(false);
                setLoading(false);
              }}
              disabled={loading}
              type="button"
            >
              <Save size={20} /> Save Changes
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold flex-1 shadow hover:bg-gray-300 transition"
              onClick={() => setShowEditModal(false)}
              disabled={loading}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 bg-[#257B5A] text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-[#1e6b4a] transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              disabled={loading}
            >
              <Edit3 size={16} />
              Edit Profile
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
                      <select
                        value={profileData.ownership}
                        onChange={(e) => handleInputChange('ownership', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      >
                        {ownershipOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Ownership'}</option>)}
                      </select>
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
                      <select
                        value={profileData.board}
                        onChange={(e) => handleInputChange('board', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      >
                        {boardOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Board'}</option>)}
                      </select>
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
                      <select
                        value={profileData.medium}
                        onChange={(e) => handleInputChange('medium', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      >
                        {mediumOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Medium'}</option>)}
                      </select>
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
                      <select
                        value={profileData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="font-medium text-[#257B5A] border border-gray-300 rounded px-2 py-1 text-sm sm:text-base focus:ring-2 focus:ring-[#257B5A] focus:border-transparent flex-1"
                      >
                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt || 'Select Category'}</option>)}
                      </select>
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
              </div>
            </div>
          </div>
        </div>
        {showEditModal && <EditModal />}
      </div>
    </div>
  );
};

export default SchoolProfilePage;