// src/components/dashboard/my-school/myschool.tsx
// This is the main client component that holds all the UI and logic for the My School page.

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Pencil, Eye, Trash2, UploadCloud, X, Save, Plus } from 'lucide-react';

// --- Helper Data (can be replaced with API data) ---
const initialSchoolData = [
  { label: 'Name', value: 'Sainik School Pune', key: 'name' },
  { label: 'Address', value: 'Sadashiv peth, Pune-30', key: 'address' },
  { label: 'Country', value: 'India', key: 'country' },
  { label: 'Contact', value: '9887766543', key: 'contact' },
  { label: 'Email', value: 'email@gmail.com', key: 'email' },
  { label: 'City', value: 'Pune', key: 'city' },
  { label: 'Logo', value: 'logo.jpg', key: 'logo' },
];
const amenitiesData = [
  { image: '/school-building.jpg', name: 'Hostel Facilities', description: 'A clean, secure, and well-supervised residential space for students.' },
  { image: '/school-library.jpg', name: 'Library', description: 'A quiet, resource-rich space filled with academic and competitive books.' },
  { image: '/school-sports.jpg', name: 'Sports Ground', description: 'A large playfield for football, cricket, and athletics.' },
];
const feesData = [
  { type: 'Admission Fee', amount: 2000 }, { type: 'Tuition Fee', amount: 15000 }, { type: 'Hostel & Mess', amount: 20000 }, { type: 'Exam & Activity Fee', amount: 3000 }, { type: 'Sports Club', amount: 5000 }, { type: 'Exam Fee', amount: 2000 },
];
const awardsData = { '2024': [ { type: 'Defence Trophy', title: 'Raksha Mantri Trophy', icon: '🏆' }, { type: 'Defence Trophy', title: 'Best NDA Selection School Award', icon: '🏆' }, { type: 'Acedemic Medal', title: 'Best Performing School in CBSE', icon: '🏅' }, { type: 'Special Recognition', title: 'National Educational Excellence Award', icon: '🏅' }, { type: 'Sports Awards', title: 'Inter-Zonal Sports Champions', icon: '🏅' }] };

