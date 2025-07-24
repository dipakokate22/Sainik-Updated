import Image from "next/image";

const schools = [
  {
    name: "Rashtriya Military School",
    image: "/Image/img.jpg",
    desc: "Premier residential school nurturing future armed forces leaders through discipline, academics, and all-round development.",
  },
  {
    name: "Army Public School",
    image: "/Image/img.jpg",
    desc: "Empowering young minds with discipline, knowledge, and values for a brighter tomorrow.",
  },
  {
    name: "Acumen Academy",
    image: "/Image/img.jpg",
    desc: "Acumen Academy empowers changemakers with practical tools and leadership programs to tackle global challenges.",
  },
];

export default function SchoolsSection() {
  return (
    <section className="w-full bg-white flex flex-col items-center py-16 px-6 md:px-12">
      {/* Title */}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold text-black">
          Explore Best Schools Near You
        </h2>
        <p className="text-base md:text-lg text-black/80 mt-3">
          Discover innovative designs that inspire learning.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-items-center">
        {Array(2)
          .fill(schools)
          .flat()
          .map((school, idx) => (
            <div
              key={idx}
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                <Image
                  src={school.image}
                  alt={school.name}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <h3 className="text-xl font-semibold text-black">{school.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{school.desc}</p>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">
                      Education
                    </span>
                    <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">
                      Fees
                    </span>
                    <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">
                      Rating
                    </span>
                  </div>

                  <div className="flex items-center mt-3 text-xl">
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300">★</span>
                    <span className="text-gray-300">★</span>
                  </div>

                  <button className="text-green-700 mt-2 text-sm font-medium hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* View All Button */}
      <button className="mt-14 px-6 py-2 bg-[#10744E] text-white rounded-full hover:bg-[#0d6342] transition text-base font-medium">
        View all
      </button>
    </section>
  );
}
