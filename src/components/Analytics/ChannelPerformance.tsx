import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ChannelPerformanceProps {
  dateRange: string;
}

const ChannelPerformance: React.FC<ChannelPerformanceProps> = ({ dateRange }) => {
  const data = [
    { name: 'Airbnb', value: 35, revenue: 45600, bookings: 156, color: '#ef4444' },
    { name: 'Booking.com', value: 28, revenue: 28900, bookings: 89, color: '#3b82f6' },
    { name: '微信小程序', value: 22, revenue: 67800, bookings: 234, color: '#10b981' },
    { name: 'Agoda', value: 10, revenue: 19800, bookings: 67, color: '#f59e0b' },
    { name: '直接预订', value: 5, revenue: 3600, bookings: 12, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 leading-heading">渠道表现</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, '市场份额']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          {data.map((channel) => (
            <div key={channel.name} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: channel.color }}
                />
                <span className="font-medium text-gray-900">{channel.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">¥{channel.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{channel.bookings} 预订</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelPerformance;