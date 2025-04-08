import Image from "next/image";
import TicketForm from "./components/TicketForm";

const page = () => {
  return (
    <div
      className="
    bg-[url('/assets/images/background-mobile.png')]   // default: mobile
    sm:bg-[url('/assets/images/background-tablet.png')] // ≥640px
    md:bg-[url('/assets/images/background-desktop.png')] // ≥768px
    bg-cover bg-center w-screen h-screen 
  "
    >
      {/* <div
        className="
  bg-[url('/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg')]
  md:bg-[url('/assets/images/pattern-squiggly-line-bottom-desktop.svg')]
  bg-left-bottom bg-no-repeat
  bg-[length:200px] md:bg-[length:400px] lg:bg-[length:800px]
  w-screen h-screen
"
      > */}
        
          <div className="flex justify-center pt-5 ">
            <Image
              src="/assets/images/logo-full.svg"
              alt=""
              width={100}
              height={100}
              className="w-30"
            />
          </div>
          <TicketForm />
        </div>
      
    
  );
};
export default page;
