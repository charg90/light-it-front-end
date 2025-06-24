import { Patient } from "@/app/types/patient.types";
import { api } from "./api";

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get<{ patients: Patient[] }>("/patients");

    return response.patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw new Error("Failed to fetch patients");
  }
};
