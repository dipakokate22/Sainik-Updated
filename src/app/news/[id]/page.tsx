'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaEye, FaClock, FaUser } from 'react-icons/fa';
import { getNewsDetails } from '../../../../services/newsBlogServices';
import Navbar from '../../../Components/NavBar';
import Footer from '../../../Components/Footer';

import { submitContactForm } from '../../../../services/authServices';

import { getAllNews } from '../../../../services/newsBlogServices';

type News = {
  id?: string | number;
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

  // Related news state
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  // Contact form state
  const [contact, setContact] = useState({
    name: '',
    email: '',
    number: '', // Already using the correct field name
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState('');
  const [contactError, setContactError] = useState('');

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
    // Fetch related news
    const fetchRelated = async () => {
      setRelatedLoading(true);
      try {
        const res = await getAllNews(1, 5);
  setRelatedNews(res.data?.filter((n: News) => n.id !== id) || []);
      } catch {
        setRelatedNews([]);
      }
      setRelatedLoading(false);
    };
    fetchRelated();
  }, [id]);

  // Handle contact form input
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Handle contact form submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactSuccess('');
    setContactError('');
    try {
      const res = await submitContactForm(contact);
      if (res.success) {
        setContactSuccess('Contact saved successfully!');
        setContact({ name: '', email: '', number: '', message: '' });
      } else {
        setContactError(res.message || 'Failed to submit.');
      }
    } catch (err: any) {
      setContactError(err.message || 'Failed to submit.');
    }
    setContactLoading(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!news) return <div className="text-center py-10">No news found.</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-12 pt-32 flex flex-col md:flex-row gap-10">
          {/* Main News Content */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6 md:p-8">
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
          {/* Sidebar: Contact Form + Related News */}
          <div className="w-full md:w-1/3 max-w-md flex-shrink-0 flex flex-col gap-8">
            {/* Contact Form Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-[#10744E] text-center">Quick Contact</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[16px] text-gray-700 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={contact.name}
                    onChange={handleContactChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10744E] text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[16px] text-gray-700 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={contact.email}
                    onChange={handleContactChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10744E] text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="number" className="block text-[16px] text-gray-700 font-medium">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    value={contact.number}
                    onChange={handleContactChange}
                    placeholder="Enter your number"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10744E] text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[16px] text-gray-700 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={contact.message}
                    onChange={handleContactChange}
                    placeholder="Enter your message"
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10744E] text-gray-800 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full bg-[#10744E] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0e5c3c] transition"
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </button>
                
                {contactSuccess && (
                  <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                    {contactSuccess}
                  </div>
                )}
                {contactError && (
                  <div className="mt-3 p-3 bg-red-100 text-red-800 rounded-lg text-center">
                    {contactError}
                  </div>
                )}
              </form>
            </div>
            
            {/* Related News Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-[#10744E] text-center">Related News</h2>
              {relatedLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : relatedNews.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No related news found.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {relatedNews.map((item) => (
                    <div key={item.title} className="flex gap-3 items-center bg-gray-100 rounded p-3 hover:shadow transition">
                      <Image
                        src={item.featured_image || '/Image/img.jpg'}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded object-cover w-[60px] h-[60px]"
                      />
                      <div className="flex-1">
                        <a href={`/news/${item.id}`} className="font-semibold text-gray-800 hover:text-[#10744E] text-sm line-clamp-2">
                          {item.title}
                        </a>
                        <div className="text-xs text-gray-500 mt-1">{item.published_date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetailsPage;
