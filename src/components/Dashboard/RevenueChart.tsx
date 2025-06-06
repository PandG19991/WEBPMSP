import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '1月', revenue: 65000 },
  { month: '2月', revenue: 78000 },
  { month: '3月', revenue: 85000 },
  { month: '4月', revenue: 92000 },
  { month: '5月', revenue: 87000 },
  { month: '6月', revenue: 95000 },
  { month: '7月', revenue: 102000 },
  { month: '8月', revenue: 98000 },
  { month: '9月', revenue: 105000 },
  { month: '10月', revenue: 110000 },
  { month: '11月', revenue: 108000 },
  { month: '12月', revenue: 115000 },
];

const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-heading">收入趋势</h3>
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
          <option>过去12个月</option>
          <option>过去6个月</option>
          <option>过去3个月</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `¥${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`¥${value.toLocaleString()}`, '收入']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;