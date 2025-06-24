"use client";

import type React from "react";
import { useState } from "react";
import { Modal } from "./ui/modal";
import { ModalFooter } from "./ui/modal-footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    documentUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "El teléfono es requerido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: Date.now().toString(),
      ...formData,
    });

    setFormData({ fullName: "", email: "", phoneNumber: "", documentUrl: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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

          <Input
            label="Document URL"
            name="documentUrl"
            type="url"
            value={formData.documentUrl}
            onChange={handleChange}
            placeholder="E.g. https://example.com/document.pdf"
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
