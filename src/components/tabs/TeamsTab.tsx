import { useState } from "react";
import { useStore } from "../../store/useStore";
import { Plus, Edit2, Trash2, Users } from "lucide-react";

export function TeamsTab() {
  const { teams, collaborators, addTeam, updateTeam, deleteTeam } = useStore();
  const [newTeam, setNewTeam] = useState({
    name: "",
    members: [] as string[]
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name.trim() || newTeam.members.length === 0) return;

    if (editingId) {
      updateTeam(editingId, newTeam);
      setEditingId(null);
    } else {
      addTeam({
        id: crypto.randomUUID(),
        ...newTeam,
        active: true,
      });
    }
    setNewTeam({ name: "", members: [] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Teams</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            value={newTeam.name}
            onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Team name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          
          <select
            multiple
            value={newTeam.members}
            onChange={(e) => setNewTeam(prev => ({
              ...prev,
              members: Array.from(e.target.selectedOptions, option => option.value)
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

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {editingId ? (
              <>
                <Edit2 className="h-4 w-4" />
                Update Team
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Team
              </>
            )}
          </button>
        </form>

        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <span className="font-medium">{team.name}</span>
                  <p className="text-sm text-gray-500">
                    {team.members.length} members
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(team.id);
                    setNewTeam({
                      name: team.name,
                      members: team.members
                    });
                  }}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
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