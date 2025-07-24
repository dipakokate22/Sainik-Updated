import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Your School | Sainik School',
  description: 'Be a part of our site and add your school for free.',
};

const AddSchoolPage = () => {
  return (
    <main className="bg-[#F7F1EE] px-4 md:px-10 lg:px-[120px] py-10 lg:py-[80px] min-h-screen max-w-full flex flex-col items-center  mb-[80px]">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-[26px] md:text-[30px] lg:text-[32px] font-medium text-gray-800">
          Be a part of Our Site
        </h1>
        <h2 className="text-[26px] md:text-[30px] lg:text-[32px] font-medium text-gray-800">
          Add Your School For Free!!
        </h2>
      </header>

      {/* White Form Container */}
      <div className="bg-white w-full max-w-[1200px] min-h-[900px] p-4 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col">
        <form className="flex-grow flex flex-col">
          {/* School Information Section */}
          <section className="mb-8">
            <h3 className="text-[22px] md:text-[24px] font-normal text-gray-700 mb-4">
              School Information
            </h3>
            <hr className="border-t-[1.5px] border-[#1E6741] mb-6" />

            <div className="mb-6 w-full">
              <label htmlFor="schoolName" className="block text-[16px] font-normal text-gray-600 mb-2">
                School Name
              </label>
              <input
                type="text"
                id="schoolName"
                className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
              />
            </div>

            <div className="mb-6 w-full">
              <label htmlFor="schoolAddress" className="block text-[16px] font-normal text-gray-600 mb-2">
                Address of the School
              </label>
              <input
                type="text"
                id="schoolAddress"
                className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
              <div className="w-full md:w-[48%]">
                <label htmlFor="officialContact" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Official Contact Number
                </label>
                <input
                  type="tel"
                  id="officialContact"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full md:w-[48%]">
                <label htmlFor="officialEmail" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Official Email Id
                </label>
                <input
                  type="email"
                  id="officialEmail"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section className="mb-[30px]">
            <h3 className="text-[22px] md:text-[24px] font-normal text-gray-700 mb-4">
              Contact Information
            </h3>
            <hr className="border-t-[1.5px] border-[#1E6741] mb-6" />

            <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-6 w-full">
              <div className="w-full md:w-[48%]">
                <label htmlFor="contactName" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full md:w-[48%]">
                <label htmlFor="designation" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
              <div className="w-full md:w-[48%]">
                <label htmlFor="mobileNumber" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
              <div className="w-full md:w-[48%]">
                <label htmlFor="contactEmail" className="block text-[16px] font-normal text-gray-600 mb-2">
                  Email Id
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="w-full h-[58px] bg-[#E6F3E9] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[#1E6741]"
                />
              </div>
            </div>
          </section>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Terms and Submit */}
          <div>
            <div className="flex items-start mb-[50px] w-full">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 appearance-none bg-[#E6F3E9] rounded-sm checked:bg-[#1E6741] focus:outline-none cursor-pointer"
              />
              <label htmlFor="terms" className="ml-3 text-[16px] font-normal text-gray-600 cursor-pointer">
                Accept the Terms And Condition.
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#1E6741] text-white w-[220px] md:w-[260px] lg:w-[300px] h-[60px] md:h-[66px] text-[22px] md:text-[26px] lg:text-[32px] font-regular hover:bg-opacity-90 transition-colors"
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