"use client"; // Mark as a client-side component
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Ticket from '../components/Ticket';

const TicketShowContent = () => {
  const searchParams = useSearchParams();
  const fullname = searchParams.get("fullname");
  const email = searchParams.get("email");

  return (
    <div>
      {/* ส่วนหัวของหน้า */}
      <div className="flex flex-col justify-center pt-5 text-center">
        <h1 className="text-white font-bold text-[52px]">
          Congrats, <span className="text-linear-gradient">{fullname}</span> Your ticket is ready.
        </h1>
        <p className="text-gray-400">
          We&apos;ve emailed you ticket to <span className="text-orange-500">{email}</span> and will send updates in the run-up to the event.
        </p>
      </div>

      <Ticket />
    </div>
  );
};

// ห่อหุ้มด้วย Suspense สำหรับการโหลดข้อมูลใน Client Side
const TicketShow = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketShowContent />
    </Suspense>
  );
};

export default TicketShow;
