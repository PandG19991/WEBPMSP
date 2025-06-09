import React from 'react';
import { Card, Table, Button, message } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 模拟库存数据
const generateInventoryData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({ date: `2023-11-${i + 1}`, availableRooms: faker.number.int({ min: 10, max: 50 }) });
  }
  return data;
};

// 模拟分配建议数据
const generateAllocationSuggestions = () => {
  const chineseReasons = [
    '根据历史数据分析，该时段预计入住率较高，建议增加库存分配',
    '考虑到节假日因素，该房型需求量预计上升，建议优化库存配置',
    '基于市场趋势和竞争对手分析，建议调整该时段的房间分配策略',
    '结合天气预报和活动日程，预测该期间客流量增加，建议相应调整',
    '参考去年同期数据和当前预订情况，建议优化房间库存分配'
  ];
  
  const suggestions = [];
  for (let i = 0; i < 3; i++) {
    suggestions.push({
      id: i + 1,
      roomType: `房型 ${faker.number.int({ min: 1, max: 5 })}`,
      date: `2023-12-${faker.number.int({ min: 1, max: 30 })}`,
      suggestedAllocation: faker.number.int({ min: 5, max: 20 }),
      reason: chineseReasons[faker.number.int({ min: 0, max: chineseReasons.length - 1 })],
    });
  }
  return suggestions;
};

const IntelligentInventoryAllocation: React.FC = () => {
  const inventoryData = generateInventoryData();
  const allocationSuggestions = generateAllocationSuggestions();

  const inventoryChartData = {
    labels: inventoryData.map(d => d.date),
    datasets: [
      {
        label: '可用房间数',
        data: inventoryData.map(d => d.availableRooms),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  const allocationColumns = [
    { title: '房型', dataIndex: 'roomType', key: 'roomType' },
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '建议分配数量', dataIndex: 'suggestedAllocation', key: 'suggestedAllocation' },
    { title: '理由', dataIndex: 'reason', key: 'reason' },
    { 
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button type="primary" onClick={() => message.success(`已应用 ${record.roomType} 在 ${record.date} 的库存分配建议`)}>应用建议</Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">智能库存分配</h1>
      </div>

      <Card title="库存预测概览" bordered={false} className="mb-6 shadow-md">
        <p className="mb-4">通过历史数据和预测模型，预测未来一段时间内的房间库存需求。</p>
        <div style={{ height: '350px' }}>
          <Line 
            data={inventoryChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: '库存预测趋势图',
                },
              },
            }}
          />
        </div>
      </Card>

      <Card title="分配策略建议" bordered={false} className="mb-6 shadow-md">
        <p className="mb-4">根据库存预测和业务规则，系统为您生成最优的库存分配策略建议。</p>
        <Table dataSource={allocationSuggestions} columns={allocationColumns} pagination={false} rowKey="id" />
      </Card>
    </div>
  );
};

export default IntelligentInventoryAllocation; 