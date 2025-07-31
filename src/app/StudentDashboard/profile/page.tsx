import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const ProfilePage = () => {
  return (
    <div className={`flex flex-col md:flex-row bg-white font-['Poppins'] ${poppins.className}`}>
      <Sidebar height="auto" activePage='Profile' />

      <main className="flex-grow h-screen overflow-y-auto">
        <Header />

        <div className="relative flex flex-col items-center md:items-start px-4 md:px-16 py-8">
          <div className="relative w-[135px] h-[135px] md:w-[154px] md:h-[154px] mb-4">
            <Image src="/student_dashboard/profile-picture.jpg" alt="Krishna Kumar" layout="fill" className="rounded-full border-[3px] border-[#257B5A] object-cover" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <h1 className="text-[24px] md:text-[29px] font-medium text-[#101022]">Krishna Kumar</h1>
              <p className="text-[14px] text-black">Std. 12th</p>
            </div>

            <div className="mt-4 md:mt-0 w-[37px] h-[37px] bg-[#F0E5FD] rounded-full flex items-center justify-center cursor-pointer">
              <div className="relative w-[17px] h-[17px]">
                <Image src="/student_dashboard/edit-btn.png" alt="Edit Profile" layout="fill" />
              </div>
            </div>
          </div>

          <div className="mt-10 w-full border border-[#E0E0E0] rounded-[10px] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[#E0E0E0]">
              <h2 className="text-[18px] font-medium text-[#333]">Personal Information</h2>
              <div className="w-[37px] h-[37px] bg-[#F0E5FD] rounded-full flex items-center justify-center cursor-pointer">
                <div className="relative w-[17px] h-[17px]">
                  <Image src="/student_dashboard/edit-btn.png" alt="Edit Information" layout="fill" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-[14px]">
              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Email Address</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">email@gmail.com</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Date of Birth</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">12-04-2025</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Country</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">India</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Contact</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">9887766543</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Street Address</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">123, dhfnjd</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">City</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">Mumbai</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">State</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">Maharashtra</div>

              <div className="p-4 border-t border-r md:border-r border-[#E0E0E0] font-medium text-[#333]">Zip Code</div>
              <div className="p-4 border-t border-[#E0E0E0] text-[#666]">898293</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
