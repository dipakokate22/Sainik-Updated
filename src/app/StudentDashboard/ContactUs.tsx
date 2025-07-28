import React from 'react';
import styles from './contact-us.module.css';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* 1. Empty space for navigation bar */}
      <div className={styles.navbarPlaceholder}></div>

      {/* 2. Home/Contact Us text */}
      <div className={styles.breadcrumbContainer}>
        <p className={styles.breadcrumbText}>Home / Contact Us</p>
      </div>

      {/* 3. Parent div element */}
      <div className={styles.mainContentContainer}>
        {/* a. Get in Touch text */}
        <h1 className={styles.getInTouchTitle}>Get in Touch</h1>

        {/* b. Paragraph */}
        <p className={styles.getInTouchParagraph}>
          Have questions about admissions, academics, or campus life? Reach out to us — we’re here to guide you at every step toward a brighter, disciplined future.
        </p>
        
        {/* c. contact-us-img */}
        <div className={styles.contactUsImageContainer}>
          <Image
            src="/images/contact-us-img.jpg"
            alt="A support agent at a laptop, ready to help."
            width={400}
            height={275}
          />
        </div>

        {/* d. Form div */}
        <div className={styles.formDiv}>
          <form>
            <label htmlFor="name" className={styles.formLabelName}>Your Name</label>
            <input type="text" id="name" className={styles.inputName} placeholder="Enter name" />

            <label htmlFor="email" className={styles.formLabelEmail}>Your Email</label>
            <input type="email" id="email" className={styles.inputEmail} placeholder="Enter email" />

            <label htmlFor="contact" className={styles.formLabelContact}>Contact Number</label>
            <input type="tel" id="contact" className={styles.inputContact} placeholder="Enter number" />

            <label htmlFor="message" className={styles.formLabelMessage}>Message</label>
            <textarea id="message" className={styles.textareaMessage} placeholder="Enter message"></textarea>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>

        {/* e. Office details div */}
        <div className={styles.officeDetailsDiv}>
          <h2 className={styles.officeAddressTitle}>Office Address</h2>
          
          <div className={styles.addressLine}>
            <Image src="/images/carbon_location-filled.png" alt="Location Pin Icon" width={24} height={24} className={styles.iconLocation} />
            <p className={styles.addressText}>Xyz<br/>Xyz<br/>Xyz</p>
          </div>

          <div className={styles.phoneLine}>
            <Image src="/images/ion_call.png" alt="Phone Icon" width={24} height={24} className={styles.iconPhone} />
            <p className={styles.phoneText}>+91 9876543210</p>
          </div>

          <div className={styles.emailLine}>
            <Image src="/images/ic_baseline-email.png" alt="Email Icon" width={24} height={24} className={styles.iconEmail} />
            <p className={styles.emailText}>abc@gmail.com</p>
          </div>
        </div>
      </div>
      
      {/* 4. Google Maps iframe */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d55498.32435514462!2d74.24264222148555!3d29.613996548192834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWard%20No.%2043%2C%20Near%20Bhatner%20Palace%2C%20%20Hanumangarh%20Town%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1752924439125!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.mapIframe}
        ></iframe>
      </div>

      {/* 5. Empty footer section */}
      <div className={styles.footerPlaceholder}></div>
    </div>
  );
};

export default ContactUs;
