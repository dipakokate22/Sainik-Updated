// src/app/dashboard/layout.tsx

'use client';
import React, { useState } from 'react';
import Sidebar from '@/Components/Dashboard/SharedSchool/Sidebar';
import Header from '@/Components/Dashboard/SharedSchool/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open

  return (
    // The parent flex container
    <div className="flex h-screen overflow-hidden bg-brand-background">
      
      {/* The Sidebar component itself will now control its own width and visibility */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* The Header receives props to be able to toggle the sidebar state */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main>
          {/* A transition is added here for smoother resizing of the content padding */}
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 transition-all duration-300 ease-linear">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}