
export type PaymentStatus =
  | "pending"
  | "paid"

export type EnrollmentStatus =
  | "pending"
  | "active"

export interface Enrollment {
  id: string

  // Student Info
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string

  // Program
  programId: string
  programName: string

  // Learning Plan
  paymentPlan: PaymentPlan

  // Payment
  paymentStatus: PaymentStatus
  paymentReference: string

  // Enrollment
  cohort: string
  enrollmentStatus: EnrollmentStatus

  createdAt: Date
}
export type PaymentPlan =
  | "full"
  | "installment"
  | "scholarship"

export interface Enrollment {
  id: string

  firstName: string
  lastName: string
  email: string
  phone: string
  country: string

  programId: string
  programName: string

  paymentPlan: PaymentPlan

  paymentStatus: "pending" | "paid"

  paymentReference: string

  cohort: string

  enrollmentStatus: "pending" | "active"

  createdAt: Date
}