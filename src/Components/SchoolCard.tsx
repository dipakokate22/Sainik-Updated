import Image from "next/image";

interface SchoolCardProps {
  name: string;
  image: string;
  desc: string;
  logo?: string; // optional logo
}

export default function SchoolCard({ name, image, desc, logo }: SchoolCardProps) {
  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase();

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Banner Image */}
      <div className="w-full h-48 overflow-hidden rounded-t-2xl">
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

          <button className="text-green-700 text-sm font-medium hover:underline">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
