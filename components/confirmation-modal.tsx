"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Modal } from "./ui/modal";
import { ModalFooter } from "./ui/modal-footer";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "warning";
  title?: string;
  message: string;
  confirmText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  confirmText = "OK",
  showCancelButton = false,
  onConfirm,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const getIcon = () => {
    // We now apply the 'animate-bounce-subtle' class defined in global CSS
    const iconClasses = "mx-auto mb-4 animate-bounce-subtle";

    switch (type) {
      case "success":
        return (
          <CheckCircle size={48} className={`text-green-400 ${iconClasses}`} />
        );
      case "error":
        return <XCircle size={48} className={`text-red-400 ${iconClasses}`} />;
      case "warning":
        return (
          <AlertTriangle
            size={48}
            className={`text-yellow-400 ${iconClasses}`}
          />
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (title) return title;

    switch (type) {
      case "success":
        return "Success!";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      default:
        return "Notification";
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "error":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      default:
        return "bg-white text-purple-600 hover:bg-gray-100";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      size="sm"
      closeOnOverlayClick={!showCancelButton}
      closeOnEscape={!showCancelButton}
    >
      <div className="text-center py-4">
        {getIcon()}

        <p className="text-white text-base leading-relaxed mb-6">{message}</p>
      </div>

      <ModalFooter>
        {showCancelButton && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          className={`px-6 py-3 font-medium rounded-lg transition-colors ${getButtonStyle()}`}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
}
