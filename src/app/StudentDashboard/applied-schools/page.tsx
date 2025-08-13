'use client';
import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const AppliedSchoolsPage = () => {
  const [showAllApplicationsModal, setShowAllApplicationsModal] = useState(false);
  const [showSchoolDetailsModal, setShowSchoolDetailsModal] = useState(false);
  const [showAllSchoolsModal, setShowAllSchoolsModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [appliedSchools, setAppliedSchools] = useState([
    { id: 1, school: 'Army Public School', location: 'Delhi', appliedDate: '15-06-2025', status: 'Applied', preference: 1 },
    { id: 2, school: 'Sainik Public School', location: 'Mumbai', appliedDate: '15-06-2025', status: 'Applied', preference: 2 },
    { id: 3, school: 'Defence Public School', location: 'Chennai', appliedDate: '15-06-2025', status: 'Applied', preference: 3 },
  ]);
  const [selectedPreference, setSelectedPreference] = useState(1);

  const availableSchools = [
    { 
      id: 1, 
      name: 'Army Public School', 
      location: 'Delhi', 
      grade: '1st-12th', 
      type: 'Military', 
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.8,
      distance: 2.5,
      logo: '/student_dashboard/school1.png',
      image: '/student_dashboard/school1.png',
      description: 'A premier military school with excellent academic standards and discipline.',
      facilities: ['Library', 'Sports Complex', 'Computer Lab', 'Science Lab'],
      fees: '₹50,000 per year',
      contact: '+91-11-12345678',
      email: 'info@armypublicschool.edu.in'
    },
    { 
      id: 2, 
      name: 'Sainik Public School', 
      location: 'Mumbai', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Boys',
      rating: 4.7,
      distance: 3.2,
      logo: '/student_dashboard/school2.png',
      image: '/student_dashboard/school2.png',
      description: 'Dedicated to producing future leaders with strong moral values.',
      facilities: ['Hostel', 'Playground', 'Medical Center', 'Cafeteria'],
      fees: '₹45,000 per year',
      contact: '+91-22-87654321',
      email: 'admissions@sainikpublic.edu.in'
    },
    { 
      id: 3, 
      name: 'Rashtriya Military School', 
      location: 'Bangalore', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.9,
      distance: 4.1,
      logo: '/student_dashboard/school3.png',
      image: '/student_dashboard/school3.png',
      description: 'Excellence in education with military discipline and values.',
      facilities: ['Swimming Pool', 'Auditorium', 'Workshop', 'Art Room'],
      fees: '₹55,000 per year',
      contact: '+91-80-11223344',
      email: 'contact@rmschool.edu.in'
    },
    { 
      id: 4, 
      name: 'Defence Public School', 
      location: 'Chennai', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.6,
      distance: 5.3,
      logo: '/student_dashboard/school4.png',
      image: '/student_dashboard/school4.png',
      description: 'Nurturing young minds with academic excellence and character building.',
      facilities: ['Laboratory', 'Music Room', 'Dance Studio', 'Gymnasium'],
      fees: '₹48,000 per year',
      contact: '+91-44-99887766',
      email: 'info@defencepublic.edu.in'
    },
    { 
      id: 5, 
      name: 'Kendriya Vidyalaya', 
      location: 'Pune', 
      grade: '1st-12th', 
      type: 'Central Government',
      board: 'CBSE',
      medium: 'English/Hindi',
      category: 'Co-Ed',
      rating: 4.5,
      distance: 6.8,
      logo: '/student_dashboard/school1.png',
      image: '/student_dashboard/school1.png',
      description: 'Quality education with affordable fees and excellent infrastructure.',
      facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground'],
      fees: '₹25,000 per year',
      contact: '+91-20-12345678',
      email: 'kv.pune@kvs.gov.in'
    },
    { 
      id: 6, 
      name: 'Navodaya Vidyalaya', 
      location: 'Hyderabad', 
      grade: '6th-12th', 
      type: 'Central Government',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.4,
      distance: 7.5,
      logo: '/student_dashboard/school2.png',
      image: '/student_dashboard/school2.png',
      description: 'Residential school focusing on rural talent development.',
      facilities: ['Hostel', 'Library', 'Laboratory', 'Sports Complex'],
      fees: '₹15,000 per year',
      contact: '+91-40-87654321',
      email: 'jnv.hyderabad@navodaya.gov.in'
    },
    { 
      id: 7, 
      name: 'Military School Ajmer', 
      location: 'Ajmer', 
      grade: '6th-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Boys',
      rating: 4.8,
      distance: 8.2,
      logo: '/student_dashboard/school3.png',
      image: '/student_dashboard/school3.png',
      description: 'One of the oldest military schools in India with rich traditions.',
      facilities: ['Hostel', 'Parade Ground', 'Swimming Pool', 'Horse Riding'],
      fees: '₹60,000 per year',
      contact: '+91-145-12345678',
      email: 'admissions@militaryschoolajmer.edu.in'
    },
    { 
      id: 8, 
      name: 'Rashtriya Indian Military College', 
      location: 'Dehradun', 
      grade: '8th-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Girls',
      rating: 4.9,
      distance: 9.1,
      logo: '/student_dashboard/school4.png',
      image: '/student_dashboard/school4.png',
      description: 'Premier military college preparing cadets for National Defence Academy.',
      facilities: ['Hostel', 'Shooting Range', 'Gymnasium', 'Medical Center'],
      fees: '₹75,000 per year',
      contact: '+91-135-87654321',
      email: 'rimc.dehradun@gov.in'
    },
    { 
      id: 9, 
      name: 'Sainik School Bhubaneswar', 
      location: 'Bhubaneswar', 
      grade: '6th-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Girls',
      rating: 4.7,
      distance: 10.3,
      logo: '/student_dashboard/school1.png',
      image: '/student_dashboard/school1.png',
      description: 'Sainik School with focus on character building and leadership.',
      facilities: ['Hostel', 'NCC Training', 'Sports Complex', 'Library'],
      fees: '₹52,000 per year',
      contact: '+91-674-12345678',
      email: 'sainikschool.bbsr@gov.in'
    },
    { 
      id: 10, 
      name: 'Army School Bangalore', 
      location: 'Bangalore', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.6,
      distance: 11.7,
      logo: '/student_dashboard/school2.png',
      image: '/student_dashboard/school2.png',
      description: 'Army school providing quality education to defence personnel children.',
      facilities: ['Library', 'Computer Lab', 'Sports Ground', 'Auditorium'],
      fees: '₹40,000 per year',
      contact: '+91-80-99887766',
      email: 'armyschool.blr@army.gov.in'
    },
    { 
      id: 11, 
      name: 'Air Force School', 
      location: 'Coimbatore', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.5,
      distance: 12.4,
      logo: '/student_dashboard/school3.png',
      image: '/student_dashboard/school3.png',
      description: 'Air Force school with emphasis on discipline and academic excellence.',
      facilities: ['Aviation Club', 'Science Lab', 'Sports Complex', 'Library'],
      fees: '₹42,000 per year',
      contact: '+91-422-12345678',
      email: 'afschool.cbe@airforce.gov.in'
    },
    { 
      id: 12, 
      name: 'Navy Children School', 
      location: 'Kochi', 
      grade: '1st-12th', 
      type: 'Military',
      board: 'CBSE',
      medium: 'English',
      category: 'Co-Ed',
      rating: 4.4,
      distance: 13.8,
      logo: '/student_dashboard/school4.png',
      image: '/student_dashboard/school4.png',
      description: 'Navy school providing holistic education with maritime focus.',
      facilities: ['Swimming Pool', 'Sailing Club', 'Computer Lab', 'Library'],
      fees: '₹38,000 per year',
      contact: '+91-484-87654321',
      email: 'navyschool.kochi@navy.gov.in'
    }
  ];

  // Sort schools by distance and get first 9 for grid display
  const sortedSchools = [...availableSchools].sort((a, b) => a.distance - b.distance);
  const gridSchools = sortedSchools.slice(0, 9);
  const remainingSchools = sortedSchools.slice(9);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'text-blue-600 bg-blue-50';
      case 'Accepted': return 'text-green-600 bg-green-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      case 'Waitlisted': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleViewSchool = (schoolName: string) => {
    const school = availableSchools.find(s => s.name === schoolName);
    setSelectedSchool(school);
    setShowSchoolDetailsModal(true);
  };

  const handleDeleteApplication = (applicationId: number) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setAppliedSchools(appliedSchools.filter(app => app.id !== applicationId));
    }
  };

  const handleCancelApplication = (schoolName: string) => {
    if (window.confirm(`Are you sure you want to cancel your application to ${schoolName}?`)) {
      setAppliedSchools(appliedSchools.filter(app => app.school !== schoolName));
      setShowSchoolDetailsModal(false);
    }
  };

  const isSchoolApplied = (schoolName: string) => {
    return appliedSchools.some(app => app.school === schoolName);
  };

  const handleApplyClick = (school: any) => {
    setSelectedSchool(school);
    setShowApplicationModal(true);
  };

  const handleApplyToSchool = () => {
    if (appliedSchools.length >= 5) {
      alert('You can only apply to a maximum of 5 schools.');
      return;
    }

    const isAlreadyApplied = appliedSchools.some(app => app.school === selectedSchool.name);
    if (isAlreadyApplied) {
      alert('You have already applied to this school.');
      return;
    }

    const newApplication = {
      id: appliedSchools.length + 1,
      school: selectedSchool.name,
      location: selectedSchool.location,
      appliedDate: new Date().toLocaleDateString('en-GB'),
      status: 'Applied',
      preference: selectedPreference
    };

    setAppliedSchools([...appliedSchools, newApplication]);
    setShowApplicationModal(false);
    setSelectedPreference(1);
    alert('Application submitted successfully!');
  };

  const getAvailablePreferences = () => {
    const usedPreferences = appliedSchools.map(app => app.preference);
    return [1, 2, 3, 4, 5].filter(pref => !usedPreferences.includes(pref));
  };

  return (
    <div className={`relative bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
      <Sidebar activePage="Applied Schools" />
      <main className="md:ml-[270px] flex flex-col min-h-screen">
        <Header />
        <div className="px-8 py-8">
          {/* Top Section with Application Status Card */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-black mb-2">Applied Schools</h1>
              <p className="text-sm text-[#6C6B6B]">Track your school applications</p>
            </div>
            
            {/* Compact Application Status Card */}
            <div className="bg-[#2C946D] rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] p-4 min-w-[220px] h-[80px]">
              <div className="flex items-center justify-between h-full gap-5">
                <div className="text-white">
                  <div className="text-lg font-medium">Total Applications</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold">{appliedSchools.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Schools Table - Now First */}
          <div className="rounded-lg shadow-md overflow-x-auto border border-black mb-8">
            <div className="flex justify-between items-center px-4 py-4 border-b border-black">
              <h2 className="font-semibold text-lg text-black">Your Applications</h2>
              <button 
                onClick={() => setShowAllApplicationsModal(true)}
                className="text-sm font-medium text-[#5346DC] hover:underline"
              >
                View All
              </button>
            </div>

            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#EAF1FF] h-14 border-b border-black">
                  <th className="font-medium text-sm text-left pl-4 text-black border-r border-black last:border-r-0">School</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Location</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Applied Date</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Preference</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Status</th>
                  <th className="font-medium text-sm text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appliedSchools.map((app, index) => (
                  <tr key={index} className="h-[70px] border-b border-black last:border-b-0">
                    <td className="text-sm text-left pl-4 text-[#6C6B6B] border-r border-black">{app.school}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.location}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.appliedDate}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">#{app.preference}</td>
                    <td className="border-r border-black">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleViewSchool(app.school)}
                          className="text-sm text-[#4D4D4D] hover:text-blue-600 hover:underline"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Available Schools to Apply - 3x3 Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg text-black">Available Schools</h2>
              <button 
                onClick={() => setShowAllSchoolsModal(true)}
                className="text-sm font-medium text-[#5346DC] hover:underline"
              >
                Choose schools to apply for
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridSchools.map((school) => (
                <div key={school.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-blue-600">{school.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight">{school.name}</h3>
                        <p className="text-xs text-gray-500">{school.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">📍</span>
                        <span>{school.location} ({school.distance} km)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">🎓</span>
                        <span>{school.board} | {school.medium}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">⭐</span>
                        <span>{school.rating}/5 | {school.category}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleApplyClick(school)}
                      disabled={appliedSchools.length >= 5 || appliedSchools.some(app => app.school === school.name)}
                      className={`w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                        appliedSchools.length >= 5 || appliedSchools.some(app => app.school === school.name)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#5B63B7] text-white hover:bg-opacity-90'
                      }`}
                    >
                      {appliedSchools.some(app => app.school === school.name) ? 'Applied' : 
                       appliedSchools.length >= 5 ? 'Limit Reached' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* All Applications Modal */}
      {showAllApplicationsModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="flex justify-between items-center p-6 border-b border-black bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-black">All Applications</h2>
              <button 
                onClick={() => setShowAllApplicationsModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse border-2 border-black rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#EAF1FF] h-14 border border-black">
                      <th className="font-medium text-sm text-left pl-4 text-black border border-black">School</th>
                      <th className="font-medium text-sm text-black border border-black">Location</th>
                      <th className="font-medium text-sm text-black border border-black">Applied Date</th>
                      <th className="font-medium text-sm text-black border border-black">Preference</th>
                      <th className="font-medium text-sm text-black border border-black">Status</th>
                      <th className="font-medium text-sm text-black">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedSchools.map((app, index) => (
                      <tr key={index} className="h-[70px] border border-gray-700 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="text-sm text-left pl-4 text-[#6C6B6B] border border-gray-700">{app.school}</td>
                        <td className="text-sm text-[#6C6B6B] border border-gray-700">{app.location}</td>
                        <td className="text-sm text-[#6C6B6B] border border-gray-700">{app.appliedDate}</td>
                        <td className="text-sm text-[#6C6B6B] border border-gray-700">#{app.preference}</td>
                        <td className="border border-gray-700">
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => {
                                setShowAllApplicationsModal(false);
                                handleViewSchool(app.school);
                              }}
                              className="text-sm text-[#4D4D4D] hover:text-blue-600 hover:underline transition-colors"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleDeleteApplication(app.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                              title="Delete Application"
                            >
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
          </div>
        </div>
      )}

      {/* All Schools Modal */}
      {showAllSchoolsModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-black">All Available Schools</h2>
              <button 
                onClick={() => setShowAllSchoolsModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-80 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedSchools.map((school) => (
                  <div key={school.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg font-bold text-blue-600">{school.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm leading-tight">{school.name}</h3>
                          <p className="text-xs text-gray-500">{school.type}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4 flex-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <span className="w-4">📍</span>
                          <span>{school.location} ({school.distance} km)</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <span className="w-4">🎓</span>
                          <span>{school.board} | {school.medium}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <span className="w-4">⭐</span>
                          <span>{school.rating}/5 | {school.category}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setShowAllSchoolsModal(false);
                          handleApplyClick(school);
                        }}
                        disabled={appliedSchools.length >= 5 || appliedSchools.some(app => app.school === school.name)}
                        className={`w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                          appliedSchools.length >= 5 || appliedSchools.some(app => app.school === school.name)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#5B63B7] text-white hover:bg-opacity-90'
                        }`}
                      >
                        {appliedSchools.some(app => app.school === school.name) ? 'Applied' : 
                         appliedSchools.length >= 5 ? 'Limit Reached' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedSchool && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-black">Apply to School</h2>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-80 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* School Basic Details */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-blue-600">{selectedSchool.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{selectedSchool.name}</h3>
                      <p className="text-sm text-gray-600">{selectedSchool.type} School</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Board:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.board}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Medium:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.medium}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.rating}/5 ⭐</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.location}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Distance:</span>
                      <span className="ml-2 text-gray-600">{selectedSchool.distance} km</span>
                    </div>
                  </div>
                </div>

                {/* Preference Selection */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Select Preference</h4>
                  <p className="text-sm text-gray-600 mb-4">Choose your preference for this school (1 = Highest preference)</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {getAvailablePreferences().map((pref) => (
                      <button
                        key={pref}
                        onClick={() => setSelectedPreference(pref)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedPreference === pref
                            ? 'bg-[#5B63B7] text-white border-[#5B63B7]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#5B63B7]'
                        }`}
                      >
                        Preference #{pref}
                      </button>
                    ))}
                  </div>
                  
                  {getAvailablePreferences().length === 0 && (
                    <p className="text-red-600 text-sm mt-2">All preferences are already assigned to other schools.</p>
                  )}
                </div>

                {/* Application Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Application Summary</h4>
                  <div className="text-sm space-y-1 text-black">
                    <p><span className="font-medium text-black">School:</span> {selectedSchool.name}</p>
                    <p><span className="font-medium text-black">Selected Preference:</span> #{selectedPreference}</p>
                    <p><span className="font-medium text-black">Applications Used:</span> {appliedSchools.length}/5</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleApplyToSchool}
                    disabled={getAvailablePreferences().length === 0}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      getAvailablePreferences().length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#2C946D] text-white hover:bg-opacity-90'
                    }`}
                  >
                    Submit Application
                  </button>
                </div>

                {/* Cancel Application Section */}
                {isSchoolApplied(selectedSchool.name) && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Application Status</h4>
                    <p className="text-sm text-red-700 mb-3">You have already applied to this school. You can cancel your application if needed.</p>
                    <button 
                      onClick={() => handleCancelApplication(selectedSchool.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Cancel Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* School Details Modal */}
      {showSchoolDetailsModal && selectedSchool && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 transform transition-all">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-black">School Details</h2>
              <button 
                onClick={() => setShowSchoolDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-80 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedSchool.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{selectedSchool.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Basic Information</h4>
                    <div className="space-y-3 text-sm">
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-600">{selectedSchool.location}</span></p>
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Grades:</span> <span className="text-gray-600">{selectedSchool.grade}</span></p>
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Type:</span> <span className="text-gray-600">{selectedSchool.type}</span></p>
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Fees:</span> <span className="text-gray-600 font-semibold">{selectedSchool.fees}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Contact Information</h4>
                    <div className="space-y-3 text-sm">
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-600">{selectedSchool.contact}</span></p>
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-600">{selectedSchool.email}</span></p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Facilities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSchool.facilities.map((facility: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 text-center shadow-sm">
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedSchoolsPage;
