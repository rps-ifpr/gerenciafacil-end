import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { Department } from '../../types';

interface DepartmentFormProps {
  onSubmit: (department: Partial<Department>) => void;
  initialData?: Department;
  isEditing?: boolean;
}

export function DepartmentForm({ onSubmit, initialData, isEditing }: DepartmentFormProps) {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do departamento"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        {isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {isEditing ? "Atualizar Departamento" : "Adicionar Departamento"}
      </button>
    </form>
  );
}