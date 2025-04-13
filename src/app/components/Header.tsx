import React from "react";
import Image from "next/image";
const Header = () => {
  return (
    
      <div className="flex justify-center pt-5 ">
        <Image
          src="/assets/images/logo-full.svg"
          alt=""
          width={100}
          height={100}
          className="w-30"
        />
      </div>
    
  );
};

export default Header;
