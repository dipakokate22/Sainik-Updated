// src/Components/Dashboard/SharedSchool/Sidebar.tsx

'use client';

import React from 'react';
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
            Aurora International<br className="hidden sm:block" />Sainik School
          </span>
        </Link>
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