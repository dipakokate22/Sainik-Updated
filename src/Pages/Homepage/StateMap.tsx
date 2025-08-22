'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getSectionThree } from '../../../services/homeServices';
import { useRouter } from 'next/navigation';

const NationwideFootprint = () => {
  interface School {
    name: string;
    profileImage: string;
    id: string;
  }
  
  interface StateData {
    state: string;
    schools: School[];
  }
  
  const [activeState, setActiveState] = useState<number | null>(null);
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSectionThree()
      .then(res => setStatesData(res.data))
      .catch(() => setStatesData([]));
  }, []);

  useEffect(() => {
    const list = scrollRef.current;
    if (!list || statesData.length === 0) return;

    const items = list.children;
    const totalHeight = list.scrollHeight;

    Array.from(items).forEach((item) => {
      list.appendChild(item.cloneNode(true));
    });

    tl.current = gsap.timeline({ repeat: -1 });
    tl.current.to(list, {
      y: `-${totalHeight}px`,
      duration: statesData.length * 5,
      ease: 'none',
    });

    const handleMouseEnter = () => tl.current?.pause();
    const handleMouseLeave = () => tl.current?.play();

    list.addEventListener('mouseenter', handleMouseEnter);
    list.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      list.removeEventListener('mouseenter', handleMouseEnter);
      list.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [statesData]);

  return (
    <section className="w-full bg-[#1C1F24] px-14 pt-16 pb-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row gap-12 items-start">
        {/* Left Column - Scrollable Cards */}
        <div className="w-full lg:w-1/2 relative h-[550px] sm:h-[600px] overflow-hidden">
          <div ref={scrollRef} className="space-y-4 will-change-transform">
            {statesData.map((state, idx) => {
              const isActive = activeState === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden w-full max-w-[600px] mx-auto"
                >
                  <div
                    className="flex items-center justify-between px-4 sm:px-6 py-4 cursor-pointer"
                    onClick={() => setActiveState(isActive ? null : idx)}
                  >
                    <h3
                      className={`font-poppins text-black transition-all duration-300 ${
                        isActive ? 'text-[28px] sm:text-[32px]' : 'text-[20px] sm:text-[24px]'
                      }`}
                    >
                      {state.state}
                    </h3>
                    <Image
                      src="/homePage/maharashtra.png"
                      alt={state.state}
                      width={isActive ? 64 : 40}
                      height={isActive ? 64 : 40}
                      className="object-contain transition-all duration-300"
                    />
                  </div>

                  {isActive && state.schools.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 pb-6">
                      {state.schools.map((school, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-[#1C1C1C] text-white rounded-xl shadow-lg flex items-center px-4 py-3 cursor-pointer"
                          onClick={() => router.push(`/SchoolDetails/${school.id}`)}
                        >
                          <Image
                            src={school.profileImage}
                            alt={school.name}
                            width={40}
                            height={40}
                            className="mr-4 object-contain"
                          />
                          <p className="text-[16px] sm:text-[18px] font-poppins leading-tight">
                            {school.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Title & Map */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
         <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-white mb-4">
             Nationwide Footprint
        </h2>
          <p className="text-sm sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed text-white mb-2 max-w-[100%]">
            Sainik Schools are strategically located across states to provide equal opportunity
            and access to disciplined, defense-oriented education.
          </p>
          <Image
            src="/homePage/map.png"
            alt="India Map"
            width={500}
            height={450}
            className="object-contain w-full max-w-[500px] h-[450px]"
          />
        </div>
      </div>
    </section>
  );
};

export default NationwideFootprint;