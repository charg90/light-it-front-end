// hooks/usePatientSubmission.ts
import { useState } from "react";
import { api } from "@/lib/api";
import { Patient } from "@/app/types/patient.types";
import {
  validateAreaCode,
  validateDocumentFile,
  validateFullName,
  validateGmailEmail,
  validatePhoneNumber,
} from "@/utils/validation";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  areaCode: string;
  documentFile: File | null;
}

interface UsePatientSubmissionResult {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileSelect: (file: File | null) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error" | "validating";
  resetFormAndStatus: () => void;
  savedPatient: Patient | null;
}

export function usePatientSubmission(
  initialData: FormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    documentFile: null,
    areaCode: "",
  }
): UsePatientSubmissionResult {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "validating"
  >("idle");
  const [savedPatient, setSavedPatient] = useState<Patient | null>(null);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nameError = validateFullName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateGmailEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;

    const fileError = validateDocumentFile(formData.documentFile);
    if (fileError) newErrors.documentFile = fileError;

    const areaCodeError = validateAreaCode(formData.areaCode);
    if (areaCodeError) newErrors.areaCode = areaCodeError;

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileSelect = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documentFile: file,
    }));

    if (errors.documentFile) {
      setErrors((prev) => ({
        ...prev,
        documentFile: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    setSubmitStatus("validating");
    setIsSubmitting(true);

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);

      return false;
    }

    setErrors({});

    try {
      const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append(
        "phoneNumber",
        formData.areaCode + formData.phoneNumber.trim()
      );

      if (formData.documentFile) {
        formPayload.append("documentFile", formData.documentFile);
      }

      const response = await api.post<{ patient: Patient }>(
        "/patients",
        formPayload
      );
      setSavedPatient(response.patient);

      setSubmitStatus("success");
      setIsSubmitting(false);
      return true;
    } catch (error) {
      let errorMessage = "Failed to save patient. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSubmitStatus("error");
      setIsSubmitting(false);

      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
      return false;
    }
  };

  const resetFormAndStatus = () => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitting(false);
    setSubmitStatus("idle");
  };

  return {
    formData,
    handleChange,
    handleFileSelect,
    handleSubmit,
    errors,
    savedPatient,
    isSubmitting,
    submitStatus,
    resetFormAndStatus,
  };
}
