'use client';

import { Poppins } from 'next/font/google';
import { FiMenu } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

interface HeaderProps {
  onMenuClick?: () => void; // Optional callback
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header
      className={`w-full bg-white py-4 px-4 flex items-center justify-between shadow-sm ${poppins.className}`}
    >
      {/* Left: Hamburger Icon */}
      <div className="text-3xl text-[#10744E] cursor-pointer md:hidden" onClick={onMenuClick}>
  <FiMenu />
</div>

      {/* Right: Notification & Settings Icons */}
      <div className="flex items-center gap-4 text-[#6C6B6B]">
        <IoIosNotificationsOutline size={26} className="cursor-pointer" />
        <IoMdSettings size={26} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;