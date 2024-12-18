import { useState } from 'react';
import { 
  Home, 
  Users, 
  UserCircle, 
  Briefcase, 
  CheckSquare, 
  Calendar, 
  BarChart,
  ListTodo
} from 'lucide-react';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  value: string;
}

const menuItems: MenuItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Dashboard", value: "dashboard" },
  { icon: <UserCircle className="w-5 h-5" />, label: "Prestador Serviço", value: "colaboradores" },
  { icon: <Users className="w-5 h-5" />, label: "Grupos Trabalho", value: "equipes" },
  { icon: <Briefcase className="w-5 h-5" />, label: "Ações/Planos", value: "projetos" },
  { icon: <CheckSquare className="w-5 h-5" />, label: "Atividades/Tarefas", value: "tarefas" },
  { icon: <ListTodo className="w-5 h-5" />, label: "Minhas Tarefas", value: "minhas_tarefas" },
  { icon: <Calendar className="w-5 h-5" />, label: "Reuniões", value: "reunioes" },
  { icon: <BarChart className="w-5 h-5" />, label: "Calendário", value: "acompanhamento_reunioes" }
];

interface SidebarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function Sidebar({ onTabChange, activeTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen fixed left-0 top-0 bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div className="p-4 border-b">
        <h2 className={`font-semibold text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Menu</h2>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onTabChange(item.value)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors
              ${activeTab === item.value 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {item.icon}
            <span className={`${isCollapsed ? 'hidden' : 'block'} whitespace-nowrap`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}