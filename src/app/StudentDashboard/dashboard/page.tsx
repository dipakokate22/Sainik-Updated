'use client';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from '../Sidebar'; // Adjust the import path as needed
import Header from '../Header'; // Adjust the import path as needed

// Data for the exam result chart
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

interface NoticeItemProps {
    icon: string;
    bgColor: string;
    title: string;
    date: string;
}

const NoticeItem = ({ icon, bgColor, title, date }: NoticeItemProps) => (
    <div className="relative w-full h-[50px] mb-4">
        <div className="absolute top-0 left-0 w-[45px] h-[45px] rounded-full opacity-30" style={{ background: bgColor }}></div>
        <div className="absolute top-[14px] left-[13px] w-[19.875px] h-[18px]">
            <Image src={icon} alt={title} layout="fill" objectFit="contain" />
        </div>
        <div className="absolute top-[5px] left-[65px] w-[280px] h-[38px]">
            <p className="text-black text-base">{title}</p>
        </div>
        <div className="absolute top-[32.5px] left-[65px] w-[14px] h-[14px]">
            <div className="relative w-full h-full">
                <Image src="/student_dashboard/small-calendar.png" alt="calendar" layout="fill" objectFit="contain" />
            </div>
        </div>
        <p className="absolute top-[30px] left-[83px] w-[195px] h-[12px] text-[#4D4D4D] font-['Poppins'] text-[14px] leading-[150%]">
            {date}
        </p>
        <div className="absolute top-[11px] left-[815px] w-[24px] h-[24px]">
            <p className="absolute top-[6px] left-[8px] w-[7.4px] h-[12px] text-black">&gt;</p>
        </div>
    </div>
);

