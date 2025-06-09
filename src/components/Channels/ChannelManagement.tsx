import React from 'react';
import { Plus } from 'lucide-react';
import ChannelList from './ChannelList';
import SyncStatus from './SyncStatus';
import { Tab } from '@headlessui/react';
import OTAPlatformManagement from './OTAPlatformManagement';
import MiniProgramManagement from './MiniProgramManagement';
import AICustomerServiceSystem from './AICustomerServiceSystem';
// import CustomerServiceSession from './CustomerServiceSession'; // 导入新的客服会话组件

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

      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>OTA平台管理</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>小程序管理</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>AI客服系统</Tab>
          {/* <Tab className={({ selected }) => // 新增客服会话标签页
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>客服会话</Tab> */}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <OTAPlatformManagement />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <MiniProgramManagement />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <AICustomerServiceSystem />
          </Tab.Panel>
          {/* <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <CustomerServiceSession /> {/* 渲染客服会话组件 */}
          {/* </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ChannelManagement;