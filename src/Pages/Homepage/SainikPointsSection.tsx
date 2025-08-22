'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSectionFour } from '../../../services/homeServices';

type Point = {
  id: string | number;
  title: string;
  image: string;
  description: string;
};

const SainikPointsSection = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    getSectionFour()
      .then(res => setPoints(res.data))
      .catch(() => setPoints([]));
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-14 py-16">
      <div className="w-full max-w-[1306px] mx-auto space-y-16">
        {points.map((point, idx) => (
          <div
            key={point.id}
            className={`flex flex-col md:flex-row gap-12 items-start ${
              idx === 1 ? 'bg-[#1C1C1C] px-14 py-16 rounded-xl' : ''
            }`}
          >
            {/* Image Left for odd, Right for even */}
            {(idx === 0 || idx === 2) ? (
              <>
                <div className="w-full md:w-1/2 h-auto">
                  <Image
                    src={point.image}
                    alt={point.title}
                    width={700}
                    height={468}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl md:text-[42px] font-poppins font-medium mb-4 text-black">
                    {point.title}
                  </h2>
                  <div className="text-base md:text-[20px] font-poppins leading-relaxed text-gray-700">
                    <p className="mb-4 text-justify">{point.description}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`w-full md:w-1/2 ${idx === 1 ? 'text-white' : ''}`}>
                  <h2 className={`text-3xl md:text-[42px] font-poppins font-medium mb-4 ${idx === 1 ? 'text-white' : 'text-black'}`}>
                    {point.title}
                  </h2>
                  <div className={`text-base md:text-[20px] font-poppins leading-relaxed ${idx === 1 ? 'text-white' : 'text-gray-700'}`}>
                    <p className="mb-4 text-justify">{point.description}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-auto">
                  <Image
                    src={point.image}
                    alt={point.title}
                    width={588}
                    height={442}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SainikPointsSection;
