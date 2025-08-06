"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// --- Types ---
interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  { id: 1, category: 'Educational Tips', title: '5 Ways to Enhance Student Engagement', description: 'Engaging students through innovative teaching methods is essential for success.', author: { name: 'Jane Doe', avatarUrl: '/Voices/John.png' }, date: '15 Feb 2023', readTime: '4 min read', imageUrl: '/homePage/news.png' },
  { id: 2, category: 'School News', title: 'Top Strategies for Effective Classroom Management', description: 'Learn how to create a positive learning environment for all students.', author: { name: 'John Smith', avatarUrl: '/Voices/John.png' }, date: '10 Mar 2023', readTime: '6 min read', imageUrl: '/homePage/news.png' },
  { id: 3, category: 'Educational Tips', title: 'Innovative Tools for Modern Education', description: 'Explore the latest technology that enhances learning experiences for students.', author: { name: 'Alice Johnson', avatarUrl: '/Voices/John.png' }, date: '22 Apr 2023', readTime: '5 min read', imageUrl: '/homePage/news.png' },
  { id: 4, category: 'Parent Resources', title: 'The Importance of Parental Involvement', description: "Discover how parents can positively impact their children's education.", author: { name: 'Mark Lee', avatarUrl: '/Voices/John.png' }, date: '30 May 2023', readTime: '7 min read', imageUrl: '/homePage/news.png' },
  { id: 5, category: 'Student Life', title: 'Creative Approaches to Homework', description: 'Innovative homework strategies that foster student creativity and independence.', author: { name: 'Sara White', avatarUrl: '/Voices/John.png' }, date: '12 Jun 2023', readTime: '8 min read', imageUrl: '/homePage/news.png' },
  { id: 6, category: 'Educational Tips', title: 'Understanding Learning Styles in Education', description: 'Tailoring education to individual learning styles for better outcomes.', author: { name: 'Tom Brown', avatarUrl: '/Voices/John.png' }, date: '25 Jul 2023', readTime: '4 min read', imageUrl: '/homePage/news.png' },
];


const filterTabs = ['All', 'Educational Tips', 'School News', 'Parent Resources', 'Student Life'];

// --- BlogCard Component ---
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col w-full rounded-[5px]">
    <div className="relative w-full h-[200px] sm:h-[246px]">
      <Image src={post.imageUrl} alt={post.title} layout="fill" objectFit="cover" />
    </div>
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <p className="font-medium text-sm text-gray-500">{post.category}</p>
      <h3 className="mt-2 font-medium text-lg text-gray-800">{post.title}</h3>
      <p className="mt-3 text-sm text-gray-600 flex-grow">{post.description}</p>
      <div className="mt-4 flex items-center">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={post.author.avatarUrl} alt={post.author.name} layout="fill" objectFit="cover" />
        </div>
        <div className="ml-3">
          <p className="font-medium text-sm text-gray-900">{post.author.name}</p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={post.date}>{post.date}</time><span>·</span><span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
);

// --- Main Component ---
const VoicesAndViews = () => {
  const [activeTab, setActiveTab] = useState('All');
  const filteredPosts = activeTab === 'All' ? blogPosts : blogPosts.filter(post => post.category === activeTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTabIndex = filterTabs.indexOf(activeTab);
    const activeTabNode = tabRefs.current[activeTabIndex];
    if (activeTabNode) {
      setSliderStyle({ left: activeTabNode.offsetLeft, width: activeTabNode.offsetWidth });
    }
  }, [activeTab]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1440px] mx-auto px-14">
        {/* Header */}
        <div className="text-center">
           <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">Voices & Views</h2>
          <p className="text-gray-600 text-sm sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed">
            Explore inspiring vlogs and the latest news from our Sainik School community.
          </p>
        </div>

        {/* Filter Tabs */}
       <div className="mt-10 sm:mt-12 border border-black rounded-full overflow-x-auto scrollbar-hide">
  <div className="relative flex w-full justify-between py-3 px-4 min-w-max">

            <div
              className="absolute top-1/2 -translate-y-1/2 h-[40px] bg-emerald-700 rounded-full shadow transition-all duration-300 ease-in-out"
              style={sliderStyle}
            />
            {filterTabs.map((tab, index) => (
              <button
                key={tab}
                ref={el => { tabRefs.current[index] = el; return undefined; }}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 whitespace-nowrap flex-1 px-4 text-base sm:text-lg font-medium transition-colors duration-300 ${
                  activeTab === tab ? 'text-white' : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredPosts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>

        {/* CTA Button */}
        <div className="mt-4 sm:mt-4 text-center">
          {/* View All Button */}
<button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-6 hover:bg-green-800 transition">
  View all
</button>

        </div>
      </div>
    </section>
  );
};

export default VoicesAndViews;
