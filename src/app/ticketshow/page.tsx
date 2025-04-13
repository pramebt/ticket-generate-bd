
import TicketShow from "../components/TicketShow";
import Header from "../components/Header";

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
      <Header />
      <TicketShow/>

    </div>
  );
};
export default page;
