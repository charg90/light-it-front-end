export const validateFullName = (name: string): string | null => {
  if (!name.trim()) {
    return "Full name is required";
  }

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return "Full name should only contain letters";
  }

  if (name.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }

  return null;
};

export const validateGmailEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email address is required";
  }

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email.trim())) {
    return "Only @gmail.com addresses are allowed";
  }

  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone.trim()) {
    return "Phone number is required";
  }

  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
    return "Please enter a valid phone number";
  }

  return null;
};

export const validateDocumentFile = (file: File | null): string | null => {
  if (!file) {
    return "Document image is required";
  }

  if (
    !file.type.includes("jpeg") &&
    !file.name.toLowerCase().endsWith(".jpg")
  ) {
    return "Only .jpg images are allowed";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "File must be smaller than 5MB";
  }

  return null;
};

export const validateAreaCode = (areaCode: string): string | null => {
  if (!areaCode.trim()) {
    return "Area code is required";
  }

  const areaCodeRegex = /^\+\d{1,3}$/;
  if (!areaCodeRegex.test(areaCode.trim())) {
    return "Area code must start with '+' followed by 1-3 digits";
  }

  return null;
};
