// components/WhyJoinSainikSchool.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { IoSchoolOutline, IoBodyOutline, IoGlobeOutline } from 'react-icons/io5';
import { FaUserShield } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { LiaSchoolSolid } from "react-icons/lia";
import { getSectionFive } from '../../../services/homeServices';

const ICON_MAP: Record<string, React.ElementType> = {
  "🎓": IoSchoolOutline,
  "👨‍✈️": FaUserShield,
  "📅": BsPeople,
  "🏠": LiaSchoolSolid,
  "💪": IoBodyOutline,
  "🌍": IoGlobeOutline,
};

const staticSection = {
  title: "Why Join Sainik School?",
  subtitle: "Where courage meets discipline, and education shapes future defense leaders. Sainik Schools are more than institutions — they are launchpads for tomorrow’s heroes.",
  button: {
    text: "Explore All Schools",
    link: "#"
  },
  features: [
    { icon: "🎓", title: "CBSE Excellence", description: "High-quality CBSE curriculum taught by expert faculty." },
    { icon: "👨‍✈️", title: "NDA-Oriented Training", description: "Dedicated academic + physical training to crack NDA & beyond." },
    { icon: "📅", title: "Structured Discipline", description: "A daily routine that builds time management, leadership, and ethics." },
    { icon: "🏠", title: "Military Hostel Life", description: "Develop self-reliance and unity while living on campus." },
    { icon: "💪", title: "Physical & Mental Fitness", description: "Sports, drills, and yoga for holistic development." },
    { icon: "🌍", title: "Pan-India Presence", description: "Students from all states foster national pride and unity." },
  ]
};

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

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
  const [section, setSection] = useState(staticSection);

  useEffect(() => {
    getSectionFive()
      .then(res => {
        if (res?.data?.features) setSection(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className={`relative w-full py-16 ${poppins.className}`}>
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
    
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left Content */}
          <div className="text-black w-full md:w-[500px]">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              {section.title}
            </h2>
            <p className="text-sm text-black sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed">
              {section.subtitle}
            </p>
            <a href={section.button.link} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-4 hover:bg-green-800 transition">
                {section.button.text}
              </button>
            </a>
          </div>
    
          {/* Right Feature Cards */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-[calc(100%-540px)]">
            {section.features.map((card, index) => {
              const lightColor =
                index < 2
                  ? LIGHT_EFFECT_COLORS.ORANGE
                  : index < 4
                  ? LIGHT_EFFECT_COLORS.GRAY
                  : LIGHT_EFFECT_COLORS.GREEN;
              const Icon = ICON_MAP[card.icon] || IoSchoolOutline;
              return <FeatureCard key={index} icon={Icon} title={card.title} description={card.description} lightColor={lightColor} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSainikSchool;
