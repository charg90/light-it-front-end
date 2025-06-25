"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  error?: string;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept = ".jpg,.jpeg",
  maxSize = 5,
  error,
  className = "",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (
      !file.type.startsWith("image/jpeg") &&
      !file.name.toLowerCase().endsWith(".jpg")
    ) {
      return "Solo se permiten archivos .jpg";
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `El archivo debe ser menor a ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setSelectedFile(file);
    setUploadError("");
    onFileSelect(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadError("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayError = error || uploadError;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative
          w-full
          min-h-[120px]
          p-4
          bg-gray-800
          border-2
          border-dashed
          rounded-lg
          transition-all
          duration-200
          cursor-pointer
          ${isDragOver ? "border-white bg-gray-700" : "border-gray-300"}
          ${displayError ? "border-red-400" : ""}
          ${selectedFile ? "border-green-400" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <Upload size={32} className="text-gray-400 mb-3" />
            <p className="text-white font-medium mb-1">
              {isDragOver ? "Drop Image" : "Drag and drop an image here"}
            </p>

            <p className="text-gray-500 text-xs">
              Only .jpg (máx. {maxSize}MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {preview && (
              <div className="flex-shrink-0">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <FileImage size={16} className="text-green-400 mr-2" />
                <p className="text-white font-medium truncate">
                  {selectedFile.name}
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Eliminar archivo"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {displayError && (
        <div className="flex items-center mt-2 text-red-400 animate-bounce text-sm">
          <AlertCircle size={16} className="mr-2" />
          {displayError}
        </div>
      )}
    </div>
  );
}
