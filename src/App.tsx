import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { DepartmentsTab } from "./components/tabs/DepartmentsTab";
import { CollaboratorsTab } from "./components/tabs/CollaboratorsTab";
import { TeamsTab } from "./components/tabs/TeamsTab";
import { ProjectsTab } from "./components/tabs/ProjectsTab";
import { TasksTab } from "./components/tabs/TasksTab";
import { MyTasksTab } from "./components/tabs/MyTasksTab";
import { ReportsTab } from "./components/tabs/ReportsTab";
import { Sidebar } from "./components/layout/Sidebar";
import { MainLayout } from "./components/layout/MainLayout";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 ml-64">
        <MainLayout>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
              <TabsTrigger value="equipes">Teams</TabsTrigger>
              <TabsTrigger value="projetos">Projects</TabsTrigger>
              <TabsTrigger value="tarefas">Tasks</TabsTrigger>
              <TabsTrigger value="minhas_tarefas">My Tasks</TabsTrigger>
              <TabsTrigger value="reunioes">Reuniões</TabsTrigger>
              <TabsTrigger value="acompanhamento_reunioes">Calendário</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DepartmentsTab />
            </TabsContent>

            <TabsContent value="colaboradores">
              <CollaboratorsTab />
            </TabsContent>

            <TabsContent value="equipes">
              <TeamsTab />
            </TabsContent>

            <TabsContent value="projetos">
              <ProjectsTab />
            </TabsContent>

            <TabsContent value="tarefas">
              <TasksTab />
            </TabsContent>

            <TabsContent value="minhas_tarefas">
              <MyTasksTab />
            </TabsContent>

            <TabsContent value="reunioes">
              <ReportsTab />
            </TabsContent>

            <TabsContent value="acompanhamento_reunioes">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </MainLayout>
      </div>
    </div>
  );
}

export default App;