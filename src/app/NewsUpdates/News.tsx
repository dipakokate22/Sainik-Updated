'use client';

import { useEffect, useState } from 'react';
import { FaSearch, FaEye, FaClock } from 'react-icons/fa';
import Image from 'next/image';
import { getAllNews, searchNews } from '../../../services/newsBlogServices';
import { useRouter } from 'next/navigation';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  featured_image?: string;
  published_at?: string;
  views?: number;
  excerpt?: string;
  content?: string;
};

type Pagination = {
  current_page: number;
  last_page: number;
};

const NewsAndBlogsSection = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on new search
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        let res;
        if (debouncedSearch.trim()) {
          // Use searchNews API if search term is present
          res = await searchNews({
            title: debouncedSearch,
            content: '',
            category: '',
            date_from: '',
            date_to: '',
            page,
            per_page: 10
          });
        } else {
          // Otherwise, use getAllNews
          res = await getAllNews(page, 10);
        }
        setNewsData(res.data || []);
        setPagination(res.pagination);
      } catch (err) {
        setError('Failed to load news.');
      }
      setLoading(false);
    };
    fetchNews();
  }, [page, debouncedSearch]);

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
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <section className="max-w-[1440px] w-full mx-auto py-4 md:py-8 lg:py-12 font-poppins">
        {/* Cards Section */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="w-full bg-white border rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => router.push(`/news/${news.id}`)}
              >
                {/* Image */}
                <Image
                  src={news.featured_image || '/Image/img.jpg'}
                  alt={news.title}
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
                      <span>
                        {news.published_at
                          ? new Date(news.published_at).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEye className="text-xs" />
                      <span>{news.views} views</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-[#7E7E7E]">{news.excerpt || news.content}</p>

                  {/* Button */}
                  <button
                    className="text-[#10744E] mt-2 text-sm font-medium hover:underline flex items-center gap-1 group"
                    onClick={e => {
                      e.stopPropagation();
                      router.push(`/news/${news.id}`);
                    }}
                  >
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
        )}
        {/* Pagination */}
        {pagination && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              disabled={page >= pagination.last_page}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default NewsAndBlogsSection;