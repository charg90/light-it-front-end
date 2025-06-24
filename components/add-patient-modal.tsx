"use client";

import type React from "react";
import { Modal } from "./ui/modal";
import { ModalFooter } from "./ui/modal-footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileUpload } from "./ui/file-upload";
import { usePatientSubmission } from "@/hooks/use-patient-submission";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "./confirmation-modal";
import { Patient } from "@/app/types/patient.types";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}

export function AddPatientModal({
  isOpen,
  onClose,
  onSave,
}: AddPatientModalProps) {
  const {
    formData,
    handleChange,
    handleFileSelect,
    handleSubmit,
    errors,
    savedPatient,
    isSubmitting,
    submitStatus,
    resetFormAndStatus,
  } = usePatientSubmission();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationType, setConfirmationType] = useState<"success" | "error">(
    "success"
  );

  const handleCloseAddPatientModal = () => {
    resetFormAndStatus();
    onClose();
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);

    if (confirmationType === "success") {
      handleCloseAddPatientModal();
    } else {
    }
  };

  useEffect(() => {
    if (submitStatus === "success") {
      setConfirmationType("success");
      setConfirmationMessage("Patient added successfully!");
      setIsConfirmationModalOpen(true);
      if (savedPatient) {
        onSave(savedPatient);
      }
    } else if (submitStatus === "error") {
      setConfirmationType("error");
      setConfirmationMessage(
        errors.submit || "Failed to add patient.An error occur please try again"
      );
      setIsConfirmationModalOpen(true);
    }
  }, [submitStatus, errors.submit, savedPatient]);

  //   fullName: "",
  //   email: "",
  //   phoneNumber: "",
  //   documentFile: null as File | null,
  // });

  // const [errors, setErrors] = useState<Record<string, string>>({});

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};

  //   const nameError = validateFullName(formData.fullName);
  //   if (nameError) newErrors.fullName = nameError;

  //   const emailError = validateGmailEmail(formData.email);
  //   if (emailError) newErrors.email = emailError;

  //   const phoneError = validatePhoneNumber(formData.phoneNumber);
  //   if (phoneError) newErrors.phoneNumber = phoneError;

  //   const fileError = validateDocumentFile(formData.documentFile);
  //   if (fileError) newErrors.documentFile = fileError;

  //   return newErrors;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const validationErrors = validateForm();

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   try {
  //     const formPayload = new FormData();

  //     formPayload.append("fullName", formData.fullName);
  //     formPayload.append("email", formData.email);
  //     formPayload.append("phoneNumber", formData.phoneNumber);

  //     if (formData.documentFile) {
  //       formPayload.append("documentFile", formData.documentFile);
  //     }

  //     const response = await api.post<{ patient: Patient }>(
  //       "/patients",
  //       formPayload
  //     );

  //     onSave(response.patient);

  //     setFormData({
  //       fullName: "",
  //       email: "",
  //       phoneNumber: "",
  //       documentFile: null,
  //     });
  //     setErrors({});
  //     onClose();
  //   } catch (error) {
  //     console.error("Error saving patient:", error);
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   if (errors[name]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [name]: "",
  //     }));
  //   }
  // };

  // const handleFileSelect = (file: File | null) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     documentFile: file,
  //   }));

  //   if (errors.documentFile) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       documentFile: "",
  //     }));
  //   }
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Patient" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="E.g. John Doe"
            required
            error={errors.fullName}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E.g. john@gmail.com"
            required
            error={errors.email}
          />
          <div className="flex gap-2">
            <Input
              label="Area Code"
              name="areaCode"
              type="tel"
              value={formData.areaCode}
              onChange={handleChange}
              placeholder="E.g. +1 "
              required
              error={errors.areaCode}
              className="w-auto"
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="E.g. 234 567 8900"
              required
              error={errors.phoneNumber}
              className="flex-grow"
            />
          </div>

          <FileUpload
            onFileSelect={handleFileSelect}
            accept=".jpg,.jpeg"
            maxSize={5}
            error={errors.documentFile}
          />
        </div>

        <ModalFooter>
          <Button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Patient"}
          </Button>
        </ModalFooter>
      </form>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
        type={confirmationType}
        message={confirmationMessage}
      />
    </Modal>
  );
}
