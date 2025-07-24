'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LayoutDashboard, LogOut } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
      >
        <User className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:right-0 sm:left-auto left-1/2 sm:translate-x-0 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <User size={16} /> Profile
          </Link>
          <Link href="/SchoolDashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;