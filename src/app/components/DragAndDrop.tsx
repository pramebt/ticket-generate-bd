"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface DragAndDropProps {
  onFileChange?: (file: File) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validate file size and type
  const validateFile = (file: File) => {
    // Change the size limit to 10 MB (10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds the 10MB limit.");
      return false;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG or PNG files are allowed.");
      return false;
    }

    setError(null); // Clear error message
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setUploadedFileName(file.name);
      onFileChange?.(file); // 🔥 ส่งไฟล์กลับไปยัง TicketForm
      e.dataTransfer.clearData();
    }
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setUploadedFileName(file.name);
      onFileChange?.(file); // 🔥 ส่งไฟล์กลับไปยัง TicketForm
    }
  };

  return (
    <div>
      <label className="text-white font-semibold text-lg mb-4">
        Upload Avatar
      </label>

      <div
        className="flex flex-col mt-2 w-100 h-30 border-2 border-dashed border-gray-500 rounded-2xl bg-gray-600/20
       items-center justify-center text-gray-400 hover:border-blue-500 hover:text-white cursor-pointer transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
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

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {uploadedFileName && (
        <p className="mt-4 text-white text-sm">
          Uploaded: <span className="text-blue-400">{uploadedFileName}</span>
        </p>
      )}

      {!uploadedFileName && !error && (
        <div className="flex flex-row mt-2 gap-2">
          <Image
            src="/assets/images/icon-info.svg"
            alt="icon upload"
            width={100}
            height={100}
            className="w-5"
          />
          <p className="text-white text-sm text-center">
            Upload your photo (JPG or PNG, max size: 10MB)
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default DragAndDrop;
