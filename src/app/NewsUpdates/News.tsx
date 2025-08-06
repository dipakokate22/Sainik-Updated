'use client';

import { FaSearch, FaEye, FaClock } from 'react-icons/fa';
import Image from 'next/image';

const newsData = [...Array(9)].map((_, i) => ({
  id: i,
  title: "Today's News Headlines in English for School Assembly, 26 April 2025",
  date: '25 Apr-2025, 02:29 PM',
  views: '1711 views',
  tagline: 'school assembly news headlines 25 april 2025',
  img: '/Image/img.jpg',
}));

const NewsAndBlogsSection = () => {
  return (
    <>
      <div className="w-full h-[230px]">
        <div className="max-w-[1440px] w-full h-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 flex flex-col justify-center">
          {/* Breadcrumb */}
          <p className="text-sm text-black/70">Home / Blog & News</p>

          {/* Title */}
          <h1 className="text-[24px] sm:text-[26px] md:text-[30px] lg:text-[32px] text-black font-medium mt-6">
            Sainik School Blogs
          </h1>

          {/* Search Box */}
          <div className="mt-4 w-full max-w-[637px] h-[57px] border border-black rounded-lg flex items-center px-4 gap-3">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search School"
              className="bg-transparent flex-1 text-sm text-black placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      <section className="max-w-[1440px] w-full mx-auto py-4 md:py-8 lg:py-12 font-poppins">
        {/* Cards Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="w-full bg-white border rounded-md shadow-sm overflow-hidden"
            >
              {/* Image */}
              <Image
                src={news.img}
                alt="News"
                width={400}
                height={178}
                className="w-full h-[178px] object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-4 flex flex-col justify-between h-[calc(100%-178px)]">
                <p className="text-base sm:text-[18px] text-black font-medium leading-snug">
                  {news.title}
                </p>

                {/* Date & Views */}
                <div className="flex items-center justify-between text-[#7E7E7E] text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-xs" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye className="text-xs" />
                    <span>{news.views}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-[#7E7E7E]">{news.tagline}</p>

                {/* Button */}
                <button className="text-[#10744E] mt-2 text-sm font-medium hover:underline flex items-center gap-1 group">
                  Read More 
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 group-hover:translate-x-1">
                    <path 
                      d="M9 18L15 12L9 6" 
                      stroke="#10744E" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewsAndBlogsSection;