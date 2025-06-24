"use client";

import type React from "react";
import { useState } from "react";
import { Modal } from "./ui/modal";
import { ModalFooter } from "./ui/modal-footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileUpload } from "./ui/file-upload";
import {
  validateDocumentFile,
  validateFullName,
  validateGmailEmail,
  validatePhoneNumber,
} from "@/utils/validation";
import { api } from "@/lib/api";
import { Patient } from "@/app/types/patient.types";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: any) => void;
}

export function AddPatientModal({
  isOpen,
  onClose,
  onSave,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    documentFile: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("phoneNumber", formData.phoneNumber);

      if (formData.documentFile) {
        formPayload.append("documentFile", formData.documentFile);
      }

      const response = await api.post<{ patient: Patient }>(
        "/patients",
        formPayload
      );

      onSave(response.patient);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        documentFile: null,
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error saving patient:", error);
    }
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
            placeholder="E.g. john@example.com"
            required
            error={errors.email}
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="E.g. +1 234 567 8900"
            required
            error={errors.phoneNumber}
          />

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
          >
            Save Patient
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
