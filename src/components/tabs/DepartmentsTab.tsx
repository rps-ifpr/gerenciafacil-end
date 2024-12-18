import { useState } from 'react';
import { Department } from '../../types';
import { useDepartmentStore } from '../../store/departmentStore';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export function DepartmentsTab() {
  const { departments, addDepartment, updateDepartment, deleteDepartment, toggleDepartmentStatus } = useDepartmentStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      updateDepartment(editingId, { name });
      setEditingId(null);
    } else {
      addDepartment({
        id: crypto.randomUUID(),
        name,
        active: true,
      });
    }
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Editar Departamento' : 'Novo Departamento'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do departamento"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingId ? "Atualizar Departamento" : "Adicionar Departamento"}
          </button>
        </form>

        {departments.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Departamentos Cadastrados</h3>
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
                      onClick={() => {
                        setEditingId(department.id);
                        setName(department.name);
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleDepartmentStatus(department.id)}
                      className={`p-2 rounded-md ${
                        department.active ? 'text-green-600' : 'text-gray-400'
                      } hover:bg-gray-100`}
                      title={department.active ? 'Desativar' : 'Ativar'}
                    >
                      {department.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir este departamento?')) {
                          deleteDepartment(department.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}