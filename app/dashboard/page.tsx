import { getPatients } from "@/lib/get-patients";
import React, { Suspense } from "react";
import ClienteDashboard from "./components/client-dashboard";

import DashboardLoading from "./loading";

async function dashboard() {
  const patients = await getPatients();

  if (patients.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">
          No patients found. Please add a patient.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<DashboardLoading />}>
      <ClienteDashboard initialPatients={patients} />
    </Suspense>
  );
}

export default dashboard;
