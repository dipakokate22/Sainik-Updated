'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/Image/img.png", "/Image/img.png", "/Image/img.png", "/Image/img.png",
  "/Image/img.png", "/Image/img.png", "/Image/img.png", "/Image/img.png"
];

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      gsap.to(".col-left", {
        y: "-30%",
        duration: 20,
        repeat: -1,
        ease: "none",
        yoyo: true,
      });

      gsap.to(".col-right", {
        y: "30%",
        duration: 20,
        repeat: -1,
        ease: "none",
        yoyo: true,
      });
    }
  }, [isMobile]);

  return (
    <section className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 font-poppins overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start gap-6 text-center lg:text-left lg:-mt-80">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal leading-tight text-black">
            We're proud to help <br className="hidden sm:inline" />
            students find the right <br className="hidden sm:inline" />
            path to success. Here's <br className="hidden sm:inline" />
            how far we've come:
          </h1>

          <p className="text-gray-600 text-[16px] sm:text-[18px] lg:text-[20px]">
            Trusted by Students, Schools & Cities Across India
          </p>

          <div className="flex flex-row justify-center lg:justify-start gap-4 sm:gap-6 mt-4">
            <div className="flex-1 text-center lg:text-left">
              <p className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] text-black">📍 Cities Covered</p>
              <p className="text-black text-[12px] sm:text-[14px]">Across all major <br className="hidden sm:inline" /> Indian regions</p>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] text-black">🏫 Schools Listed</p>
              <p className="text-black text-[12px] sm:text-[14px]">From CBSE, ICSE, & <br className="hidden sm:inline" /> state boards</p>
            </div>
          </div>

          {/* Desktop Button - Only show on large screens */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-6 hover:bg-green-800 transition">
              Take Admission
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          {/* Desktop GSAP scrolling */}
          {!isMobile ? (
            <div className="flex gap-4 overflow-hidden max-h-[830px]">
              {/* Column 1 */}
              <div className="col-left flex flex-col gap-4">
                {images.map((img, index) => (
                  <Image
                    key={`left-${index}`}
                    src={img}
                    alt={`col1-${index}`}
                    width={311}
                    height={331}
                    className="rounded-lg object-cover w-[311px] h-auto"
                  />
                ))}
              </div>

              {/* Column 2 */}
              <div className="col-right flex flex-col gap-4">
                {images.map((img, index) => (
                  <Image
                    key={`right-${index}`}
                    src={img}
                    alt={`col2-${index}`}
                    width={311}
                    height={331}
                    className="rounded-lg object-cover w-[311px] h-auto"
                  />
                ))}
              </div>
            </div>
          ) : (
            // Mobile: Swiper Carousel
            <Swiper
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              className="w-full py-6"
            >
              {images.map((img, index) => (
                <SwiperSlide key={`slide-${index}`} className="flex justify-center">
                  <Image
                    src={img}
                    alt={`slide-${index}`}
                    width={240}
                    height={240}
                    className="rounded-lg object-cover w-[240px] h-[240px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* Mobile Button - Only show below images on mobile/tablet */}
      <div className="flex lg:hidden justify-center mt-8">
        <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full hover:bg-green-800 transition">
          Take Admission
        </button>
      </div>
    </section>
  );
}
