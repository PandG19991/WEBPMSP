import React from 'react';
import { Plus } from 'lucide-react';
import SmartLockList from './SmartLockList';
import CleaningSchedule from './CleaningSchedule';

const SmartHardware: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">智能硬件管理</h1>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>添加设备</span>
        </button>
      </div>

      <SmartLockList />
      <CleaningSchedule />
    </div>
  );
};

export default SmartHardware;