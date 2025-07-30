'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const logos = [
  { name: 'Aurora International', logo: '/Trusted/aurora.png' },
  { name: 'Crystal Lake School', logo: '/Trusted/crystal.png' },
  { name: 'Army Public School', logo: '/Trusted/army.png' },
  { name: 'Rashtriya Military School', logo: '/Trusted/rashtriya.png' },
];

const TrustedBySection = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Move left (original direction)
      if (row1Ref.current) {
        const totalWidth = row1Ref.current.scrollWidth / 2;
        gsap.fromTo(row1Ref.current, 
          { x: 0 },
          {
            x: -totalWidth,
            duration: 25,
            ease: 'linear',
            repeat: -1,
          }
        );
      }

      // Row 2: Move right (opposite direction)
      if (row2Ref.current) {
        const totalWidth = row2Ref.current.scrollWidth / 2;
        gsap.fromTo(row2Ref.current, 
          { x: -totalWidth },
          {
            x: 0,
            duration: 25,
            ease: 'linear',
            repeat: -1,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const loopItems = [...logos, ...logos, ...logos]; // Triple the items for better seamless loop

  return (
    <section className="bg-[#F7F1EE] pt-12 pb-16 w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
         <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-8">
          Trusted by top educational <br className="hidden sm:block" />
          institutions worldwide
        </h2>

        {/* Row 1 - Moving Left */}
        <div className="overflow-hidden w-full mb-6">
          <div className="flex w-max gap-8 sm:gap-12" ref={row1Ref}>
            {loopItems.map((item, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex items-center px-4 sm:px-8 shrink-0"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-sm sm:text-base md:text-lg text-black font-poppins whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="overflow-hidden w-full">
          <div className="flex w-max gap-8 sm:gap-12" ref={row2Ref}>
            {loopItems.map((item, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex items-center px-4 sm:px-8 shrink-0"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-sm sm:text-base md:text-lg text-black font-poppins whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
