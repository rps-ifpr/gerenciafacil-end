import { useState } from "react";
import { useStore } from "../../store/useStore";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export function TasksTab() {
  const { tasks, projects, addTask, updateTask, deleteTask } = useStore();
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    projectId: "",
    status: "pending" as const
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.name.trim() || !newTask.description.trim() || !newTask.projectId || !newTask.startDate || !newTask.endDate) return;

    if (editingId) {
      updateTask(editingId, newTask);
      setEditingId(null);
    } else {
      addTask({
        id: crypto.randomUUID(),
        ...newTask
      });
    }
    setNewTask({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      projectId: "",
      status: "pending"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Tasks</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Task name"
              className="rounded-md border border-gray-300 px-3 py-2"
            />
            
            <select
              value={newTask.projectId}
              onChange={(e) => setNewTask(prev => ({ ...prev, projectId: e.target.value }))}
              className="rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Task description"
            className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={newTask.startDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newTask.endDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <select
            value={newTask.status}
            onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value as "pending" | "in-progress" | "completed" }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {editingId ? (
              <>
                <Edit2 className="h-4 w-4" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Task
              </>
            )}
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`h-5 w-5 ${getStatusColor(task.status)}`} />
                <div>
                  <span className="font-medium">{task.name}</span>
                  <p className="text-sm text-gray-500">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {task.startDate} - {task.endDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setNewTask({
                      name: task.name,
                      description: task.description,
                      startDate: task.startDate,
                      endDate: task.endDate,
                      projectId: task.projectId,
                      status: task.status
                    });
                  }}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
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