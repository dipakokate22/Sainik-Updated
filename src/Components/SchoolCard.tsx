import Image from "next/image";

interface SchoolCardProps {
  name: string;
  image: string;
  desc: string;
  logo?: string; // optional logo
  distance?: string; // Add distance prop
}

export default function SchoolCard({ name, image, desc, logo, distance }: SchoolCardProps) {
  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase();

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Banner Image */}
      <div className="w-full h-48 overflow-hidden rounded-t-2xl relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={130}
          className="object-cover w-full h-full"
        />
        {/* Distance Badge */}
        {distance && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
            <div className="flex items-center gap-1 text-sm font-medium text-[#10744E]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#10744E"/>
                <circle cx="12" cy="10" r="3" fill="white"/>
              </svg>
              <span>{distance}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          {/* Logo or Initial + Name */}
          <div className="flex items-center gap-3">
            {logo ? (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#10744E] text-white flex items-center justify-center font-semibold text-sm">
                {getInitial(name)}
              </div>
            )}
            <h3 className="text-xl font-semibold text-black">{name}</h3>
          </div>

          <p className="text-sm text-gray-600 mt-2 hidden sm:block">{desc}</p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Education</span>
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Fees</span>
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Rating</span>
          </div>

          <div className="flex items-center text-lg mb-1">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300">★</span>
            <span className="text-gray-300">★</span>
          </div>

          <button className="text-[#10744E] mt-2 text-sm font-medium hover:underline flex items-center gap-1 group">
              View Details 
             <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:translate-x-1">
             <path 
                d="M9 18L15 12L9 6" 
                stroke="#10744E" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
             />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
