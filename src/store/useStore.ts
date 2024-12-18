import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaymentInfo, WorkSchedule } from '../types';

interface Department {
  id: string;
  name: string;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  role: string;
  active: boolean;
  companyName: string;
  document: string;
  phone: string;
  serviceType: string;
  contractStart: string;
  contractEnd: string;
  paymentInfo: PaymentInfo;
  workSchedule: WorkSchedule;
}

interface Store {
  departments: Department[];
  collaborators: Collaborator[];
  addCollaborator: (collaborator: Collaborator) => void;
  updateCollaborator: (id: string, collaborator: Partial<Collaborator>) => void;
  deleteCollaborator: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      departments: [],
      collaborators: [],

      addCollaborator: (collaborator) =>
        set((state) => ({
          collaborators: [...state.collaborators, collaborator],
        })),

      updateCollaborator: (id, updates) =>
        set((state) => ({
          collaborators: state.collaborators.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      deleteCollaborator: (id) =>
        set((state) => ({
          collaborators: state.collaborators.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'project-management-storage',
    }
  )
);