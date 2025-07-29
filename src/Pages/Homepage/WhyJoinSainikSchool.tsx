// components/WhyJoinSainikSchool.tsx

import React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { IoSchoolOutline, IoBodyOutline, IoGlobeOutline } from 'react-icons/io5';
import { FaUserShield } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { LiaSchoolSolid } from "react-icons/lia";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

const cardData = [
  { icon: IoSchoolOutline, title: "CBSE Excellence", description: "High-quality CBSE curriculum taught by expert faculty." },
  { icon: FaUserShield, title: "NDA-Oriented Training", description: "Dedicated academic + physical training to crack NDA & beyond." },
  { icon: BsPeople, title: "Structured Discipline", description: "A daily routine that builds time management, leadership, and ethics." },
  { icon: LiaSchoolSolid, title: "Military Hostel Life", description: "Develop self-reliance and unity while living on campus." },
  { icon: IoBodyOutline, title: "Physical & Mental Fitness", description: "Sports, drills, and yoga for holistic development." },
  { icon: IoGlobeOutline, title: "Pan-India Presence", description: "Students from all states foster national pride and unity." },
];

const LIGHT_EFFECT_COLORS = {
  ORANGE: '#EEA786',
  GRAY: '#CDCDCD',
  GREEN: '#6B8A7B',
};

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  lightColor: string;
};

const FeatureCard = ({ icon: Icon, title, description, lightColor }: FeatureCardProps) => (
  <div className="w-full sm:w-[302px] h-[204px] bg-[#1C1F24]/70 backdrop-blur-sm rounded-2xl relative overflow-hidden transition-transform hover:scale-105">
    <div
      className="absolute -top-1/4 -left-1/4 w-[200px] h-[200px] opacity-10 blur-3xl"
      style={{
        backgroundImage: `radial-gradient(circle, ${lightColor}, transparent 80%)`,
      }}
    />
    <div className="relative z-10 flex flex-col h-full px-4 pt-4">
      <div className="flex gap-4 mb-3">
        <div className="w-[60px] h-[60px] bg-black/30 rounded-full flex items-center justify-center">
          <Icon className="text-white text-2xl" />
        </div>
        <h3 className="text-white text-lg font-medium pt-2">{title}</h3>
      </div>
      <p className="text-gray-300 text-sm leading-snug">{description}</p>
    </div>
  </div>
);

const WhyJoinSainikSchool = () => {
  return (
    <section className={`relative w-full py-16 md:py-16 ${poppins.className}`}>
  {/* Background Image Wrapper - full width */}
  <div className="absolute inset-0 w-full h-full min-h-[400px]">
    <Image
      src="/homePage/bgwhyjoinsanikschool.jpg"
      alt="Sainik School promotional background"
      fill
      priority
      style={{ objectFit: "cover" }}
      className="absolute inset-0"
    />
    <div className="absolute inset-0 bg-white opacity-20"></div>
  </div>

  {/* Inner Content - max width centered */}
  <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
      {/* Left Content */}
      <div className="text-black w-full md:w-[500px]">
        <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
          Why Join <br /> Sainik School?
        </h2>
        <p className="text-base sm:text-lg mb-6 leading-relaxed">
          Where courage meets discipline, and education <br />
          shapes future defense leaders. <br />
          Sainik Schools are more than institutions — they <br />
          are launchpads for tomorrow’s heroes.
        </p>
        <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-6 hover:bg-green-800 transition">
          Explore All Schools
        </button>
      </div>

      {/* Right Feature Cards */}
      <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-[calc(100%-540px)]">
        {cardData.map((card, index) => {
          const lightColor =
            index < 2
              ? LIGHT_EFFECT_COLORS.ORANGE
              : index < 4
              ? LIGHT_EFFECT_COLORS.GRAY
              : LIGHT_EFFECT_COLORS.GREEN;
          return <FeatureCard key={index} {...card} lightColor={lightColor} />;
        })}
      </div>
    </div>
  </div>
</section>

  );
};

export default WhyJoinSainikSchool;
