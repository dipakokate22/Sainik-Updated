'use client';
import Image from 'next/image';

const SainikPointsSection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-14 py-16">
      <div className="w-full max-w-[1306px] mx-auto space-y-16">
        {/* Row 1 - Life of a Sainik */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-auto">
            <Image
              src="/Image/life.jpg"
              alt="Life of a Sainik"
              width={700}
              height={468}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Life of a Sainik
            </h2>
            <div className="text-base md:text-[20px] font-poppins text-gray-700 leading-relaxed">
            <p>
              The life of a Sainik is a noble journey of discipline, sacrifice, and unwavering dedication, 
              where every dawn begins with purpose and every night ends with the satisfaction of serving the 
              nation with pride, honor, and relentless commitment.
            </p>
            <p>  
              From braving the harshest terrains to standing guard during moments of national celebration, 
              a soldier's life is built on resilience, physical endurance, mental strength, and an unbreakable 
              bond of brotherhood that goes beyond caste, religion, and region.
              <br />
              It is a life of purpose and pride, where selfless service to the motherland becomes the highest duty.
            </p>
            </div>
          </div>
        </div>

       {/* Row 2 - Government Facilities */}
        <div className="flex flex-col md:flex-row gap-12 items-start bg-[#1C1C1C] px-14 py-16 rounded-xl">
          {/* Left Text */}
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium mb-4">
              Government Facilities
            </h2>
            <p className="text-base md:text-[20px] font-poppins leading-relaxed">
              The Government of India provides strong support to soldiers and their families.
              Healthcare is offered through the ECHS (Ex-Servicemen Contributory Health Scheme).
              Pension benefits ensure financial stability after retirement.
              <br />
              Affordable housing schemes make living easier for service members.
              Welfare programs ensure dignity, security, and peace of mind.
              These benefits reflect the nation’s gratitude and aim to empower every soldier and 
              their family even beyond active service.
              
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 h-auto">
            <Image
              src="/Image/government.jpg"
              alt="Government Facilities"
              width={588}
              height={442}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 3 - Patriotism Driven */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-auto">
            <Image
              src="/Image/patriotism.jpg"
              alt="Patriotism"
              width={582}
              height={442}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
              Patriotism Driven
            </h2>
            <div className="text-base md:text-[20px] font-poppins text-gray-700 leading-relaxed">
            <p>
              In the Armed Forces, patriotism is not just an emotion—it’s a way of life.
              Every heartbeat echoes “Bharat Mata Ki Jai,” and every action—be it a salute, a march, or a rescue—is 
              a reflection of deep love for the nation.
            </p>
            <p>
              This spirit pushes every soldier to rise above personal interest and serve with unmatched dedication.
              Their courage and sacrifice inspire generations and uphold the pride of the tricolour.
              <br />
              It is this unwavering patriotism that strengthens the very soul of the nation.
              Through their daily acts of duty, they remind us what it truly means to serve with honor.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default SainikPointsSection;
