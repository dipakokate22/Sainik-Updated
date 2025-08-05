import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7F1EE]">
      {/* Breadcrumb */}
      <div className="w-full px-4 sm:px-6 lg:px-20 pt-8">
        <p className="text-[17px] text-black font-light font-poppins leading-[150%]">
          Home / Contact Us
        </p>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-20 pt-8 pb-10">
        <div className="max-w-[1280px] mx-auto relative">
          {/* Get in Touch Title and Description */}
          <div className="mb-8">
            <h1 className="text-[48px] text-black font-medium font-poppins leading-[150%] mb-4">
              Get in Touch
            </h1>
            <p className="text-[20px] text-black font-medium font-poppins leading-[150%] max-w-[540px]">
              Have questions about admissions, academics, or campus life? Reach out to us — we're here to guide you at every step toward a brighter, disciplined future.
            </p>
          </div>

          {/* Contact Image - Positioned absolutely to match Figma */}
          <div className="absolute top-[0] right-20 w-[450px] h-[250px] hidden lg:block">
            <Image
              src="/student_dashboard/Contact.png"
              alt="A support agent at a laptop, ready to help."
              width={450}
              height={275}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-16 items-start ">
            {/* Left Column - Contact Form */}
            <div className="w-full max-w-[510px] mt-[10px] lg:mt-[160px]">
              <div className="bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-lg p-8">
                <form className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter name" 
                      className="w-full h-[65px] px-[18px] bg-[#DAEADD] border-none rounded-[10px] text-black font-light font-poppins text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter email" 
                      className="w-full h-[65px] px-[18px] bg-[#DAEADD] border-none rounded-[10px] text-black font-light font-poppins text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="contact" className="block text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Contact Number
                    </label>
                    <input 
                      type="tel" 
                      id="contact" 
                      placeholder="Enter number" 
                      className="w-full h-[65px] px-[18px] bg-[#DAEADD] border-none rounded-[10px] text-black font-light font-poppins text-[16px] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="block text-[24px] text-black font-bold font-poppins leading-[150%] pl-2">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      placeholder="Enter message" 
                      className="w-full h-[179px] px-[18px] py-[21px] bg-[#DAEADD] border-none rounded-[10px] text-black font-light font-poppins text-[16px] placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-[#10744E]"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full h-[65px] bg-[#10744E] text-white font-bold font-poppins text-[24px] leading-[150%] rounded-[10px] border-none cursor-pointer hover:bg-[#0d5d3e] transition-colors duration-200"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Office Details */}
            <div className="w-full max-w-full ml-auto mt-[160px] lg:mt-[160px]">
              <div className="space-y-6">
                <h2 className="text-[48px] text-black font-medium font-poppins leading-[150%]">
                  Office Address
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Image 
                      src="/student_dashboard/carbon_location-filled.png" 
                      alt="Location Pin Icon" 
                      width={24} 
                      height={24} 
                      className="flex-shrink-0 mt-1"
                    />
                    <p className="text-[20px] text-black font-medium font-poppins leading-[150%]">
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
                    <p className="text-[20px] text-black font-medium font-poppins leading-[150%]">
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
                    <p className="text-[20px] text-black font-medium font-poppins leading-[150%]">
                      abc@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Image - Show only on mobile */}
          <div className="w-full max-w-[400px] mx-auto mt-8 lg:hidden">
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
      <div className="w-full h-[450px] lg:h-[621px] mt-14 mb-16">
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