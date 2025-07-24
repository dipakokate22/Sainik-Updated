// src/components/dashboard/shared/Sidebar.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx'; // Import clsx
import { 
  LayoutDashboard, 
  GraduationCap, 
  Receipt,
  BadgeDollarSign, 
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'My School', icon: GraduationCap, href: '#' },
  { name: 'Subscription', icon: Receipt, href: '#' }, 
  { name: 'Billing', icon: BadgeDollarSign, href: '#' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    // CHANGE: Using clsx to conditionally apply classes for showing/hiding
    <aside
      className={clsx(
        "absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-sidebar-background border-r border-gray-200 duration-300 ease-linear lg:static lg:translate-x-0",
        {
          'w-[360px]': sidebarOpen,
          '-translate-x-full': !sidebarOpen, // On mobile, slide out
          'lg:w-0': !sidebarOpen, // On desktop, shrink width to 0
        }
      )}
    >
      {/* The entire content of the sidebar will be hidden when collapsed */}
      <div className={clsx("w-[360px] flex-shrink-0", { 'lg:hidden': !sidebarOpen })}>
          <div className="flex items-center justify-between px-6 py-5.5 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-3 text-lg font-bold text-gray-800 hover:text-gray-900">
                <ArrowLeft size={22} />
                <span>Back to Website</span>
            </Link>
          </div>

          <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <Link href="/dashboard" className="flex items-center gap-4">
              <Image width={55} height={55} src="/Listing/Logo.png" alt="Logo" />
              <span className="text-xl font-semibold text-gray-800">
                Aurora International<br />sainik school
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="block lg:hidden"
              aria-label="Close sidebar"
            >
              <ChevronLeft />
            </button>
          </div>

          <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
              <div>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-gray-600 duration-300 ease-in-out hover:bg-active-menu ${
                          item.name === 'Dashboard' && 'bg-active-menu text-gray-900 border-r-4 border-active-menu-border'
                        }`}
                      >
                        <item.icon size={20} />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;