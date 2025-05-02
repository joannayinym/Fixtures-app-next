"use client";
import { useRef, useState } from "react";
import { ApiResponse } from "../types/ApiResponseType";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(e.target.files?.[0] || null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/fixtures/upload", {
        method: "POST",
        body: formData,
      });

      const data: ApiResponse = await res.json();
      if (data?.count && data.count > 0) {
        setMessage(data.message || data.error || "Unknown error");
      } else {
        setMessage("Duplicate data or no data found in the uploaded file.");
      }
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
      setFile(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="relative flex flex-col items-baseline pl-8 h-screen">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center -z-10" />
      <div className="absolute inset-0 bg-black opacity-30 -z-10" />
      <div className="py-6 font-bold text-black">
        <Link href={"/"} className="underline text-black hover:text-blue-800">
          Home
        </Link>
      </div>
      <h1 className="text-xl font-bold mb-4  text-black">Upload CSV File</h1>
      <div className="flex flex-col  justify-center items-baseline text-black">
        <div className="flex flex-row items-start gap-4 py-6">
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />

          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Select CSV File
          </button>

          {fileName && <p>Selected file: {fileName}</p>}
        </div>

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!fileName || loading}
        >
          Upload
        </button>
      </div>
      <div>{message && <p className="mt-4 text-red-600 ">{message}</p>}</div>
    </div>
  );
}
