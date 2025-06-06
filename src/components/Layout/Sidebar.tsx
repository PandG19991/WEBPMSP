import React from 'react';
import { 
  Home, 
  Building2, 
  ShoppingCart, 
  Shuffle, 
  BarChart3, 
  Users, 
  Lock, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: '仪表盘', icon: Home },
  { id: 'properties', label: '房源管理', icon: Building2 },
  { id: 'orders', label: '订单管理', icon: ShoppingCart },
  { id: 'channels', label: '渠道管理', icon: Shuffle },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
  { id: 'crm', label: '客户关系', icon: Users },
  { id: 'hardware', label: '智能硬件', icon: Lock },
  { id: 'admin', label: '系统管理', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  setActiveModule, 
  collapsed, 
  setCollapsed 
}) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-800">房产管理系统</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-gray-50 ${
                isActive 
                  ? 'bg-primary-50 border-r-2 border-primary-500 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;