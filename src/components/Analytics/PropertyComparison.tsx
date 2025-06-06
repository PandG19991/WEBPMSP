import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PropertyComparisonProps {
  propertyFilter: string;
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({ propertyFilter }) => {
  const data = [
    { name: '豪华套房A', revenue: 25600, occupancy: 92, adr: 1200 },
    { name: '现代公寓B', revenue: 18900, occupancy: 87, adr: 850 },
    { name: '行政套房', revenue: 22100, occupancy: 89, adr: 1050 },
    { name: '温馨工作室', revenue: 12400, occupancy: 78, adr: 620 },
    { name: '城景公寓', revenue: 16800, occupancy: 84, adr: 780 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 leading-heading">房源对比</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number"
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `¥${value / 1000}k`}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="#6b7280"
              fontSize={12}
              width={100}
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
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {data.map((property) => (
          <div key={property.name} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
            <span className="font-medium text-gray-900">{property.name}</span>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-right">
                <p className="text-gray-600">入住率</p>
                <p className="font-semibold">{property.occupancy}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">平均房价</p>
                <p className="font-semibold">¥{property.adr}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyComparison;