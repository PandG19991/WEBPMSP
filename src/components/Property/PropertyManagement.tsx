import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowLeft } from 'lucide-react';
import PropertyCreationWizard from './PropertyCreationWizard';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import PropertyStatusManagement from './PropertyStatusManagement';
import PricingManagement from './PricingManagement';

type Tab = 'list' | 'status' | 'pricing';

const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleViewPropertyDetails = (propertyId: string | null = null) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('details');
    setActiveTab('list');
  };

  const handleCloseDetails = () => {
    setCurrentView('list');
    setSelectedPropertyId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">房源管理</h1>
        {(activeTab === 'list' && currentView === 'list') && (
          <button
            onClick={() => handleViewPropertyDetails()}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>添加房源</span>
          </button>
        )}
        {(activeTab === 'list' && currentView === 'details') && (
          <button
            onClick={handleCloseDetails}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回列表</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-2 flex space-x-2">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          房源列表
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'status' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          房态管理
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'pricing' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          价格管理
        </button>
      </div>

      {activeTab === 'list' && (
        currentView === 'list' ? (
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

            <PropertyList searchTerm={searchTerm} statusFilter={statusFilter} onSelectProperty={handleViewPropertyDetails} />
          </div>
        ) : (
          <PropertyDetails propertyId={selectedPropertyId} onClose={handleCloseDetails} />
        )
      )}

      {activeTab === 'status' && (
        <PropertyStatusManagement />
      )}

      {activeTab === 'pricing' && (
        <PricingManagement />
      )}
    </div>
  );
};

export default PropertyManagement;