import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { Collaborator, WorkSchedule } from '../../types';
import { useCompanyStore } from '../../store/companyStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { useServiceTypeStore } from '../../store/serviceTypeStore';

interface CollaboratorFormProps {
  onSubmit: (collaborator: Omit<Collaborator, 'id'>) => void;
  initialData?: Collaborator;
  isEditing?: boolean;
}

export function CollaboratorForm({ onSubmit, initialData, isEditing }: CollaboratorFormProps) {
  const { companies } = useCompanyStore();
  const { departments } = useDepartmentStore();
  const { serviceTypes } = useServiceTypeStore();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    companyId: initialData?.companyId || '',
    department: initialData?.department || '',
    serviceType: initialData?.serviceType || '',
    role: initialData?.role || '',
    document: initialData?.document || '',
    phone: initialData?.phone || '',
    workSchedule: initialData?.workSchedule || [{
      type: 'presential' as const,
      days: [],
      startTime: '08:00',
      endTime: '17:00',
    }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      active: true,
    });
    
    // Reset form if not editing
    if (!isEditing) {
      setFormData({
        name: '',
        email: '',
        password: '',
        companyId: '',
        department: '',
        serviceType: '',
        role: '',
        document: '',
        phone: '',
        workSchedule: [{
          type: 'presential',
          days: [],
          startTime: '08:00',
          endTime: '17:00',
        }],
      });
    }
  };

  const addWorkSchedule = () => {
    setFormData(prev => ({
      ...prev,
      workSchedule: [
        ...prev.workSchedule,
        {
          type: 'presential',
          days: [],
          startTime: '08:00',
          endTime: '17:00',
        },
      ],
    }));
  };

  const updateWorkSchedule = (index: number, updates: Partial<WorkSchedule>) => {
    setFormData(prev => ({
      ...prev,
      workSchedule: prev.workSchedule.map((schedule, i) =>
        i === index ? { ...schedule, ...updates } : schedule
      ),
    }));
  };

  const removeWorkSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workSchedule: prev.workSchedule.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
          placeholder="Nome do prestador *"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Email *"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Senha *"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
        <input
          type="text"
          value={formData.document}
          onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.value }))}
          placeholder="CPF/CNPJ *"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Telefone"
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Company and Department Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={formData.companyId}
          onChange={(e) => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Selecione a Empresa *</option>
          {companies
            .filter(company => company.active)
            .map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
        </select>

        <select
          value={formData.department}
          onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Selecione o Departamento *</option>
          {departments
            .filter(dept => dept.active)
            .map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
        </select>

        <select
          value={formData.serviceType}
          onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Selecione o Tipo de Serviço *</option>
          {serviceTypes
            .filter(type => type.active)
            .map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
      </div>

      {/* Work Schedule */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Períodos de Trabalho</h3>
          <button
            type="button"
            onClick={addWorkSchedule}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Adicionar Período
          </button>
        </div>

        {formData.workSchedule.map((schedule, index) => (
          <div key={index} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Período {index + 1}</h4>
              {formData.workSchedule.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkSchedule(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={schedule.type}
                onChange={(e) => updateWorkSchedule(index, {
                  type: e.target.value as 'presential' | 'remote'
                })}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="presential">Presencial</option>
                <option value="remote">Remoto</option>
              </select>

              <div className="flex gap-2">
                <input
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) => updateWorkSchedule(index, { startTime: e.target.value })}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                />
                <input
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) => updateWorkSchedule(index, { endTime: e.target.value })}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={schedule.days.includes(day)}
                    onChange={(e) => {
                      const newDays = e.target.checked
                        ? [...schedule.days, day]
                        : schedule.days.filter(d => d !== day);
                      updateWorkSchedule(index, { days: newDays });
                    }}
                    className="rounded border-gray-300"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {isEditing ? "Atualizar Prestador" : "Adicionar Prestador"}
      </button>
    </form>
  );
}