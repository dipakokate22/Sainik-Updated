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
    <section className="w-full bg-[#f9f4f2] py-8">
      {/* Top Bar Section */}
      <div className="w-full min-h-[220px] bg-[#DAEADD] flex justify-center items-start pt-5 px-2 sm:px-4 md:px-8 lg:px-[40px]">
        <div className="w-full max-w-[1358px] flex flex-col gap-6 relative">

          {/* Top Back Button - Absolute aligned top-left */}
          <div className="absolute top-[10px] left-0 flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <span className="text-[20px]">←</span>
            <span>Back</span>
          </div>

          {/* Spacer to push main content below the back button */}
          <div className="h-[40px]" />

          {/* Main Content Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

            {/* Left Section: Logo + Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
              {/* Logo Card */}
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-xl bg-[#D9D9D9] flex items-center justify-center p-4">
                <div className="w-[90px] h-[90px] sm:w-[133px] sm:h-[133px] rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src="/Listing/Logo.png"
                    alt="School Logo"
                    width={133}
                    height={133}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-poppins font-semibold text-black">
                  Sainik School, Pune
                </h2>
                <p className="text-[15px] sm:text-[16px] font-poppins font-regular text-[#9B85E9] mt-1">
                  Pune, Maharashtra – 411030
                </p>
                <p className="text-[15px] sm:text-[16px] font-poppins font-regular text-black mt-1 flex items-center gap-1 justify-center sm:justify-start">
                  2.3 Km Away |
                  <span className="text-[16px] text-[#257B5A]">★★★★☆</span>
                </p>

                {/* Badges */}
                <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                  <span className="bg-[#257B5A] font-poppins font-medium text-white px-3 py-1 rounded-full text-[12px]">
                    CBSE
                  </span>
                  <span className="bg-[#257B5A] font-poppins font-medium text-white px-3 py-1 rounded-full text-[12px]">
                    English
                  </span>
                  <span className="bg-[#257B5A] font-poppins font-medium text-white px-3 py-1 rounded-full text-[12px]">
                    Co-ed
                  </span>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full md:w-[265px] h-[50px] md:h-[65px] bg-[#1C1F24] text-white text-[18px] md:text-[20px] font-semibold rounded-full mt-4 md:mt-0">
              Register
            </button>
          </div>
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
            <div className="mb-6 bg-white border rounded-lg text-black font-poppins px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-semibold mb-2">Admission Criteria & Eligibility</h4>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class I</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class II</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class III</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class V</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VII</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class VIII</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class X</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class X</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class XI</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Class I - Class XII</span>
              </li>

            </div>

            {/* School Hours */}
            <div className="mb-6 bg-white border rounded-lg text-black font-poppins px-4 md:px-[26px] py-[25px]">
              <h4 className="text-[20px] text-black font-semibold mb-2">School Hours</h4>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Monday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Tuesday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Wednesday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Thursday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Friday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <FiArrowRight className="text-black mt-[3px]" />
                <span>Saturday : 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
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
              <h4 className="font-semibold font-poppins text-[20px] sm:text-[22px] md:text-[24px] mb-2">Explore Location</h4>
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