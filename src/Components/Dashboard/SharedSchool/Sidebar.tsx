// src/components/dashboard/shared/Sidebar.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
  { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: Receipt, href: '/SchoolDashboard/Subscription' }, 
  { name: 'Billing', icon: BadgeDollarSign, href: '/SchoolDashboard/Billing' },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

// Utility to detect if running in browser
const isBrowser = typeof window !== 'undefined';

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname() || '';
  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={clsx(
          // Responsive width and positioning
          "z-50 flex h-full flex-col overflow-y-hidden bg-white shadow-lg border-r border-gray-200 duration-300 ease-linear transition-all lg:static lg:w-64 lg:max-w-xs",
          {
            'fixed left-0 top-0 w-full max-w-full': !isBrowser || (isBrowser && window.innerWidth < 1024), // Only fixed and full width on mobile
            'lg:translate-x-0': true, // Always visible on desktop
            'w-full': sidebarOpen && (!isBrowser || (isBrowser && window.innerWidth < 1024)), // Full width on mobile when open
            '-translate-x-full': !sidebarOpen && (!isBrowser || (isBrowser && window.innerWidth < 1024)), // Slide out on mobile when closed
          }
        )}
      >
        {/* Sidebar content */}
        <div className="w-full lg:w-64 flex-shrink-0 h-full">
            <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-800 hover:text-gray-900">
                  <ArrowLeft size={20} className="sm:hidden" />
                  <ArrowLeft size={22} className="hidden sm:inline" />
                  <span className="hidden xs:inline">Back to Website</span>
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-4 sm:py-5.5 lg:py-6.5">
              <Link href="/dashboard" className="flex items-center gap-3 sm:gap-4">
                <Image width={44} height={44} className="sm:hidden" src="/Listing/Logo.png" alt="Logo" />
                <Image width={55} height={55} className="hidden sm:block" src="/Listing/Logo.png" alt="Logo" />
                <span className="text-base sm:text-xl font-semibold text-gray-800 leading-tight">
                  Aurora International<br className="hidden sm:block" />sainik school
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

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear h-full">
              <nav className="mt-3 sm:mt-5 py-2 sm:py-4 px-2 sm:px-4 lg:mt-9 lg:px-6">
                <div>
                  <ul className="mb-4 sm:mb-6 flex flex-col gap-1 sm:gap-1.5">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={clsx(
                              'group relative flex items-center gap-2 sm:gap-2.5 rounded-sm py-2 sm:py-3 px-3 sm:px-4 font-medium duration-300 ease-in-out',
                              isActive
                                ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500 shadow-sm'
                                : 'text-gray-600 hover:bg-active-menu'
                            )}
                            onClick={() => {
                              if (isBrowser && window.innerWidth < 1024) {
                                setSidebarOpen(false);
                              }
                            }}
                          >
                            <item.icon size={18} className="sm:hidden" />
                            <item.icon size={20} className="hidden sm:inline" />
                            <span className="text-sm sm:text-base">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;