// src/Components/Dashboard/SharedSchool/Sidebar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import {
  LayoutDashboard,
  GraduationCap,
  Receipt,
  BadgeDollarSign,
  ArrowLeft,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: Receipt, href: '/SchoolDashboard/Subscription' },
  { name: 'Billing', icon: BadgeDollarSign, href: '/SchoolDashboard/Billing' },
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
        'fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col overflow-y-auto transition-opacity duration-200 ease-in-out',
        {
          'opacity-100 pointer-events-auto': sidebarOpen,
          'opacity-0 pointer-events-none': !sidebarOpen,
        }
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold text-gray-800 hover:text-gray-900"
        >
          <ArrowLeft size={22} />
          <span className="xs:inline">Back to Website</span>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-4 lg:py-6.5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image width={55} height={55} src="/Listing/Logo.png" alt="Logo" />
          <span className="text-base sm:text-xl font-semibold text-gray-800 leading-tight">
            Aurora International<br className="hidden sm:block" />sainik school
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
                    'flex items-center gap-2 rounded-sm py-2 px-3 font-medium transition-colors duration-300 ease-in-out',
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500 shadow-sm'
                      : 'text-gray-600 hover:bg-active-menu'
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
    </aside>
  );
}
