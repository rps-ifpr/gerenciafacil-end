import { useState } from 'react';
import { Company } from '../../types';
import { useCompanyStore } from '../../store/companyStore';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export function CompaniesTab() {
  const { companies, addCompany, updateCompany, deleteCompany, toggleCompanyStatus } = useCompanyStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    email: '',
    contractStart: '',
    contractEnd: '',
    paymentInfo: {
      bankName: '',
      bankBranch: '',
      bankAccount: '',
      pixKey: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.cnpj.trim()) return;

    if (editingId) {
      updateCompany(editingId, formData);
      setEditingId(null);
    } else {
      addCompany({
        id: crypto.randomUUID(),
        ...formData,
        active: true,
      });
    }
    setFormData({
      name: '',
      cnpj: '',
      address: '',
      phone: '',
      email: '',
      contractStart: '',
      contractEnd: '',
      paymentInfo: {
        bankName: '',
        bankBranch: '',
        bankAccount: '',
        pixKey: '',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Editar Empresa' : 'Nova Empresa'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
              placeholder="Nome da empresa *"
              className="rounded-md border border-gray-300 px-3 py-2"
              required
            />
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
              placeholder="CNPJ *"
              className="rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value.toUpperCase() }))}
            placeholder="Endereço"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Telefone"
              className="rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Contract Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Início do Contrato
              </label>
              <input
                type="date"
                value={formData.contractStart}
                onChange={(e) => setFormData(prev => ({ ...prev, contractStart: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fim do Contrato
              </label>
              <input
                type="date"
                value={formData.contractEnd}
                onChange={(e) => setFormData(prev => ({ ...prev, contractEnd: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Bancárias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.paymentInfo.bankName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  paymentInfo: { ...prev.paymentInfo, bankName: e.target.value }
                }))}
                placeholder="Nome do Banco"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                value={formData.paymentInfo.bankBranch}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  paymentInfo: { ...prev.paymentInfo, bankBranch: e.target.value }
                }))}
                placeholder="Agência"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                value={formData.paymentInfo.bankAccount}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  paymentInfo: { ...prev.paymentInfo, bankAccount: e.target.value }
                }))}
                placeholder="Conta"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                value={formData.paymentInfo.pixKey}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  paymentInfo: { ...prev.paymentInfo, pixKey: e.target.value }
                }))}
                placeholder="Chave PIX"
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingId ? "Atualizar Empresa" : "Adicionar Empresa"}
          </button>
        </form>

        {companies.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Empresas Cadastradas</h3>
            <div className="space-y-2">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{company.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        company.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {company.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">CNPJ: {company.cnpj}</p>
                    {company.email && <p className="text-sm text-gray-500">Email: {company.email}</p>}
                    <p className="text-sm text-gray-500">
                      Contrato: {new Date(company.contractStart).toLocaleDateString()} - {new Date(company.contractEnd).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(company.id);
                        setFormData({
                          name: company.name,
                          cnpj: company.cnpj,
                          address: company.address,
                          phone: company.phone,
                          email: company.email,
                          contractStart: company.contractStart,
                          contractEnd: company.contractEnd,
                          paymentInfo: company.paymentInfo,
                        });
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleCompanyStatus(company.id)}
                      className={`p-2 rounded-md ${
                        company.active ? 'text-green-600' : 'text-gray-400'
                      } hover:bg-gray-100`}
                      title={company.active ? 'Desativar' : 'Ativar'}
                    >
                      {company.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
                          deleteCompany(company.id);
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