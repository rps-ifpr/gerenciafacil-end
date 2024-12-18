// Update Company type
export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  active: boolean;
  contractStart: string;
  contractEnd: string;
  paymentInfo: PaymentInfo;
}

// Update Collaborator type to remove moved fields
export interface Collaborator {
  id: string;
  name: string;
  email: string;
  password: string;
  companyId: string;
  department: string;
  serviceType: string;
  role: string;
  active: boolean;
  document: string;
  phone: string;
  workSchedule: WorkSchedule[];
}

// Keep other types as is
export interface PaymentInfo {
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  pixKey?: string;
}

export interface WorkSchedule {
  type: 'presential' | 'remote';
  days: string[];
  startTime: string;
  endTime: string;
}

export interface Department {
  id: string;
  name: string;
  active: boolean;
}

export interface ServiceType {
  id: string;
  name: string;
  active: boolean;
}