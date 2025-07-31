// Enums
export enum PaymentStatusEnum {
  PENDING = "PENDING",
  SETTLED = "SETTLED",
}

// Types
export type CreateExpenseData = {
  name: string;
  totalAmount: number;
  paidById: string;
  date: string;
  notes?: string;
};

export type UpdateExpenseData = {
  name?: string;
  totalAmount?: number;
  paidById?: string;
  date?: string;
  notes?: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
};

export type CreateParticipantData = {
  expenseId: string;
  userId: string;
  shareAmount: number;
  isSettled?: boolean;
  settledAt?: string;
};

export type UpdateParticipantData = {
  expenseId?: string;
  userId?: string;
  shareAmount?: number;
  isSettled?: boolean;
  settledAt?: string;
};

export type CreatePaymentData = {
  participantId: string;
  amountPaid: number;
  paidAt?: string;
};

export type UpdatePaymentData = {
  participantId?: string;
  amountPaid?: number;
  paidAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type Expense = {
  id: string;
  name: string;
  totalAmount: number;
  paidById: string;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Participant = {
  id: string;
  expenseId: string;
  userId: string;
  shareAmount: number;
  isSettled: boolean;
  settledAt?: string;
};

export type Payment = {
  id: string;
  participantId: string;
  amountPaid: number;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
};
