"use client"; // บอก Next.js ว่าไฟล์นี้เป็น client component (ใช้ React hooks ได้)
import Image from "next/image";
import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { useRouter } from "next/navigation";
// สร้างคอมโพเนนต์ TicketForm
const TicketForm: React.FC = () => {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // ⭐ รับไฟล์ avatar
  const [emailError, setEmailError] = useState("");

  
  const handleAvatarChange = (file: File) => {
    setAvatarFile(file);
  };

  const handleGenerateClick = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (avatarFile) {
      const imageUrl = URL.createObjectURL(avatarFile);
      localStorage.setItem("avatarUrl", imageUrl);
    }

    router.push(
      `/ticketshow?fullname=${encodeURIComponent(
        fullname
      )}&email=${encodeURIComponent(email)}&github=${encodeURIComponent(
        github
      )}`
    );
  };

  return (
    <div className="">
      {/* ส่วนหัวของหน้า */}
      <div className="flex flex-col justify-center pt-5 text-center">
        <h1 className="text-white font-bold text-[52px]">
          Your Journey to Coding Conf <br />
          2025 Starts Here!
        </h1>
        <p className="text-gray-400">
          Secure your spot at next year&apos;s biggest coding conference.
        </p>
      </div>

      {/* ส่วนอัปโหลด Avatar */}
      <div className="mt-10 flex flex-col items-center ">
        <div className="">
          <DragAndDrop onFileChange={handleAvatarChange} />
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <div className="">
          {/* Fullname */}
          <label className="text-white font-semibold text-lg mb-4">
            Fullname
          </label>
          <div className="flex">
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border border-gray-400 rounded-sm mt-2 w-100 h-10 bg-gray-600/20 text-white px-2"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center ">
        <div className="">
          {/* Email */}
          <label className="text-white font-semibold text-lg mb-4">
            Email Address
          </label>
          <div className=" flex-col ">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded-sm mt-2 w-100 h-10 bg-gray-600/20 text-white px-2 ${
                emailError ? "border-red-500" : "border-gray-400"
              }`}
            />
            {emailError && (
              <div className="flex flex-row mt-2 gap-2">
              <Image
                          src="/assets/images/icon-info.svg"
                          alt="icon upload"
                          width={100}
                          height={100}
                          className="w-5"
                        />
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center ">
        <div className="">
          {/* Github */}
          <label className="text-white font-semibold text-lg mb-4">
            GitHub Username
          </label>
          <div className="flex">
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="border border-gray-400 rounded-sm mt-2 w-100 h-10 bg-gray-600/20 text-white px-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleGenerateClick}
          className="w-100 h-10 bg-white font-bold rounded-sm cursor-pointer"
        >
          Generate My Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketForm;
