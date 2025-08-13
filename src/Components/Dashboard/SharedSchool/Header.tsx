'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileDropdown from '../../ProfileDropdown';
import clsx from 'clsx';
import {
  Menu,
  LayoutDashboard,
  UserIcon,
  GraduationCap,
  Receipt,
  BadgeDollarSign,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  { name: 'Profile', icon: UserIcon, href: '/SchoolDashboard/Profile' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: Receipt, href: '/SchoolDashboard/Subscription' },
  { name: 'Billing', icon: BadgeDollarSign, href: '/SchoolDashboard/Billing' },
];

const iconMap = {
  Dashboard: LayoutDashboard,
  Profile: UserIcon,
  'My School': GraduationCap,
  Subscription: Receipt,
  Billing: BadgeDollarSign,
};

const Header = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
          {/* Hamburger toggles dropdown on mobile */}
          <button
            aria-label="Toggle menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* You can add branding/logo here */}
          <div className="flex-grow" />

          <div className="flex items-center gap-4">
            <div className="flex items-center">
        <ProfileDropdown />
      </div>
          </div>
        </div>

        {/* Dropdown menu on mobile */}
        {dropdownOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = iconMap[item.name as keyof typeof iconMap];
                const isActive = item.href === '/SchoolDashboard'
                  ? pathname === '/SchoolDashboard'
                  : pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100',
                      isActive ? 'bg-blue-100 text-blue-700' : ''
                    )}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;