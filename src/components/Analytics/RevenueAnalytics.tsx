import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

interface RevenueAnalyticsProps {
  dateRange: string;
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ dateRange }) => {
  const data = [
    { date: '01/01', revenue: 12500, adr: 820, revpar: 654 },
    { date: '01/02', revenue: 14200, adr: 850, revpar: 712 },
    { date: '01/03', revenue: 15800, adr: 920, revpar: 798 },
    { date: '01/04', revenue: 13600, adr: 800, revpar: 656 },
    { date: '01/05', revenue: 16200, adr: 950, revpar: 832 },
    { date: '01/06', revenue: 18500, adr: 1020, revpar: 912 },
    { date: '01/07', revenue: 17800, adr: 980, revpar: 876 },
    { date: '01/08', revenue: 19200, adr: 1050, revpar: 945 },
    { date: '01/09', revenue: 16800, adr: 890, revpar: 798 },
    { date: '01/10', revenue: 20100, adr: 1100, revpar: 1012 },
  ];

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgADR = data.reduce((sum, item) => sum + item.adr, 0) / data.length;
  const avgRevPAR = data.reduce((sum, item) => sum + item.revpar, 0) / data.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-heading">收入分析</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">总收入</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3 text-secondary-600" />
              <span className="text-sm text-secondary-600">+12.5%</span>
            </div>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-secondary-600">平均房价</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">¥{Math.round(avgADR)}</p>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3 text-secondary-600" />
              <span className="text-sm text-secondary-600">+5.2%</span>
            </div>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-accent-600">每间收入</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">¥{Math.round(avgRevPAR)}</p>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3 text-secondary-600" />
              <span className="text-sm text-secondary-600">+8.7%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
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
              formatter={(value: number, name: string) => [
                `¥${value.toLocaleString()}`,
                name === 'revenue' ? '收入' : name === 'adr' ? '平均房价' : '每间收入'
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueAnalytics;