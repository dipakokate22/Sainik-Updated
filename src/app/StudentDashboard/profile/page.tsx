'use client';
import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import { Edit, Mail, Phone, MapPin, Calendar, Globe, User, GraduationCap, Check, X, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getStudentProfile, updateStudentProfile, uploadStudentProfileImage } from '../../../../services/studentServices';
import { getStates, getCities } from '../../../../services/schoolServices'; // Import the new API functions

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const classOptions = ['12th', '11th ', '10th ','9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'];

// Define types for states and cities
interface State {
  id: number;
  name: string;
  code: string;
}

interface City {
  id: number;
  name: string;
  state_id: number;
}

const ProfilePage = () => {
  const studentId = typeof window !== 'undefined' ? localStorage.getItem('studentId') : null;

  type Profile = {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    mobile?: string;
    street_address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    current_class?: string;
    id?: string;
    image?: string;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [backupLoginImage, setBackupLoginImage] = useState<string>('');

  // NEW: State and City management
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Ensure Next/Image gets an absolute or root-relative URL
  const normalizeImageUrl = (url?: string) => {
    if (!url) return '';
    const httpsUrl = url.replace(/^http:/, 'https:');
    if (/^https?:\/\//i.test(httpsUrl)) return httpsUrl;
    if (httpsUrl.startsWith('/')) return httpsUrl;
    return `https://sainik.codekrafters.in/${httpsUrl.replace(/^\/+/, '')}`;
  };

  // Load states on component mount
  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const response = await getStates();
        setStates(response.data || []);
      } catch (error) {
        console.error('Failed to load states:', error);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  // Load cities when state is selected
  useEffect(() => {
    if (selectedStateId) {
      const loadCities = async () => {
        setLoadingCities(true);
        try {
          const response = await getCities(selectedStateId);
          setCities(response.data || []);
        } catch (error) {
          console.error('Failed to load cities:', error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      };

      loadCities();
    } else {
      setCities([]);
    }
  }, [selectedStateId]);

  // Handle state selection
  const handleStateChange = (stateName: string) => {
    const selectedState = states.find(state => state.name === stateName);
    if (selectedState) {
      setSelectedStateId(selectedState.id);
      // Clear city when state changes
      if (profile?.city) {
        setProfile(prev => ({ ...prev!, city: '' }));
      }
    }
    setFieldValue(stateName);
  };

  useEffect(() => {
    if (!studentId) return;
    
    if (typeof window !== 'undefined') {
      const loginImg = localStorage.getItem('image') || '';
      setBackupLoginImage(loginImg);
    }

    getStudentProfile(studentId).then(data => {
      const profileData = data.data || data;
      const normalizedApiImage = profileData.image ? profileData.image : '';
      const fallback = !normalizedApiImage && typeof window !== 'undefined' ? (localStorage.getItem('image') || '') : '';
      const finalImage = normalizedApiImage || fallback;
      
      setProfile({ ...profileData, image: finalImage });

      // Set selected state ID if state exists in profile
      if (profileData.state) {
        const matchingState = states.find(state => state.name === profileData.state);
        if (matchingState) {
          setSelectedStateId(matchingState.id);
        }
      }

      if (typeof window !== 'undefined') {
        if (finalImage) localStorage.setItem('studentImage', finalImage);
        if (profileData.firstName) localStorage.setItem('studentName', profileData.firstName);
        if (profileData.email) localStorage.setItem('studentEmail', profileData.email);
      }
    });
  }, [studentId, states]); // Add states as dependency

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !studentId) return;

    setImageUploading(true);
    setMessage('');
    try {
      const res = await uploadStudentProfileImage(studentId, file);
      const newImage =
        res.data?.image ||
        res.image ||
        res.data?.url ||
        res.url ||
        (typeof res === 'string' ? res : undefined);
      const normalized = normalizeImageUrl(newImage);
      setProfile(prev => ({ ...prev!, image: normalized }));
      if (typeof window !== 'undefined' && newImage) {
        localStorage.setItem('studentImage', normalized || '');
      }
      setMessage('Profile image updated!');
    } catch {
      setMessage('Failed to update image');
    }
    setImageUploading(false);
  };

  const SainikLoader = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F1EE]">
      <div className="flex flex-col items-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="mb-4 sainik-medal-loader">
          <circle cx="40" cy="40" r="24" fill="#257B5A" stroke="#FFD700" strokeWidth="4" />
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
          <polygon points="40,28 43,37 52,37 45,42 48,51 40,46 32,51 35,42 28,37 37,37"
            fill="#FFD700" />
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

  // Helper for rendering inline editable field - FIXED FOR STATE DROPDOWN UI
  const renderEditableField = (
    field: string,
    value: string | undefined,
    icon?: React.ReactNode,
    type: 'text' | 'date' | 'select' = 'text',
    options?: string[]
  ) => {
    const isEditing = editingField === field;
    
    // Special handling for state and city fields
    let dynamicOptions = options;
    if (field === 'state') {
      dynamicOptions = states.map(state => state.name);
    } else if (field === 'city') {
      dynamicOptions = cities.map(city => city.name);
    }

    return (
      <div className="group flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#257B5A]">{icon}</span>}
          <p className="text-sm font-medium text-gray-500">
            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full">
          {isEditing ? (
            <div className="flex items-center gap-2 w-full">
              {type === 'select' ? (
                <select
                  className="flex-1 border rounded-lg px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#257B5A]/40 min-w-0"
                  value={fieldValue}
                  onChange={e => {
                    if (field === 'state') {
                      handleStateChange(e.target.value);
                    } else {
                      setFieldValue(e.target.value);
                    }
                  }}
                  disabled={(field === 'state' && loadingStates) || (field === 'city' && (loadingCities || !selectedStateId))}
                >
                  <option value="">
                    {field === 'state' && loadingStates ? 'Loading states...' :
                     field === 'city' && loadingCities ? 'Loading cities...' :
                     field === 'city' && !selectedStateId ? 'Select state first' :
                     'Select'}
                  </option>
                  {dynamicOptions?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  className="flex-1 border rounded-lg px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#257B5A]/40 min-w-0"
                  value={fieldValue}
                  onChange={e => setFieldValue(e.target.value)}
                />
              )}
              <button
                className="inline-flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 rounded-full px-3 py-1.5 flex-shrink-0"
                onClick={handleSave}
                disabled={loading}
                title="Save"
              >
                <Check size={14} />
                <span className="text-xs font-semibold">Save</span>
              </button>
              <button
                className="inline-flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1.5 flex-shrink-0"
                onClick={() => {
                  setEditingField(null);
                  setFieldValue('');
                }}
                disabled={loading}
                title="Cancel"
              >
                <X size={14} />
                <span className="text-xs font-semibold">Cancel</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span
                className={`text-gray-800 font-medium ${isEditMode ? 'cursor-text' : ''} flex-1`}
                onClick={() => {
                  if (!isEditMode) return;
                  setEditingField(field);
                  setFieldValue(value || '');
                  setMessage('');
                  
                  // Set state ID when editing state field
                  if (field === 'state' && value) {
                    const matchingState = states.find(state => state.name === value);
                    if (matchingState) {
                      setSelectedStateId(matchingState.id);
                    }
                  }
                }}
              >
                {value || '-'}
              </span>
              {isEditMode && (
                <button
                  className="ml-2 transition-opacity text-[#257B5A] hover:bg-gray-100 rounded-full p-1 border border-gray-200 flex-shrink-0"
                  onClick={() => {
                    setEditingField(field);
                    setFieldValue(value || '');
                    setMessage('');
                    
                    // Set state ID when editing state field
                    if (field === 'state' && value) {
                      const matchingState = states.find(state => state.name === value);
                      if (matchingState) {
                        setSelectedStateId(matchingState.id);
                      }
                    }
                  }}
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
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
          <div className="flex items-center justify-between">
            <div />
            <button
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
                isEditMode 
                  ? 'bg-[#257B5A] text-white hover:bg-[#1e6b4a]' 
                  : 'bg-white text-[#257B5A] border border-[#257B5A]/40 hover:bg-[#257B5A]/5'
              }`}
              onClick={() => {
                setIsEditMode(m => !m);
                setEditingField(null);
                setFieldValue('');
                setMessage('');
              }}
              title={isEditMode ? 'Exit edit mode' : 'Enter edit mode'}
            >
              {isEditMode ? <X size={16} /> : <Pencil size={16} />}
              {isEditMode ? 'Exit Edit Mode' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#257B5A] shadow-lg">
                  <Image
                    src={normalizeImageUrl(profile.image) || normalizeImageUrl(backupLoginImage) || "/student_dashboard/profile-picture.jpg"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditMode && (
                  <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#257B5A] rounded-full flex items-center justify-center text-white hover:bg-[#1e6b4a] transition-colors shadow-lg cursor-pointer" title="Change profile image">
                    <Pencil size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={imageUploading}
                    />
                  </label>
                )}
                {imageUploading && (
                  <div className="absolute left-0 right-0 bottom-[-28px] text-xs text-[#257B5A] text-center">Uploading...</div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {renderEditableField('firstName', profile.firstName)}
                      {renderEditableField('lastName', profile.lastName)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <GraduationCap size={18} className="text-[#257B5A]" />
                      <div className="flex-1">
                        {renderEditableField('current_class', profile.current_class, undefined, 'select', classOptions)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>Student ID: {profile.id ? `SK-A-${profile.id}` : 'SK-A-2025001'}</span>
                    </div>
                  </div>
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
                {renderEditableField('street_address', profile.street_address, <MapPin size={16} />)}
                {renderEditableField('state', profile.state, <MapPin size={16} />, 'select')}
                {renderEditableField('city', profile.city, <MapPin size={16} />, 'select')}
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
