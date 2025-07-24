// src/components/dashboard/shared/Header.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, MessageSquare, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white shadow-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        
        {/* CHANGE: Replaced "Back to Website" with a hamburger menu for all screen sizes */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-3">
            <li>
                <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Messages">
                    <MessageSquare size={22} className="text-gray-600" />
                </button>
            </li>
            <li>
                <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Notifications">
                    <Bell size={22} className="text-gray-600" />
                </button>
            </li>
            <li>
                <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Settings">
                    <Settings size={22} className="text-gray-600" />
                </button>
            </li>
          </ul>
          
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
            <User size={20} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;