import Image from "next/image";

interface SchoolCardProps {
  name: string;
  image: string;
  desc: string;
  logo?: string; // optional logo
  distance?: string;
  thumbnail?: string; // Add thumbnail prop
}

export default function SchoolCard({ name, image, desc, logo, distance, thumbnail }: SchoolCardProps) {
  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase();

  // Use thumbnail as main banner image, fallback to image if no thumbnail
  const bannerImage = thumbnail || image;
  
  // Use image as logo, fallback to original logo prop
  const logoImage = image;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[420px]">
      {/* Banner Image - Fixed height to maintain thumbnail size */}
      <div className="w-full h-48 overflow-hidden rounded-t-2xl relative flex-shrink-0">
        <Image
          src={bannerImage}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
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

      {/* Content - Flexible height */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="flex-1">
          {/* Logo or Initial + Name */}
          <div className="flex items-start gap-3 mb-3">
            {logoImage ? (
              <Image
                src={logoImage}
                alt={`${name} logo`}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8 flex-shrink-0"
              />
            ) : logo ? (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8 flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#10744E] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {getInitial(name)}
              </div>
            )}
            <h3 
              className="text-lg font-semibold text-black leading-tight line-clamp-2 flex-1"
              title={name}
            >
              {name}
            </h3>
          </div>

          <p className="text-sm text-gray-600 hidden sm:block line-clamp-2 leading-relaxed mb-4">
            {desc}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Education</span>
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Fees</span>
            <span className="bg-[#DAEADD] text-black px-3 py-1 rounded-md text-xs font-medium">Rating</span>
          </div>

          <div className="flex items-center text-lg mb-3">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300">★</span>
            <span className="text-gray-300">★</span>
          </div>

          <button className="text-[#10744E] text-sm font-medium hover:underline flex items-center gap-1 group">
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
