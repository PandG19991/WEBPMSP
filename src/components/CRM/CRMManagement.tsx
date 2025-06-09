import React from 'react';
import { Users, Mail } from 'lucide-react';
import CustomerList from './CustomerList';
import MembershipOverview from './MembershipOverview';
import { Tab } from '@headlessui/react';
import CustomerCommunicationRecords from './CustomerCommunicationRecords';
import MembershipLevelSettings from './MembershipLevelSettings';
import PointsSystemManagement from './PointsSystemManagement';
import PrecisionMarketing from './PrecisionMarketing';
import CustomerLifecycleMarketing from './CustomerLifecycleMarketing';

const CRMManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">客户关系管理</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="w-4 h-4" />
            <span>发送营销</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Users className="w-4 h-4" />
            <span>添加客户</span>
          </button>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>客户信息管理</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>会员体系管理</Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
            ${selected
              ? 'bg-white shadow text-primary-700'
              : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
            } focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60`
          }>营销活动管理</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <CustomerList />
            <CustomerCommunicationRecords />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <MembershipOverview />
            <MembershipLevelSettings />
            <PointsSystemManagement />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <PrecisionMarketing />
            <CustomerLifecycleMarketing />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CRMManagement;