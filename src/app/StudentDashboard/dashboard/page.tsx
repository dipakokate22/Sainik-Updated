'use client';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from '../Sidebar';
import Header from '../Header';

const examData = [
  { name: 'Mat', score: 100 },
  { name: 'Phy', score: 92 },
  { name: 'Che', score: 90 },
  { name: 'Eng', score: 82 },
  { name: 'Sci', score: 90 },
];

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dates = Array.from({ length: 30 }, (_, i) => i + 1);

const noticeData = [
  {
    icon: '/student_dashboard/notice_list_icons/lightblue_book.png',
    bgColor: '#A9C9EB',
    title: 'New syllabus Instructions',
    date: 'Added on : 24th March 2024',
  },
  {
    icon: '/student_dashboard/notice_list_icons/green_building.png',
    bgColor: '#9EE6C3',
    title: 'World Environment Day Program!',
    date: 'Added on : 21th April 2024',
  },
  {
    icon: '/student_dashboard/notice_list_icons/darkblue_book.png',
    bgColor: '#A9C9EB',
    title: 'Exam Timetable Released',
    date: 'Added on : 22nd Oct 2024',
  },
  {
    icon: '/student_dashboard/notice_list_icons/orange_bell.png',
    bgColor: '#F2CF9F',
    title: 'Mid-term Holidays Timetable',
    date: 'Added on : 18th Sept 2024',
  },
  {
    icon: '/student_dashboard/notice_list_icons/red_timetable.png',
    bgColor: '#E5ADA3',
    title: 'Yearly Timetable',
    date: 'Added on : 12th April 2024',
  },
];

type NoticeItemProps = {
  icon: string;
  bgColor: string;
  title: string;
  date: string;
};

const NoticeItem = ({ icon, bgColor, title, date }: NoticeItemProps) => (
  <div className="relative w-full h-[60px] mb-4">
    <div className="absolute top-0 left-0 w-[45px] h-[45px] rounded-full opacity-30" style={{ background: bgColor }}></div>
    <div className="absolute top-[14px] left-[13px] w-[20px] h-[20px]">
      <Image src={icon} alt={title} layout="fill" objectFit="contain" />
    </div>
    <div className="absolute top-[5px] left-[65px] pr-4">
      <p className="text-black text-sm font-medium leading-tight">{title}</p>
    </div>
    <div className="absolute top-[32px] left-[65px] flex items-center text-xs text-[#4D4D4D]">
      <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={12} height={12} className="mr-1" />
      {date}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="bg-[#F7F1EE] min-h-screen font-poppins text-black">
      <Sidebar activePage="Dashboard" />

      <div className="md:pl-[270px]">
        <Header />

        <div className="px-4 md:px-8 py-6 space-y-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="bg-white rounded-md shadow-md p-4 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Schedules</h2>
                <div className="flex items-center space-x-1">
                  <Image src="/student_dashboard/add-btn.png" alt="Add" width={16} height={16} />
                  <p className="text-xs text-[#3077DA]">Add new</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-center">May 2024</h3>
                <div className="grid grid-cols-7 text-center gap-2 text-sm mt-2">
                  {days.map((day, index) => <div key={index}>{day}</div>)}
                  {Array(1).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                  {dates.map(date => (
                    <div key={date} className={`py-1 rounded-full ${date === 21 ? 'bg-blue-600 text-white' : ''}`}>{date}</div>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-medium">Exams</h3>
              <div className="bg-gray-100 rounded-md p-3 mt-2 text-sm space-y-1">
                <p>First Quarterly</p>
                <p>Mathematics</p>
                <p className="text-[#545454] text-xs flex items-center"><Image src="/student_dashboard/clock.png" width={12} height={12} alt="" className="mr-1" />1:30 PM - 3:30 PM</p>
                <p className="text-[#DB1F22] text-xs flex items-center"><Image src="/student_dashboard/clock-red.png" width={10} height={10} alt="" className="mr-1" />20 Days More</p>
                <p className="text-sm font-medium flex items-center text-[#5E5E5E]"><Image src="/student_dashboard/small-calendar.png" width={16} height={16} alt="" className="mr-1" />14 May 2024</p>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Exam Result</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={20} height={20} />
                  <span>1st Quarter</span>
                  <Image src="/student_dashboard/down-arrow.png" alt="dropdown" width={16} height={16} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <div className="px-2 py-1 bg-[#F0BEE0] text-[#CD02FF] rounded">Math : 100</div>
                <div className="px-2 py-1 bg-[#D0F0D2] text-[#4AF600] rounded">Phy : 92</div>
                <div className="px-2 py-1 bg-[#FEE8B6] text-[#FF7100] rounded">Che : 90</div>
                <div className="px-2 py-1 bg-[#D5E7FD] text-[#0030FC] rounded">Eng : 82</div>
                <div className="px-2 py-1 bg-[#F7CCD0] text-[#FA0040] rounded">Sci : 90</div>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#333' }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#333' }} />
                    <Bar dataKey="score" fill="#3469C7" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm mt-2 flex items-center justify-center"><span className="w-2 h-2 bg-black rounded-full mr-2"></span>Yearly Progress</p>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Performance</h2>
              <div className="flex items-center space-x-2 text-sm">
                <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={20} height={20} />
                <span>2024-2025</span>
                <Image src="/student_dashboard/down-arrow.png" alt="dropdown" width={20} height={20} />
              </div>
            </div>
            <Image src="/student_dashboard/performance-bar.jpg" alt="Performance Chart" width={910} height={402} className="w-full" />
          </div>

          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Notice Board</h2>
              <p className="text-base font-medium text-[#3F7ACD] cursor-pointer">View All</p>
            </div>
            <div className="border-t border-[#ACA9A9] mb-4" />
            <div className="space-y-4">
              {noticeData.map((item, index) => (
                <NoticeItem
                  key={index}
                  icon={item.icon}
                  bgColor={item.bgColor}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