// --- Add Fee Modal Component ---
const AddFeeModal = ({ 
  isOpen,
  onClose,
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (feeData: { type: string; amount: number }) => void;
}) => {
  const [formData, setFormData] = useState({
    type: '',
    amount: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.type && formData.amount) {
      onSave({
        type: formData.type,
        amount: parseInt(formData.amount)
      });
      setFormData({ type: '', amount: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ type: '', amount: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">  
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add New Fee</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Fee Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-200 text-black"
                placeholder="Enter fee type (e.g., Library Fee)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-200 text-black"
                placeholder="Enter amount"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.type || !formData.amount}
            className="px-6 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6b4a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <Save size={16} />
            Add Fee
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component for Tab 1: General Info ---
const SchoolInfoCardSimple = () => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 flex justify-between items-center border-b border-gray-100">
      <h3 className="text-xl font-bold text-gray-800">School Information</h3>
      <button className="p-3 rounded-full bg-white shadow-md text-purple-600 hover:bg-purple-50 hover:shadow-lg transition-all duration-200">
        <Pencil size={18} />
      </button>
    </div>
    <div className="divide-y divide-gray-50">
      {initialSchoolData.map((item, index) => (
        <div key={index} className="px-6 py-5 grid grid-cols-3 gap-6 hover:bg-gray-50 transition-colors duration-150">
          <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{item.label}</dt>
          <dd className="text-base text-gray-900 col-span-2 font-medium">{item.value}</dd>
        </div>
      ))}
    </div>
  </div>
);

// --- Sub-Component for Tab 2: Amenities ---
const AmenitiesSection = () => (
  <div className="space-y-8">
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenitiesData.map((amenity, index) => (
          <div key={index} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={amenity.image} alt={amenity.name} width={400} height={250} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800">{amenity.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{amenity.description}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                <Eye size={16} /> View
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                <Pencil size={16} /> Edit
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">View all</button>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add new amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-1 text-sm text-gray-600">Drag image or <span className="font-semibold text-blue-600 cursor-pointer">upload file</span></p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div>
            <label htmlFor="amenity-name" className="block text-sm font-medium text-gray-700 mb-1">Amenity Name:</label>
            <input type="text" id="amenity-name" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label htmlFor="amenity-desc" className="block text-sm font-medium text-gray-700 mb-1">Short Description:</label>
            <textarea id="amenity-desc" rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
          </div>
          <div className="text-right">
            <button className="bg-violet-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-violet-700 transition">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Sub-Component for Tab 3: Fees Structure ---
const FeesTable = () => {
  const [fees, setFees] = useState(feesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);

  const handleAddFee = (newFee: { type: string; amount: number }) => {
    setFees(prev => [...prev, newFee]);
    console.log('Adding new fee:', newFee);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Fees Structure</h3>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#257B5A] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#1e6b4a] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            + Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fees.map((fee, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-5">
                    <div className="text-base font-semibold text-black" >{fee.type}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-lg font-bold text-black">{formatCurrency(fee.amount)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-3">
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-md transition-all duration-200">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-md transition-all duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Fee Modal */}
      <AddFeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddFee}
      />
    </>
  );
};

// --- Sub-Component for Tab 4: Awards & Recognition ---
const AwardsSection = () => {
  const [selectedIcon, setSelectedIcon] = useState('🏆');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gray-200"></div>
          {Object.entries(awardsData).map(([year, awards]) => (
            <div key={year} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="absolute left-0 bg-white z-10 p-1">
                  <div className="w-5 h-5 bg-gray-300 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="font-semibold text-gray-800">{year}</h3>
              </div>
              <div className="space-y-6">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-grow pl-4 border-l-2 border-transparent">
                      <p className="font-semibold text-gray-700">{award.type}</p>
                      <p className="text-sm text-gray-500">{award.title}</p>
                    </div>
                    <div className="text-4xl">{award.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md">
          <div className="bg-black text-white text-center py-4 rounded-t-lg">
            <h3 className="font-semibold">Add New Award</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Award Type</label>
              <input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
              <input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Winning Year</label>
              <input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose icon</label>
              <div className="flex gap-2">
                {['🏆', '🏅', '🎖️'].map(icon => (
                  <button 
                    key={icon} 
                    onClick={() => setSelectedIcon(icon)} 
                    className={`text-2xl p-2 rounded-lg transition ${selectedIcon === icon ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
              <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Exported Component ---
const TABS = ['General Info', 'Amenities', 'Fees Structure', 'Awards & Recognition'];

export default function MySchool() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General Info': return <SchoolInfoCard />;
      case 'Amenities': return <AmenitiesSection />;
      case 'Fees Structure': return <FeesTable />;
      case 'Awards & Recognition': return <AwardsSection />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">My School</h2>
        <p className="mt-1 text-gray-600">Manage and showcase your school's identity, facilities, fee structure, and achievements — all in one place.</p>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={clsx('whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors', activeTab === tab ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' )}>
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

// --- Edit School Info Modal Component ---
const EditSchoolModal = ({ 
  isOpen,
  onClose,
  schoolData,
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  schoolData: Array<{
    label: string;
    value: string;
    key: string;
  }>;
  onSave: (data: Array<{
    label: string;
    value: string;
    key: string;
  }>) => void;
}) => {
  const [formData, setFormData] = useState(
    schoolData.reduce((acc: Record<string, string>, item) => {
      acc[item.key] = item.value as string;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updatedData = schoolData.map(item => ({
      ...item,
      value: formData[item.key as keyof typeof formData] || ''
    }));
    onSave(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Edit School Information</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolData.filter(item => item.key !== 'logo').map((item) => (
              <div key={item.key} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {item.label}
                </label>
                <input
                  type={item.key === 'email' ? 'email' : item.key === 'contact' ? 'tel' : 'text'}
                  value={formData[item.key as keyof typeof formData] || ''}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder={`Enter ${item.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {/* Logo Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">School Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drag and drop your logo here, or{' '}
                <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
                  browse files
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6b4a] transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component for Tab 1: General Info ---
const SchoolInfoCard = () => {
  const [schoolData, setSchoolData] = useState(initialSchoolData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveSchoolData = (updatedData: Array<{
    label: string;
    value: string;
    key: string;
  }>) => {
    setSchoolData(updatedData);
    // Here you can also make an API call to save the data
    console.log('Saving school data:', updatedData);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">School Information</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-3 rounded-full bg-white shadow-md text-purple-600 hover:bg-purple-50 hover:shadow-lg transition-all duration-200"
          >
            <Pencil size={18} />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {schoolData.map((item, index) => (
            <div key={index} className="px-6 py-5 grid grid-cols-3 gap-6 hover:bg-gray-50 transition-colors duration-150">
              <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{item.label}</dt>
              <dd className="text-base text-gray-900 col-span-2 font-medium">{item.value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditSchoolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schoolData={schoolData}
        onSave={handleSaveSchoolData}
      />
    </>
  );
};