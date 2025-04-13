"use client"; // บอก Next.js ว่าไฟล์นี้ใช้ Client-side React (เช่น useState, useRef ได้)

import Image from "next/image";
import React, { useRef, useState } from "react";

// 🧩 ประกาศ props ที่ component นี้จะรับ (อาจมี callback ชื่อ onFileChange)
interface DragAndDropProps {
  onFileChange?: (file: File) => void;
}

// ✅ เริ่มต้น Component
const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileChange }) => {
  // 📦 ใช้ useRef เพื่อเรียก input[type="file"] แบบซ่อน
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🎯 เก็บชื่อไฟล์ที่อัปโหลด
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // ❌ เก็บข้อความ error ถ้ามี
  const [error, setError] = useState<string | null>(null);

  // 🖼 เก็บ URL preview ของรูปภาพ
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 🔍 ฟังก์ชันตรวจสอบว่าไฟล์ถูกต้องหรือไม่
  const validateFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds the 10MB limit.");
      return false;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG or PNG files are allowed.");
      return false;
    }

    setError(null); // ✔ เคลียร์ error ถ้าผ่าน
    return true;
  };

  // 📥 handle drop (ลากไฟล์มาวาง)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setUploadedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // 🖼 สร้าง preview image URL
      onFileChange?.(file); // 🔁 ส่งกลับไปยัง parent component
      e.dataTransfer.clearData();
    }
  };

  // 🖱 คลิกพื้นที่ upload เพื่อเปิด file picker
  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  // 📂 handle file ที่มาจากการเลือกไฟล์ (ไม่ได้ drag)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setUploadedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onFileChange?.(file);
    }
  };

  return (
    <div>
      {/* 🔖 Label ส่วนหัว */}
      <label className="text-white font-semibold text-lg mb-4">
        Upload Avatar
      </label>

      {/* 🧲 กล่องอัปโหลดหลัก */}
      <div
        className="flex flex-col mt-2 w-100 h-60 border-2 border-dashed border-gray-500 rounded-2xl bg-gray-600/20
        items-center justify-center text-gray-400 hover:border-blue-500 hover:text-white cursor-pointer transition-colors relative overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={!previewUrl ? handleClick : undefined} // คลิกเปิดเลือกไฟล์ ถ้ายังไม่มี preview
      >
        {previewUrl ? (
          <>
            {/* 🖼 แสดง preview รูปภาพ */}
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-32 h-32 rounded-sm border-2 border-white shadow"
              />
            </div>
            {/* 🔄 ปุ่มเปลี่ยนรูป */}
            <button
              onClick={handleClick}
              className="absolute bottom-2 right-2 bg-white text-black text-xs px-3 py-1 rounded-md shadow hover:bg-blue-100"
            >
              Change Image
            </button>
          </>
        ) : (
          <>
            {/* 📥 Icon และข้อความ drag/drop */}
            <Image
              src="/assets/images/icon-upload.svg"
              alt="icon upload"
              width={40}
              height={40}
              className="w-10"
            />
            <span>Drag & Drop or Click to Upload</span>
          </>
        )}
      </div>

      {/* 📁 input แบบซ่อน */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* ✅ แสดงชื่อไฟล์ถ้าอัปโหลดแล้ว */}
      {uploadedFileName && !error && (
        <p className="mt-4 text-white text-sm">
          Uploaded: <span className="text-blue-400">{uploadedFileName}</span>
        </p>
      )}

      {/* 🧾 ข้อความแนะนำ (ถ้ายังไม่มีไฟล์และไม่มี error) */}
      {!uploadedFileName && !error && (
        <div className="flex flex-row mt-2 gap-2">
          <Image
            src="/assets/images/icon-info.svg"
            alt="icon info"
            width={20}
            height={20}
            className="w-5"
          />
          <p className="text-white text-sm text-center">
            Upload your photo (JPG or PNG, max size: 10MB)
          </p>
        </div>
      )}

      {/* ❌ แสดงข้อความ error ถ้ามี */}
      {error && (
        <p className="mt-4 text-red-500 text-sm">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default DragAndDrop;
