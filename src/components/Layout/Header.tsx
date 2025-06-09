import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  activeModule?: string;
}

const Header: React.FC<HeaderProps> = ({ activeModule }) => {
  const getModuleTitle = (module: string) => {
    const moduleMap: { [key: string]: string } = {
      'dashboard': '仪表盘',
      'properties': '房源管理',
      'orders': '订单管理',
      'channels': '渠道管理',
      'analytics': '数据分析',
      'crm': '客户关系管理',
      'hardware': '智能硬件',
      'admin': '系统管理',
      'customerServiceSession': '客服会话',
      'intelligentPricing': '智能定价决策',
      'intelligentInventoryAllocation': '智能库存分配',
      'marketingStrategyOptimization': '营销策略优化',
    };
    return moduleMap[module] || 'PMS管理系统';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">{getModuleTitle(activeModule || 'dashboard')}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;