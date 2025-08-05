import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const ProfilePage = () => {
  return (
    <div className={`relative bg-white min-h-screen ${poppins.className}`}>
      <Sidebar activePage="Profile" />

      <main className="flex flex-col min-h-screen md:ml-[270px] overflow-y-auto">
        <Header />

        <div className="relative flex flex-col items-center md:items-start px-2 md:px-8 py-6 max-w-screen-xl mx-auto w-full">
          {/* Profile Picture */}
          <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-6">
            <Image
              src="/student_dashboard/profile-picture.jpg"
              alt="Krishna Kumar"
              layout="fill"
              className="rounded-full border-[3px] border-[#257B5A] object-cover"
            />
          </div>

          {/* Name and Edit */}
          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <h1 className="text-[28px] md:text-[34px] font-medium text-[#101022]">Krishna Kumar</h1>
              <p className="text-[16px] text-black">Std. 12th</p>
            </div>

            <div className="mt-4 md:mt-0 w-[40px] h-[40px] bg-[#F0E5FD] rounded-full flex items-center justify-center cursor-pointer">
              <div className="relative w-[20px] h-[20px]">
                <Image src="/student_dashboard/edit-btn.png" alt="Edit Profile" layout="fill" />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mt-12 w-full border border-[#E0E0E0] rounded-[10px] overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-[#E0E0E0]">
              <h2 className="text-[20px] font-medium text-[#333]">Personal Information</h2>
              <div className="w-[40px] h-[40px] bg-[#F0E5FD] rounded-full flex items-center justify-center cursor-pointer">
                <div className="relative w-[20px] h-[20px]">
                  <Image src="/student_dashboard/edit-btn.png" alt="Edit Information" layout="fill" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-[15px]">
              {[
                { label: 'Email Address', value: 'email@gmail.com' },
                { label: 'Date of Birth', value: '12-04-2025' },
                { label: 'Country', value: 'India' },
                { label: 'Contact', value: '9887766543' },
                { label: 'Street Address', value: '123, dhfnjd' },
                { label: 'City', value: 'Mumbai' },
                { label: 'State', value: 'Maharashtra' },
                { label: 'Zip Code', value: '898293' },
              ].map(({ label, value }, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-5 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">{label}</div>
                  <div className="p-5 border-t border-[#E0E0E0] text-[#666]">{value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
