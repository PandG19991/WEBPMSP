import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import PropertyCreationWizard from './PropertyCreationWizard';
import PropertyList from './PropertyList';

const PropertyManagement: React.FC = () => {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">房源管理</h1>
        <button
          onClick={() => setShowCreateWizard(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>添加房源</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索房源..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="all">全部状态</option>
            <option value="active">已上线</option>
            <option value="draft">草稿</option>
            <option value="pending">待审核</option>
            <option value="inactive">已下线</option>
          </select>
          
          <button className="flex items-center space-x-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>筛选</span>
          </button>
        </div>

        <PropertyList searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>

      {showCreateWizard && (
        <PropertyCreationWizard onClose={() => setShowCreateWizard(false)} />
      )}
    </div>
  );
};

export default PropertyManagement;