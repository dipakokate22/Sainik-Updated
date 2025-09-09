'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaSchool,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaArrowLeft,
  FaPlus
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Navbar from '../../../Components/NavBar';
import Footer from '../../../Components/Footer';
import { getSchoolById, searchSchoolsByCoordinates } from '../../../../services/schoolServices';

// Function to check if a URL is external
const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

// Horizontal School Card Component
const HorizontalSchoolCard = ({
  name,
  image,
  location,
  distance,
  rating
}: {
  name: string;
  image: string;
  location: string;
  distance: string;
  rating: number;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      {/* School Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        {isExternalUrl(image) ? (
          <img
            src={image}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* School Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-600 mt-1">{location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{distance}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${i < Math.round(Number(rating) || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Icon */}
      <div className="flex-shrink-0">
        <FiArrowRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

function parseArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return trimmed ? [trimmed] : [];
  }
  return [];
}

type Faq = { question: string; answer: string };

function parseFaqs(value: any): Faq[] {
  try {
    const toArray = (v: any): any[] =>
      Array.isArray(v)
        ? v
        : typeof v === "string"
        ? JSON.parse(v.trim() || "[]")
        : [];

    const raw = toArray(value);
    if (!Array.isArray(raw)) return [];
    return raw.map((f: any) => ({
      question: typeof f?.question === "string" ? f.question : "",
      answer: typeof f?.answer === "string" ? f.answer : "",
    }));
  } catch {
    return [];
  }
}


