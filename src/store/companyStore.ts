import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company } from '../types';

interface CompanyStore {
  companies: Company[];
  addCompany: (company: Company) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  toggleCompanyStatus: (id: string) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companies: [],
      
      addCompany: (company) =>
        set((state) => ({
          companies: [...state.companies, company],
        })),

      updateCompany: (id, updates) =>
        set((state) => ({
          companies: state.companies.map((comp) =>
            comp.id === id ? { ...comp, ...updates } : comp
          ),
        })),

      deleteCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((comp) => comp.id !== id),
        })),

      toggleCompanyStatus: (id) =>
        set((state) => ({
          companies: state.companies.map((comp) =>
            comp.id === id ? { ...comp, active: !comp.active } : comp
          ),
        })),
    }),
    {
      name: 'company-storage',
    }
  )
);