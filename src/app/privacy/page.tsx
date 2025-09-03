'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 text-sm">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[20px] shadow-lg p-8 border border-gray-200">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include your name, email address, phone number, and other contact information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and events.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Student Data Protection</h2>
            <p className="text-gray-700 mb-6">
              We take special care to protect student information in accordance with applicable education privacy laws. Student data is used solely for educational purposes and is not shared with third parties for commercial purposes.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. School Data Handling</h2>
            <p className="text-gray-700 mb-6">
              School information provided through our platform is used to help students make informed decisions about their education. Schools maintain control over their institutional data and can update or remove it at any time.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
            <p className="text-gray-700 mb-6">
              You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us to exercise these rights.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at privacy@sainik.com or through our contact form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}