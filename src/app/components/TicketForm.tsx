"use client"; // บอก Next.js ว่าไฟล์นี้เป็น client component (ใช้ React hooks ได้)

import Image from "next/image";
import React, { useRef, useState } from "react";

// สร้างคอมโพเนนต์ TicketForm
const TicketForm: React.FC = () => {
  // สร้าง ref สำหรับ input file เพื่อให้เราสั่งคลิกได้จาก div
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // เก็บชื่อไฟล์ที่อัปโหลดไว้แสดงผล
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // ฟังก์ชันเมื่อมีการ drag แล้ว drop ไฟล์ลงกล่อง
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault(); // ป้องกัน default behavior ของเบราว์เซอร์
    const file = e.dataTransfer.files?.[0]; // ดึงไฟล์ที่ถูก drop
    if (file) {
      setUploadedFileName(file.name); // บันทึกชื่อไฟล์เพื่อแสดง
      e.dataTransfer.clearData(); // เคลียร์ข้อมูล
    }
  };

  // ฟังก์ชันเมื่อผู้ใช้คลิกกล่อง ให้เปิด input file
  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  // ฟังก์ชันเมื่อมีการเลือกไฟล์จากการคลิก
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name); // บันทึกชื่อไฟล์เพื่อแสดง
    }
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
          Secure your spot at next year's biggest coding conference.
        </p>
      </div>

      {/* ส่วนอัปโหลด Avatar */}
      <div className="mt-10 flex flex-col items-center ">
        <div className="">
          {/* ป้าย Upload */}
          <label className="text-white font-semibold text-lg mb-4">
            Upload Avatar
          </label>

          {/* กล่อง Drag & Drop */}

          <div
            className="flex flex-col mt-2 w-100 h-30 border-2 border-dashed border-gray-500 rounded-2xl bg-gray-600/20
             items-center justify-center text-gray-400 hover:border-blue-500 hover:text-white cursor-pointer transition-colors"
            onDragOver={(e) => e.preventDefault()} // ให้กล่องรับการ drag ได้
            onDrop={handleDrop} // เมื่อปล่อยไฟล์ในกล่อง
            onClick={handleClick} // เมื่อคลิกที่กล่อง
          >
            <Image
              src="/assets/images/icon-upload.svg"
              alt="icon upload"
              width={100}
              height={100}
              className="w-10"
            />
            <span>Drag & Drop or Click to Upload</span>
          </div>
          {/* input file ที่ซ่อนอยู่ */}
          <input
            type="file"
            ref={fileInputRef} // ใช้ ref เพื่อสั่งคลิกจากกล่อง
            onChange={handleFileChange} // เมื่อเลือกไฟล์จากเครื่อง
            className="hidden"
            accept="image/*" // จำกัดให้อัปโหลดเฉพาะไฟล์ภาพ
          />

          {/* แสดงชื่อไฟล์ถ้ามีการอัปโหลด */}
          {uploadedFileName && (
            <p className="mt-4 text-white text-sm">
              Uploaded:{" "}
              <span className="text-blue-400">{uploadedFileName}</span>
            </p>
          )}

          {/* ข้อความแนะนำเมื่อยังไม่ได้อัปโหลดไฟล์ */}
          {!uploadedFileName && (
            <div className="flex flex-row mt-2 gap-2">
              <Image
                src="/assets/images/icon-info.svg"
                alt="icon upload"
                width={100}
                height={100}
                className="w-5"
              />
              <p className=" text-white text-sm text-center">
                Upload your photo (JPG or PNG, max size: 500kB)
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <div className="">
          {/* Fullname */}
          <label className="text-white font-semibold text-lg mb-4">
            Fullname
          </label>
          <div className="border border-gray-400 rounded-sm mt-2 w-100 h-10 bg-gray-600/20">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center ">
        <div className="">
          {/* Email */}
          <label className="text-white font-semibold text-lg mb-4">
            Email Address
          </label>
          <div className="border border-gray-400 rounded-sm mt-2 w-100 h-10 bg-gray-600/20">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center ">
        <div className="">
          {/* Github */}
          <label className="text-white font-semibold text-lg mb-4">
            GitHub Username
          </label>
          <div className="border border-gray-400 rounded-sm mt-2 w-100 h-10 bg-gray-600/20">
            <input type="text" />
          </div>
        </div>
      </div>
       <div className="flex justify-center mt-5"> 
      <button className="w-100 h-10 bg-amber-600 rounded-sm font-bold">Generate My Ticket</button>
      </div>  
    </div>
  );
};

export default TicketForm;
