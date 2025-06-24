import { getPatients } from "@/lib/get-patients";
import React, { Suspense } from "react";
import ClienteDashboard from "./components/client-dashboard";

import DashboardLoading from "./loading";

async function dashboard() {
  const patients = await getPatients();

  return (
    <Suspense fallback={<DashboardLoading />}>
      <ClienteDashboard patients={patients} />;
    </Suspense>
  );
}

export default dashboard;
