'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SchoolCard from '../../Components/SchoolCard'; // Adjust path as needed
import { searchSchoolsByCoordinates } from '../../../services/schoolServices'; // Adjust path as needed

// Type definitions remain the same...
interface SchoolApiData {
  id: number;
  name: string;
  profileImage: string;
  overview?: {
    welcomeNote?: string;
  };
  thumbnail?: string;
  distance: string;
}

interface SchoolCardData {
  id: number;
  name: string;
  image: string;
  desc: string;
  logo: string;
  distance: string;
  thumbnail?: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: SchoolApiData[];
  pagination: any;
}

export default function SchoolsSection() {
  const [schools, setSchools] = useState<SchoolCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ... useEffect and other functions remain the same ...

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const response: ApiResponse = await searchSchoolsByCoordinates(
                  position.coords.latitude, 
                  position.coords.longitude
                );
                
                const mappedSchools: SchoolCardData[] = response.data.slice(0, 6).map((school: SchoolApiData) => ({
                  id: school.id,
                  name: school.name,
                  image: school.profileImage,
                  desc: school.overview?.welcomeNote || 'A quality educational institution.',
                  logo: school.profileImage,
                  distance: school.distance,
                  thumbnail: school.thumbnail
                }));
                
                setSchools(mappedSchools);
              } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
              } finally {
                setLoading(false);
              }
            },
            (error) => {
              fetchSchoolsWithLocation(28.6139, 77.2090);
            }
          );
        } else {
          fetchSchoolsWithLocation(28.6139, 77.2090);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setLoading(false);
      }
    };

    const fetchSchoolsWithLocation = async (lat: number, lng: number) => {
      try {
        const response: ApiResponse = await searchSchoolsByCoordinates(lat, lng);
        
        const mappedSchools: SchoolCardData[] = response.data.slice(0, 6).map((school: SchoolApiData) => ({
          id: school.id,
          name: school.name,
          image: school.profileImage,
          desc: school.overview?.welcomeNote || 'A quality educational institution.',
          logo: school.profileImage,
          distance: school.distance,
          thumbnail: school.thumbnail
        }));
        
        setSchools(mappedSchools);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10744E] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading nearby schools...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
            <p className="text-red-600">Error loading schools: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nearby Sainik Schools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover quality Sainik schools in your area. Find the perfect institution for your child's education and development.
          </p>
        </div>

        {/* Schools Grid - Cards expand to fill available space */}
        {schools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
            {schools.map((school) => (
              <Link
                key={school.id}
                href={`/SchoolDetails/${school.id}`}
                className="block min-w-0"
                prefetch
              >
                <SchoolCard
                  name={school.name}
                  image={school.image}
                  desc={school.desc}
                  logo={school.logo}
                  distance={school.distance}
                  thumbnail={school.thumbnail}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Schools Found</h3>
            <p className="text-gray-500">We couldn't find any Sainik schools in your area.</p>
          </div>
        )}

        {/* View All Button */}
        {schools.length >= 6 && (
          <div className="text-center mt-8">
            <Link href="/Listing">
              <button className="bg-[#10744E] hover:bg-[#0d5a3c] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                View All Schools
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
