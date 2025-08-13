'use client';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Calendar, Clock, Award, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Fixed exam end date (example: June 30, 2025)
const EXAM_END_DATE = new Date('2025-06-30');

// Student registration date (example: student registered on May 1st, 2025)
const registrationDate = new Date('2025-05-01');

// Calculate exam scheduling logic
const calculateExamSchedule = (regDate: Date, endDate: Date) => {
  const daysUntilEnd = Math.floor((endDate.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let attempts = [];
  let gapDays = 0;
  let possibleAttempts = 0;
  
  if (daysUntilEnd >= 45) {
    // If 45+ days available, use maximum 15-day gap
    gapDays = 15;
    possibleAttempts = 3;
  } else if (daysUntilEnd >= 3) {
    // Calculate gap to fit 3 attempts if possible
    gapDays = Math.floor(daysUntilEnd / 3);
    possibleAttempts = 3;
    
    // If gap would be less than 1 day, reduce attempts
    if (gapDays < 1) {
      if (daysUntilEnd >= 2) {
        gapDays = 1;
        possibleAttempts = Math.min(daysUntilEnd, 3);
      } else {
        gapDays = 1;
        possibleAttempts = daysUntilEnd;
      }
    }
  } else {
    // Very late registration
    gapDays = 1;
    possibleAttempts = Math.max(0, daysUntilEnd);
  }
  
  // Generate attempt dates
  for (let i = 1; i <= 3; i++) {
    const attemptDate = new Date(regDate);
    attemptDate.setDate(regDate.getDate() + (i * gapDays));
    
    let status = 'cancelled';
    let score = null;
    
    if (i <= possibleAttempts && attemptDate <= endDate) {
      if (attemptDate <= new Date()) {
        status = 'completed';
        score = Math.floor(Math.random() * 30) + 70; // Random score 70-100
      } else {
        status = 'upcoming';
      }
    }
    
    attempts.push({
      attempt: i,
      date: attemptDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      actualDate: attemptDate,
      time: '10:00 AM - 12:00 PM',
      subject: `Sainik School Entrance Exam - Attempt ${i}`,
      status,
      score,
      daysFromRegistration: i * gapDays,
      isValid: i <= possibleAttempts && attemptDate <= endDate
    });
  }
  
  return { attempts, gapDays, possibleAttempts, daysUntilEnd };
};

const examSchedule = calculateExamSchedule(registrationDate, EXAM_END_DATE);
const { attempts: examAttempts, gapDays, possibleAttempts, daysUntilEnd } = examSchedule;

// Chart data for exam results
const resultsData = examAttempts.map(exam => ({
  attempt: `Attempt ${exam.attempt}`,
  score: exam.score || 0,
  status: exam.status
}));

// Calendar functionality
const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const calendar = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendar.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }
  
  return calendar;
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DashboardPage() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const calendar = generateCalendar(currentYear, currentMonth);
  
  // Get exam dates for current month
  const getExamDatesForMonth = () => {
    return examAttempts
      .filter(exam => {
        const examDate = exam.actualDate;
        return examDate.getMonth() === currentMonth && examDate.getFullYear() === currentYear;
      })
      .map(exam => ({
        date: exam.actualDate.getDate(),
        attempt: exam.attempt,
        status: exam.status,
        score: exam.score
      }));
  };
  
  const examDatesInMonth = getExamDatesForMonth();
  
  // Check if a date has special significance
  const getDateInfo = (date: number) => {
    const currentDateObj = new Date(currentYear, currentMonth, date);
    const isRegistrationDate = 
      currentDateObj.getDate() === registrationDate.getDate() &&
      currentDateObj.getMonth() === registrationDate.getMonth() &&
      currentDateObj.getFullYear() === registrationDate.getFullYear();
    
    const isEndDate = 
      currentDateObj.getDate() === EXAM_END_DATE.getDate() &&
      currentDateObj.getMonth() === EXAM_END_DATE.getMonth() &&
      currentDateObj.getFullYear() === EXAM_END_DATE.getFullYear();
    
    const examInfo = examDatesInMonth.find(exam => exam.date === date);
    
    return {
      isRegistrationDate,
      isEndDate,
      examInfo,
      isToday: currentDateObj.toDateString() === new Date().toDateString()
    };
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    setSelectedDate(null);
  };
  
  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;
    const dateInfo = getDateInfo(selectedDate);
    const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
    const examForDate = examAttempts.find(exam => 
      exam.actualDate.toDateString() === selectedDateObj.toDateString()
    );
    
    return {
      date: selectedDateObj.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      exam: examForDate,
      ...dateInfo
    };
  };

  return (
    <div className="bg-[#F7F1EE] min-h-screen font-poppins text-black">
      <Sidebar activePage="Dashboard" />

      <div className="md:pl-[270px]">
        <Header />

        <div className="px-4 md:px-8 py-6 space-y-8">
          {/* Registration Info Alert */}
          {possibleAttempts < 3 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                <div>
                  <h3 className="font-semibold text-yellow-800">Late Registration Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    You registered {daysUntilEnd} days before the exam end date. 
                    Only {possibleAttempts} attempt(s) are available with {gapDays}-day intervals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Enhanced Exam Schedules with Interactive Calendar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Calendar className="mr-2 text-[#257B5A]" size={24} />
                Exam Schedules ({gapDays}-Day Intervals)
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Registration: {registrationDate.toLocaleDateString('en-GB')}</span>
                <span>End Date: {EXAM_END_DATE.toLocaleDateString('en-GB')}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Interactive Calendar */}
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h3 className="font-semibold text-gray-700">
                    {months[currentMonth]} {currentYear}
                  </h3>
                  <button 
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>
                
                {/* Days of week header */}
                <div className="grid grid-cols-7 text-center gap-1 text-sm mb-2">
                  {days.map((day, index) => (
                    <div key={index} className="font-medium text-gray-600 py-2">{day}</div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 text-center gap-1 text-sm">
                  {calendar.map((date, index) => {
                    if (date === null) {
                      return <div key={index} className="py-2"></div>;
                    }
                    
                    const dateInfo = getDateInfo(date);
                    const isSelected = selectedDate === date;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`py-2 px-1 rounded-lg transition-all duration-200 hover:scale-105 ${
                          isSelected
                            ? 'bg-gray-800 text-white shadow-lg'
                            : dateInfo.examInfo
                            ? dateInfo.examInfo.status === 'completed'
                              ? 'bg-green-500 text-white font-semibold shadow-md hover:bg-green-600'
                              : dateInfo.examInfo.status === 'upcoming'
                              ? 'bg-[#257B5A] text-white font-semibold shadow-md hover:bg-[#1e6b4a]'
                              : 'bg-red-500 text-white font-semibold shadow-md hover:bg-red-600'
                            : dateInfo.isRegistrationDate
                            ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
                            : dateInfo.isEndDate
                            ? 'bg-orange-500 text-white font-semibold hover:bg-orange-600'
                            : dateInfo.isToday
                            ? 'bg-gray-300 font-semibold hover:bg-gray-400'
                            : 'hover:bg-gray-200'
                        }`}
                        title={
                          dateInfo.examInfo
                            ? `Exam Attempt ${dateInfo.examInfo.attempt} - ${dateInfo.examInfo.status}`
                            : dateInfo.isRegistrationDate
                            ? 'Registration Date'
                            : dateInfo.isEndDate
                            ? 'Exam End Date'
                            : dateInfo.isToday
                            ? 'Today'
                            : ''
                        }
                      >
                        <div className="relative">
                          {date}
                          {dateInfo.examInfo && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Calendar Legend */}
                <div className="mt-4 text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Registration Date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Completed Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#257B5A] rounded-full"></div>
                    <span>Upcoming Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Cancelled Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>End Date</span>
                  </div>
                </div>
                
                {/* Selected Date Info */}
                {selectedDate && (
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-2">Selected Date</h4>
                    {(() => {
                      const info = getSelectedDateInfo();
                      if (!info) return null;
                      
                      return (
                        <div className="text-sm">
                          <p className="text-gray-600 mb-2">{info.date}</p>
                          {info.exam ? (
                            <div className="space-y-1">
                              <p className="font-medium text-gray-800">
                                Exam Attempt {info.exam.attempt}
                              </p>
                              <p className="text-gray-600">{info.exam.time}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                info.exam.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : info.exam.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {info.exam.status === 'completed' ? 'Completed' : 
                                 info.exam.status === 'upcoming' ? 'Upcoming' : 'Cancelled'}
                              </span>
                              {info.exam.score && (
                                <p className="font-bold text-lg text-gray-800 mt-1">
                                  Score: {info.exam.score}%
                                </p>
                              )}
                            </div>
                          ) : info.isRegistrationDate ? (
                            <p className="text-blue-600 font-medium">Registration Date</p>
                          ) : info.isEndDate ? (
                            <p className="text-orange-600 font-medium">Exam End Date</p>
                          ) : info.isToday ? (
                            <p className="text-gray-600 font-medium">Today</p>
                          ) : (
                            <p className="text-gray-500">No events scheduled</p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              
              {/* Exam Attempts List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-4">Exam Attempts Timeline</h3>
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 text-sm">Schedule Summary</h4>
                  <p className="text-blue-700 text-xs mt-1">
                    {daysUntilEnd} days available • {gapDays}-day intervals • {possibleAttempts}/3 attempts possible
                  </p>
                </div>
                {examAttempts.map((exam, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                    exam.status === 'completed' 
                      ? 'bg-[#257b5a] border-[#257b5a] hover:bg-[#1e6b4a] text-white' 
                      : exam.status === 'upcoming'
                      ? 'bg-[#257b5a] border-[#257b5a] hover:bg-[#1e6b4a] text-white'
                      : 'bg-[#257b5a] border-[#257b5a] hover:bg-[#1e6b4a] text-white'
                  }`}
                  onClick={() => {
                    const examDate = exam.actualDate;
                    setCurrentMonth(examDate.getMonth());
                    setCurrentYear(examDate.getFullYear());
                    setSelectedDate(examDate.getDate());
                  }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white">Attempt {exam.attempt}</h4>
                        <p className="text-gray-200">{exam.subject}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-200">
                          <Clock size={14} className="mr-1" />
                          {exam.time}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-200">
                          <Calendar size={14} className="mr-1" />
                          {exam.date}
                        </div>
                        <div className="mt-1 text-xs text-gray-100 font-medium">
                          Day {exam.daysFromRegistration} after registration
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exam.status === 'completed'
                            ? 'bg-white text-[#257b5a]'
                            : exam.status === 'upcoming'
                            ? 'bg-white text-[#257b5a]'
                            : 'bg-white text-[#257b5a]'
                        }`}>
                          {exam.status === 'completed' ? 'Completed' : 
                           exam.status === 'upcoming' ? 'Upcoming' : 'Cancelled'}
                        </span>
                        {exam.score && (
                          <div className="mt-2 text-lg font-bold text-white">
                            {exam.score}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Exam Results - All Attempts */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Award className="mr-2 text-[#257B5A]" size={24} />
                Exam Results - All Attempts
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Sainik School Entrance Exam</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Results Summary Cards */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-4">Attempt-wise Performance</h3>
                {examAttempts.map((exam, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">Attempt {exam.attempt}</h4>
                        <p className="text-gray-600">Day {exam.daysFromRegistration}</p>
                        <p className="text-sm text-gray-500">{exam.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          exam.status === 'completed' ? 'bg-green-100 text-green-700' :
                          exam.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {exam.status}
                        </span>
                      </div>
                      <div className="text-right">
                        {exam.score ? (
                          <div className={`text-2xl font-bold ${
                            exam.score >= 80 ? 'text-green-600' :
                            exam.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {exam.score}%
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">
                            {exam.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                          </div>
                        )}
                        <div className={`text-xs mt-1 ${
                          exam.score && exam.score >= 80 ? 'text-green-600' :
                          exam.score && exam.score >= 60 ? 'text-yellow-600' :
                          exam.score ? 'text-red-600' : 'text-gray-400'
                        }`}>
                          {exam.score && exam.score >= 80 ? 'Excellent' :
                           exam.score && exam.score >= 60 ? 'Good' :
                           exam.score ? 'Needs Improvement' :
                           exam.status === 'cancelled' ? 'Not Available' : 'Not Attempted'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Overall Performance */}
                <div className="bg-[#257B5A] text-white rounded-lg p-4 mt-4">
                  <h4 className="font-semibold mb-2">Overall Performance</h4>
                  <div className="flex justify-between items-center">
                    <span>Average Score:</span>
                    <span className="text-xl font-bold">
                      {examAttempts.filter(e => e.score).length > 0
                        ? Math.round(examAttempts.filter(e => e.score).reduce((acc, e) => acc + e.score!, 0) / examAttempts.filter(e => e.score).length)
                        : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Completed Attempts:</span>
                    <span className="font-semibold">
                      {examAttempts.filter(e => e.status === 'completed').length}/{possibleAttempts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Available Attempts:</span>
                    <span className="font-semibold">
                      {possibleAttempts}/3
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Results Chart */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Performance Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="attempt" tick={{ fill: '#333' }} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#333' }} />
                      <Bar 
                        dataKey="score" 
                        barSize={60} 
                        radius={[4, 4, 0, 0]} 
                      >
                        {resultsData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.status === 'cancelled' ? '#ef4444' : '#257B5A'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-2">
                  Performance across {gapDays}-day intervals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
