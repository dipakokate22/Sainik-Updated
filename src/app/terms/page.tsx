'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function TermsPage() {
  const searchParams = useSearchParams();
  const from = searchParams?.get('from') ?? null;
  const backHref = from === 'signup' ? '/signup' : '/';
  return (
    <div className="min-h-screen bg-[#F7F1EE] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <Image
              src="/Image/Sainik-logo.png"
              alt="Sainik Logo"
              width={160}
              height={53}
              className="w-[140px] sm:w-[160px]"
            />
          </Link>
        </div>
        {/* Header */}
        <div className="bg-white rounded-[20px] shadow-lg p-8 mb-8 border border-gray-200">
          <div className="mb-6">
            <Link href={backHref} className="flex items-center text-[#257B5A] hover:underline">
              <FaArrowLeft className="mr-2" size={14} />
              <span className="text-sm">{from === 'signup' ? 'Back to Sign Up' : 'Back to Home'}</span>
            </Link>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-[#257B5A] via-[#1e6347] to-[#257B5A] rounded-full mb-6"></div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600 text-sm">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[20px] shadow-lg p-8 border border-gray-200">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using the Sainik platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-6">
              Permission is granted to temporarily use Sainik for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-6">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Student and School Responsibilities</h2>
            <p className="text-gray-700 mb-6">
              Students and schools using our platform agree to provide accurate information about academic programs, admission requirements, and other relevant details. Misrepresentation of information is strictly prohibited.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-700 mb-6">
              You may not use our service for any unlawful purpose, to solicit others to perform unlawful acts, to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at legal@sainik.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}