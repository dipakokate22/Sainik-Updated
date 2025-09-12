'use client';
import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { getAppliedStudentsByUser, updateAppliedStudentStatus, applyToSchool } from '../../../../services/studentServices';
import { getAllSchools } from '../../../../services/schoolServices';

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
  const [appliedSchools, setAppliedSchools] = useState<any[]>([]);
  const [availableSchools, setAvailableSchools] = useState<any[]>([]);
  const [selectedPreference, setSelectedPreference] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

  // Set userId from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('studentId');
      setUserId(id ? parseInt(id, 10) : 2);
    }
  }, []);

  // Helper function to safely parse JSON strings
  const safeJsonParse = (jsonString: any, fallback: any = []) => {
    if (!jsonString) return fallback;
    if (Array.isArray(jsonString)) return jsonString;
    if (typeof jsonString === 'string') {
      try {
        const parsed = JSON.parse(jsonString);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  // Fetch applied schools from API
  useEffect(() => {
    async function fetchAppliedSchools() {
      if (userId === null) return;
      try {
        const res = await getAppliedStudentsByUser(userId);
        console.log('Applied Schools Response:', res);
        if (res.success && res.data && Array.isArray(res.data.applied_students)) {
          setAppliedSchools(res.data.applied_students.map((app: any) => ({
            id: app.id,
            school: app.school?.name || `${app.user?.firstName || ''} ${app.user?.lastName || ''}`.trim() || 'Unknown School',
            location: app.school?.city || app.school?.full_address || 'N/A',
            appliedDate: new Date(app.applied_date).toLocaleDateString('en-GB'),
            status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
            preference: app.preference || (appliedSchools.length + 1),
            school_id: app.school_id,
            user_id: app.user_id,
            raw: app,
          })));
        }
      } catch (err) {
        console.error('Failed to fetch applied schools', err);
      }
    }
    fetchAppliedSchools();
  }, [userId]);

  // Fetch available schools from API
  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await getAllSchools();
        console.log('Available Schools Response:', res);
        if ((res.success || res.status) && Array.isArray(res.data)) {
          setAvailableSchools(
            res.data.map((school: any) => {
              const keyHighlights = safeJsonParse(school.key_highlights);
              const admissionCriteria = safeJsonParse(school.admission_criteria_eligibility);
              const annualFees = safeJsonParse(school.annual_fee_structure);
              const academicFacilities = safeJsonParse(school.academic_facilities);
              
              return {
                id: school.id,
                name: school.name || 'Unknown School',
                location: school.city || school.full_address || 'N/A',
                grade: admissionCriteria.length ? admissionCriteria.join(', ') : 'All Grades',
                type: school.category || 'General',
                board: school.board || 'N/A',
                medium: school.medium || 'N/A',
                category: school.category || 'Co-ed',
                rating: school.reviews?.length
                  ? (
                      school.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) /
                      school.reviews.length
                    ).toFixed(1)
                  : '4.5',
                distance: 0,
                logo: school.profile_image,
                image: school.gallery?.[0] || school.profile_image,
                description: school.welcome_note || 'A quality educational institution.',
                facilities: [
                  ...academicFacilities,
                  ...(keyHighlights || [])
                ].filter(Boolean),
                fees: annualFees.length 
                  ? annualFees.join(', ')
                  : 'Contact for fees',
                contact: school.mobile || 'N/A',
                email: school.email || 'N/A',
                website: school.website || 'N/A',
                raw: school,
              };
            })
          );
        }
      } catch (err) {
        console.error('Failed to fetch schools', err);
      }
    }
    fetchSchools();
  }, []);

  // Sort schools by distance and get first 9 for grid display
  const sortedSchools = [...availableSchools].sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  const gridSchools = sortedSchools.slice(0, 9);

  const handleViewSchool = (schoolName: string) => {
    const school = availableSchools.find(s => s.name === schoolName);
    if (school) {
      setSelectedSchool(school);
      setShowSchoolDetailsModal(true);
    }
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

  // Updated to remove the 5-application limit
  const handleApplyToSchool = async () => {
    const isAlreadyApplied = appliedSchools.some(app => app.school === selectedSchool.name);
    if (isAlreadyApplied) {
      alert('You have already applied to this school.');
      return;
    }

    try {
      await applyToSchool({
        school_id: selectedSchool.id,
        user_id: userId,
        applied_date: new Date().toISOString().split('T')[0]
      });

      const res = await getAppliedStudentsByUser(userId);
      if (res.success && res.data && Array.isArray(res.data.applied_students)) {
        setAppliedSchools(res.data.applied_students.map((app: any) => ({
          id: app.id,
          school: app.school?.name || `${app.user?.firstName || ''} ${app.user?.lastName || ''}`.trim() || 'Unknown School',
          location: app.school?.city || app.school?.full_address || 'N/A',
          appliedDate: new Date(app.applied_date).toLocaleDateString('en-GB'),
          status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
          preference: app.preference || '',
          school_id: app.school_id,
          user_id: app.user_id,
          raw: app,
        })));
      }

      setShowApplicationModal(false);
      setSelectedPreference(1);
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Failed to apply to school:', err);
      alert('Failed to submit application. Please try again.');
    }
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

          {/* Applied Schools Table */}
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
                  <th className="font-medium text-sm text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appliedSchools.length > 0 ? appliedSchools.map((app, index) => (
                  <tr key={index} className="h-[70px] border-b border-black last:border-b-0">
                    <td className="text-sm text-left pl-4 text-[#6C6B6B] border-r border-black">{app.school}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.location}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.appliedDate}</td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleViewSchool(app.school)}
                          className="text-sm text-[#4D4D4D] hover:text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr className="h-[70px]">
                    <td colSpan={4} className="text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
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
              {gridSchools.length > 0 ? gridSchools.map((school) => (
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
                        <span>{school.location}{school.distance ? ` (${school.distance} km)` : ''}</span>
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
                      disabled={appliedSchools.some(app => app.school === school.name)}
                      className={`w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                        appliedSchools.some(app => app.school === school.name)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#5B63B7] text-white hover:bg-opacity-90'
                      }`}
                    >
                      {appliedSchools.some(app => app.school === school.name) ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No schools available at the moment
                </div>
              )}
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
                      <th className="font-medium text-sm text-black">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedSchools.map((app, index) => (
                      <tr key={index} className="h-[70px] border border-gray-700 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="text-sm text-left pl-4 text-[#6C6B6B] border border-gray-700">{app.school}</td>
                        <td className="text-sm text-[#6C6B6B] border border-gray-700">{app.location}</td>
                        <td className="text-sm text-[#6C6B6B] border border-gray-700">{app.appliedDate}</td>
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
                          <span>{school.location}{school.distance ? ` (${school.distance} km)` : ''}</span>
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
                        disabled={appliedSchools.some(app => app.school === school.name)}
                        className={`w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                          appliedSchools.some(app => app.school === school.name)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#5B63B7] text-white hover:bg-opacity-90'
                        }`}
                      >
                        {appliedSchools.some(app => app.school === school.name) ? 'Applied' : 'Apply Now'}
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

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Application Summary</h4>
                  <div className="text-sm space-y-1 text-black">
                    <p><span className="font-medium text-black">School:</span> {selectedSchool.name}</p>
                    <p><span className="font-medium text-black">Total Applications:</span> {appliedSchools.length}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleApplyToSchool}
                    className="flex-1 bg-[#2C946D] text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>

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
                      <p className="flex justify-between"><span className="font-medium text-gray-700">Website:</span> <span className="text-gray-600">{selectedSchool.website}</span></p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Facilities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSchool.facilities && selectedSchool.facilities.length > 0 ? selectedSchool.facilities.map((facility: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 text-center shadow-sm">
                        {facility}
                      </div>
                    )) : (
                      <div className="col-span-2 text-center text-gray-500 py-4">
                        No facilities information available
                      </div>
                    )}
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
