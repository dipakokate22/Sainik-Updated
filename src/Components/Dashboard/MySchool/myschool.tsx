// src/components/dashboard/my-school/myschool.tsx
// This is the main client component that holds all the UI and logic for the My School page.

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { 
  Pencil, 
  Eye, 
  Trash2, 
  UploadCloud, 
  X, 
  Save, 
  Plus,
  Phone,
  Mail,
  Globe,
  Star
} from 'lucide-react';
import { 
  FaSchool as FaSchoolIcon, 
  FaLanguage as FaLanguageIcon, 
  FaThLarge as FaThLargeIcon,
  FaBook as FaBookIcon,
  FaFlask as FaFlaskIcon,
  FaDesktop as FaDesktopIcon,
  FaFootballBall as FaFootballBallIcon,
  FaSwimmingPool as FaSwimmingPoolIcon,
  FaMusic as FaMusicIcon,
  FaPalette as FaPaletteIcon,
  FaWifi as FaWifiIcon,
  FaBus as FaBusIcon,
  FaMapMarkerAlt as FaMapMarkerAltIcon
} from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import { FiArrowRight } from "react-icons/fi";
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { BiSolidQuoteLeft } from 'react-icons/bi';
import { 
  MdAir, 
  MdSecurity, 
  MdRestaurant, 
  MdMedicalServices 
} from 'react-icons/md';

// Initial data - can be replaced with API data
const initialSchoolData = {
  basicInfo: {
    name: 'Sainik School Pune',
    address: 'Sadashiv peth, Pune-30',
    country: 'India',
    contact: '9887766543',
    email: 'email@gmail.com',
    city: 'Pune',
    website: 'www.sainikschoolpune.edu.in',
    logo: 'logo.jpg',
  },
  overview: {
    schoolInformation: {
      ownership: 'Government',
      medium: 'English',
      board: 'CBSE',
      category: 'Military School'
    },
    welcomeNote: 'Welcome to Excellence in Education',
    description: 'Established in 1961, Sainik School Pune is one of India\'s premier military schools, committed to preparing young students for leadership roles in the Indian Armed Forces and beyond.',
    keyHighlights: [
      '60+ years of educational excellence',
      '1000+ defense officers produced',
      'State-of-the-art infrastructure',
      'Holistic development approach'
    ],
    admissionCriteriaEligibility: [
      'Age between 10-12 years for Class VI',
      'Age between 13-15 years for Class IX',
      'Valid AISSEE score required',
      'Medical fitness certificate mandatory'
    ],
    schoolHours: {
      monday: '8:00 AM - 5:00 PM',
      sunday: 'Closed'
    }
  },
  facilities: {
    academic: [
      { icon: FaBookIcon, name: 'Well-stocked Library with 15,000+ books' },
      { icon: FaFlaskIcon, name: 'Modern Science Laboratories' },
      { icon: FaDesktopIcon, name: 'Computer Lab with 50+ systems' },
      { icon: FaBookIcon, name: 'Smart Classrooms with Digital Boards' }
    ],
    sports: [
      { icon: FaFootballBallIcon, name: 'Football & Cricket Grounds' },
      { icon: FaSwimmingPoolIcon, name: 'Olympic Size Swimming Pool' },
      { icon: FaMusicIcon, name: 'Music & Dance Studios' },
      { icon: FaPaletteIcon, name: 'Art & Craft Rooms' }
    ],
    infrastructure: [
      { icon: MdAir, name: 'Air Conditioned Classrooms' },
      { icon: FaWifiIcon, name: 'High-Speed WiFi Campus' },
      { icon: MdSecurity, name: '24/7 Security & CCTV Surveillance' },
      { icon: FaBusIcon, name: 'Transportation Facility' },
      { icon: MdRestaurant, name: 'Hygienic Cafeteria' },
      { icon: MdMedicalServices, name: 'Medical Room with Qualified Nurse' }
    ]
  },
  fees: [
    { class: 'Class I - III', tuition: 85000, development: 15000, total: 100000 },
    { class: 'Class IV - VI', tuition: 95000, development: 20000, total: 115000 },
    { class: 'Class VII - IX', tuition: 110000, development: 25000, total: 135000 },
    { class: 'Class X - XII', tuition: 125000, development: 30000, total: 155000 }
  ],
  additionalFees: [
    { type: 'Admission Fee (One-time)', amount: 25000 },
    { type: 'Transportation (Optional)', amount: 18000 },
    { type: 'Hostel Fee (Boarding)', amount: 250000 },
    { type: 'Mess Fee (Boarding)', amount: 80000 },
    { type: 'Activity Fee', amount: 12000 }
  ],
  gallery: {
    campus: Array(6).fill('/Listing/Logo.png'),
    sports: Array(6).fill('/Listing/Logo.png'),
    events: Array(6).fill('/Listing/Logo.png')
  },
  reviews: {
    overall: 4.2,
    total: 156,
    breakdown: { 5: 70, 4: 55, 3: 23, 2: 5, 1: 3 },
    reviews: [
      {
        name: "Priya Sharma",
        role: "Parent of Class VIII Student",
        rating: 5,
        date: "2 weeks ago",
        review: "Excellent school with great discipline and academic standards."
      }
    ]
  },
  faqs: {
    admission: [
      {
        question: "What is the admission process for Sainik School?",
        answer: "Admission is through the All India Sainik School Entrance Examination (AISSEE) conducted annually."
      }
    ],
    academic: [
      {
        question: "Which board does the school follow?",
        answer: "The school follows CBSE (Central Board of Secondary Education) curriculum."
      }
    ],
    general: [
      {
        question: "Is hostel accommodation mandatory?",
        answer: "Yes, Sainik Schools are residential schools and hostel accommodation is mandatory for all students."
      }
    ]
  }
};

