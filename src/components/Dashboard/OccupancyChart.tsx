import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '1月', occupancy: 75 },
  { month: '2月', occupancy: 82 },
  { month: '3月', occupancy: 88 },
  { month: '4月', occupancy: 91 },
  { month: '5月', occupancy: 85 },
  { month: '6月', occupancy: 94 },
  { month: '7月', occupancy: 97 },
  { month: '8月', occupancy: 95 },
  { month: '9月', occupancy: 89 },
  { month: '10月', occupancy: 92 },
  { month: '11月', occupancy: 87 },
  { month: '12月', occupancy: 90 },
];

const OccupancyChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-heading">入住率</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-3 h-3 bg-secondary-500 rounded"></div>
          <span>月平均</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value}%`, '入住率']}
            />
            <Bar
              dataKey="occupancy"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OccupancyChart;