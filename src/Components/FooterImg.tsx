import Image from "next/image";

const FooterImg = () => {
  return (
    <section className="w-full">
      <div className="w-full relative">
        <Image
          src="/homePage/footer-img.png"
          alt="Footer Banner"
          width={1650}
          height={400} // Set a reasonable height
          className="w-full h-auto object-cover"
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </section>
  );
};

export default FooterImg;