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
  { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  { name: 'Profile', icon: User, href: '/SchoolDashboard/Profile' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: TrendingUp, href: '/SchoolDashboard/Subscription' },
  { name: 'Billing', icon: IndianRupee, href: '/SchoolDashboard/Billing' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname() || '';

  // State for user info and school name
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    schoolName: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get user info
      const firstName = localStorage.getItem('firstName') || '';
      const lastName = localStorage.getItem('lastName') || '';
      const email = localStorage.getItem('email') || '';
      const mobile = localStorage.getItem('mobile') || '';
      // Get school info from login response (assume stored as 'school' in localStorage)
      let schoolName = '';
      try {
        const schoolStr = localStorage.getItem('school');
        if (schoolStr) {
          const schoolObj = JSON.parse(schoolStr);
          schoolName = schoolObj?.name || '';
        }
      } catch {}
      // If schoolName is not available, use firstName + lastName
      if (!schoolName) {
        schoolName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : '';
      }
      setUserInfo({
        firstName,
        lastName,
        email,
        mobile,
        schoolName,
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

      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-4 lg:py-6.5">
        <Link href="/SchoolDashboard" className="flex items-center gap-3">
          <Image width={55} height={55} src="/Listing/Logo.png" alt="Logo" className="rounded-md" />
          <span className="text-base sm:text-xl font-semibold text-white leading-tight">
            {userInfo.schoolName
              ? userInfo.schoolName
              : userInfo.firstName || userInfo.lastName
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : 'Aurora International'}
            <br className="hidden sm:block" />
            Sainik School
          </span>
        </Link>
      </div>

      {/* Improved user details card */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="bg-white/10 rounded-lg p-3 flex flex-col gap-2 shadow">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-white/80" />
            <span className="text-xs font-medium text-white/90">Email:</span>
            <span className="text-xs text-white/80 break-all">{userInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-white/80" />
            <span className="text-xs font-medium text-white/90">Mobile:</span>
            <span className="text-xs text-white/80">{userInfo.mobile}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 sm:px-4 pb-4 overflow-y-auto">
        <ul className="flex flex-col gap-1 sm:gap-1.5">
          {menuItems.map((item) => {
            const isActive =
              item.href === '/SchoolDashboard'
                ? pathname === '/SchoolDashboard'
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

      <div className="mt-auto border-t border-[#979797] pt-3 px-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#2a8a63] w-full text-left rounded transition-colors">
          <ArrowLeft size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}