'use client';
import { FaSchool, FaLanguage, FaThLarge } from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import Image from 'next/image';
import { FiArrowRight } from "react-icons/fi";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';


export default function SchoolDetailSection() {
  return (
    <section className={`w-full bg-[#f9f4f2] py-8 `}>
      {/* Top Bar Section */}
      <div className="w-full h-[280px] bg-[#DAEADD] flex justify-center items-start pt-[20px] p-[40px]">
        <div className="w-[1358px] flex flex-col gap-6 relative">

          {/* Top Back Button - Absolute aligned top-left */}
          <div className="absolute top-[10px] left-0 flex items-center gap-2 text-sm text-gray-700">
            <span className="text-[20px]">←</span>
            <span>Back</span>
          </div>

          {/* Spacer to push main content below the back button */}
          <div className="h-[40px]" />

          {/* Main Content Row */}
          <div className="flex justify-between items-center">

            {/* Left Section: Logo + Details */}
            <div className="flex items-center gap-6">
              {/* Logo Card */}
              <div className="w-[160px] h-[160px] rounded-xl bg-[#D9D9D9] flex items-center justify-center pl-[20px] pr-[20px] pt-[20px]">
                <div className="w-[133px] h-[133px] rounded-full overflow-hidden border border-gray-300">
                  <img
                    src="/Listing/Logo.png"
                    alt="School Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h2 className="text-[32px] font-poppins font-semibold text-black">
                  Sainik School, Pune
                </h2>
                <p className="text-[16px] font-poppins font-regular text-[#9B85E9] mt-1">
                  Pune, Maharashtra – 411030
                </p>
                <p className="text-[16px] font-poppins font-regular text-black mt-1 flex items-center gap-1">
                  2.3 Km Away |
                  <span className="text-[16px] text-[#257B5A]">★★★★☆</span>
                </p>

                {/* Badges */}
                <div className="flex gap-2 mt-3">
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
            <button className="w-[265px] h-[65px] bg-[#1C1F24] text-white text-[20px] font-semibold rounded-full">
              Register
            </button>
          </div>
        </div>
      </div>



      {/* Filter Tabs */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-[1358px]  flex gap-8 text-sm font-medium text-[#257B5A]">

          {/* Active Tab */}
          <button className="bg-[#257B5A] text-white text-[20px] font-semibold font-poppins px-6 py-2 rounded-full">
            Overview
          </button>

          {/* Inactive Tabs */}
          <button className="pb-2 text-[20px] font-medium font-poppins hover:text-black">Facilities</button>
          <button className="pb-2 text-[20px] font-medium font-poppins hover:text-black">Fees</button>
          <button className="pb-2 text-[20px] font-medium font-poppins hover:text-black">Gallery</button>
          <button className="pb-2 text-[20px] font-medium font-poppins hover:text-black">Reviews</button>
          <button className="pb-2 text-[20px] font-medium font-poppins hover:text-black">FAQ’s</button>
        </div>
      </div>


      {/* Main Content */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-[1358px] flex gap-8">
          {/* Left Column */}
          <div className="w-[882px]">
            {/* Frame Name Section */}
            <div className="w-[882px] h-[134px] bg-white border  rounded-xl pr-[54px] pl-[54px] p-[25px] mb-6">

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm text-black text-[20px] ">
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
            <div className="mb-8 bg-white pr-[26px] pl-[26px] p-[25px]">
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
            <div className="mb-8 bg-white  pr-[26px] pl-[26px] p-[25px]">
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
            <div className="mb-8 bg-white text-black font-poppins pr-[26px] pl-[26px] p-[25px]">
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
            <div className="mb-8 bg-white text-black font-poppins  pr-[26px] pl-[26px] p-[25px]">
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
          <div className="w-[433px]  gap-5">


          <div className="w-[433px] bg-white font-poppins pt-[25px] pb-[25px]">
      <h2 className="text-[24px] text-black font-poppins font-semibold pl-[23px] mb-4">Nearby Schools</h2>

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-[432px] h-[109px] bg-white border-b border-gray-300 flex items-center justify-center"
        >
          <div className="w-[368px] h-[88px] flex items-center">
            {/* School Logo */}
            <div className="w-[98px] h-[88px] bg-[#D9D9D9] flex items-center justify-center pt-[8px] pl-[2px] pr-[2px] overflow-hidden">
              <Image
                src="/Listing/Logo.png"
                alt="Nearby School"
                width={88}
                height={88}
                className="object-contain w-full h-full"
              />
            </div>

            {/* School Info */}
            <div className="pl-4">
              <p className="text-[20px] text-black font-poppins font-semibold">Sainik School, Pune</p>
              <div className="flex items-center font-poppins text-[12px] text-[#9B85E9] mt-1">
                <FaMapMarkerAlt className="mr-1 text-[14px]" />
                <span>Pune, Maharashtra – 411030</span>
              </div>
              <div className="flex items-center font-poppins text-[14px] text-gray-600 mt-1">
                <span>2.3 Km Away</span>
                <span className="mx-2">|</span>
                <div className="flex text-green-500">
                  {[...Array(4)].map((_, i) => (
                    <AiFillStar key={i} className="text-sm" />
                  ))}
                  <AiFillStar className="text-sm text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>


            {/* Review Section */}
            <div className="w-[432px] bg-white  border shadow-sm pt-[25px] pb-[25px] pl-[23px] mt-4">
              <h4 className="font-semibold text-[24px] text-black font-poppins mb-2">Get More Reviews</h4>
              <button className="bg-[#d3e7dc] text-green-700 font-medium py-2 px-4 rounded-md text-[20px]">
                📩 Ask for Reviews
              </button>
            </div>

            {/* Embedded Map */}
            <div className="w-[432px] mt-4 bg-white rounded-xl border shadow-sm pt-[25px] pb-[25px] pl-[23px] pr-[23px]">
              <h4 className="font-semibold font-poppins text-[24px] mb-2">Explore Location</h4>
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