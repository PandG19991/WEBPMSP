import React from 'react';
import { Plus } from 'lucide-react';
import { Tab } from '@headlessui/react';
import DoorLockManagement from './DoorLockManagement';
import PasswordManagementSystem from './PasswordManagementSystem';
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

      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>门锁设备管理</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>密码管理系统</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>清洁服务管理</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <DoorLockManagement />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <PasswordManagementSystem />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <CleaningSchedule />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SmartHardware;