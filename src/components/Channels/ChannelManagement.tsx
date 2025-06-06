import React from 'react';
import { Plus } from 'lucide-react';
import ChannelList from './ChannelList';
import SyncStatus from './SyncStatus';

const ChannelManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">渠道管理</h1>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>连接渠道</span>
        </button>
      </div>

      <SyncStatus />
      <ChannelList />
    </div>
  );
};

export default ChannelManagement;