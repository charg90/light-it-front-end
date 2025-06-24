import { getPatients } from "@/lib/get-patients";
import React from "react";

async function dashboard() {
  const patients = await getPatients();
  console.log(patients);
  return <div>page</div>;
}

export default dashboard;
