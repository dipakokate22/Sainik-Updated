import Image from "next/image";

interface SchoolCardProps {
  name: string;
  image: string;
  desc: string;
}

export default function SchoolCard({ name, image, desc }: SchoolCardProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={name}
          width={400}
          height={192}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <h3 className="text-xl font-semibold text-black">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{desc}</p>
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
  );
}
