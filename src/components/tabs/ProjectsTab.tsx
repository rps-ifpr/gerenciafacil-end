import { useState } from "react";
import { useStore } from "../../store/useStore";
import { Plus, Edit2, Trash2, FolderGit2 } from "lucide-react";

export function ProjectsTab() {
  const { projects, teams, collaborators, addProject, updateProject, deleteProject } = useStore();
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    teams: [] as string[],
    collaborators: [] as string[]
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.description.trim()) return;

    if (editingId) {
      updateProject(editingId, newProject);
      setEditingId(null);
    } else {
      addProject({
        id: crypto.randomUUID(),
        ...newProject
      });
    }
    setNewProject({ name: "", description: "", teams: [], collaborators: [] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Projects</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Project name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Project description"
            className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
              <select
                multiple
                value={newProject.teams}
                onChange={(e) => setNewProject(prev => ({
                  ...prev,
                  teams: Array.from(e.target.selectedOptions, option => option.value)
                }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 h-32"
              >
                {teams
                  .filter(t => t.active)
                  .map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Collaborators</label>
              <select
                multiple
                value={newProject.collaborators}
                onChange={(e) => setNewProject(prev => ({
                  ...prev,
                  collaborators: Array.from(e.target.selectedOptions, option => option.value)
                }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 h-32"
              >
                {collaborators
                  .filter(c => c.active)
                  .map((collaborator) => (
                    <option key={collaborator.id} value={collaborator.id}>
                      {collaborator.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {editingId ? (
              <>
                <Edit2 className="h-4 w-4" />
                Update Project
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Project
              </>
            )}
          </button>
        </form>

        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-gray-500" />
                <div>
                  <span className="font-medium">{project.name}</span>
                  <p className="text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(project.id);
                    setNewProject({
                      name: project.name,
                      description: project.description,
                      teams: project.teams,
                      collaborators: project.collaborators
                    });
                  }}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="rounded-md p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}