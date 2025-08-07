'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  Menu,
  MessageSquare,
  Bell,
  Settings,
  User,
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  IndianRupee,
  LogOut
} from 'lucide-react';

const quickActions = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/SchoolDashboard' },
  { name: 'My School', icon: GraduationCap, href: '/SchoolDashboard/MySchool' },
  { name: 'Subscription', icon: TrendingUp, href: '/SchoolDashboard/Subscription' },
  { name: 'Billing', icon: IndianRupee, href: '/SchoolDashboard/Billing' },
];

const iconMap = {
  Dashboard: LayoutDashboard,
  'My School': GraduationCap,
  Subscription: TrendingUp,
  Billing: IndianRupee,
};

const Header = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-poppins">
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
            
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors"
              >
                <User size={20} className="text-gray-600" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute top-15 right-0 w-56 bg-[#ffffff] text-[#000000] rounded-xl shadow-xl p-2 z-50">
                  <ul className="space-y-1 text-sm font-medium">
                    <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                      <Link href="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3">
                        <User size={16} /> Profile
                      </Link>
                    </li>
                    <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                      <Link href="/SchoolDashboard" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    </li>
                    <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                      <Link href="/StudentDashboard" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3">
                        <LayoutDashboard size={16} /> Student Dashboard
                      </Link>
                    </li>
                    <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown menu on mobile */}
        {dropdownOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4">
            <ul className="flex flex-col gap-2">
              {quickActions.map((item) => {
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