// Inline Edit Component
const InlineEdit = ({ 
  value, 
  onSave, 
  type = 'text',
  placeholder = '',
  multiline = false,
  className = ''
}: {
  value: string;
  onSave: (value: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
            placeholder={placeholder}
          />
        )}
        <button
          onClick={handleSave}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Save size={16} />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2">
      <span className={`flex-1 ${className}`}>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-blue-600 transition-all"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  return (
    <div className="space-y-6">
      {/* School Information */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <h4 className="font-semibold text-[20px] text-black mb-4">School Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaSchoolIcon className="text-xl text-black" />
            <span className="text-black">
              Ownership: <InlineEdit 
                value={data.overview.schoolInformation.ownership}
                onSave={(value) => onUpdate('overview.schoolInformation.ownership', value)}
                className="text-[#257B5A] font-medium"
              />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaLanguageIcon className="text-xl text-black" />
            <span className="text-black">
              Medium: <InlineEdit 
                value={data.overview.schoolInformation.medium}
                onSave={(value) => onUpdate('overview.schoolInformation.medium', value)}
                className="text-[#257B5A] font-medium"
              />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <PiCertificateFill className="text-xl text-black" />
            <span className="text-black">
              Board: <InlineEdit 
                value={data.overview.schoolInformation.board}
                onSave={(value) => onUpdate('overview.schoolInformation.board', value)}
                className="text-[#257B5A] font-medium"
              />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaThLargeIcon className="text-xl text-black" />
            <span className="text-black">
              Category: <InlineEdit 
                value={data.overview.schoolInformation.category}
                onSave={(value) => onUpdate('overview.schoolInformation.category', value)}
                className="text-[#257B5A] font-medium"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <h4 className="font-semibold text-[20px] text-black mb-4">
          <InlineEdit 
            value={data.overview.welcomeNote}
            onSave={(value) => onUpdate('overview.welcomeNote', value)}
          />
        </h4>
        <InlineEdit 
          value={data.overview.description}
          onSave={(value) => onUpdate('overview.description', value)}
          multiline={true}
          className="text-[16px] text-black"
        />
      </div>

      {/* Key Highlights */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🌟 Key Highlights</h4>
          <button 
            onClick={() => {
              const newHighlights = [...data.overview.keyHighlights, 'New highlight'];
              onUpdate('overview.keyHighlights', newHighlights);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-2">
          {data.overview.keyHighlights.map((highlight: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2">
              <span>•</span>
              <InlineEdit 
                value={highlight}
                onSave={(value) => {
                  const updated = [...data.overview.keyHighlights];
                  updated[idx] = value;
                  onUpdate('overview.keyHighlights', updated);
                }}
                className="text-[16px] text-black"
              />
              <button
                onClick={() => {
                  const updated = data.overview.keyHighlights.filter((_: any, i: number) => i !== idx);
                  onUpdate('overview.keyHighlights', updated);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Admission Criteria */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">Admission Criteria & Eligibility</h4>
          <button 
            onClick={() => {
              const newCriteria = [...data.overview.admissionCriteriaEligibility, 'New criteria'];
              onUpdate('overview.admissionCriteriaEligibility', newCriteria);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {data.overview.admissionCriteriaEligibility.map((criteria: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <FiArrowRight className="text-black mt-1" />
              <InlineEdit 
                value={criteria}
                onSave={(value) => {
                  const updated = [...data.overview.admissionCriteriaEligibility];
                  updated[idx] = value;
                  onUpdate('overview.admissionCriteriaEligibility', updated);
                }}
                className="text-[16px] text-black flex-1"
              />
              <button
                onClick={() => {
                  const updated = data.overview.admissionCriteriaEligibility.filter((_: any, i: number) => i !== idx);
                  onUpdate('overview.admissionCriteriaEligibility', updated);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* School Hours */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <h4 className="font-semibold text-[20px] text-black mb-4">School Hours</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <FiArrowRight className="text-black mt-1" />
            <span className="text-black">Monday: </span>
            <InlineEdit 
              value={data.overview.schoolHours.monday}
              onSave={(value) => onUpdate('overview.schoolHours.monday', value)}
              className="text-[16px] text-black"
            />
          </div>
          <div className="flex items-start gap-2">
            <FiArrowRight className="text-black mt-1" />
            <span className="text-black">Sunday: </span>
            <InlineEdit 
              value={data.overview.schoolHours.sunday}
              onSave={(value) => onUpdate('overview.schoolHours.sunday', value)}
              className="text-[16px] text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Facilities Tab Component
const FacilitiesTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  return (
    <div className="space-y-6">
      {/* Academic Facilities */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">📚 Academic Facilities</h4>
          <button 
            onClick={() => {
              const newFacilities = [...data.facilities.academic, { icon: FaBookIcon, name: 'New Facility' }];
              onUpdate('facilities.academic', newFacilities);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.facilities.academic.map((facility: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 group">
              <facility.icon className="text-xl text-[#257B5A]" />
              <InlineEdit 
                value={facility.name}
                onSave={(value) => {
                  const updated = [...data.facilities.academic];
                  updated[idx].name = value;
                  onUpdate('facilities.academic', updated);
                }}
                className="text-[16px] text-black flex-1"
              />
              <button
                onClick={() => {
                  const updated = data.facilities.academic.filter((_: any, i: number) => i !== idx);
                  onUpdate('facilities.academic', updated);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sports & Recreation */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🏃‍♂️ Sports & Recreation</h4>
          <button 
            onClick={() => {
              const newFacilities = [...data.facilities.sports, { icon: FaFootballBallIcon, name: 'New Sports Facility' }];
              onUpdate('facilities.sports', newFacilities);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.facilities.sports.map((facility: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 group">
              <facility.icon className="text-xl text-[#257B5A]" />
              <InlineEdit 
                value={facility.name}
                onSave={(value) => {
                  const updated = [...data.facilities.sports];
                  updated[idx].name = value;
                  onUpdate('facilities.sports', updated);
                }}
                className="text-[16px] text-black flex-1"
              />
              <button
                onClick={() => {
                  const updated = data.facilities.sports.filter((_: any, i: number) => i !== idx);
                  onUpdate('facilities.sports', updated);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🏢 Infrastructure</h4>
          <button 
            onClick={() => {
              const newFacilities = [...data.facilities.infrastructure, { icon: MdAir, name: 'New Infrastructure' }];
              onUpdate('facilities.infrastructure', newFacilities);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.facilities.infrastructure.map((facility: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 group">
              <facility.icon className="text-xl text-[#257B5A]" />
              <InlineEdit 
                value={facility.name}
                onSave={(value) => {
                  const updated = [...data.facilities.infrastructure];
                  updated[idx].name = value;
                  onUpdate('facilities.infrastructure', updated);
                }}
                className="text-[16px] text-black flex-1"
              />
              <button
                onClick={() => {
                  const updated = data.facilities.infrastructure.filter((_: any, i: number) => i !== idx);
                  onUpdate('facilities.infrastructure', updated);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Fees Tab Component
const FeesTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);

  return (
    <div className="space-y-6">
      {/* Fee Structure */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">💰 Fee Structure (Annual)</h4>
          <button 
            onClick={() => {
              const newFee = { class: 'New Class', tuition: 0, development: 0, total: 0 };
              onUpdate('fees', [...data.fees, newFee]);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#257B5A] text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Class</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tuition Fee</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Development Fee</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Fee</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.fees.map((fee: any, idx: number) => (
                <tr key={idx} className="text-black">
                  <td className="border border-gray-300 px-4 py-2">
                    <InlineEdit 
                      value={fee.class}
                      onSave={(value) => {
                        const updated = [...data.fees];
                        updated[idx].class = value;
                        onUpdate('fees', updated);
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <InlineEdit 
                      value={fee.tuition.toString()}
                      onSave={(value) => {
                        const updated = [...data.fees];
                        updated[idx].tuition = parseInt(value);
                        updated[idx].total = updated[idx].tuition + updated[idx].development;
                        onUpdate('fees', updated);
                      }}
                      type="number"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <InlineEdit 
                      value={fee.development.toString()}
                      onSave={(value) => {
                        const updated = [...data.fees];
                        updated[idx].development = parseInt(value);
                        updated[idx].total = updated[idx].tuition + updated[idx].development;
                        onUpdate('fees', updated);
                      }}
                      type="number"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {formatCurrency(fee.total)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        const updated = data.fees.filter((_: any, i: number) => i !== idx);
                        onUpdate('fees', updated);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Fees */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">📋 Additional Fees</h4>
          <button 
            onClick={() => {
              const newFee = { type: 'New Fee Type', amount: 0 };
              onUpdate('additionalFees', [...data.additionalFees, newFee]);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {data.additionalFees.map((fee: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2 group">
              <InlineEdit 
                value={fee.type}
                onSave={(value) => {
                  const updated = [...data.additionalFees];
                  updated[idx].type = value;
                  onUpdate('additionalFees', updated);
                }}
                className="text-[16px] text-black"
              />
              <div className="flex items-center gap-2">
                <InlineEdit 
                  value={fee.amount.toString()}
                  onSave={(value) => {
                    const updated = [...data.additionalFees];
                    updated[idx].amount = parseInt(value);
                    onUpdate('additionalFees', updated);
                  }}
                  type="number"
                  className="text-[16px] font-semibold text-[#257B5A]"
                />
                <button
                  onClick={() => {
                    const updated = data.additionalFees.filter((_: any, i: number) => i !== idx);
                    onUpdate('additionalFees', updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Gallery Tab Component
const GalleryTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  return (
    <div className="space-y-6">
      {/* Campus Images */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🏫 Campus Gallery</h4>
          <button className="bg-[#257B5A] text-white px-4 py-2 rounded-lg hover:bg-[#1e6b4a] transition-colors">
            <UploadCloud size={16} className="inline mr-2" />
            Add Images
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.gallery.campus.map((image: string, i: number) => (
            <div key={i} className="relative group cursor-pointer">
              <img 
                src={image} 
                alt={`Campus Image ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Eye size={14} className="inline mr-1" /> View
                  </button>
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Trash2 size={14} className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Images */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🏃‍♂️ Sports & Activities</h4>
          <button className="bg-[#257B5A] text-white px-4 py-2 rounded-lg hover:bg-[#1e6b4a] transition-colors">
            <UploadCloud size={16} className="inline mr-2" />
            Add Images
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.gallery.sports.map((image: string, i: number) => (
            <div key={i} className="relative group cursor-pointer">
              <img 
                src={image} 
                alt={`Sports Image ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Eye size={14} className="inline mr-1" /> View
                  </button>
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Trash2 size={14} className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Images */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🎉 Events & Celebrations</h4>
          <button className="bg-[#257B5A] text-white px-4 py-2 rounded-lg hover:bg-[#1e6b4a] transition-colors">
            <UploadCloud size={16} className="inline mr-2" />
            Add Images
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.gallery.events.map((image: string, i: number) => (
            <div key={i} className="relative group cursor-pointer">
              <img 
                src={image} 
                alt={`Event Image ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Eye size={14} className="inline mr-1" /> View
                  </button>
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                    <Trash2 size={14} className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reviews Tab Component  
const ReviewsTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <h4 className="font-semibold text-[20px] text-black mb-4">⭐ Overall Rating</h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold text-[#257B5A]">{data.reviews.overall}</div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${i < Math.floor(data.reviews.overall) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-gray-600">Based on {data.reviews.total} reviews</p>
          </div>
        </div>
      </div>

      {/* Individual Reviews Management */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">💬 Manage Reviews</h4>
          <button className="bg-[#257B5A] text-white px-4 py-2 rounded-lg hover:bg-[#1e6b4a] transition-colors">
            <Plus size={16} className="inline mr-2" />
            Add Review
          </button>
        </div>
        <div className="space-y-4">
          {data.reviews.reviews.map((review: any, idx: number) => (
            <div key={idx} className="border rounded-lg p-4 group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <InlineEdit 
                    value={review.name}
                    onSave={(value) => {
                      const updated = [...data.reviews.reviews];
                      updated[idx].name = value;
                      onUpdate('reviews.reviews', updated);
                    }}
                    className="font-semibold text-black"
                  />
                  <InlineEdit 
                    value={review.role}
                    onSave={(value) => {
                      const updated = [...data.reviews.reviews];
                      updated[idx].role = value;
                      onUpdate('reviews.reviews', updated);
                    }}
                    className="text-sm text-gray-600"
                  />
                </div>
                <button
                  onClick={() => {
                    const updated = data.reviews.reviews.filter((_: any, i: number) => i !== idx);
                    onUpdate('reviews.reviews', updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <InlineEdit 
                value={review.review}
                onSave={(value) => {
                  const updated = [...data.reviews.reviews];
                  updated[idx].review = value;
                  onUpdate('reviews.reviews', updated);
                }}
                multiline={true}
                className="text-gray-700 text-[15px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FAQs Tab Component
const FAQsTab = ({ data, onUpdate }: { data: any; onUpdate: (field: string, value: any) => void }) => {
  return (
    <div className="space-y-6">
      {/* Admission FAQs */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">🎓 Admission FAQs</h4>
          <button 
            onClick={() => {
              const newFaq = { question: 'New Question?', answer: 'New Answer' };
              onUpdate('faqs.admission', [...data.faqs.admission, newFaq]);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {data.faqs.admission.map((faq: any, idx: number) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-black mb-2">
                    Q: <InlineEdit 
                      value={faq.question}
                      onSave={(value) => {
                        const updated = [...data.faqs.admission];
                        updated[idx].question = value;
                        onUpdate('faqs.admission', updated);
                      }}
                      className="inline"
                    />
                  </h5>
                  <div className="text-gray-700 text-[15px]">
                    A: <InlineEdit 
                      value={faq.answer}
                      onSave={(value) => {
                        const updated = [...data.faqs.admission];
                        updated[idx].answer = value;
                        onUpdate('faqs.admission', updated);
                      }}
                      multiline={true}
                      className="inline"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = data.faqs.admission.filter((_: any, i: number) => i !== idx);
                    onUpdate('faqs.admission', updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic FAQs */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">📚 Academic FAQs</h4>
          <button 
            onClick={() => {
              const newFaq = { question: 'New Academic Question?', answer: 'New Academic Answer' };
              onUpdate('faqs.academic', [...data.faqs.academic, newFaq]);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {data.faqs.academic.map((faq: any, idx: number) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-black mb-2">
                    Q: <InlineEdit 
                      value={faq.question}
                      onSave={(value) => {
                        const updated = [...data.faqs.academic];
                        updated[idx].question = value;
                        onUpdate('faqs.academic', updated);
                      }}
                      className="inline"
                    />
                  </h5>
                  <div className="text-gray-700 text-[15px]">
                    A: <InlineEdit 
                      value={faq.answer}
                      onSave={(value) => {
                        const updated = [...data.faqs.academic];
                        updated[idx].answer = value;
                        onUpdate('faqs.academic', updated);
                      }}
                      multiline={true}
                      className="inline"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = data.faqs.academic.filter((_: any, i: number) => i !== idx);
                    onUpdate('faqs.academic', updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General FAQs */}
      <div className="bg-white rounded-lg border px-4 md:px-[26px] py-[25px]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-[20px] text-black">❓ General FAQs</h4>
          <button 
            onClick={() => {
              const newFaq = { question: 'New General Question?', answer: 'New General Answer' };
              onUpdate('faqs.general', [...data.faqs.general, newFaq]);
            }}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {data.faqs.general.map((faq: any, idx: number) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-black mb-2">
                    Q: <InlineEdit 
                      value={faq.question}
                      onSave={(value) => {
                        const updated = [...data.faqs.general];
                        updated[idx].question = value;
                        onUpdate('faqs.general', updated);
                      }}
                      className="inline"
                    />
                  </h5>
                  <div className="text-gray-700 text-[15px]">
                    A: <InlineEdit 
                      value={faq.answer}
                      onSave={(value) => {
                        const updated = [...data.faqs.general];
                        updated[idx].answer = value;
                        onUpdate('faqs.general', updated);
                      }}
                      multiline={true}
                      className="inline"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = data.faqs.general.filter((_: any, i: number) => i !== idx);
                    onUpdate('faqs.general', updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const TABS = ['Overview', 'Facilities', 'Fees', 'Gallery', 'Reviews', 'FAQs'];

export default function MySchool() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [schoolData, setSchoolData] = useState(initialSchoolData);

  const handleDataUpdate = (field: string, value: any) => {
    const keys = field.split('.');
    const updatedData = { ...schoolData };
    let current = updatedData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i] as keyof typeof current] as any;
    }
    
    (current as any)[keys[keys.length - 1]] = value;
    setSchoolData(updatedData);
    
    // Here you can also make an API call to save the data
    console.log('Updating field:', field, 'with value:', value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview': 
        return <OverviewTab data={schoolData} onUpdate={handleDataUpdate} />;
      case 'Facilities': 
        return <FacilitiesTab data={schoolData} onUpdate={handleDataUpdate} />;
      case 'Fees': 
        return <FeesTab data={schoolData} onUpdate={handleDataUpdate} />;
      case 'Gallery': 
        return <GalleryTab data={schoolData} onUpdate={handleDataUpdate} />;
      case 'Reviews': 
        return <ReviewsTab data={schoolData} onUpdate={handleDataUpdate} />;
      case 'FAQs': 
        return <FAQsTab data={schoolData} onUpdate={handleDataUpdate} />;
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1EE]">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My School</h2>
          <p className="mt-1 text-gray-600">
            Manage and showcase your school's identity, facilities, fee structure, and achievements — all in one place.
          </p>
        </div>

        {/* School Header Card */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-start gap-6">
            {/* School Logo */}
            <div className="w-32 h-32 bg-gray-100 rounded-2xl p-2 flex-shrink-0">
              <img
                src="/Listing/Logo.png"
                alt="School Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* School Information */}
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-black mb-2">
                <InlineEdit 
                  value={schoolData.basicInfo.name}
                  onSave={(value) => handleDataUpdate('basicInfo.name', value)}
                  className="text-2xl font-medium"
                />
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAltIcon className="text-[#257B5A]" />
                  <InlineEdit 
                    value={schoolData.basicInfo.address}
                    onSave={(value) => handleDataUpdate('basicInfo.address', value)}
                    className="text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#257B5A]" />
                  <InlineEdit 
                    value={schoolData.basicInfo.contact}
                    onSave={(value) => handleDataUpdate('basicInfo.contact', value)}
                    className="text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-[#257B5A]" />
                  <InlineEdit 
                    value={schoolData.basicInfo.email}
                    onSave={(value) => handleDataUpdate('basicInfo.email', value)}
                    className="text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-[#257B5A]" />
                  <InlineEdit 
                    value={schoolData.basicInfo.website}
                    onSave={(value) => handleDataUpdate('basicInfo.website', value)}
                    className="text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border rounded-lg mb-6 overflow-x-auto">
          <div className="flex border-b">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'px-6 py-3 text-[16px] font-medium transition-colors duration-300 border-b-2 whitespace-nowrap',
                  activeTab === tab
                    ? 'border-[#257B5A] text-[#257B5A] bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-[#257B5A] hover:bg-gray-50'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}