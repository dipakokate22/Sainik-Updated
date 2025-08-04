'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Your School | Sainik School',
  description: 'Be a part of our site and add your school for free.',
};

const AddSchoolPage = () => {
  return (
    <main className="bg-[#F7F1EE] px-4 sm:px-6 md:px-10 lg:px-[120px] lg:pt-[50px] pb-[80px] min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="text-center mb-10 px-2">
        <h1 className="text-[48px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-medium text-gray-800">
          Be a part of Our Site
        </h1>
        <h2 className="text-[48px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-medium text-gray-800">
          Add Your School For Free!!
        </h2>
      </header>

      {/* Form Box */}
      <div className="bg-white w-full max-w-[1200px] min-h-[900px] p-4 sm:p-6 md:p-10 lg:p-12 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col">
        <form className="flex-grow flex flex-col">
          {/* School Information */}
          <section className="mb-8">
            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-normal text-gray-700 mb-4">
              School Information
            </h3>
            <hr className="border-t-[1.5px] border-[#1E6741] mb-6" />

            <div className="mb-6 w-full">
              <label htmlFor="schoolName" className="block text-[15px] font-medium text-gray-600 mb-2">
                School Name
              </label>
              <input
                type="text"
                id="schoolName"
                className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
              />
            </div>

            <div className="mb-6 w-full">
              <label htmlFor="schoolAddress" className="block text-[15px] font-medium text-gray-600 mb-2">
                Address of the School
              </label>
              <input
                type="text"
                id="schoolAddress"
                className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
              <div className="w-full">
                <label htmlFor="officialContact" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Official Contact Number
                </label>
                <input
                  type="tel"
                  id="officialContact"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="officialEmail" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Official Email ID
                </label>
                <input
                  type="email"
                  id="officialEmail"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-[30px]">
            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-normal text-gray-700 mb-4">
              Contact Information
            </h3>
            <hr className="border-t-[1.5px] border-[#1E6741] mb-6" />

            <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-6 w-full">
              <div className="w-full">
                <label htmlFor="contactName" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="designation" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
              <div className="w-full">
                <label htmlFor="mobileNumber" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full">
                <label htmlFor="contactEmail" className="block text-[15px] font-medium text-gray-600 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="w-full h-[50px] sm:h-[54px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>
          </section>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Terms & Submit */}
          <div>
            <div className="flex items-start mb-6 sm:mb-10">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 bg-[#E6F3E9] rounded-sm checked:bg-[#1E6741] focus:outline-none cursor-pointer"
              />
              <label htmlFor="terms" className="ml-3 text-[15px] font-medium text-gray-600 cursor-pointer">
                Accept the Terms and Conditions.
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#10744E] text-white text-[16px] font-medium px-6 py-3 rounded-full hover:bg-green-800 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddSchoolPage;
