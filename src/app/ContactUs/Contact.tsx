import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7F1EE]">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-4 md:py-6 lg:py-6">
        <p className="text-sm text-black font-light font-poppins leading-[150%]">
          Home / Contact Us
        </p>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-2 md:py-4 lg:py-6">
        <div className=" mx-auto relative">
          {/* Get in Touch Title and Description */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] text-black font-medium font-poppins leading-[150%] mb-4">
              Get in Touch
            </h1>
            <p className="text-[16px] sm:text-[18px] md :text-[20px] text-black font-medium font-poppins leading-[150%] max-w-[540px]">
              Have questions about admissions, academics, or campus life? Reach out to us — we're here to guide you at every step toward a brighter, disciplined future.
            </p>
          </div>

          {/* Contact Image - Positioned absolutely to match Figma */}
          <div className="absolute top-[0] right-5 w-[450px] h-[250px] hidden lg:block">
            <Image
              src="/student_dashboard/Contact.png"
              alt="A support agent at a laptop, ready to help."
              width={450}
              height={275}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Column - Contact Form */}
            <div className="w-full max-w-[510px] mt-[10px] lg:mt-[160px]">
              <div className="bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-lg p-4 sm:p-6 md:p-8">
                <form className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="name" className="block text-[18px] sm:text-[20px] md:text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter name" 
                      className="w-full h-[55px] md:h-[65px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[14px] md:text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="email" className="block text-[18px] sm:text-[20px] md:text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter email" 
                      className="w-full h-[55px] md:h-[65px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[14px] md:text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"  
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact" className="block text-[18px] sm:text-[20px] md:text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Contact Number
                    </label>
                    <input 
                      type="tel" 
                      id="contact" 
                      placeholder="Enter number" 
                      className="w-full h-[55px] md:h-[65px] px-[18px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[14px] md:text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="message" className="block text-[18px] sm:text-[20px] md:text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      placeholder="Enter message" 
                      className="w-full h-[140px] md:h-[179px] px-[18px] py-[21px] bg-[#E6F3E9] border-none rounded-[10px] text-black font-light font-poppins text-[14px] md:text-[16px] placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      type="submit" 
                      className="bg-[#10744E] text-white text-[16px] font-bold px-6 py-3 rounded-full hover:bg-green-800 transition"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Office Details */}
            <div className="w-full max-w-full ml-auto mt-8 md:mt-[120px] lg:mt-[160px]">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] text-black font-medium font-poppins leading-[150%]">
                  Office Address
                </h2>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <Image 
                      src="/student_dashboard/carbon_location-filled.png" 
                      alt="Location Pin Icon" 
                      width={24} 
                      height={24} 
                      className="flex-shrink-0 mt-1"
                    />
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-medium font-poppins leading-[150%]">
                      Xyz<br/>Xyz<br/>Xyz
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image 
                      src="/student_dashboard/ion_call.png" 
                      alt="Phone Icon" 
                      width={24} 
                      height={24} 
                      className="flex-shrink-0"
                    />
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-medium font-poppins leading-[150%]">
                      +91 9876543210
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image 
                      src="/student_dashboard/ic_baseline-email.png" 
                      alt="Email Icon" 
                      width={24} 
                      height={24} 
                      className="flex-shrink-0"
                    />
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-medium font-poppins leading-[150%]">
                      abc@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Image - Show only on mobile */}
          <div className="w-full max-w-[400px] mx-auto mt-6 md:mt-8 lg:hidden">
            <Image
              src="/student_dashboard/contact-us-img.jpg"
              alt="A support agent at a laptop, ready to help."
              width={400}
              height={275}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Google Maps Section */}
      <div className="w-full h-[300px] md:h-[450px] lg:h-[621px] mt-8 md:mt-14 mb-8 md:mb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d55498.32435514462!2d74.24264222148555!3d29.613996548192834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWard%20No.%2043%2C%20Near%20Bhatner%20Palace%2C%20%20Hanumangarh%20Town%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1752924439125!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;