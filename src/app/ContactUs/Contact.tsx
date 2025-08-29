'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { submitContactForm } from '../../../services/authServices';
import { getAllNews } from '../../../services/newsBlogServices';
import Link from 'next/link';

type NewsItem = {
  id?: string | number;
  title: string;
  featured_image?: string;
  published_date?: string;
  excerpt?: string;
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  
  // News data state
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Fetch news data on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const result = await getAllNews(1, 3); // Fetch first page with 3 items
        setNews(result.data || []);
        setNewsError(null);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsError('Failed to load news');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContactForm(formData);
      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully."
      });
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error sending your message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F1EE]">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-4 md:py-6 lg:py-6">
        <p className="text-sm text-black font-light font-poppins leading-[150%]">
          Home / Contact Us
        </p>
      </div>

      {/* Hero Section - Contained width matching navbar */}
      <div className="w-full bg-[#10744E] text-white py-10 md:py-14">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold font-poppins leading-[120%] mb-4">
            Get in Touch
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-white font-medium font-poppins leading-[150%] max-w-[700px]">
            Have questions about admissions, academics, or campus life? Reach out to us — we're here to guide you at every step toward a brighter, disciplined future.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Column - Contact Categories */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] text-black font-bold font-poppins leading-[150%] mb-6">
              How can we help you?
            </h2>

            <div className="space-y-6">
              {/* Contact Category Cards - Enhanced Visibility */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E6F3E9] rounded-full p-3 flex-shrink-0">
                    <Image 
                      src="/student_dashboard/ic_baseline-email.png"
                      alt="Email Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#10744E] mb-3">
                      Admissions
                    </h3>
                    <p className="text-[16px] text-gray-800 font-medium mb-3">For enrollment inquiries and admission processes</p>
                    <a href="mailto:admissions@sainikschool.edu" className="text-[#10744E] text-[16px] font-semibold hover:underline flex items-center">
                      <span className="underline-offset-2">admissions@sainikschool.edu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E6F3E9] rounded-full p-3 flex-shrink-0">
                    <Image 
                      src="/student_dashboard/ion_call.png"
                      alt="Phone Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#10744E] mb-3">
                      Academic Office
                    </h3>
                    <p className="text-[16px] text-gray-800 font-medium mb-3">For curriculum and educational queries</p>
                    <a href="tel:+919876543210" className="text-[#10744E] text-[16px] font-semibold hover:underline flex items-center">
                      <span className="underline-offset-2">+91 9876543210</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E6F3E9] rounded-full p-3 flex-shrink-0">
                    <Image 
                      src="/student_dashboard/carbon_location-filled.png"
                      alt="Location Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#10744E] mb-3">
                      Administration
                    </h3>
                    <p className="text-[16px] text-gray-800 font-medium mb-3">For general administrative matters</p>
                    <a href="mailto:admin@sainikschool.edu" className="text-[#10744E] text-[16px] font-semibold hover:underline flex items-center">
                      <span className="underline-offset-2">admin@sainikschool.edu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address - Enhanced Visibility */}
            <div className="mt-10">
              <h2 className="text-[24px] sm:text-[28px] text-black font-bold font-poppins leading-[150%] mb-4">
                Office Address
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#E6F3E9] rounded-full p-2 flex-shrink-0">
                      <Image 
                        src="/student_dashboard/carbon_location-filled.png" 
                        alt="Location Pin Icon" 
                        width={24} 
                        height={24}
                        className="flex-shrink-0"
                      />
                    </div>
                    <p className="text-[16px] text-gray-800 font-medium font-poppins leading-[150%]">
                      Ward No. 43, Near Bhatner Palace,<br/>
                      Hanumangarh Town,<br/>
                      Rajasthan, India
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#E6F3E9] rounded-full p-2 flex-shrink-0">
                      <Image 
                        src="/student_dashboard/ion_call.png" 
                        alt="Phone Icon" 
                        width={24} 
                        height={24}
                        className="flex-shrink-0"
                      />
                    </div>
                    <a href="tel:+919876543210" className="text-[16px] text-gray-800 font-medium font-poppins leading-[150%] hover:text-[#10744E]">
                      +91 9876543210
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#E6F3E9] rounded-full p-2 flex-shrink-0">
                      <Image 
                        src="/student_dashboard/ic_baseline-email.png" 
                        alt="Email Icon" 
                        width={24} 
                        height={24}
                        className="flex-shrink-0"
                      />
                    </div>
                    <a href="mailto:abc@gmail.com" className="text-[16px] text-gray-800 font-medium font-poppins leading-[150%] hover:text-[#10744E]">
                      abc@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.15)] rounded-lg p-6 md:p-10">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] text-black font-semibold font-poppins leading-[150%] mb-6">
                Send us a message
              </h2>

              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-[16px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name" 
                      required
                      className="w-full h-[55px] md:h-[60px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[15px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[16px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Email *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email" 
                      required
                      className="w-full h-[55px] md:h-[60px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[15px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"  
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="number" className="block text-[16px] text-black font-bold font-poppins leading-[150%] pl-2">
                    Contact Number *
                  </label>
                  <input 
                    type="tel" 
                    id="number" 
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Enter number" 
                    required
                    className="w-full h-[55px] md:h-[60px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[15px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[16px] text-black font-bold font-poppins leading-[150%] pl-2">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter message" 
                    required
                    className="w-full h-[140px] md:h-[179px] px-[18px] py-[21px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[15px] placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                  ></textarea>
                </div>

                <div className="flex justify-center md:justify-start mt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#10744E] text-white text-[16px] font-bold px-8 py-4 rounded-full hover:bg-green-800 transition disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Maps Section - Contained width matching navbar */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 my-8 md:my-14">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d55498.32435514462!2d74.24264222148555!3d29.613996548192834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWard%20No.%2043%2C%20Near%20Bhatner%20Palace%2C%20%20Hanumangarh%20Town%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1752924439125!5m2!1sen!2sin"
          height="500"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-lg shadow-md"
        ></iframe>
      </div>

      {/* News Section */}
      <div className="w-full py-10 md:py-14">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14">
          <div className="text-center mb-10">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] text-black font-semibold font-poppins leading-[130%]">
              Latest News & Updates
            </h2>
            <p className="text-[16px] text-gray-700 max-w-[700px] mx-auto mt-3">
              Stay informed about the latest happenings, events, and achievements at our institution
            </p>
          </div>

          {newsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10744E]"></div>
            </div>
          ) : newsError ? (
            <div className="text-center py-8 text-red-500">
              {newsError}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No news articles available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {news.map((item, index) => (
                <div key={item.id || index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-[200px] relative overflow-hidden">
                    <Image 
                      src={item.featured_image || "/student_dashboard/news-placeholder.jpg"} 
                      alt={item.title} 
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[14px] text-[#10744E] font-medium mb-2">{item.published_date || 'Recent'}</p>
                    <h3 className="text-[20px] font-bold mb-3 line-clamp-2 text-gray-800">{item.title}</h3>
                    <p className="text-[16px] text-gray-700 line-clamp-3 mb-4">{item.excerpt || 'Click to read more about this news article...'}</p>
                    <Link href={`/news/${item.id}`} className="inline-block mt-2 text-[#10744E] font-semibold hover:underline text-[16px] flex items-center">
                      Read More 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/NewsUpdates" className="inline-block bg-[#10744E] text-white text-[16px] font-bold px-6 py-3 rounded-full hover:bg-green-800 transition">
              View All News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;