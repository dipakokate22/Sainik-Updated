import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const ProfilePage = () => {
  const sidebarHeight = "1547px";
  
  return (
    
    <div className={`flex bg-white font-['Poppins'] ${poppins.className}`}>
      <Sidebar height={sidebarHeight} activePage='Profile'/>

      {/* Main Content Area - Made scrollable with overflow-y-auto */}
      <main className="relative flex-grow h-[852px] bg-white overflow-y-auto">
        <Header />

        {/* Custom Scrollbar Image */}
        <div className="absolute top-[75px] left-[965px] w-[13px] h-[720px] rounded-[10px] bg-[#D8D5D5]">
            <Image
                src="/student_dashboard/scrollbar.png"
                alt="Scrollbar"
                layout="fill"
                className="rounded-[10px]"
            />
        </div>
        
        <div className="absolute top-[85px] left-[67.5px] w-[154px] h-[154px]">
          <Image src="/student_dashboard/profile-picture.jpg" alt="Krishna Kumar" width={154} height={154} className="rounded-full w-[135px] h-[135px] border-[3px] border-[#257B5A]" />
        </div>
        
        <h1 className="absolute top-[126px] left-[240px] text-[29px] font-medium text-[#101022]" style={{lineHeight: '27.3px'}}>Krishna Kumar</h1>
        <p className="absolute top-[162px] left-[242px] text-[14px] font-light text-black">Std. 12th</p>
        
        <div className="absolute top-[90px] right-[70px] w-[37px] h-[37px] bg-[#F0E5FD] rounded-[27px] flex items-center justify-center cursor-pointer">
          <div className="relative w-[17px] h-[17px]">
            <Image src="/student_dashboard/edit-btn.png" alt="Edit Profile" layout="fill" />
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="absolute top-[280px] left-[50px] right-[50px] border border-[#E0E0E0] rounded-[10px] mb-16">
          <div className="relative flex justify-between items-center p-4 h-[70px]">
            <h2 className="text-[18px] font-medium text-[#333]">Personal Information</h2>
            <div className="absolute top-[16px] right-[16px] w-[37px] h-[37px] bg-[#F0E5FD] rounded-[27px] flex items-center justify-center cursor-pointer">
              <div className="relative w-[17px] h-[17px]">
                <Image src="/student_dashboard/edit-btn.png" alt="Edit Information" layout="fill" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-[270px_auto] text-[14px]">
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Email Address</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">email@gmail.com</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Date of Birth</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">12-04-2025</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Country</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">India</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Contact</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">9887766543</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Street Address</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">123,dhfnjd</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">City</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">Mumbai</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">State</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">Maharashtra</div>
            
            <div className="p-4 border-t border-r border-[#E0E0E0] font-medium text-[#333]">Zip Code</div>
            <div className="p-4 border-t border-[#E0E0E0] text-[#666]">898293</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;