import React from 'react';
import { Users, Settings, Shield, Activity } from 'lucide-react';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';

const SystemAdmin: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">System Administration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
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
              <p className="text-sm text-gray-600">Active Sessions</p>
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
              <p className="text-sm text-gray-600">System Load</p>
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
              <p className="text-sm text-gray-600">API Calls</p>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      <UserManagement />
      <SystemSettings />
    </div>
  );
};

export default SystemAdmin;