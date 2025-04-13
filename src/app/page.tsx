
import TicketForm from "./components/TicketForm";

import Header from "./components/Header";
const page = () => {
  return (
    <div
      className="
   bg-black w-screen min-h-screen
  "
    >
      <Header />
      <TicketForm/>
     
    </div>
  );
};
export default page;
