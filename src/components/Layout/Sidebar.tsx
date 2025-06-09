import React, { useState } from 'react';
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
  ChevronRight,
  MessageCircle,
  LineChart,
  Package,
  Rocket
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: '仪表盘', icon: Home },
  { id: 'properties', label: '房源管理', icon: Building2 },
  { id: 'orders', label: '订单管理', icon: ShoppingCart },
  { id: 'channels', label: '渠道管理', icon: Shuffle },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
  { id: 'crm', label: '客户关系', icon: Users },
  { id: 'hardware', label: '智能硬件', icon: Lock },
  { id: 'customerServiceSession', label: '客服会话', icon: MessageCircle },
  {
    id: 'decisionAnalysis',
    label: '分析决策',
    icon: BarChart3,
    children: [
      { id: 'intelligentPricing', label: '智能定价决策', icon: LineChart },
      { id: 'intelligentInventoryAllocation', label: '智能库存分配', icon: Package },
      { id: 'marketingStrategyOptimization', label: '营销策略优化', icon: Rocket },
    ],
  },
  { id: 'admin', label: '系统管理', icon: Settings },
];

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  collapsed,
  setCollapsed
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.children) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setActiveModule(item.id);
      setOpenSubmenu(null);
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-800">PMS管理系统</h1>
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

      <nav className="mt-0 overflow-y-auto overflow-x-hidden pb-4" style={{ maxHeight: 'calc(100% - 100px)' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id || (item.children && item.children.some(child => activeModule === child.id));
          const isSubmenuOpen = openSubmenu === item.id || (item.children && item.children.some(child => activeModule === child.id) && !collapsed);

          return (
            <div key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`w-full flex items-center px-4 py-2 text-left transition-all duration-200 hover:bg-gray-50 ${
                  isActive
                    ? 'bg-primary-50 border-r-2 border-primary-500 text-primary-700'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                {!collapsed && (
                  <>
                    <span className="ml-3 font-medium">{item.label}</span>
                    {item.children && (
                      <ChevronRight
                        className={`ml-auto w-4 h-4 text-gray-500 transition-transform ${isSubmenuOpen ? 'rotate-90' : ''}`}
                      />
                    )}
                  </>
                )}
              </button>
              {item.children && isSubmenuOpen && (
                <div className={`ml-8 ${collapsed ? 'hidden' : ''}`}>
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const isChildActive = activeModule === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => setActiveModule(child.id)}
                        className={`w-full flex items-center px-4 py-2 text-left transition-all duration-200 hover:bg-gray-50 ${
                          isChildActive
                            ? 'bg-primary-50 border-r-2 border-primary-500 text-primary-700'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <ChildIcon className={`w-5 h-5 ${isChildActive ? 'text-primary-600' : 'text-gray-500'}`} />
                        {!collapsed && (
                          <span className="ml-3 font-medium">{child.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;