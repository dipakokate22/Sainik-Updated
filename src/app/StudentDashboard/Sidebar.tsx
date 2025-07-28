'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

// Define the props for the Sidebar component
interface SidebarProps {
  height: string;
  activePage: string;
}

const Sidebar = ({ height, activePage }: SidebarProps) => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/StudentDashboard/dashboard' },
    { name: 'Profile', href: '/StudentDashboard/profile' },
    { name: 'Applied Schools', href: '/StudentDashboard/applied-schools' },
    { name: 'Library', href: '/StudentDashboard/library' },
    { name: 'Entrance Exams', href: '/StudentDashboard/entrance-exams' },
    { name: 'Exam Results', href: '/StudentDashboard/exam-results' },
    { name: 'Payment History', href: '/StudentDashboard/payment-history' },
  ];

  const isActive = (href: string) => {
    return pathname === href || activePage === href.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`relative w-[270px] bg-[#257B5A] text-white flex-shrink-0 ${poppins.className}`} style={{ height }}>
      <Link href="/" className="absolute top-[17px] left-[31px] flex items-center cursor-pointer">
        <div className="relative w-[31px] h-[31px]">
          <div className="absolute top-[3.88px] left-[3.88px]">
            <Image 
              src="/images/Icon.png" 
              alt="Back Icon" 
              width={23.25} 
              height={23.25}
            />
          </div>
        </div>
        <p className="ml-2 text-[0.85rem] font-light">Back to Website</p>
      </Link>

      <div className="absolute top-[56px] w-[359px] border-t border-[#ACA9A9]"></div>

      <div className="absolute top-[101px] left-[31px]">
        <Image src="/images/sainik-logo.png" alt="Special Forces Logo" width={127} height={130} className="rounded-[5px]" />
      </div>

      <h1 className="absolute top-[248px] left-[32px] text-[1.125rem] font-medium">Hello, Dipali Kokate</h1>
      <p className="absolute top-[297px] left-[32px] text-[0.85rem] font-normal">Student ID : 2025</p>
      <p className="absolute top-[323px] left-[32px] text-[0.85rem] font-normal">Activation Date : 12-06-2025</p>

      <div className="absolute top-[366px] w-[270px] border-t border-[#979797]"></div>
      
      <div className="absolute top-[377.5px] w-full flex flex-col">
        <div className="flex flex-col space-y-1.25 text-[0.85rem] font-light">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`h-[30px] flex items-center pl-[32px] py-4 cursor-pointer transition-colors ${
                isActive(item.href)
                  ? 'bg-[#AA0111] shadow-inner_custom rounded-r-[15px]'
                  : 'hover:bg-[#2a8a63]'
              }`}
            >
              <p className={`text-[0.85rem] ${isActive(item.href) ? 'font-medium text-white' : ''}`}>{item.name}</p>
            </Link>
          ))}
        </div>

        <div className="w-full border-t border-[#979797] mt-3 mb-3"></div>

        <button className="flex items-center pl-[31px] cursor-pointer hover:bg-[#2a8a63] py-2 transition-colors">
          <Image src="/images/logout-icon.png" alt="Logout Icon" width={21} height={20} />
          <p className="ml-2 text-[0.85rem] font-light">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;