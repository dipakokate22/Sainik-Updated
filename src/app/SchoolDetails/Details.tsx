'use client';
import { useState } from 'react';
import Image from 'next/image';
import { 
  FaSchool, 
  FaLanguage, 
  FaThLarge, 
  FaStar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaGlobe,
  FaBook,
  FaFlask,
  FaDesktop,
  FaFootballBall,
  FaSwimmingPool,
  FaMusic,
  FaPalette,
  FaWifi,
  FaBus,
  FaArrowLeft,
  FaPlus
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

// Horizontal School Card Component
const HorizontalSchoolCard = ({ name, image, location, distance, rating }: { 
  name: string; 
  image: string; 
  location: string; 
  distance: string; 
  rating: number; 
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      {/* School Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* School Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-600 mt-1">{location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{distance}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Arrow Icon */}
      <div className="flex-shrink-0">
        <FiArrowRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default function SchoolDetailSection({
  schoolName = "Sainik School, Pune",
  location = "Pune, Maharashtra – 411030", 
  rating = 4,
  phone = "+91 98765 43210",
  email = "info@sainikschoolpune.edu.in",
  website = "www.sainikschoolpune.edu.in"
}: {
  schoolName?: string;
  location?: string;
  rating?: number;
  phone?: string;
  email?: string;
  website?: string;
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'fees', label: 'Fees' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faqs', label: "FAQ's" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 ">
            {/* School Details */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">School Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ownership */}
                <div className="flex items-center gap-3">
                  <FaSchool className="text-xl text-black" />
                  <span className="text-black">
                    Ownership : <span className="text-[#257B5A] ">Private</span>
                  </span>
                </div>

                {/* Medium */}
                <div className="flex items-center gap-3">
                  <FaLanguage className="text-xl text-black" />
                  <span className="text-black">
                    Medium : <span className="text-[#257B5A]">English</span>
                  </span>
                </div>

                {/* Board */}
                <div className="flex items-center gap-3">
                  <PiCertificateFill className="text-xl text-black" />
                  <span className="text-black">
                    Board : <span className="text-[#257B5A]">CBSE</span>
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center gap-3">
                  <FaThLarge className="text-xl text-black" />
                  <span className="text-black">
                    Category : <span className="text-[#257B5A]">Co-ed</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🏫 Welcome to Sainik School, Pune</h4>
              <p className="text-[16px] font-regular font-poppins text-black mb-4">
                Established in 1961, Sainik School Pune is one of India's premier military schools,
                committed to preparing young students for leadership roles in the Indian Armed
                Forces and beyond. The school operates under the Ministry of Defence and is part
                of a prestigious chain of Sainik Schools across the country.
              </p>
              <p className='text-[16px] font-regular font-poppins text-black'>With a legacy of excellence spanning over 60 years, the school has proudly
                produced more than 1,000 defense officers through rigorous academic training,
                disciplined routines, and character-building programs. Students receive a
                holistic education combining academics, military ethos, sports, and life skills
                that prepare them for both NDA and civilian success.</p>
            </div>

            {/* Key Highlights */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🌟 Key Highlights</h4>
              <ul className="list-disc pl-6 text-[16px] font-regular font-poppins text-black space-y-1">
                <li>🎯 Focused NDA Preparation:
                  <br /> Dedicated NDA coaching integrated into the school curriculum to help
                </li>
                <li>🎓 40+ Highly Qualified Faculty: <br /> Experienced teachers trained in CBSE pedagogy and military-style discipline</li>
                <li>💯 Consistent Academic Excellence: <br /> Over 95% of our students pass their CBSE board exams with distinction,
                  year after year.</li>
                <li>🪖 Mandatory Military Training: <br /> Includes daily drills, obstacle training, physical fitness sessions, and leadership
                  activities to build stamina, courage, and discipline.</li>
                <li>👨‍🏫 Character & Leadership Programs: <br /> Morning assemblies, team-based house competitions, and value education 
                                  classes are designed to shape confident, ethical individuals.</li>
                <li>🏆 State-of-the-Art Sports Infrastructure: <br /> Regular coaching in football, basketball, boxing, shooting, and athletics with 
                                  inter-school competitions and camps.</li>
              </ul>
            </div>

            {/* Admission Dates */}
            <div className="bg-white border rounded-lg  px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">Admission Criteria & Eligibility</h4>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class I</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class II</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class III</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class V</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VII</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VIII</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class X</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class X</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class XI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class XII</span>
              </li>
            </div>

            {/* School Hours */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">School Hours</h4>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Monday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Tuesday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Wednesday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Thursday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Friday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Saturday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px] text-black">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Sunday : Holiday</span>
              </li>
            </div>
          </div>
        );

      case 'facilities':
        return (
          <div className="space-y-6">
            {/* Academic Facilities */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">📚 Academic Facilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaBook className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Well-stocked Library with 15,000+ books</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaFlask className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Modern Science Laboratories</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaDesktop className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Computer Lab with 50+ systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaBook className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Smart Classrooms with Digital Boards</span>
                </div>
              </div>
            </div>

            {/* Sports & Recreation */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🏃‍♂️ Sports & Recreation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaFootballBall className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Football & Cricket Grounds</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaSwimmingPool className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Olympic Size Swimming Pool</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMusic className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Music & Dance Studios</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPalette className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Art & Craft Rooms</span>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🏢 Infrastructure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MdAir className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Air Conditioned Classrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaWifi className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">High-Speed WiFi Campus</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdSecurity className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">24/7 Security & CCTV Surveillance</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaBus className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Transportation Facility</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdRestaurant className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Hygienic Cafeteria</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdMedicalServices className="text-xl text-[#257B5A]" />
                  <span className="text-[16px] text-black">Medical Room with Qualified Nurse</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'fees':
        return (
          <div className="space-y-6">
            {/* Fee Structure */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">💰 Fee Structure (Annual)</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#257B5A] text-white">
                      <th className="border border-gray-300 px-4 py-2 text-left">Class</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tuition Fee</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Development Fee</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Total Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-black">
                      <td className="border border-gray-300 px-4 py-2">Class I - III</td>
                      <td className="border border-gray-300 px-4 py-2">₹85,000</td>
                      <td className="border border-gray-300 px-4 py-2">₹15,000</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">₹1,00,000</td>
                    </tr>
                    <tr className="text-black">
                      <td className="border border-gray-300 px-4 py-2">Class IV - VI</td>
                      <td className="border border-gray-300 px-4 py-2">₹95,000</td>
                      <td className="border border-gray-300 px-4 py-2">₹20,000</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">₹1,15,000</td>
                    </tr>
                    <tr className="text-black">
                      <td className="border border-gray-300 px-4 py-2">Class VII - IX</td>
                      <td className="border border-gray-300 px-4 py-2">₹1,10,000</td>
                      <td className="border border-gray-300 px-4 py-2">₹25,000</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">₹1,35,000</td>
                    </tr>
                    <tr className="text-black">
                      <td className="border border-gray-300 px-4 py-2">Class X - XII</td>
                      <td className="border border-gray-300 px-4 py-2">₹1,25,000</td>
                      <td className="border border-gray-300 px-4 py-2">₹30,000</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">₹1,55,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Fees */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">📋 Additional Fees</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-[16px] text-black">Admission Fee (One-time)</span>
                  <span className="text-[16px] font-semibold text-[#257B5A]">₹25,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-[16px] text-black">Transportation (Optional)</span>
                  <span className="text-[16px] font-semibold text-[#257B5A]">₹18,000/year</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-[16px] text-black">Hostel Fee (Boarding)</span>
                  <span className="text-[16px] font-semibold text-[#257B5A]">₹2,50,000/year</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-[16px] text-black">Mess Fee (Boarding)</span>
                  <span className="text-[16px] font-semibold text-[#257B5A]">₹80,000/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[16px] text-black">Activity Fee</span>
                  <span className="text-[16px] font-semibold text-[#257B5A]">₹12,000/year</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">💳 Payment Information</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[16px] text-black">
                  <IoMdCheckmarkCircle className="text-[#257B5A] mt-1" />
                  <span>Fees can be paid in 3 installments (April, August, December)</span>
                </li>
                <li className="flex items-start gap-2 text-[16px] text-black">
                  <IoMdCheckmarkCircle className="text-[#257B5A] mt-1" />
                  <span>Online payment accepted via Net Banking, UPI, Credit/Debit Cards</span>
                </li>
                <li className="flex items-start gap-2 text-[16px] text-black">
                  <IoMdCheckmarkCircle className="text-[#257B5A] mt-1" />
                  <span>5% discount on annual payment</span>
                </li>
                <li className="flex items-start gap-2 text-[16px] text-black">
                  <IoMdCheckmarkCircle className="text-[#257B5A] mt-1" />
                  <span>Sibling discount: 10% off on second child's fees</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-6">
            {/* Campus Images */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🏫 Campus Gallery</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative group cursor-pointer">
                    <img 
                      src={`/Listing/Logo.png`} 
                      alt={`Campus Image ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Images */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🏃‍♂️ Sports & Activities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative group cursor-pointer">
                    <img 
                      src={`/Listing/Logo.png`} 
                      alt={`Sports Image ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events & Celebrations */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🎉 Events & Celebrations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative group cursor-pointer">
                    <img 
                      src={`/Listing/Logo.png`} 
                      alt={`Event Image ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">⭐ Overall Rating</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-[#257B5A]">4.2</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on 156 reviews</p>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-8 text-sm">{star}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#257B5A] h-2 rounded-full" 
                        style={{ width: `${star === 5 ? 45 : star === 4 ? 35 : star === 3 ? 15 : star === 2 ? 3 : 2}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-gray-600">{star === 5 ? 70 : star === 4 ? 55 : star === 3 ? 23 : star === 2 ? 5 : 3}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">💬 Student & Parent Reviews</h4>
              <div className="space-y-6">
                {[
                  {
                    name: "Priya Sharma",
                    role: "Parent of Class VIII Student",
                    rating: 5,
                    date: "2 weeks ago",
                    review: "Excellent school with great discipline and academic standards. My son has shown remarkable improvement in both studies and personality development. The military training has made him more confident and responsible."
                  },
                  {
                    name: "Rajesh Kumar",
                    role: "Parent of Class X Student",
                    rating: 4,
                    date: "1 month ago",
                    review: "Good infrastructure and qualified teachers. The NDA preparation program is very effective. However, the fees are quite high compared to other schools in the area."
                  },
                  {
                    name: "Anita Patel",
                    role: "Alumni Parent",
                    rating: 5,
                    date: "2 months ago",
                    review: "My daughter graduated from here and is now in the Indian Navy. The school's training and values have shaped her into a strong, independent individual. Highly recommended for character building."
                  }
                ].map((review, i) => (
                  <div key={i} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-black">{review.name}</h5>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <FaStar key={starIndex} className={`text-sm ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BiSolidQuoteLeft className="text-[#257B5A] text-xl mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-[15px] leading-relaxed">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">✍️ Write a Review</h4>
              <button className="bg-[#257B5A] text-[16px] text-white px-6 py-3 rounded-full hover:bg-[#1e6b4a] transition-colors duration-300">

                📝 Share Your Experience
              </button>
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6">
            {/* Admission FAQs */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">🎓 Admission FAQs</h4>
              <div className="space-y-4">
                {[
                  {
                    question: "What is the admission process for Sainik School?",
                    answer: "Admission is through the All India Sainik School Entrance Examination (AISSEE) conducted annually. Students can apply online through the official website. The exam is held for Class VI and Class IX admissions."
                  },
                  {
                    question: "What is the age criteria for admission?",
                    answer: "For Class VI: Age should be between 10-12 years as on 31st March of the admission year. For Class IX: Age should be between 13-15 years as on 31st March of the admission year."
                  },
                  {
                    question: "Is there any reservation policy?",
                    answer: "Yes, reservations are available as per government norms: SC/ST - 15% each, OBC - 27%, EWS - 10%. State-wise quotas are also maintained with 67% seats for home state and 33% for other states."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-black mb-2">Q: {faq.question}</h5>
                    <p className="text-gray-700 text-[15px] leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic FAQs */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">📚 Academic FAQs</h4>
              <div className="space-y-4">
                {[
                  {
                    question: "Which board does the school follow?",
                    answer: "The school follows CBSE (Central Board of Secondary Education) curriculum. All students appear for CBSE board examinations in Class X and XII."
                  },
                  {
                    question: "What is the student-teacher ratio?",
                    answer: "We maintain an optimal student-teacher ratio of 20:1 to ensure personalized attention and quality education for every student."
                  },
                  {
                    question: "Are there special coaching classes for NDA preparation?",
                    answer: "Yes, we provide integrated NDA coaching as part of our curriculum. Special classes for Mathematics, English, and General Knowledge are conducted by experienced faculty members."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-black mb-2">Q: {faq.question}</h5>
                    <p className="text-gray-700 text-[15px] leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* General FAQs */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">❓ General FAQs</h4>
              <div className="space-y-4">
                {[
                  {
                    question: "Is hostel accommodation mandatory?",
                    answer: "Yes, Sainik Schools are residential schools and hostel accommodation is mandatory for all students. This helps in building discipline, character, and camaraderie among students."
                  },
                  {
                    question: "What are the visiting hours for parents?",
                    answer: "Parents can visit their children on designated visiting days, usually twice a month on Sundays from 10 AM to 5 PM. Special permission can be granted in case of emergencies."
                  },
                  {
                    question: "Are mobile phones allowed for students?",
                    answer: "Mobile phones are not allowed for junior students (Class VI-VIII). Senior students (Class IX-XII) can use phones during designated hours under supervision."
                  },
                  {
                    question: "What medical facilities are available?",
                    answer: "The school has a well-equipped medical center with qualified medical staff available 24/7. Regular health check-ups are conducted and emergency medical care is provided when needed."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-black mb-2">Q: {faq.question}</h5>
                    <p className="text-gray-700 text-[15px] leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1EE]" >
      {/* Header Section - Matching the uploaded image */}
      <div className="max-w-[1440px] w-full mx-auto bg-[#F7F1EE] px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:pt-6 md:pt-10 lg:pt-12">
        <div className="max-w-[1440px] w-full mx-auto">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
              <FaArrowLeft className="text-sm sm:text-base lg:text-lg" />
              <span className="text-sm sm:text-base lg:text-lg font-medium">Back</span>
            </button>
          </div>

          {/* School Header Card */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
            {/* School Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white rounded-2xl p-2 flex-shrink-0 shadow-sm">
              <Image
                src="/Listing/Logo.png"
                alt={schoolName}
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>

            {/* School Information */}
            <div className="flex-1">
              {/* School Name */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[32px] font-poppins font-medium text-black mb-2 lg:mb-2 leading-tight">
                {schoolName}
              </h1>

              {/* Distance and Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-600 font-medium">2.3 Km Away</span>

                <span className="text-gray-400">|</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">({rating}.0)</span>
                </div>
              </div>

              {/* Add to Compare Button */}
              <button className="flex items-center gap-2 border border-[#10744E] text-[#10744E] px-4 py-2 rounded-full hover:bg-[#10744E] hover:text-white transition-colors duration-300 font-medium">
                <FaPlus className="w-4 h-4" />
                <span>Add to Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Main Content Section */}
      <section className="max-w-[1440px] w-full mx-auto bg-[#F7F1EE] px-4 sm:px-6 md:px-10 lg:px-14 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-[1440px] w-full mx-auto pt-4 sm:pt-6">
          {/* Top Bar with Contact Info and Register Button */}
          <div className="border border-[#257B5A] rounded-lg px-3 sm:px-4 md:px-6 lg:px-[26px] py-3 sm:py-4 lg:py-[25px] mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
              {/* School Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[#257B5A] text-sm sm:text-base" />
                  <span className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate">{location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaPhone className="text-[#257B5A] text-sm sm:text-base" />
                  <span className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700">{phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-[#257B5A] text-sm sm:text-base" />
                  <span className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate">{email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaGlobe className="text-[#257B5A] text-sm sm:text-base" />
                  <span className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate">{website}</span>
                </div>
              </div>

              {/* Register Button */}
              <button className="bg-[#257B5A] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full hover:bg-[#1e6b4a] transition-colors duration-300 font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap">
                📝 Register for Admission
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border rounded-lg mb-4 sm:mb-6 overflow-x-auto">
            <div className="flex border-b min-w-max sm:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-medium transition-colors duration-300 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#257B5A] text-[#257B5A] bg-green-50'
                      : 'border-transparent text-gray-600 hover:text-[#257B5A] hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Column - Tab Content */}
            <div className="w-full lg:w-[65%] min-w-0">
              {renderTabContent()}
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[35%] flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-0">
              {/* Nearby Schools - Horizontal Cards */}
              <div className="w-full bg-white border rounded-lg font-poppins pt-3 sm:pt-4 lg:pt-[25px] pb-3 sm:pb-4 lg:pb-[25px] px-3 sm:px-4 lg:px-6">
                <h2 className="font-semibold font-poppins text-[13px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-black mb-2 sm:mb-3 lg:mb-4">Nearby Schools</h2>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {[...Array(6)].map((_, i) => (
                    <HorizontalSchoolCard
                      key={i}
                      name="Sainik School, Pune"
                      image="/Listing/Logo.png"
                      location="Pune, Maharashtra – 411030"
                      distance="2.3 Km Away"
                      rating={4}
                    />
                  ))}
                </div>
              </div>

              {/* Review Section */}
              <div className="w-full bg-white border rounded-lg pt-3 sm:pt-4 lg:pt-[25px] pb-3 sm:pb-4 lg:pb-[25px] px-3 sm:px-4 lg:pl-[23px]">
                <h4 className="font-semibold font-poppins text-[13px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-black mb-2 sm:mb-3 lg:mb-4">Get More Reviews</h4>
                <button className="bg-[#d3e7dc] text-green-700 font-medium py-1.5 sm:py-2 px-2 sm:px-3 lg:px-4 rounded-full text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                  📩 Ask for Reviews
                </button>
              </div>

              {/* Embedded Map */}
              <div className="w-full bg-white rounded-lg border pt-3 sm:pt-4 lg:pt-[25px] pb-3 sm:pb-4 lg:pb-[25px] px-3 sm:px-4 lg:px-[23px]">
                <h4 className="font-medium font-poppins text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] text-black mb-2 sm:mb-3 lg:mb-4">Explore Location</h4>
                <iframe
                  title="School Location"
                  src="https://maps.google.com/maps?q=Sainik%20School,%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="120"
                  className="rounded-lg border sm:h-[150px] lg:h-[200px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}