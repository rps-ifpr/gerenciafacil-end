import { useState } from "react";
import { useStore } from "../../store/useStore";
import { BarChart3, PieChart, Users, Calendar } from "lucide-react";

export function ReportsTab() {
  const { departments, collaborators, teams, projects, tasks } = useStore();
  const [reportType, setReportType] = useState<"departments" | "teams" | "projects" | "tasks">("departments");

  const getActiveCollaboratorsCount = () => collaborators.filter(c => c.active).length;
  const getActiveTeamsCount = () => teams.filter(t => t.active).length;
  const getCompletedTasksCount = () => tasks.filter(t => t.status === "completed").length;

  const renderDepartmentsReport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Departments Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map(dept => {
          const deptCollaborators = collaborators.filter(c => c.department === dept.id);
          return (
            <div key={dept.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">{dept.name}</h4>
              <p className="text-sm text-gray-500">Members: {deptCollaborators.length}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTeamsReport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Teams Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium">{team.name}</h4>
            <p className="text-sm text-gray-500">Members: {team.members.length}</p>
            <p className="text-sm text-gray-500">Status: {team.active ? "Active" : "Inactive"}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsReport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Projects Overview</h3>
      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === "completed");
          const progress = projectTasks.length ? (completedTasks.length / projectTasks.length) * 100 : 0;
          
          return (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">{project.name}</h4>
              <p className="text-sm text-gray-500">{project.description}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Progress: {progress.toFixed(0)}% ({completedTasks.length}/{projectTasks.length} tasks)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTasksReport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tasks Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">Pending</h4>
          <p className="text-2xl font-bold text-yellow-500">
            {tasks.filter(t => t.status === "pending").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">In Progress</h4>
          <p className="text-2xl font-bold text-blue-500">
            {tasks.filter(t => t.status === "in-progress").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">Completed</h4>
          <p className="text-2xl font-bold text-green-500">
            {tasks.filter(t => t.status === "completed").length}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Departments</h3>
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{departments.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active Collaborators</h3>
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{getActiveCollaboratorsCount()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active Teams</h3>
            <PieChart className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{getActiveTeamsCount()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Completed Tasks</h3>
            <Calendar className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{getCompletedTasksCount()}</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setReportType("departments ")}
            className={`px-4 py-2 rounded-md ${reportType === "departments" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Departments
          </button>
          <button
            onClick={() => setReportType("teams")}
            className={`px-4 py-2 rounded-md ${reportType === "teams" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Teams
          </button>
          <button
            onClick={() => setReportType("projects")}
            className={`px-4 py-2 rounded-md ${reportType === "projects" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Projects
          </button>
          <button
            onClick={() => setReportType("tasks")}
            className={`px-4 py-2 rounded-md ${reportType === "tasks" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Tasks
          </button>
        </div>

        {reportType === "departments" && renderDepartmentsReport()}
        {reportType === "teams" && renderTeamsReport()}
        {reportType === "projects" && renderProjectsReport()}
        {reportType === "tasks" && renderTasksReport()}
      </div>
    </div>
  );
}