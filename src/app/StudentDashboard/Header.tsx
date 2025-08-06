'use client';

import { Poppins } from 'next/font/google';
import ProfileDropdown from '../../Components/ProfileDropdown';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const Header = () => {
  return (
    <header
      className={`w-full bg-white py-4 px-4 flex justify-end items-center shadow-sm ${poppins.className}`}
    >
      {/* Right-aligned Profile Dropdown */}
      <div className="flex items-center">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;