'use client';

import Image from 'next/image';
import Link from 'next/link';

const AboutUsSection = () => {
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
            courage, and a strong foundation for the future. We are India’s first search engine dedicated to
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
            strength in character, we help you find the school that fits your child’s goals.
          </p>
        </div>
      </div>

      {/* Modern Stats Section (No Green Background) */}
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
    </section>
  );
};

export default AboutUsSection;
