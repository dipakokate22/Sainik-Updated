'use client';

import { Poppins } from 'next/font/google';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const Header = () => {
  return (
    <header
      className={`w-full bg-white py-4 px-4 flex justify-end items-center shadow-sm ${poppins.className}`}
    >
      {/* Right-aligned Notification & Settings Icons */}
      <div className="flex items-center gap-4 text-[#6C6B6B]">
        <IoIosNotificationsOutline size={26} className="cursor-pointer" />
        <IoMdSettings size={26} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
