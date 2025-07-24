'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const logos = [
  { name: 'Aurora International', logo: '/homePage/logo.png' },
  { name: 'Crystal Lake School', logo: '/homePage/logo.png' },
  { name: 'Army Public School', logo: '/homePage/logo.png' },
  { name: 'Rashtriya Military School', logo: '/homePage/logo.png' },
];

const TrustedBySection = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loopScroll = (target: HTMLDivElement, reverse = false) => {
        const totalWidth = target.scrollWidth / 2;

        gsap.to(target, {
          x: reverse ? totalWidth : -totalWidth,
          duration: 20,
          ease: 'linear',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
          },
        });
      };

      if (row1Ref.current) loopScroll(row1Ref.current, false);
      if (row2Ref.current) loopScroll(row2Ref.current, true);
    });

    return () => ctx.revert();
  }, []);

  const loopItems = [...logos, ...logos];

  return (
    <section className="bg-[#f8f1ed] py-12 sm:py-16 w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium font-poppins mb-10 sm:mb-12 text-[#111] leading-tight">
          Trusted by top educational <br className="hidden sm:block" />
          institutions worldwide
        </h2>

        {/* Row 1 */}
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
                <span className="text-sm sm:text-base md:text-lg text-gray-800 font-poppins whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
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
                <span className="text-sm sm:text-base md:text-lg text-gray-800 font-poppins whitespace-nowrap">
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
