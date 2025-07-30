import Image from "next/image";

interface SchoolCardProps {
  name: string;
  image: string;
  desc: string;
  logoUrl?: string;
}

export default function SchoolCard({ name, image, desc, logoUrl = "/Listing/Logo.png" }: SchoolCardProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="w-full h-40 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={name}
          width={400}
          height={130}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          {/* School Logo and Name */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-14 h-14 overflow-hidden rounded-full flex-shrink-0">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-black leading-tight">{name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{desc}</p>
        </div>

        <div className="mt-1">
          <div className="flex flex-wrap gap-2 mb-2">
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

          <div className="flex items-center text-lg mb-1">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300">★</span>
            <span className="text-gray-300">★</span>
          </div>

          <button className="text-green-700 text-sm font-medium hover:underline">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
