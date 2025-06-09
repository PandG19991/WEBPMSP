import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CustomerOriginData {
  name: string;
  value: number;
}

const data: CustomerOriginData[] = [
  { name: '携程', value: 400 },
  { name: '美团', value: 300 },
  { name: '自有小程序', value: 300 },
  { name: '电话预订', value: 200 },
  { name: '线下预订', value: 100 },
  { name: '其他OTA', value: 50 },
];

const COLORS = ['#0081CC', '#FFC107', '#28A745', '#6F42C1', '#DC3545', '#17A2B8'];

const CustomerOriginChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">客户来源分布</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerOriginChart; 