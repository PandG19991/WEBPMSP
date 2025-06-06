import React from 'react';
import KPICards from './KPICards';
import RevenueChart from './RevenueChart';
import OccupancyChart from './OccupancyChart';
import RecentBookings from './RecentBookings';
import PropertyStatus from './PropertyStatus';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">仪表盘概览</h1>
        <div className="text-sm text-gray-500">
          最后更新: {new Date().toLocaleString('zh-CN')}
        </div>
      </div>
      
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <OccupancyChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings />
        <PropertyStatus />
      </div>
    </div>
  );
};

export default Dashboard;