export default function DashboardPage() {
  const sidebarHeight = "1547px"; // Define the desired height

  return (
    // Super Main Div
    <div className="relative flex w-[1263.5px] bg-[#F7F1EE] font-['Poppins'] text-black" style={{ height: sidebarHeight }}>
      
      {/* 1. Sidebar div with dynamic height */}
      <Sidebar height={sidebarHeight} activePage='Dashboard'/>

      {/* 19. Main div */}
      <div className="relative w-[1080px] bg-[#F7F1EE]">
            <Header />
            <div className="absolute top-[56px] w-full border-t border-[#ACA9A9]"></div>

            {/* Scrollbar Image */}
            <div className="absolute top-[75px] left-[960px]">
                <Image src="/student_dashboard/dashboard_scrollbar.png" alt="Scrollbar" width={20} height={1529} className="rounded-[10px]" />
            </div>

            {/* 24. schedule-and-exam-result div */}
            <div className="absolute top-[76px] left-[30px] w-[875px] h-[425px] flex justify-between">
                
                {/* 25. Schedule div */}
                <div className="relative w-[450px] h-[500px] bg-white rounded-[5px] shadow-[0px_0px_17px_0px_#00000040]">
                    <div className="flex justify-between items-center p-3">
                        <h2 className="text-xl font-medium">Schedules</h2>
                        <div className="flex items-center space-x-1">
                            <Image src="/student_dashboard/add-btn.png" alt="Add" width={16} height={16} />
                            <p className="text-xs text-[#3077DA]">Add new</p>
                        </div>
                    </div>

                    {/* 29. calendar div */}
                    <div className="absolute top-[49px] left-[58px] w-[333px] h-[317px]">
                        <div className="flex justify-between items-center mb-4 px-4">
                            <span className="cursor-pointer text-2xl"></span>
                            <h3 className="font-semibold text-lg">May 2024</h3>
                            <span className="cursor-pointer text-2xl"></span>
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 text-center">
                            {/* CORRECTED KEY USAGE HERE */}
                            {days.map((day, index) => <div key={index} className="font-semibold text-sm">{day}</div>)}
                            {/* Empty divs for calendar alignment */}
                            {Array(1).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)} 
                            {dates.map(date => (
                                <div key={date} className={`p-1.5 cursor-pointer flex items-center justify-center ${date === 21 ? 'bg-blue-600 text-white rounded-full' : ''}`}>
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <h3 className="absolute top-[373px] left-[20px] text-xl font-medium">Exams</h3>
                    
                    <div className="absolute top-[404px] left-[18px] w-[414px] h-[88px] bg-gray-100 rounded-lg p-3">
                         <p className="absolute top-[11px] left-[14px] text-sm">First Quaterly</p>
                         <p className="absolute top-[41px] left-[14px] text-sm">Mathematics</p>
                        <div className="absolute top-[64px] left-[14px] flex items-center">
                            <Image src="/student_dashboard/clock.png" alt="clock" width={12} height={12} />
                            <p className="ml-1 text-[10px] text-[#545454]">1:30 PM - 3:30 PM</p>
                        </div>
                         <div className="absolute top-[16px] left-[274px] flex items-center">
                            <Image src="/student_dashboard/clock-red.png" alt="time remaining" width={10} height={10} />
                            <p className="ml-1 text-[10px] text-[#DB1F22]">20 Days More</p>
                         </div>
                         <div className="absolute top-[44px] left-[270px] flex items-center">
                            <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={16} height={16} />
                            <p className="ml-1 text-sm font-medium text-[#5E5E5E]">14 May 2024</p>
                         </div>
                    </div>
                </div>

                {/* 40. Exam Result div */}
                <div className="relative left-[20px] w-[450px] h-[500px] bg-white rounded-[5px] shadow-[0px_-1px_17px_0px_#00000040]">
                    <div className="p-3">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-medium">Exam Result</h2>
                            <div className="flex items-center space-x-2">
                                <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={20} height={20} />
                                <p className="text-sm text-[#636262]">1st Quarter</p>
                                <Image src="/student_dashboard/down-arrow.png" alt="dropdown" width={20} height={20} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full border-t border-[#E0E0E0] mt-1"></div>

                    {/* 45. Subject score div */}
                    <div className="absolute top-[78px] left-[14px] flex space-x-2 font-['Roboto'] text-xs font-medium">
                        <div className="w-[72px] h-[29px] rounded-[5px] bg-[#F0BEE0] flex justify-center items-center"><p className="text-[#CD02FF]">Math : 100</p></div>
                        <div className="w-[72px] h-[29px] rounded-[5px] bg-[#D0F0D2] flex justify-center items-center"><p className="text-[#4AF600]">Phy : 92</p></div>
                        <div className="w-[72px] h-[29px] rounded-[5px] bg-[#FEE8B6] flex justify-center items-center"><p className="text-[#FF7100]">Che : 90</p></div>
                        <div className="w-[72px] h-[29px] rounded-[5px] bg-[#D5E7FD] flex justify-center items-center"><p className="text-[#0030FC]">Eng : 82</p></div>
                        <div className="w-[72px] h-[29px] rounded-[5px] bg-[#F7CCD0] flex justify-center items-center"><p className="text-[#FA0040]">Sci : 90</p></div>
                    </div>

                    {/* 56. score bar chart */}
                    <div className="absolute top-[150px] left-[14px] w-[421px] h-[271px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={examData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#333' }} />
                                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fill: '#333' }}/>
                                <Bar dataKey="score" barSize={40}>
                                    {examData.map((entry, index) => (
                                         <Bar key={`bar-${index}`} dataKey="score" fill={index === 1 ? '#3469C7' : '#EAEAEA'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="absolute top-[444px] left-[167px] flex items-center font-['Roboto']">
                        <div className="w-[7px] h-[7px] bg-black rounded-full"></div>
                        <p className="ml-2 text-sm">Yearly Progress</p>
                    </div>
                </div>
            </div>

            {/* 59. Performance div */}
            <div className="absolute top-[596px] left-[30px] w-[898px] h-[488px] bg-white rounded-[5px] shadow-[inset_0px_2px_15px_0px_#00000040]">
                <div className="relative w-full h-full">
                    <h2 className="absolute top-[13px] left-[12px] text-xl font-medium">Performance</h2>
                     <div className="absolute top-[18px] left-[760px] flex items-center space-x-2">
                        <Image src="/student_dashboard/small-calendar.png" alt="calendar" width={20} height={20} />
                        <p className="text-sm">2024-2025</p>
                        <Image src="/student_dashboard/down-arrow.png" alt="dropdown" width={20} height={20} />
                    </div>
                    <div className="absolute top-[70px] left-[19px]">
                        <Image src="/student_dashboard/performance-bar.jpg" alt="Performance Chart" width={910} height={402} />
                    </div>
                </div>
            </div>
            
            {/* 65. notice board div */}
            <div className="absolute top-[1104px] left-[30px] w-[900px] h-[419px] bg-white rounded-[5px] shadow-[0px_2px_10px_0px_#00000040]">
                <div className="flex justify-between items-center p-3">
                    <h2 className="text-xl font-medium">Notice Board</h2>
                    <p className="text-base font-medium text-[#3F7ACD] cursor-pointer">View All</p>
                </div>
                <div className="w-full border-t border-[#ACA9A9]"></div>
                <div className="absolute top-[76px] left-[39px] w-[867px] h-[313px]">
                    <div className="flex flex-col space-y-4">
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