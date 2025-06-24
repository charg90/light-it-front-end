"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";
import type { Patient } from "@/app/types/patient.types";
import Image from "next/image";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      variant="white"
      className="relative hover:shadow-lg transition-all duration-300 cursor-pointer overflow-visible"
    >
      <div onClick={toggleExpanded} className="select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              {patient.documentUrl && (
                <Image
                  src={patient.documentUrl}
                  alt={`Document ${patient.fullName}`}
                  className="w-16 h-16 rounded-lg shadow-md object-cover"
                  width={64}
                  height={64}
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {patient.fullName}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isExpanded ? "Contraer" : "Expandir"}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className={`absolute left-0 right-0 top-full z-10 bg-white border border-gray-200 rounded-b-lg shadow-xl p-4 transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="space-y-4 px-2 max-h-80 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700">
              Contact Information
            </h4>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Mail size={16} className="mr-3 flex-shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-medium">{patient.email}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Phone size={16} className="mr-3 flex-shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium">{patient.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
