'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaEye, FaClock, FaUser } from 'react-icons/fa';
import { getNewsDetails } from '../../../../services/newsBlogServices';
import Navbar from '../../../Components/NavBar';
import Footer from '../../../Components/Footer';

type News = {
  featured_image?: string;
  title: string;
  published_date?: string;
  published_time?: string;
  views?: number;
  author?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
};

const NewsDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getNewsDetails(id);
        setNews(res.data);
      } catch (err) {
        setError('Failed to load news details.');
      }
      setLoading(false);
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!news) return <div className="text-center py-10">No news found.</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12 pt-32">
          <div>
            <Image
              src={news.featured_image || '/Image/img.jpg'}
              alt={news.title}
              width={1200}
              height={400}
              className="w-full h-[320px] sm:h-[400px] object-cover rounded-lg mb-8"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">{news.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm mb-6">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>
                  {news.published_date} {news.published_time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye />
                <span>{news.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{news.author}</span>
              </div>
              <span className="inline-block bg-[#10744E] text-white text-xs px-3 py-1 rounded-full">
                {news.category}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-6 text-center">{news.excerpt}</p>
            <div className="text-base text-gray-800 leading-relaxed mb-6" style={{ whiteSpace: 'pre-line' }}>
              {news.content}
            </div>
            {news.tags && (
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {news.tags.map((tag: string) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetailsPage;
