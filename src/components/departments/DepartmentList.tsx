import { Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Department } from '../../types';

interface DepartmentListProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function DepartmentList({ departments, onEdit, onDelete, onToggleStatus }: DepartmentListProps) {
  return (
    <div className="space-y-2">
      {departments.map((department) => (
        <div
          key={department.id}
          className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{department.name}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              department.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {department.active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(department)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              title="Editar"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleStatus(department.id)}
              className={`p-2 rounded-md ${
                department.active ? 'text-green-600' : 'text-gray-400'
              } hover:bg-gray-100`}
              title={department.active ? 'Desativar' : 'Ativar'}
            >
              {department.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onDelete(department.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}