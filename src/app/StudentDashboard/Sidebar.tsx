// Sidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Poppins } from 'next/font/google';
import {
  ChevronLeft,
  LogOut,
  User,
  School,
  Library,
  FileText,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

interface SidebarProps {
  activePage: string;
}

const Sidebar = ({ activePage }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Student info from localStorage
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    studentId: '',
    signupDate: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('firstName') || '';
      const studentId = localStorage.getItem('studentId') || '';
      let signupDate = localStorage.getItem('signupDate') || '';
      // Format signupDate to DD-MM-YYYY if present
      if (signupDate) {
        try {
          const d = new Date(signupDate);
          if (!isNaN(d.getTime())) {
            signupDate = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getFullYear()}`;
          }
        } catch {}
      }
      setStudentInfo({
        name,
        studentId,
        signupDate,
      });
    }
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/StudentDashboard/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Profile', href: '/StudentDashboard/profile', icon: <User size={18} /> },
    { name: 'Applied Schools', href: '/StudentDashboard/applied-schools', icon: <School size={18} /> },
    { name: 'Library', href: '/StudentDashboard/library', icon: <Library size={18} /> },
    { name: 'Entrance Exams', href: '/StudentDashboard/entrance-exams', icon: <FileText size={18} /> },
    { name: 'Exam Results', href: '/StudentDashboard/exam-results', icon: <ClipboardList size={18} /> },
    { name: 'Payment History', href: '/StudentDashboard/payment-history', icon: <CreditCard size={18} /> },
  ];

  const isActive = (href: string) =>
    pathname === href || activePage.toLowerCase().replace(' ', '-') === href.split('/').pop();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#257B5A] p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="text-white" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50
          transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          w-[270px] bg-[#257B5A] text-white flex flex-col p-6 space-y-4 min-h-screen overflow-y-auto
          ${poppins.className}
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <Link href="/" className="flex items-center gap-2 text-sm hover:underline">
          <ChevronLeft size={24} />
          <span>Back to Website</span>
        </Link>
        <div className="flex justify-center py-4">
          <img src="/Image/Sainik-logo.jpg" alt="Logo" className="w-[127px] h-[130px] rounded-[5px]" />
        </div>
        <div className="text-sm space-y-1">
          <h2 className="font-medium text-lg">
            Hello, {studentInfo.name ? studentInfo.name : 'Krishna Kumar'}
          </h2>
          <p>
            Student ID: {studentInfo.studentId ? studentInfo.studentId : 'SK2025001'}
          </p>
          <p>
            Signup Date: {studentInfo.signupDate ? studentInfo.signupDate : '12-06-2025'}
          </p>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 py-2 px-4 rounded-r-[15px] transition-colors ${
                isActive(item.href)
                  ? 'bg-[#AA0111] font-medium text-white shadow-inner_custom'
                  : 'hover:bg-[#2a8a63]'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-[#979797] pt-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#2a8a63] w-full text-left">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
