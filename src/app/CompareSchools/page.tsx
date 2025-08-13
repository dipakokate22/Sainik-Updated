'use client';

import { useState } from 'react';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import { FaCheck, FaTimes, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface SchoolData {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  facilities: {
    educational: {
      library: boolean;
      careerCounseling: boolean;
      studentExchange: boolean;
      classroom: boolean;
      avClassrooms: boolean;
      acClassroom: boolean;
      lockers: boolean;
    };
    extraFacilities: {
      avFacilities: boolean;
      interactiveBoards: boolean;
      schoolApp: boolean;
      wifi: boolean;
    };
  };
  stats: {
    totalStudents: number;
    teacherRatio: string;
    establishedYear: number;
    campusSize: string;
  };
}

const schoolsData: SchoolData[] = [
  {
    id: 1,
    name: "Sainik School Satara",
    location: "Satara, Maharashtra",
    rating: 4.8,
    image: "/Image/School1.png",
    facilities: {
      educational: {
        library: true,
        careerCounseling: true,
        studentExchange: true,
        classroom: true,
        avClassrooms: true,
        acClassroom: true,
        lockers: true,
      },
      extraFacilities: {
        avFacilities: true,
        interactiveBoards: true,
        schoolApp: true,
        wifi: true,
      },
    },
    stats: {
      totalStudents: 650,
      teacherRatio: "1:15",
      establishedYear: 1964,
      campusSize: "150 acres",
    },
  },
  {
    id: 2,
    name: "Sainik School Pune",
    location: "Pune, Maharashtra",
    rating: 4.6,
    image: "/Image/School1.png",
    facilities: {
      educational: {
        library: true,
        careerCounseling: true,
        studentExchange: false,
        classroom: true,
        avClassrooms: true,
        acClassroom: false,
        lockers: true,
      },
      extraFacilities: {
        avFacilities: true,
        interactiveBoards: false,
        schoolApp: true,
        wifi: true,
      },
    },
    stats: {
      totalStudents: 580,
      teacherRatio: "1:18",
      establishedYear: 1967,
      campusSize: "120 acres",
    },
  },
];

const CompareSchools = () => {
  const [selectedSchools] = useState<SchoolData[]>(schoolsData.slice(0, 2));

  const renderFacilityIcon = (hasFeature: boolean) => {
    return hasFeature ? (
      <FaCheck className="text-[#257B5A] text-lg" />
    ) : (
      <FaTimes className="text-[#257B5A] text-lg opacity-50" />
    );
  };

  const facilityLabels = {
    educational: {
      library: "Library",
      careerCounseling: "Career Counseling",
      studentExchange: "Student Exchange",
      classroom: "Classroom",
      avClassrooms: "AV Class rooms",
      acClassroom: "AC Classroom",
      lockers: "Lockers",
    },
    extraFacilities: {
      avFacilities: "AV Facilities",
      interactiveBoards: "Interactive Boards",
      schoolApp: "School App",
      wifi: "Wi-fi",
    },
  };

  const statsLabels = {
    totalStudents: "Total Students",
    teacherRatio: "Teacher-Student Ratio",
    establishedYear: "Established Year",
    campusSize: "Campus Size",
  };

  return (
    <div className="min-h-screen bg-[#F7F1EE]">
      <NavBar />
      
      <div className="pt-36 pb-24">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Compare <span className="text-[#257B5A]">Sainik Schools</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare facilities, features, and statistics between different Sainik schools to make an informed decision.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            {/* School Headers */}
            <div className="grid grid-cols-3 bg-[#1C1F24]">
              <div className="p-6 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">Features</h3>
              </div>
              {selectedSchools.map((school) => (
                <div key={school.id} className="p-6 border-l border-gray-700">
                  <div className="text-center">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#257B5A]"
                    />
                    <h3 className="text-xl font-bold text-white mb-2">{school.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-[#257B5A] mb-2">
                      <FaMapMarkerAlt size={14} />
                      <span className="text-sm text-gray-300">{school.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <FaStar className="text-yellow-400" size={16} />
                      <span className="text-white font-medium">{school.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* School Statistics */}
            <div className="bg-white">
              <div className="grid grid-cols-3 bg-[#257B5A] text-white">
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold">School Statistics</h4>
                </div>
                <div className="p-4 border-l border-[#257B5A]"></div>
                <div className="p-4 border-l border-[#257B5A]"></div>
              </div>
              
              {Object.entries(statsLabels).map(([key, label]) => (
                <div key={key} className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-gray-900 font-medium">{label}</span>
                  </div>
                  {selectedSchools.map((school) => (
                    <div key={`${school.id}-${key}`} className="p-4 border-l border-gray-200 flex items-center justify-center">
                      <span className="text-[#257B5A] font-semibold">
                        {school.stats[key as keyof typeof school.stats]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Educational Facilities */}
            <div className="bg-white">
              <div className="grid grid-cols-3 bg-[#257B5A] text-white">
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold">Educational Facilities</h4>
                </div>
                <div className="p-4 border-l border-[#257B5A]"></div>
                <div className="p-4 border-l border-[#257B5A]"></div>
              </div>
              
              {Object.entries(facilityLabels.educational).map(([key, label]) => (
                <div key={key} className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-gray-900 font-medium">{label}</span>
                  </div>
                  {selectedSchools.map((school) => (
                    <div key={`${school.id}-${key}`} className="p-4 border-l border-gray-200 flex items-center justify-center">
                      {renderFacilityIcon(school.facilities.educational[key as keyof typeof school.facilities.educational])}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Extra Facilities */}
            <div className="bg-white">
              <div className="grid grid-cols-3 bg-[#257B5A] text-white">
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold">Extra Facilities</h4>
                </div>
                <div className="p-4 border-l border-[#257B5A]"></div>
                <div className="p-4 border-l border-[#257B5A]"></div>
              </div>
              
              {Object.entries(facilityLabels.extraFacilities).map(([key, label]) => (
                <div key={key} className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-gray-900 font-medium">{label}</span>
                  </div>
                  {selectedSchools.map((school) => (
                    <div key={`${school.id}-${key}`} className="p-4 border-l border-gray-200 flex items-center justify-center">
                      {renderFacilityIcon(school.facilities.extraFacilities[key as keyof typeof school.facilities.extraFacilities])}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 p-6">
              <div className="grid grid-cols-3 gap-6">
                <div></div>
                {selectedSchools.map((school) => (
                  <div key={`action-${school.id}`} className="text-center">
                    <button className="bg-[#257B5A] text-white py-2 px-4 rounded-full font-semibold hover:bg-[#1e6b4a] transition-colors mb-3 mx-auto block">
                      View Details
                    </button>
                    <button className="border-2 border-[#257B5A] text-[#257B5A] py-2 px-4 rounded-full font-semibold hover:bg-[#257B5A] hover:text-white transition-colors mx-auto block">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our education counselors are here to help you make the best decision for your child's future. 
                Get personalized recommendations based on your preferences and requirements.
              </p>
              <button className="bg-[#257B5A] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#1e6b4a] transition-colors">
                Get Expert Guidance
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompareSchools;