import SchoolCard from "./SchoolCard";

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
    <section className="w-full bg-white flex flex-col items-center pt-12 pb-16 px-6 md:px-12">
  {/* Title */}
  <div className="text-center max-w-3xl">
    <h2 className="text-3xl md:text-[42px] font-poppins font-medium text-black mb-4">
      Explore Best Schools Near You
    </h2>
    <p className="text-base md:text-lg text-black/80 mt-2">
      Discover innovative designs that inspire learning.
    </p>
  </div>

  {/* Cards */}
  <div className="mt-10 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-items-center">
    {Array(2)
      .fill(schools)
      .flat()
      .map((school, idx) => (
        <SchoolCard
  key={idx}
  name={school.name}
  image={school.image}
  logo={school.logo}
  desc={school.desc}
/>

      ))}
  </div>

  {/* View All Button */}
  <button className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full mt-10 hover:bg-green-800 transition">
    View all
  </button>
</section>

  );
}
