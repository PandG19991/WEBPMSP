import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import RevenueAnalytics from './RevenueAnalytics';
import OccupancyAnalytics from './OccupancyAnalytics';
import ChannelPerformance from './ChannelPerformance';
import PropertyComparison from './PropertyComparison';
import ExpenseManagement from './ExpenseManagement';
import ReconciliationCenter from './ReconciliationCenter';

type Tab = 'overview' | 'revenue' | 'expenses' | 'reconciliation' | 'occupancy' | 'channel' | 'property';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [dateRange, setDateRange] = useState('month');
  const [propertyFilter, setPropertyFilter] = useState('all');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RevenueAnalytics dateRange={dateRange} />
            <OccupancyAnalytics dateRange={dateRange} />
            <ChannelPerformance dateRange={dateRange} />
            <PropertyComparison propertyFilter={propertyFilter} />
          </div>
        );
      case 'revenue':
        return <RevenueAnalytics dateRange={dateRange} />;
      case 'expenses':
        return <ExpenseManagement />;
      case 'reconciliation':
        return <ReconciliationCenter />;
      case 'occupancy':
        return <OccupancyAnalytics dateRange={dateRange} />;
      case 'channel':
        return <ChannelPerformance dateRange={dateRange} />;
      case 'property':
        return <PropertyComparison propertyFilter={propertyFilter} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">数据分析与报表</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报表</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            概览
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${activeTab === 'revenue' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            营收统计
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${activeTab === 'expenses' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            支出管理
          </button>
          <button
            onClick={() => setActiveTab('reconciliation')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${activeTab === 'reconciliation' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            对账中心
          </button>
        </div>

        {activeTab === 'overview' || activeTab === 'revenue' || activeTab === 'occupancy' || activeTab === 'channel' || activeTab === 'property' ? (
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="week">最近7天</option>
                <option value="month">最近30天</option>
                <option value="quarter">最近3个月</option>
                <option value="year">最近12个月</option>
              </select>
            </div>
            
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="all">全部房源</option>
              <option value="luxury">豪华房源</option>
              <option value="standard">标准房源</option>
              <option value="studio">工作室</option>
            </select>
            
            <button className="flex items-center space-x-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>更多筛选</span>
            </button>
          </div>
        ) : null}

        {renderContent()}
      </div>
    </div>
  );
};

export default Analytics;