'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { getSectionOne } from '../../../services/homeServices';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  type SectionOneType = {
    title: string;
    subtitle: string;
    stats: { id: number; icon: string; title: string; description: string }[];
    button: { text: string; link: string };
    images: string[];
  };

  const [sectionOne, setSectionOne] = useState<SectionOneType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getSectionOne()
      .then(res => setSectionOne(res.data))
      .catch(() => {
        // fallback dummy data if API fails
        setSectionOne({
          title: "We are proud to help students find the right path to success. Here is how far we have come:",
          subtitle: "Trusted by Students, Schools & Cities Across India",
          stats: [
            { id: 1, icon: "📍", title: "Cities Covered", description: "Across all major Indian regions" },
            { id: 2, icon: "🏫", title: "Schools Listed", description: "From CBSE, ICSE, & state boards" }
          ],
          button: { text: "Take Admission", link: "https://sainik.codekrafters.in/admission" },
          images: [
            "/Image/img.png",
            "/Image/img.png",
            "/Image/img.png",
            "/Image/img.png",
            "/Image/img.png",
            "/Image/img.png",
            "/Image/img.png"
          ]
        });
      });
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const colLeft = gsap.utils.toArray(".col-left .scroll-image");
      const colRight = gsap.utils.toArray(".col-right .scroll-image");

      const animateColumn = (elements: gsap.TweenTarget, direction = 1) => {
        gsap.set(elements, { yPercent: 0 });

        gsap.to(elements, {
          yPercent: -100 * direction,
          ease: "none",
          duration: 20,
          repeat: -1,
          modifiers: {
            yPercent: gsap.utils.wrap(-100, 0)
          }
        });
      };

      animateColumn(colLeft, 1);  // Scroll Up
      animateColumn(colRight, -1); // Scroll Down
    }
  }, [isMobile, sectionOne]);

  if (!sectionOne) return null;

  return (
    <section className="max-w-[1440px] w-full mx-auto px-14 pt-12 pb-16 font-poppins overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start gap-6 text-center lg:text-left lg:mt-8">
          <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
            {sectionOne.title}
          </h2>
          <p className="text-gray-600 text-[16px] sm:text-[18px] lg:text-[20px]">
            {sectionOne.subtitle}
          </p>
          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 lg:gap-12 justify-center mt-4">
            {sectionOne.stats.map(stat => (
              <div key={stat.id} className="flex-1 min-w-[140px]">
                <div className="flex items-start gap-2">
                  <span className="text-[20px] leading-[1] pt-[2px]">{stat.icon}</span>
                  <div>
                    <p className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] text-black">
                      {stat.title}
                    </p>
                    <p className="text-black text-[12px] sm:text-[14px] mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop CTA Button */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <a href={sectionOne.button.link} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-6 hover:bg-green-800 transition">
                {sectionOne.button.text}
              </button>
            </a>
          </div>
        </div>
        {/* Right Section (Images) */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          {!isMobile ? (
            <div className="flex gap-5 overflow-hidden max-h-[830px]">
              {/* Column 1 */}
              <div className="col-left flex flex-col gap-5">
                {sectionOne.images.map((img, index) => (
                  <Image
                    key={`left-${index}`}
                    src={img}
                    alt={`col1-${index}`}
                    width={300}
                    height={260}
                    className="scroll-image rounded-lg object-cover w-[300px] h-[260px]"
                  />
                ))}
              </div>
              {/* Column 2 */}
              <div className="col-right flex flex-col gap-5">
                {sectionOne.images.map((img, index) => (
                  <Image
                    key={`right-${index}`}
                    src={img}
                    alt={`col2-${index}`}
                    width={300}
                    height={260}
                    className="scroll-image rounded-lg object-cover w-[300px] h-[260px]"
                  />
                ))}
              </div>
            </div>
          ) : (
            // Mobile: 2 Rows with Auto-moving Animation
            <div className="w-full overflow-hidden py-6">
              {/* Row 1 - Moving Left */}
              <div className="flex gap-4 mb-4 animate-scroll-left">
                {[...sectionOne.images, ...sectionOne.images].map((img, index) => (
                  <div key={`row1-${index}`} className="flex-shrink-0">
                    <Image
                      src={img}
                      alt={`row1-${index}`}
                      width={140}
                      height={140}
                      className="rounded-lg object-cover w-[140px] h-[140px]"
                    />
                  </div>
                ))}
              </div>
              {/* Row 2 - Moving Right */}
              <div className="flex gap-4 animate-scroll-right">
                {[...sectionOne.images, ...sectionOne.images].map((img, index) => (
                  <div key={`row2-${index}`} className="flex-shrink-0">
                    <Image
                      src={img}
                      alt={`row2-${index}`}
                      width={160}
                      height={160}
                      className="rounded-lg object-cover w-[160px] h-[160px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile CTA Button */}
      <div className="flex lg:hidden justify-center mt-6 lg:mt-8">
        <a href={sectionOne.button.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-[#10744E] text-white text-white text-[16px] font-medium px-6 py-3 rounded-full hover:bg-green-800 transition">
            {sectionOne.button.text}
          </button>
        </a>
      </div>
    </section>
  );
}
  