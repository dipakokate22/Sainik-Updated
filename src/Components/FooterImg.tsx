import Image from "next/image";

const FooterImg = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-[1540px]">
        <Image
          src="/homePage/footer-img.png"
          alt="Footer Banner"
          width={1650}
          height={0} // height auto with layout='intrinsic'
          layout="intrinsic"
          priority
        />
      </div>
    </section>
  );
};

export default FooterImg;