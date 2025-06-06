import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

interface OccupancyAnalyticsProps {
  dateRange: string;
}

const OccupancyAnalytics: React.FC<OccupancyAnalyticsProps> = ({ dateRange }) => {
  const data = [
    { date: '01/01', occupancy: 75, available: 24, booked: 18 },
    { date: '01/02', occupancy: 83, available: 24, booked: 20 },
    { date: '01/03', occupancy: 88, available: 24, booked: 21 },
    { date: '01/04', occupancy: 71, available: 24, booked: 17 },
    { date: '01/05', occupancy: 92, available: 24, booked: 22 },
    { date: '01/06', occupancy: 96, available: 24, booked: 23 },
    { date: '01/07', occupancy: 88, available: 24, booked: 21 },
    { date: '01/08', occupancy: 92, available: 24, booked: 22 },
    { date: '01/09', occupancy: 79, available: 24, booked: 19 },
    { date: '01/10', occupancy: 96, available: 24, booked: 23 },
  ];

  const avgOccupancy = data.reduce((sum, item) => sum + item.occupancy, 0) / data.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-heading">入住率分析</h3>
        
        <div className="bg-secondary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-600">平均入住率</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(avgOccupancy)}%</p>
          <p className="text-sm text-gray-600 mt-1">最近{dateRange === 'week' ? '7天' : '30天'}</p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
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

export default OccupancyAnalytics;