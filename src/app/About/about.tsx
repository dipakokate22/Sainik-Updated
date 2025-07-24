import Image from 'next/image';
import Link from 'next/link';

const AboutUsSection = () => {
  return (
    <section className="w-full">
      {/* Breadcrumb + Content */}
      <div className="w-full px-4 md:px-8 lg:px-0 max-w-[1135px] mx-auto pt-10">
        <p className="text-[17px] text-black font-light font-poppins">
          <Link href="/" className="text-[#10744E] hover:underline">Home</Link> / About Us
        </p>

        <h2 className="text-[26px] text-[#10744E] text-center font-medium font-poppins mt-4">About US</h2>
        <h1 className="text-[32px] text-black text-center font-semibold font-poppins mt-2">
          SubtitleShaping minds. Building futures. <br /> Empowering generations.
        </h1>

        <div className="mt-6 space-y-4">
          <p className="text-[20px] text-[#595858] font-light font-poppins">
            At School Dekho, we believe every child deserves a school where they can grow with discipline,
            courage, and a strong foundation for the future. We are India’s first search engine dedicated to
            school admissions — including special focus on schools that prepare students for careers in the
            armed forces.
          </p>
          <p className="text-[20px] text-[#595858] font-light font-poppins">
            School Dekho started in 2021 with a clear mission — to help parents explore and choose the best
            schools from the comfort of their homes, without stress or confusion. We understand that finding
            the right Sainik or military-preparatory school can be challenging, especially for parents who want
            the best training and discipline for their children.
          </p>
          <p className="text-[20px] text-[#595858] font-light font-poppins">
            With School Dekho, you do more than just search — you experience. We offer 360° virtual tours and
            detailed insights into academics, hostels, sports, and training programs that build leadership and
            discipline.
          </p>
          <p className="text-[20px] text-[#595858] font-light font-poppins">
            School Dekho is not just a website — we are your partner in guiding your child toward a
            disciplined and successful future. Whether your dream is a career in the armed forces or building
            strength in character, we help you find the school that fits your child’s goals.
          </p>
        </div>
      </div>

      {/* Stats Section with Images */}
      <div className="w-full bg-[#10744E] mt-16 py-10 px-4">
        <div className="max-w-[882px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Box 1 */}
          <div className="flex flex-col items-center text-white text-center">
            <Image
              src="/images/school-icon.png" // 🔁 Replace with your actual image path
              alt="Listed Schools"
              width={96}
              height={96}
              className="mb-4"
            />
            <p className="text-[20px] font-semibold font-poppins">14434 +</p>
            <p className="text-[18px] font-poppins mt-1">Listed Schools</p>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center text-white text-center">
            <Image
              src="/images/parent-icon.png" // 🔁 Replace with your actual image path
              alt="Parent Enquiries"
              width={96}
              height={96}
              className="mb-4"
            />
            <p className="text-[20px] font-semibold font-poppins">14434 +</p>
            <p className="text-[18px] font-poppins mt-1">Parent Enquiries</p>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center text-white text-center">
            <Image
              src="/images/counselling-icon.png" // 🔁 Replace with your actual image path
              alt="Parents Counselled"
              width={96}
              height={96}
              className="mb-4"
            />
            <p className="text-[20px] font-semibold font-poppins">14434 +</p>
            <p className="text-[18px] font-poppins mt-1">Parents Counselled</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;