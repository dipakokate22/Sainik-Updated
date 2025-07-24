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
<div className="w-full h-[246px] bg-[#DFEEDF] mt-8">
      <div className="max-w-[1277px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Breadcrumb */}
        <p className="text-sm text-black/70">Home / Blog & News</p>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl text-black font-semibold mt-2">
          Sainik School Blogs
        </h1>

        {/* Search Box */}
        <div className="mt-6 w-full max-w-[637px] h-[57px] bg-[#D5D5D5] rounded-lg flex items-center px-4 gap-3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search School"
            className="bg-transparent flex-1 text-sm text-black placeholder:text-gray-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
    <section className="w-full px-4 py-8 font-poppins">
  {/* Cards Section */}
  <div className="max-w-[1277px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
          <button className="w-fit px-4 py-1 text-center border border-[#10744E] text-[#10744E] text-sm rounded-sm hover:bg-[#f5f5f5] transition">
            Read More →
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