export default function SchoolDetailSection() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [nearbySchools, setNearbySchools] = useState<any[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);

  useEffect(() => {
    async function fetchSchool() {
      setLoading(true);
      try {
        const data = await getSchoolById(id);
        setSchool(data?.data || null);
      } catch {
        setSchool(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchSchool();
  }, [id]);

  useEffect(() => {
    async function fetchNearbySchools() {
      if (school?.location?.latitude && school?.location?.longitude) {
        setNearbyLoading(true);
        try {
          const res = await searchSchoolsByCoordinates(
            school.location.latitude,
            school.location.longitude
          );
          setNearbySchools(res?.data?.filter((s: any) => s.id !== school.id).slice(0, 6) || []);
        } catch {
          setNearbySchools([]);
        } finally {
          setNearbyLoading(false);
        }
      }
    }
    fetchNearbySchools();
  }, [school]);

  // Replace the facilities-related part of your useMemo with this:
const {
  keyHighlights,
  admissionCriteriaEligibility,
  schoolHours,
  annualFeeStructure,
  additionalFees,
  academicFacilities,
  sportsFacilities,
  infraFacilities,
  gallery,
  reviews,
  faqs,
  schoolInfoEntries
} = useMemo(() => {
  const keyHighlights = parseArray(school?.overview?.keyHighlights);
  const admissionCriteriaEligibility = parseArray(school?.overview?.admissionCriteriaEligibility);
  const schoolHours = parseArray(school?.overview?.schoolHours);
  const annualFeeStructure = parseArray(school?.fees?.annualFeeStructure);
  const additionalFees = parseArray(school?.fees?.additionalFees);

  // NEW: keep facilities groups separate (API may return stringified arrays)
  const academicFacilities = parseArray(school?.facilities?.academic);
  const sportsFacilities = parseArray(school?.facilities?.sportsRecreation);
  const infraFacilities = parseArray(school?.facilities?.infrastructure);

  const gallery = Array.isArray(school?.gallery) ? school.gallery : [];
  const reviews = Array.isArray(school?.reviews) ? school.reviews : [];
const faqs = parseFaqs(school?.faqs);

  const infoObj = school?.overview?.schoolInformation || {};
  const schoolInfoEntries = Object.entries(infoObj || {}).filter(([, v]) => v);

  return {
    keyHighlights,
    admissionCriteriaEligibility,
    schoolHours,
    annualFeeStructure,
    additionalFees,
    academicFacilities,
    sportsFacilities,
    infraFacilities,
    gallery,
    reviews,
    faqs,
    schoolInfoEntries
  };
}, [school]);


  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc: number, r: any) => acc + (Number(r?.rating) || 0), 0);
    return sum / reviews.length;
  }, [reviews]);

  const tabs = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'facilities', label: 'Facilities' },
      { id: 'fees', label: 'Fees' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'faqs', label: "FAQ's" }
    ],
    []
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* School Information (object-based) */}
            {schoolInfoEntries.length > 0 && (
              <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
                <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                  School Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schoolInfoEntries.map(([key, value], idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <FaSchool className="text-xl text-black" />
                      <span className="text-black capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}: <span className="text-[#257B5A]">{String(value)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Welcome / Description */}
            {school?.overview?.welcomeNote && (
              <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
                <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                  About the School
                </h4>
                {String(school.overview.welcomeNote)
                  .split('\n')
                  .filter(Boolean)
                  .map((para: string, i: number) => (
                    <p key={i} className="text-[16px] font-poppins text-black mb-3">
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {/* Key Highlights */}
            {keyHighlights.length > 0 && (
              <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
                <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                  🌟 Key Highlights
                </h4>
                <ul className="list-disc pl-6 text-[16px] font-poppins text-black space-y-1">
                  {keyHighlights.map((highlight: string, idx: number) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Admission Criteria */}
            {admissionCriteriaEligibility.length > 0 && (
              <div className="bg-white border rounded-lg  px-4 md:px-[26px] py-[25px]">
                <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                  Admission Criteria & Eligibility
                </h4>
                <ul className="space-y-2">
                  {admissionCriteriaEligibility.map((criteria: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[16px] text-black">
                      <FiArrowRight className="text-black mt-[3px]" />
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* School Hours */}
            {schoolHours.length > 0 && (
              <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
                <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                  School Hours
                </h4>
                <ul className="space-y-2">
                  {schoolHours.map((line: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[16px] text-black">
                      <FiArrowRight className="text-black mt-[3px]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

     case 'facilities':
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
        <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
          🏫 Facilities
        </h4>

        {(academicFacilities.length + sportsFacilities.length + infraFacilities.length) > 0 ? (
          <div className="space-y-6">
            {academicFacilities.length > 0 && (
              <div>
                <h5 className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold text-black mb-2">
                  Academic Facilities
                </h5>
                <ul className="list-disc pl-6 text-[16px] text-black space-y-1">
                  {academicFacilities.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {sportsFacilities.length > 0 && (
              <div>
                <h5 className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold text-black mb-2">
                  Sports & Recreation
                </h5>
                <ul className="list-disc pl-6 text-[16px] text-black space-y-1">
                  {sportsFacilities.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {infraFacilities.length > 0 && (
              <div>
                <h5 className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold text-black mb-2">
                  Infrastructure
                </h5>
                <ul className="list-disc pl-6 text-[16px] text-black space-y-1">
                  {infraFacilities.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[16px] text-gray-600">No facilities listed.</p>
        )}
      </div>
    </div>
  );


      case 'fees':
        return (
          <div className="space-y-6">
            {/* Fee Structure */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                💰 Fee Structure
              </h4>
              {annualFeeStructure.length ? (
                <ul className="list-disc pl-6 text-[16px] font-poppins text-black space-y-1">
                  {annualFeeStructure.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[16px] text-gray-600">No fee details available.</p>
              )}
            </div>

            {/* Additional Fees */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                📋 Additional Fees
              </h4>
              {additionalFees.length ? (
                <ul className="list-disc pl-6 text-[16px] font-poppins text-black space-y-1">
                  {additionalFees.map((item: any, idx: number) => (
                    <li key={idx}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[16px] text-gray-600">No additional fees listed.</p>
              )}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                🏫 Campus Gallery
              </h4>
              {gallery && gallery.filter((s: any) => typeof s === 'string' && s.trim()).length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery
                    .filter((src: any) => typeof src === 'string' && src.trim())
                    .map((src: string, i: number) => (
                      <div key={i} className="relative group cursor-pointer overflow-hidden rounded-lg">
                        {isExternalUrl(src) ? (
                          <img
                            src={src}
                            alt={`Gallery Image ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.visibility = 'hidden';
                            }}
                          />
                        ) : (
                          <Image
                            src={src}
                            alt={`Gallery Image ${i + 1}`}
                            width={1200}
                            height={800}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-[16px] text-gray-600">No images available.</p>
              )}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                ⭐ Overall Rating
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-[#257B5A]">{avgRating.toFixed(1)}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`${i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                💬 Reviews
              </h4>
              {reviews.length ? (
                <div className="space-y-6">
                  {reviews.map((rev: any, i: number) => (
                    <div key={i} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-semibold text-black">{rev?.name || 'Reviewer'}</h5>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, starIndex) => (
                              <FaStar
                                key={starIndex}
                                className={`text-sm ${starIndex < (Number(rev?.rating) || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-[15px] leading-relaxed">{rev?.comment || ''}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[16px] text-gray-600">No reviews available.</p>
              )}
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg px-4 md:px-[26px] py-[25px]">
              <h4 className="font-semibold font-poppins text-[16px] text-black sm:text-[18px] md:text-[20px] mb-4">
                ❓ FAQs
              </h4>
              {faqs.length ? (
                <div className="space-y-4">
                  {faqs.map((faq: any, i: number) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-black mb-2">Q: {faq?.question}</h5>
                      <p className="text-gray-700 text-[15px] leading-relaxed">A: {faq?.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[16px] text-gray-600">No FAQs available.</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">Loading...</div>;
  }
  if (!school) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">School not found.</div>;
  }

  const avgStars = Math.round(avgRating);

  // Name and contact fallbacks according to API
  const displayName =
    school?.name ||
    [school?.firstName, school?.lastName].filter(Boolean).join(' ').trim() ||
    'School';

  const website = school?.address?.website || school?.website || '';
  const email = school?.address?.email || school?.email || '';
  const mobile = school?.address?.mobile || school?.mobile || '';
  const city = school?.address?.city || '';
  const fullAddress = school?.address?.fullAddress || '';
  const mapQuery = encodeURIComponent(`${displayName}, ${city}`);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F7F1EE] mt-6">
        {/* Header Section */}
        <div className="max-w-[1440px] w-full mx-auto bg-[#F7F1EE] px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:pt-6 md:pt-10 lg:pt-12">
          <div className="max-w-[1440px] w-full mx-auto mt-16">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <button
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => router.back()}
              >
                <FaArrowLeft className="text-sm sm:text-base lg:text-lg" />
                <span className="text-sm sm:text-base lg:text-lg font-medium">Back</span>
              </button>
            </div>

            {/* School Header Card */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
              {/* School Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white rounded-2xl p-2 flex-shrink-0 shadow-sm">
                {isExternalUrl(school.profileImage || '') ? (
                  <img
                    src={school.profileImage}
                    alt={displayName}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Image
                    src={school.profileImage || '/Listing/Logo.png'}
                    alt={displayName}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* School Information */}
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[32px] font-poppins font-medium text-black mb-2 lg:mb-2 leading-tight">
                  {displayName}
                </h1>

                {/* City and Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-600 font-medium">{city}</span>
                  <span className="text-gray-400">|</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${i < avgStars ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      ({avgRating.toFixed(1)})
                    </span>
                  </div>
                </div>

                {/* Add to Compare Button */}
{/*                 <button className="flex items-center gap-2 border border-[#10744E] text-[#10744E] px-4 py-2 rounded-full hover:bg-[#10744E] hover:text-white transition-colors duration-300 font-medium">
                  <FaPlus className="w-4 h-4" />
                  <span>Add to Compare</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="max-w-[1440px] w-full mx-auto bg-[#F7F1EE] px-4 sm:px-6 md:px-10 lg:px-14 pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-[1440px] w-full mx-auto pt-4 sm:pt-6">
            {/* Top Bar with Contact Info and Register Button */}
           {/* Top Bar with Contact Info and Register Button */}
<div className="border border-[#257B5A] rounded-lg px-3 sm:px-4 md:px-6 lg:px-[26px] py-3 sm:py-4 lg:py-[25px] mb-4 sm:mb-6">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:flex-nowrap gap-3 sm:gap-4 lg:gap-6">
    {/* School Info */}
    <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-4 lg:gap-6 flex-1 min-w-0">
      <div className="flex items-center gap-1 min-w-0">
        <FaMapMarkerAlt className="text-[#257B5A] text-sm sm:text-base" />
        <span
          className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate min-w-0"
          title={fullAddress}
        >
          {fullAddress}
        </span>
      </div>
      <div className="flex items-center gap-1 min-w-0">
        <FaPhone className="text-[#257B5A] text-sm sm:text-base" />
        <span
          className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate min-w-0"
          title={mobile}
        >
          {mobile}
        </span>
      </div>
      <div className="flex items-center gap-1 min-w-0">
        <FaEnvelope className="text-[#257B5A] text-sm sm:text-base" />
        <span
          className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate min-w-0"
          title={email}
        >
          {email}
        </span>
      </div>
      <div className="flex items-center gap-1 min-w-0">
        <FaGlobe className="text-[#257B5A] text-sm sm:text-base" />
        <span
          className="text-[12px] sm:text-[14px] lg:text-[16px] text-gray-700 truncate min-w-0"
          title={website}
        >
          {website}
        </span>
      </div>
    </div>

    {/* Register Button */}
{/*     <button className="bg-[#257B5A] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full hover:bg-[#1e6b4a] transition-colors duration-300 font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0">
      📝 Register for Admission
    </button> */}
  </div>
</div>

            {/* Tab Navigation */}
            <div className="bg-white border rounded-lg mb-4 sm:mb-6 overflow-x-auto">
              <div className="flex border-b min-w-max sm:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-medium transition-colors duration-300 border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#257B5A] text-[#257B5A] bg-green-50'
                        : 'border-transparent text-gray-600 hover:text-[#257B5A] hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Left Column - Tab Content */}
              <div className="w-full lg:w-[65%] min-w-0">
                {renderTabContent()}
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-[35%] flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-0">
                {/* Nearby Schools - Horizontal Cards */}
                <div className="w-full bg-white border rounded-lg font-poppins pt-3 sm:pt-4 lg:pt-[25px] pb-3 sm:pb-4 lg:pb-[25px] px-3 sm:px-4 lg:px-6">
                  <h2 className="font-semibold font-poppins text-[13px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-black mb-2 sm:mb-3 lg:mb-4">
                    Nearby Schools
                  </h2>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {nearbyLoading ? (
                      <div className="text-gray-500 text-center py-4">Loading nearby schools...</div>
                    ) : nearbySchools.length === 0 ? (
                      <div className="text-gray-500 text-center py-4">No nearby schools found.</div>
                    ) : (
                     // Fixed code:
nearbySchools.map((s) => (
  <HorizontalSchoolCard
    key={s.id}
    name={s.name}
    image={s.profileImage || s.gallery?.[0] || '/Listing/Logo.png'}
    location={s.address?.city || ''}
    distance={s.distance || ''} // ✅ Use the distance from API
    rating={s.rating || s.reviews?.[0]?.rating || 0} // ✅ Also fixed rating
  />
))

                    )}
                  </div>
                </div>

                {/* Embedded Map */}
                <div className="w-full bg-white rounded-lg border pt-3 sm:pt-4 lg:pt-[25px] pb-3 sm:pb-4 lg:pb-[25px] px-3 sm:px-4 lg:px-[23px]">
                  <h4 className="font-medium font-poppins text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] text-black mb-2 sm:mb-3 lg:mb-4">
                    Explore Location
                  </h4>
                  <iframe
                    title="School Location"
                    src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="120"
                    className="rounded-lg border sm:h-[150px] lg:h-[200px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
