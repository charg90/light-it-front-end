export type Patient = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  documentUrl: string;
  deletedAt?: Date | null;
};
