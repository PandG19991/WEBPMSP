import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import RevenueAnalytics from './RevenueAnalytics';
import OccupancyAnalytics from './OccupancyAnalytics';
import ChannelPerformance from './ChannelPerformance';
import PropertyComparison from './PropertyComparison';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [propertyFilter, setPropertyFilter] = useState('all');

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueAnalytics dateRange={dateRange} />
          <OccupancyAnalytics dateRange={dateRange} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelPerformance dateRange={dateRange} />
          <PropertyComparison propertyFilter={propertyFilter} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;