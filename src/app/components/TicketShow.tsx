"use client"; // Mark as a client-side component
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Ticket from '../components/Ticket';

const TicketShow = () => {
 const searchParams = useSearchParams();
     const fullname = searchParams.get("fullname");
     const email = searchParams.get("email");
     const github = searchParams.get("github");

  return (
    <div>
      {/*ส่วนหัวของหน้า*/}
      <div className="flex flex-col justify-center pt-5 text-center">
        <h1 className="text-white font-bold text-[52px]">
          Congrats, <span className="text-linear-gradient">{fullname}</span> Your ticket is ready.
        </h1>
        <p className="text-gray-400">
          We've emailed you ticket to <h1 className="text-orange-500">{email}</h1> and will send updates in the run-up to the event.
        </p>
      </div>

      <Ticket />
    </div>
  );
};

export default TicketShow;
