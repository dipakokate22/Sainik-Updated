'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CareerCounselling = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Services cards animation
      gsap.fromTo(".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const pathOptions = [
    {
      title: "Personality Assessment",
      description: "Understand your strengths, interests, and personality traits to find the perfect career match.",
      icon: "👤",
      buttonText: "Start Assessment"
    },
    {
      title: "Career Aptitude Test",
      description: "Evaluate your skills and abilities to identify suitable career paths and opportunities.",
      icon: "📊",
      buttonText: "Start Assessment"
    },
    {
      title: "Skills Analysis",
      description: "Get a comprehensive analysis of your current skills and areas for improvement.",
      icon: "🎯",
      buttonText: "Start Assessment"
    }
  ];

  const services = [
    {
      title: "One-on-One Counselling",
      description: "Personalized career guidance sessions with expert counsellors.",
      icon: "👥"
    },
    {
      title: "College Selection",
      description: "Expert guidance on choosing the right college and course for your career goals.",
      icon: "🏛️"
    },
    {
      title: "Course Guidance",
      description: "Comprehensive information about various courses and their career prospects.",
      icon: "📚"
    },
    {
      title: "Career Planning",
      description: "Strategic planning for your career path with actionable steps and milestones.",
      icon: "📈"
    },
    {
      title: "Study Abroad",
      description: "Complete guidance for international education opportunities and procedures.",
      icon: "🌍"
    },
    {
      title: "Skill Development",
      description: "Identify and develop essential skills required for your chosen career path.",
      icon: "🛠️"
    },
    {
      title: "Industry Connect",
      description: "Connect with industry professionals and gain insights into various career fields.",
      icon: "🤝"
    },
    {
      title: "Parent Counselling",
      description: "Guidance sessions for parents to support their child's career decisions.",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      image: "/Voices/John.png",
      story: "The career guidance helped me discover my passion for technology and guided me to the right engineering program."
    },
    {
      name: "Michael Chen",
      role: "Medical Student",
      image: "/Voices/John.png",
      story: "Thanks to the personality assessment, I realized medicine was my calling. Now I am pursuing my dream career."
    },
    {
      name: "Emily Davis",
      role: "Business Analyst",
      image: "/Voices/John.png",
      story: "The career counselling sessions helped me understand my strengths and choose the perfect business program."
    }
  ];


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-[#F5F1ED] py-16 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
                Shape Your Future with Expert Career Guidance
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover your potential and make informed career decisions with our expert guidance and comprehensive career planning services.
              </p>
              <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-6 hover:bg-green-800 transition">
                Get Free Consultation
              </button>
            </div>
            <div className="relative">
              <Image
                src="/Image/counselling.jpeg"
                alt="Career Guidance Session"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Path Section */}
      <section className="pb-16 pt-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Discover Your Path
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathOptions.map((option, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  {option.description}
                </p>
                <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-4 hover:bg-green-800 transition">
                  {option.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Career Guidance Services */}
      <section 
        ref={servicesRef}
        className="pb-16 pt-14 bg-[#F7F1EE]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Our Career Guidance Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section 
        ref={storiesRef}
        className="pb-14 pt-14 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Student Success Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-lg px-6 py-4 text-center">
                <Image
                  src={story.image}
                  alt={story.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {story.name}
                </h3>
                <p className="text-green-600 font-medium mb-4">{story.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Counselling Process */}
      <section 
        ref={resourcesRef}
        className="pb-16 pt-14 bg-[#F7F1EE]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Career Counselling Process
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 - Register & Assessment */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10744E] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">01</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Register & Assessment
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete initial assessment
              </p>
            </div>

            {/* Step 2 - Analysis Report */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10744E] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">02</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Analysis Report
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive detailed analysis
              </p>
            </div>

            {/* Step 3 - Counselling Session */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10744E] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">03</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Counselling Session
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                One-on-one guidance
              </p>
            </div>

            {/* Step 4 - Action Plan */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10744E] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">04</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Action Plan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Implementation strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Your Free Career Consultation */}
      <section 
        ref={ctaRef}
        className="pb-16 pt-14 bg-white mb-16"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Form */}
            <div className="bg-white">
              <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-8">
                Book Your Free Career Consultation
              </h2>
              
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-[#10744E] ml-50 text-white text-[16px] font-medium px-6 py-3 rounded-full mt-2 hover:bg-green-800 transition"
                >
                  Book Consultation
                </button>
              </form>
            </div>
            
            {/* Right Column - Benefits List */}
            <div className="bg-white">
              <h3 className="text-3xl md:text-[32px] font-poppins font-medium text-black mb-8">
                Why Choose Our Career Guidance?
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Expert career counsellors with industry experience</span>
                </li>
                
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Personalized career path recommendations</span>
                </li>
                
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Comprehensive assessment tools</span>
                </li>
                
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Regular follow-ups and progress tracking</span>
                </li>
                
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Access to industry insights and resources</span>
                </li>
                
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">Support for college applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerCounselling;