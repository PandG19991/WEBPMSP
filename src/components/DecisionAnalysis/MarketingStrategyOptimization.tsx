import React from 'react';
import { Card, Table, Button, message } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 模拟营销效果数据
const generateMarketingEffectData = () => {
  const labels = ['促销活动A', '会员日活动', '新客优惠', '节日特惠'];
  const data = labels.map(() => faker.number.int({ min: 1000, max: 10000 }));
  return { labels, data };
};

// 模拟AI营销建议数据
const generateAIMarketingSuggestions = () => {
  const chineseActions = [
    '建议在社交媒体平台推广限时优惠活动，提升品牌曝光度',
    '针对高价值客户推出专属会员礼遇计划，增强客户忠诚度',
    '利用大数据分析制定个性化推荐策略，提高转化率',
    '结合节假日主题推出套餐产品，抓住消费高峰期机会',
    '通过邮件营销和短信推送进行精准客户触达，提升复购率',
    '与本地商家合作推出联合营销活动，扩大客户群体',
    '优化移动端用户体验，提升在线预订转化效果'
  ];
  
  const suggestions = [];
  for (let i = 0; i < 3; i++) {
    suggestions.push({
      id: i + 1,
      campaignName: faker.lorem.words({ min: 2, max: 4 }) + '活动',
      targetAudience: faker.helpers.arrayElement(['新客户', '老客户', '高消费用户', '流失用户']),
      suggestedAction: chineseActions[faker.number.int({ min: 0, max: chineseActions.length - 1 })],
      expectedROI: faker.number.float({ min: 0.1, max: 0.5, precision: 0.01 }),
    });
  }
  return suggestions;
};

const MarketingStrategyOptimization: React.FC = () => {
  const marketingEffectData = generateMarketingEffectData();
  const aiMarketingSuggestions = generateAIMarketingSuggestions();

  const marketingEffectChartData = {
    labels: marketingEffectData.labels,
    datasets: [
      {
        label: '营销活动效果 (收益)',
        data: marketingEffectData.data,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  const aiMarketingColumns = [
    { title: '建议活动', dataIndex: 'campaignName', key: 'campaignName' },
    { title: '目标受众', dataIndex: 'targetAudience', key: 'targetAudience' },
    { title: '建议行动', dataIndex: 'suggestedAction', key: 'suggestedAction' },
    { title: '预期ROI', dataIndex: 'expectedROI', key: 'expectedROI', render: (text: number) => `${(text * 100).toFixed(2)}%` },
    { 
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button type="primary" onClick={() => message.success(`已采纳营销建议：${record.campaignName}`)}>采纳建议</Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">营销策略优化</h1>
      </div>

      <Card title="营销活动效果分析" bordered={false} className="mb-6 shadow-md">
        <p className="mb-4">分析历史营销活动的效果，帮助您了解不同策略的表现。</p>
        <div style={{ height: '350px' }}>
          <Bar 
            data={marketingEffectChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: '营销活动效果分析图',
                },
              },
            }}
          />
        </div>
      </Card>

      <Card title="AI营销建议" bordered={false} className="mb-6 shadow-md">
        <p className="mb-4">基于市场趋势和客户数据，AI为您提供个性化的营销策略建议。</p>
        <Table dataSource={aiMarketingSuggestions} columns={aiMarketingColumns} pagination={false} rowKey="id" />
      </Card>
    </div>
  );
};

export default MarketingStrategyOptimization; 