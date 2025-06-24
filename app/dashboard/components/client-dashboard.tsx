import { Patient } from "@/app/types/patient.types";
import { PatientCard } from "@/components/patient-card";
import { Plus } from "lucide-react";
import React from "react";

type Props = {
  patients: Patient[];
};

function ClienteDashboard({ patients }: Props) {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          Patients ({patients.length})
        </h1>

        <button
          // onClick={handleAddPatient}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          style={{ backgroundColor: "#7345fc" }}
          aria-label="Agregar paciente"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}

export default ClienteDashboard;
