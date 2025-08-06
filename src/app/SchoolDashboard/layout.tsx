// src/app/dashboard/layout.tsx (or wherever your DashboardLayout is)

'use client';

import React, { useState } from 'react';
import Sidebar from '@/Components/Dashboard/SharedSchool/Sidebar';
import Header from '@/Components/Dashboard/SharedSchool/Header';
import { useIsDesktop } from '@/hooks/useIsDesktop';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktop();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-brand-background relative">
      {isDesktop && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div
        className={`flex flex-1 flex-col relative transition-margin duration-300 ease-in-out ${
          isDesktop && sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}