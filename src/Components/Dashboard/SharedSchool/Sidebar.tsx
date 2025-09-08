// src/Components/Dashboard/SharedSchool/Sidebar.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  TrendingUp,
  IndianRupee,
  ArrowLeft,
  Mail,
  Phone,
} from 'lucide-react';

const menuItems = [
  // { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  // { name: 'Profile', icon: User, href: '/SchoolDashboard/Profile' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: TrendingUp, href: '/SchoolDashboard/Subscription' },
  // { name: 'Student Inquiry', icon: IndianRupee, href: '/SchoolDashboard/StudentInquiry' },
  // { name: 'Billing', icon: IndianRupee, href: '/SchoolDashboard/Billing' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname() || '';

  // State for user info
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    image: '',
  });

  useEffect(() => {
    function updateUserInfo() {
      const firstName = localStorage.getItem('firstName') || '';
      const lastName = localStorage.getItem('lastName') || '';
      const email = localStorage.getItem('email') || '';
      const mobile = localStorage.getItem('mobile') || '';
      const image = localStorage.getItem('image') || '';
      setUserInfo({
        firstName,
        lastName,
        email,
        mobile,
        image,
      });
    }

    if (typeof window !== 'undefined') {
      updateUserInfo();
      // Listen for localStorage changes (e.g., after login)
      window.addEventListener('storage', updateUserInfo);
      // Also listen for a custom event that we can trigger after login
      window.addEventListener('userInfoUpdated', updateUserInfo);
      return () => {
        window.removeEventListener('storage', updateUserInfo);
        window.removeEventListener('userInfoUpdated', updateUserInfo);
      };
    }
  }, []); // Remove sidebarOpen dependency to prevent unnecessary re-renders

  // Add a separate useEffect to update when component mounts or becomes visible
  useEffect(() => {
    if (sidebarOpen && typeof window !== 'undefined') {
      const firstName = localStorage.getItem('firstName') || '';
      const lastName = localStorage.getItem('lastName') || '';
      const email = localStorage.getItem('email') || '';
      const mobile = localStorage.getItem('mobile') || '';
      const image = localStorage.getItem('image') || '';
      setUserInfo({
        firstName,
        lastName,
        email,
        mobile,
        image,
      });
    }
  }, [sidebarOpen]);

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-full w-64 bg-[#257B5A] text-white shadow-lg z-50 flex flex-col overflow-y-auto font-poppins',
        {
          'opacity-100 pointer-events-auto': sidebarOpen,
          'opacity-0 pointer-events-none': !sidebarOpen,
        }
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center justify-start px-4 py-4 md:px-6 2xl:px-11">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={22} />
          <span className="xs:inline">Back to Website</span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-3 px-4 sm:px-6 py-4 lg:py-6.5">
        <div className="flex flex-col items-center gap-3 w-full">
          {userInfo.image ? (
            <img
              src={userInfo.image.replace(/^http:/, 'https:')}
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-white bg-[#e2e8f0] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#257B5A]">
                {(userInfo.firstName || userInfo.lastName)
                  ? (userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)).toUpperCase()
                  : 'A'}
              </span>
            </div>
          )}
          <span className="text-base sm:text-lg font-semibold text-white leading-tight text-center">
            {(userInfo.firstName || userInfo.lastName)
              ? `${userInfo.firstName} ${userInfo.lastName}`.trim()
              : 'Aurora International'}
          </span>
        </div>
      </div>

      {/* Improved user details card */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="bg-white/10 rounded-lg p-3 flex flex-col gap-2 shadow">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-white/80 flex-shrink-0" />
            <span className="text-xs text-white/80 truncate" title={userInfo.email}>
              {userInfo.email.length > 20 ? `${userInfo.email.substring(0, 20)}...` : userInfo.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-white/80 flex-shrink-0" />
            <span className="text-xs text-white/80 truncate" title={userInfo.mobile}>
              {userInfo.mobile.length > 15 ? `${userInfo.mobile.substring(0, 15)}...` : userInfo.mobile}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 sm:px-4 pb-4 overflow-y-auto">
        <ul className="flex flex-col gap-1 sm:gap-1.5">
          {menuItems.map((item) => {
            const isActive =
              item.href === '/SchoolDashboard/MySchool'
                ? pathname === '/SchoolDashboard/MySchool'
                : pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 py-2 px-4 rounded-r-[15px] font-medium transition-colors',
                    isActive
                      ? 'bg-[#AA0111] text-white shadow-inner_custom'
                      : 'text-white hover:bg-[#2a8a63]'
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* <div className="mt-auto border-t border-[#979797] pt-3 px-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#2a8a63] w-full text-left rounded transition-colors">
          <ArrowLeft size={20} />
          Logout
        </button>
      </div> */}
    </aside>
  );
}