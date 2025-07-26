// src/components/dashboard/my-school/myschool.tsx
// This is the main client component that holds all the UI and logic for the My School page.

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Pencil, Eye, Trash2, UploadCloud } from 'lucide-react';

// --- Helper Data (can be replaced with API data) ---
const schoolData = [
  { label: 'Name', value: 'Sainik School Pune' },
  { label: 'Address', value: 'Sadashiv peth, Pune-30' },
  { label: 'Country', value: 'India' },
  { label: 'Contact', value: '9887766543' },
  { label: 'Email', value: 'email@gmail.com' },
  { label: 'City', value: 'Pune' },
  { label: 'Logo', value: 'logo.jpg' },
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

// --- Sub-Component for Tab 1: General Info ---
const SchoolInfoCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden"><div className="p-6 flex justify-between items-center border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-800">School Information</h3><button className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"><Pencil size={16} /></button></div><div className="divide-y divide-gray-200">{schoolData.map((item, index) => (<div key={index} className="px-6 py-4 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">{item.label}</dt><dd className="text-sm text-gray-900 col-span-2">{item.value}</dd></div>))}</div></div>
);

// --- Sub-Component for Tab 2: Amenities ---
const AmenitiesSection = () => (
  <div className="space-y-8"><div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{amenitiesData.map((amenity, index) => (<div key={index} className="group relative bg-white rounded-lg shadow-md overflow-hidden"><Image src={amenity.image} alt={amenity.name} width={400} height={250} className="w-full h-48 object-cover" /><div className="p-5"><h3 className="text-lg font-bold text-gray-800">{amenity.name}</h3><p className="mt-2 text-sm text-gray-600">{amenity.description}</p></div><div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"><button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"><Eye size={16} /> View</button><button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"><Pencil size={16} /> Edit</button><button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"><Trash2 size={16} /> Delete</button></div></div>))}</div><div className="mt-8 text-center"><button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">View all</button></div></div><div className="bg-white rounded-lg shadow-md p-6 mt-8"><h3 className="text-lg font-semibold text-gray-800 mb-4">Add new aminities</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="md:col-span-1"><div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg"><div className="text-center"><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><p className="mt-1 text-sm text-gray-600">Drag image or <span className="font-semibold text-blue-600 cursor-pointer">upload file</span></p></div></div></div><div className="md:col-span-2 space-y-4"><div><label htmlFor="amenity-name" className="block text-sm font-medium text-gray-700 mb-1">Amenity Name:</label><input type="text" id="amenity-name" className="w-full p-2 border border-gray-300 rounded-lg" /></div><div><label htmlFor="amenity-desc" className="block text-sm font-medium text-gray-700 mb-1">Short Description:</label><textarea id="amenity-desc" rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea></div><div className="text-right"><button className="bg-violet-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-violet-700 transition">Add</button></div></div></div></div></div>
);


// --- Sub-Component for Tab 3: Fees Structure ---
const FeesTable = () => { const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount); return (<div className="bg-white rounded-lg shadow-md"><div className="p-6 flex justify-between items-center"><h3 className="text-lg font-semibold text-gray-800">Fees Structure</h3><button className="text-blue-600 font-semibold text-sm hover:underline">+ Add New</button></div><div className="overflow-x-auto"><table className="w-full text-sm text-left text-gray-500"><thead className="text-xs text-gray-700 uppercase bg-gray-100"><tr><th scope="col" className="px-6 py-3">Fee Type</th><th scope="col" className="px-6 py-3">Amount</th><th scope="col" className="px-6 py-3 text-center">Activity</th></tr></thead><tbody>{feesData.map((fee, index) => (<tr key={index} className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{fee.type}</td><td className="px-6 py-4">{formatCurrency(fee.amount)}</td><td className="px-6 py-4"><div className="flex justify-center items-center gap-4"><button className="text-blue-600 hover:text-blue-800"><Pencil size={18} /></button><button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button></div></td></tr>))}</tbody></table></div></div>); };

// --- Sub-Component for Tab 4: Awards & Recognition ---
const AwardsSection = () => { const [selectedIcon, setSelectedIcon] = useState('🏆'); return (<div className="grid grid-cols-1 lg:grid-cols-5 gap-8"><div className="lg:col-span-3"><div className="relative pl-8"><div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gray-200"></div>{Object.entries(awardsData).map(([year, awards]) => (<div key={year} className="mb-8"><div className="flex items-center mb-4"><div className="absolute left-0 bg-white z-10 p-1"><div className="w-5 h-5 bg-gray-300 rounded-full border-4 border-white"></div></div><h3 className="font-semibold text-gray-800">{year}</h3></div><div className="space-y-6">{awards.map((award, index) => (<div key={index} className="flex items-center gap-4"><div className="flex-grow pl-4 border-l-2 border-transparent"><p className="font-semibold text-gray-700">{award.type}</p><p className="text-sm text-gray-500">{award.title}</p></div><div className="text-4xl">{award.icon}</div></div>))}</div></div>))}</div></div><div className="lg:col-span-2"><div className="bg-white rounded-lg shadow-md"><div className="bg-black text-white text-center py-4 rounded-t-lg"><h3 className="font-semibold">Add New Fee</h3></div><div className="p-6 space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Award Type</label><input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label><input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Wining Year</label><input type="text" className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Choose icon</label><div className="flex gap-2">{['🏆', '🏅', '🎖️'].map(icon => (<button key={icon} onClick={() => setSelectedIcon(icon)} className={`text-2xl p-2 rounded-lg transition ${selectedIcon === icon ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'}`}>{icon}</button>))}</div></div><div className="flex gap-4 pt-4"><button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button><button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600">Cancel</button></div></div></div></div></div>); };

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
        <p className="mt-1 text-gray-600">Manage and showcase your school’s identity, facilities, fee structure, and achievements — all in one place.</p>
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