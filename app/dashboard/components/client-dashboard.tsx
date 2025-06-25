"use client";
import { Patient } from "@/app/types/patient.types";
import { AddPatientModal } from "@/components/add-patient-modal";
import { PatientCard } from "@/components/patient-card";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  initialPatients: Patient[];
};

function ClienteDashboard({ initialPatients }: Props) {
  const [patients, setPatients] = useState(initialPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleSavePatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          Patients ({patients.length})
        </h1>

        <div className="flex items-center space-x-4">
          <span className="text-white text-xl font-medium">Add Patient</span>{" "}
          <button
            onClick={handleAddPatient}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-[#7345fc]"
            aria-label="Agregar paciente"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="text-center text-white text-lg flex items-center justify-center mt-64">
          No patients. Please add a new patient.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePatient}
      />
    </div>
  );
}

export default ClienteDashboard;
