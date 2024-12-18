import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CollaboratorsList } from '../collaborators/CollaboratorsList';
import { DepartmentsTab } from './DepartmentsTab';
import { ServiceTypesTab } from './ServiceTypesTab';
import { CompaniesTab } from './CompaniesTab';

export function CollaboratorsTab() {
  const [activeTab, setActiveTab] = useState("empresas");

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestão de Prestadores de Serviço</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger value="empresas" className="data-[state=active]:bg-white">
              Empresas
            </TabsTrigger>
            <TabsTrigger value="prestadores" className="data-[state=active]:bg-white">
              Prestadores
            </TabsTrigger>
            <TabsTrigger value="departamentos" className="data-[state=active]:bg-white">
              Departamentos
            </TabsTrigger>
            <TabsTrigger value="tipos-servico" className="data-[state=active]:bg-white">
              Tipos de Serviço
            </TabsTrigger>
          </TabsList>

          <TabsContent value="empresas">
            <CompaniesTab />
          </TabsContent>

          <TabsContent value="prestadores">
            <CollaboratorsList />
          </TabsContent>

          <TabsContent value="departamentos">
            <DepartmentsTab />
          </TabsContent>

          <TabsContent value="tipos-servico">
            <ServiceTypesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}