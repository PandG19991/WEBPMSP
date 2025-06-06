import React from 'react';
import { Users, Mail } from 'lucide-react';
import CustomerList from './CustomerList';
import MembershipOverview from './MembershipOverview';

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

      <MembershipOverview />
      <CustomerList />
    </div>
  );
};

export default CRMManagement;