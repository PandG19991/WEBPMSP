import React, { useState } from 'react';
import { Card, Table, Button, Modal, Tabs, message } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const { TabPane } = Tabs;

// 模拟数据生成
const generatePriceData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({ date: `2023-11-${i + 1}`, price: faker.number.int({ min: 200, max: 800 }) });
  }
  return data;
};

const generateCompetitorData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      name: faker.company.name() + ' 酒店',
      avgPrice: faker.number.int({ min: 250, max: 750 }),
      occupancy: faker.number.float({ min: 0.6, max: 0.95, precision: 0.01 }),
    });
  }
  return data;
};

const generateAISuggestions = () => {
  const suggestions = [];
  for (let i = 0; i < 3; i++) {
    suggestions.push({
      id: i + 1,
      roomType: `房型 ${faker.number.int({ min: 1, max: 5 })}`, 
      dateRange: `2023-12-${faker.number.int({ min: 1, max: 15 })} 至 2023-12-${faker.number.int({ min: 16, max: 30 })}`,
      suggestedPrice: faker.number.int({ min: 300, max: 900 }),
      currentPrice: faker.number.int({ min: 250, max: 850 }),
      expectedIncrease: faker.number.float({ min: 0.05, max: 0.2, precision: 0.01 }),
      reason: faker.lorem.sentence(),
    });
  }
  return suggestions;
};

const IntelligentPricing: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const priceData = generatePriceData();
  const competitorData = generateCompetitorData();

  const handleGenerateSuggestions = () => {
    message.info('正在生成智能定价建议...');
    setTimeout(() => {
      setAiSuggestions(generateAISuggestions());
      message.success('智能定价建议生成成功！');
    }, 1500);
  };

  const showConfirmModal = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    setIsModalVisible(true);
  };

  const handleConfirmPriceChange = () => {
    // 模拟价格修改逻辑
    message.success(`已确认并执行房型 ${selectedSuggestion.roomType} 在 ${selectedSuggestion.dateRange} 的价格修改为 ${selectedSuggestion.suggestedPrice}！`);
    setIsModalVisible(false);
    setSelectedSuggestion(null);
    setAiSuggestions(prev => prev.filter(s => s.id !== selectedSuggestion.id));
  };

  const handleCancelPriceChange = () => {
    setIsModalVisible(false);
    setSelectedSuggestion(null);
  };

  const priceChartData = {
    labels: priceData.map(d => d.date),
    datasets: [
      {
        label: '历史价格',
        data: priceData.map(d => d.price),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const competitorColumns = [
    { title: '酒店名称', dataIndex: 'name', key: 'name' },
    { title: '平均价格', dataIndex: 'avgPrice', key: 'avgPrice' },
    { title: '入住率', dataIndex: 'occupancy', key: 'occupancy', render: (text: number) => `${(text * 100).toFixed(2)}%` },
  ];

  const aiSuggestionColumns = [
    { title: '房型', dataIndex: 'roomType', key: 'roomType' },
    { title: '日期范围', dataIndex: 'dateRange', key: 'dateRange' },
    { title: '建议价格', dataIndex: 'suggestedPrice', key: 'suggestedPrice' },
    { title: '当前价格', dataIndex: 'currentPrice', key: 'currentPrice' },
    { title: '预期收益提升', dataIndex: 'expectedIncrease', key: 'expectedIncrease', render: (text: number) => `${(text * 100).toFixed(2)}%` },
    { title: '理由', dataIndex: 'reason', key: 'reason' },
    { 
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button type="primary" onClick={() => showConfirmModal(record)}>确认修改</Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">智能定价决策</h1>
      </div>

      <Tabs defaultActiveKey="1" className="p-6 bg-white rounded-lg shadow-md">
        <TabPane tab="价格概览" key="1">
          <Card title="当前房源价格概览" bordered={false} className="mb-6">
            <p>这里将展示所有房型的当前价格、库存状态等关键信息。</p>
            {/* 可以添加一个简单表格或卡片列表 */}
            <Table 
              dataSource={[{ key: '1', roomType: '标准间', price: 350, status: '正常' }, { key: '2', roomType: '豪华套房', price: 800, status: '正常' }]} 
              columns={[{ title: '房型', dataIndex: 'roomType' }, { title: '价格', dataIndex: 'price' }, { title: '状态', dataIndex: 'status' }]} 
              pagination={false}
            />
          </Card>
        </TabPane>
        <TabPane tab="历史价格对比" key="2">
          <Card title="历史价格趋势" bordered={false} className="mb-6">
            <div style={{ height: '350px' }}> {/* 设置图表容器高度 */}
              <Line 
                data={priceChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // 允许图表自由调整高度
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: '历史价格趋势图',
                    },
                  },
                }}
              />
            </div>
          </Card>
        </TabPane>
        <TabPane tab="市场竞品分析" key="3">
          <Card title="周边竞品酒店数据" bordered={false} className="mb-6">
            <Table dataSource={competitorData} columns={competitorColumns} pagination={false} />
          </Card>
        </TabPane>
        <TabPane tab="AI建议与执行" key="4">
          <Card title="智能定价建议" bordered={false} className="mb-6">
            <p className="mb-4">点击下方按钮，系统将根据市场数据、历史表现、节假日等因素，为您生成最优的定价建议。</p>
            <Button type="primary" onClick={handleGenerateSuggestions} className="mb-6">生成智能定价建议</Button>
            
            {aiSuggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">生成的建议</h3>
                <Table dataSource={aiSuggestions} columns={aiSuggestionColumns} pagination={false} rowKey="id" />
              </div>
            )}

            <Modal
              title="确认价格修改"
              visible={isModalVisible}
              onOk={handleConfirmPriceChange}
              onCancel={handleCancelPriceChange}
              okText="确认修改"
              cancelText="取消"
            >
              {selectedSuggestion && (
                <p>
                  您确定将 **{selectedSuggestion.roomType}** 在 **{selectedSuggestion.dateRange}** 的价格从 **{selectedSuggestion.currentPrice}** 修改为 **{selectedSuggestion.suggestedPrice}** 吗？
                </p>
              )}
            </Modal>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default IntelligentPricing; 