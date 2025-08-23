'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LayoutDashboard, LogOut, LogIn, UserPlus } from 'lucide-react';
import { getUserRole, logout, isAuthenticated } from '../../services/authServices';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const userRole = getUserRole();
  const isUserAuthenticated = isAuthenticated();

  // Close dropdown on outside click
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
    logout();
    setIsOpen(false);
    router.push('/login');
  };

  const getDashboardRoute = () => {
    return userRole === 'school' ? '/SchoolDashboard' : '/StudentDashboard';
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white md:bg-gray-200 rounded-full focus:outline-none mx-auto md:mx-0"
      >
        <User className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute top-[70px] right-0 w-56 bg-[#1C1F24] text-white rounded-xl shadow-xl p-2 z-50">
          <ul className="space-y-1 text-sm">
            {isUserAuthenticated ? (
              // Authenticated user options
              <>
                <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                  <Link href={getDashboardRoute()} onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <LayoutDashboard size={16} /> Dashboard
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
              </>
            ) : (
              // Unauthenticated user options
              <>
                <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <LogIn size={16} /> Sign In
                  </Link>
                </li>
                {/* <li className="hover:bg-[#257B5A] px-3 py-2 rounded-md transition">
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
