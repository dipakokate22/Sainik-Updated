'use client';

import Image from 'next/image';
import { FaSchool, FaLanguage, FaThLarge, FaStar } from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import { FiArrowRight } from "react-icons/fi";

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

export default function SchoolDetailSection() {
  return (
    <section className="w-full bg-[#F7F1EE] pt-8 pb-16">
      {/* Top Bar Section */}
      <div className="w-full bg-[#DAEADD] pt-10 pb-14 px-2 sm:px-4 md:px-8 lg:px-[60px]  relative">
        <div className="w-full max-w-full mx-auto">
          
          {/* Back Button */}
          <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors mb-6">
            <span className="text-[18px]">←</span>
            <span className="text-[16px] font-medium">Back</span>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Section: Logo + School Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
              
              {/* School Logo */}
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-2xl bg-white shadow-lg flex items-center justify-center p-3 flex-shrink-0">
                <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden border-2 border-gray-100">
                  <Image
                    src="/Listing/Logo.png"
                    alt="School Logo"
                    width={110}
                    height={110}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* School Details */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-gray-900 font-poppins leading-tight mb-1">
                  Sainik School, Pune
                </h1>
                
                <p className="text-[16px] sm:text-[18px] font-medium text-[#8B5CF6] mb-2 flex items-center gap-1 justify-center sm:justify-start">
                  <span>📍</span>
                  Pune, Maharashtra - 411030
                </p>
                
                <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                  <span className="text-[15px] font-medium text-gray-600">2.3 Km Away</span>
                  <span className="text-gray-400">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] text-yellow-500">★★★★</span>
                    <span className="text-[16px] text-gray-300">★</span>
                    <span className="text-[14px] text-gray-600 ml-1">(4.0)</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="bg-[#257B5A] text-white px-3 py-1.5 rounded-full text-[12px] font-semibold">
                    CBSE
                  </span>
                  <span className="bg-[#257B5A] text-white px-3 py-1.5 rounded-full text-[12px] font-semibold">
                    English
                  </span>
                  <span className="bg-[#257B5A] text-white px-3 py-1.5 rounded-full text-[12px] font-semibold">
                    Co-ed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Register Button - Absolutely positioned in center */}
        <div className="absolute top-1/2 right-8 lg:right-[60px] transform -translate-y-1/2">
          <button className="w-[280px] h-[60px] bg-[#1F2937] hover:bg-[#374151] text-white text-[18px] font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Register
          </button>
        </div>
      </div>



      {/* Filter Tabs */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-full max-w-[1358px] flex flex-wrap gap-2 sm:gap-4 md:gap-8 text-sm font-medium text-[#257B5A] px-2 sm:px-4">

          {/* Active Tab */}
          <button className="bg-[#257B5A] text-white text-[16px] sm:text-[18px] md:text-[20px] font-semibold font-poppins px-4 sm:px-6 py-2 rounded-full">
            Overview
          </button>

          {/* Inactive Tabs */}
          <button className="pb-2 text-[16px] sm:text-[18px] md:text-[20px] font-medium font-poppins hover:text-black">Facilities</button>
          <button className="pb-2 text-[16px] sm:text-[18px] md:text-[20px] font-medium font-poppins hover:text-black">Fees</button>
          <button className="pb-2 text-[16px] sm:text-[18px] md:text-[20px] font-medium font-poppins hover:text-black">Gallery</button>
          <button className="pb-2 text-[16px] sm:text-[18px] md:text-[20px] font-medium font-poppins hover:text-black">Reviews</button>
          <button className="pb-2 text-[16px] sm:text-[18px] md:text-[20px] font-medium font-poppins hover:text-black">FAQ’s</button>
        </div>
      </div>


      {/* Main Content */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-full max-w-[1358px] flex flex-col lg:flex-row gap-8 px-2 sm:px-4">
          {/* Left Column */}
          <div className="w-full lg:w-[65%]">
            {/* Frame Name Section */}
            <div className="w-full h-auto bg-white border rounded-lg px-4 md:px-[54px] py-[25px] mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm text-black text-[18px] md:text-[20px]">
                {/* Ownership */}
                <div className="flex items-center gap-3 ">
                  <FaSchool className="text-xl " />
                  <span>
                    Ownership : <span className="text-[#257B5A] ">Private</span>
                  </span>
                </div>

                {/* Medium */}
                <div className="flex items-center gap-3">
                  <FaLanguage className="text-xl" />
                  <span>
                    Medium : <span className="text-[#257B5A]">English</span>
                  </span>
                </div>

                {/* Board */}
                <div className="flex items-center gap-3">
                  <PiCertificateFill className="text-xl" />
                  <span>
                    Board : <span className="text-[#257B5A]">CBSE</span>
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center gap-3">
                  <FaThLarge className="text-xl" />
                  <span>
                    Category : <span className="text-[#257B5A]">Co-ed</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6 bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-poppins font-semibold mb-2">🏫 Welcome to Sainik School, Pune</h4>
              <p className="text-[17px] font-regular font-poppins text-black">
                Established in 1961, Sainik School Pune is one of India’s premier military schools,
                committed to preparing young students for leadership roles in the Indian Armed
                Forces and beyond. The school operates under the Ministry of Defence and is part
                of a prestigious chain of Sainik Schools across the country.
              </p>
              <p className='text-[17px] font-regular font-poppins text-black'>With a legacy of excellence spanning over 60 years, the school has proudly
                produced more than 1,000 defense officers through rigorous academic training,
                disciplined routines, and character-building programs. Students receive a
                holistic education combining academics, military ethos, sports, and life skills
                that prepare them for both NDA and civilian success.</p>
            </div>

            {/* Key Highlights */}
            <div className="mb-6 bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-poppins font-semibold mb-2">🌟 Key Highlights</h4>
              <ul className="list-disc pl-6 text-[17px] font-regular font-poppins text-black space-y-1">
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
            <div className="mb-6 bg-white border rounded-lg  px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-semibold mb-2">Admission Criteria & Eligibility</h4>
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
            <div className="mb-6 bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-semibold mb-2">School Hours</h4>
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

          {/* Right Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 mt-8 lg:mt-0">
            {/* Nearby Schools - Horizontal Cards */}
            <div className="w-full bg-white border rounded-lg font-poppins pt-[25px] pb-[25px] px-4 md:px-6">
              <h2 className="text-[20px] sm:text-[22px] md:text-[24px] text-black font-poppins font-semibold mb-4">Nearby Schools</h2>
              <div className="flex flex-col gap-3">
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
            <div className="w-full bg-white border rounded-lg pt-[25px] pb-[25px] px-4 md:pl-[23px]">
              <h4 className="font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-black font-poppins mb-2">Get More Reviews</h4>
              <button className="bg-[#d3e7dc] text-green-700 font-medium py-2 px-4 rounded-md text-[16px] md:text-[20px]">
                📩 Ask for Reviews
              </button>
            </div>

            {/* Embedded Map */}
            <div className="w-full bg-white rounded-lg border pt-[25px] pb-[25px] px-4 md:pl-[23px] md:pr-[23px]">
              <h4 className="font-semibold font-poppins text-[20px] text-black sm:text-[22px] md:text-[24px] mb-2">Explore Location</h4>
              <iframe
                title="School Location"
                src="https://maps.google.com/maps?q=Sainik%20School,%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="200"
                className="rounded-lg border"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}