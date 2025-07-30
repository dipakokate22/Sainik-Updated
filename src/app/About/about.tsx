'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
 
const AboutUsSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Partner logos data
  const partners = [
    { name: 'Delhi Public School', logo: '/Trusted/army.png' },
    { name: 'Kendriya Vidyalaya', logo: '/Trusted/aurora.png' },
    { name: 'Army Public School', logo: '/Trusted/crystal.png' },
    { name: 'Rashtriya Military School', logo: '/Trusted/rashtriya.png' },
    { name: 'Sainik School', logo: '/Trusted/army.png' },
    { name: 'Naval Public School', logo: '/Trusted/aurora.png' },
    { name: 'Air Force School', logo: '/Trusted/crystal.png' },
    { name: 'Military School', logo: '/Trusted/rashtriya.png' },
    { name: 'Cadet College', logo: '/Trusted/army.png' },
    { name: 'Defence Academy', logo: '/Trusted/aurora.png' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very subtle title animation
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0.8, 
          y: 10 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle logo animations with minimal stagger
      logoRefs.current.forEach((logo, index) => {
        if (logo) {
          gsap.fromTo(logo,
            {
              opacity: 0.7,
              y: 5
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: logo,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Very subtle hover animation
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              scale: 1.02,
              y: -2,
              duration: 0.2,
              ease: "power2.out"
            });
          });

          logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full">
      {/* Breadcrumb + Content */}
      <div className="w-full px-4 sm:px-6 lg:px-0 max-w-[1135px] mx-auto pt-10">
        <p className="text-sm sm:text-base text-black font-light font-poppins">
          <Link href="/" className="text-[#10744E] hover:underline">Home</Link> / About Us
        </p>

        <h2 className="text-xl sm:text-2xl text-[#10744E] text-center font-medium font-poppins mt-4">
          About Us
        </h2>

        <h1 className="text-2xl sm:text-3xl md:text-4xl text-black text-center font-semibold font-poppins mt-2 leading-snug">
          Shaping minds. Building futures. <br className="hidden sm:block" /> Empowering generations.
        </h1>

        <div className="mt-6 space-y-4 text-justify sm:text-left">
          <p className="text-base sm:text-lg text-[#595858] font-light font-poppins">
            At School Dekho, we believe every child deserves a school where they can grow with discipline,
            courage, and a strong foundation for the future. We are India's first search engine dedicated to
            school admissions — including special focus on schools that prepare students for careers in the
            armed forces.
          </p>
          <p className="text-base sm:text-lg text-[#595858] font-light font-poppins">
            School Dekho started in 2021 with a clear mission — to help parents explore and choose the best
            schools from the comfort of their homes, without stress or confusion. We understand that finding
            the right Sainik or military-preparatory school can be challenging, especially for parents who want
            the best training and discipline for their children.
          </p>
          <p className="text-base sm:text-lg text-[#595858] font-light font-poppins">
            With School Dekho, you do more than just search — you experience. We offer 360° virtual tours and
            detailed insights into academics, hostels, sports, and training programs that build leadership and
            discipline.
          </p>
          <p className="text-base sm:text-lg text-[#595858] font-light font-poppins">
            School Dekho is not just a website — we are your partner in guiding your child toward a
            disciplined and successful future. Whether your dream is a career in the armed forces or building
            strength in character, we help you find the school that fits your child's goals.
          </p>
        </div>
      </div>

      {/* Modern Stats Section (No Animations) */}
      <div className="w-full mt-16 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-white">
            <Image
              src="/images/school-icon.png"
              alt="Listed Schools"
              width={64}
              height={64}
              className="mb-4"
            />
            <p className="text-2xl font-semibold text-[#10744E] font-poppins">14,434+</p>
            <p className="text-base text-gray-700 font-poppins mt-1">Listed Schools</p>
          </div>

          {/* Stat Card 2 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-white">
            <Image
              src="/images/parent-icon.png"
              alt="Parent Enquiries"
              width={64}
              height={64}
              className="mb-4"
            />
            <p className="text-2xl font-semibold text-[#10744E] font-poppins">14,434+</p>
            <p className="text-base text-gray-700 font-poppins mt-1">Parent Enquiries</p>
          </div>

          {/* Stat Card 3 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-white">
            <Image
              src="/images/counselling-icon.png"
              alt="Parents Counselled"
              width={64}
              height={64}
              className="mb-4"
            />
            <p className="text-2xl font-semibold text-[#10744E] font-poppins">14,434+</p>
            <p className="text-base text-gray-700 font-poppins mt-1">Parents Counselled</p>
          </div>
        </div>
      </div>

      {/* Associated Partners Section - Subtle Animations Only */}
      <section 
        className="w-full bg-[#F7F1EE] from-slate-50 to-blue-50 pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ marginTop: '80px', marginBottom: '80px' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-6"
              style={{ fontSize: '36px', fontFamily: 'Poppins, sans-serif' }}
            >
              Our Associated Partners
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                ref={(el) => {
                  logoRefs.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-100"
              >
                {/* Very subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                {/* Logo container */}
                <div className="relative z-10 flex items-center justify-center h-20 mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="max-w-full max-h-full object-contain filter group-hover:brightness-105 transition-all duration-200"
                  />
                </div>
                
                {/* Partner name */}
                <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-200">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>
    </section>
  );
};

export default AboutUsSection;
