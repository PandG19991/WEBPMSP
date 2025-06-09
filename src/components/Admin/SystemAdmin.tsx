import React, { useState } from 'react';
import { Users, Settings, Shield, Activity } from 'lucide-react';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import RolePermissionManagement from './RolePermissionManagement';
import DataBackupRestore from './DataBackupRestore';
import SystemPerformanceMonitoring from './SystemPerformanceMonitoring';
import OperationAuditLog from './OperationAuditLog';

type AdminTab = 'users' | 'roles' | 'settings' | 'backup' | 'monitoring' | 'logs';

const SystemAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RolePermissionManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'backup':
        return <DataBackupRestore />;
      case 'monitoring':
        return <SystemPerformanceMonitoring />;
      case 'logs':
        return <OperationAuditLog />;
      default:
        return <UserManagement />;
    }
  };

  const tabClasses = (tabName: AdminTab) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200
    ${activeTab === tabName
      ? 'bg-white text-primary-700 border-b-2 border-primary-600'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">系统管理</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">总用户数</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <Shield className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">活跃会话</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Activity className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">系统负载</p>
              <p className="text-2xl font-bold text-gray-900">67%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-50 rounded-lg">
              <Settings className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">API调用量</p>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('users')}
              className={tabClasses('users')}
            >
              用户管理
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={tabClasses('roles')}
            >
              角色权限
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={tabClasses('settings')}
            >
              系统配置
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={tabClasses('backup')}
            >
              数据备份和恢复
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={tabClasses('monitoring')}
            >
              系统性能监控
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={tabClasses('logs')}
            >
              操作审计日志
            </button>
          </nav>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemAdmin;