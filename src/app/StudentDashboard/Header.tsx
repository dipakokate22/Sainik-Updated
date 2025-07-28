import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const Header = () => {
  return (
    <div className={poppins.className}>
      <div className="absolute top-[16px] left-[37px] w-[30px] h-[30px] cursor-pointer">
        <div className="absolute top-[6px] left-[4px] w-[22px] h-[17px]">
          <Image src="/images/ci_hamburger-md.png" alt="Menu" layout="fill" style={{color: '#6C6B6B'}}/>
        </div>
      </div>
      
      <div className="absolute top-[13px] right-[17.5px] w-[73px] h-[30px] flex items-center justify-between">
        <div className="relative w-[30px] h-[30px] cursor-pointer">
          <Image src="/images/bell-dot.png" alt="Notifications" layout="fill" objectFit="none" />
        </div>
        <div className="relative w-[30px] h-[30px] cursor-pointer">
          <Image src="/images/settings.png" alt="Settings" layout="fill" objectFit="none" />
        </div>
      </div>
      
      <div className="absolute top-[56px] w-full border-t border-[#ACA9A9]"></div>
    </div>
  );
};

export default Header;