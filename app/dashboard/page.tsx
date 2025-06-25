import { getPatients } from "@/lib/get-patients";
import React, { Suspense } from "react";
import ClienteDashboard from "./components/client-dashboard";

import DashboardLoading from "./loading";

export const dynamic = "force-dynamic";

async function dashboard() {
  const patients = await getPatients();

  return (
    <Suspense fallback={<DashboardLoading />}>
      <ClienteDashboard initialPatients={patients} />
    </Suspense>
  );
}

export default dashboard;
