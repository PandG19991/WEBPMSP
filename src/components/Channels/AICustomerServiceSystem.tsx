import React, { useState } from 'react';
import { MessageSquare, Settings, Book, User, BarChart, Smile, Frown, CheckCircle, XCircle } from 'lucide-react';

interface KnowledgeBaseEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastUpdated: string;
}

interface Conversation {
  id: string;
  customerName: string;
  startTime: string;
  endTime: string;
  satisfaction: 'satisfied' | 'neutral' | 'dissatisfied' | 'unrated';
  transferredToAgent: boolean;
  summary?: string;
}

const mockKnowledgeBase: KnowledgeBaseEntry[] = [
  { id: 'KB001', question: '如何预订房间？', answer: '您可以通过小程序、OTA平台或电话预订房间。', category: '预订流程', lastUpdated: '2024-03-01' },
  { id: 'KB002', question: '入住时间是几点？', answer: '标准入住时间是下午3点，如需提前入住请联系前台。', category: '入住退房', lastUpdated: '2024-03-05' },
  { id: 'KB003', question: '是否有停车位？', answer: '我们提供免费停车位，请在入住时向前台咨询具体位置。', category: '酒店设施', lastUpdated: '2024-03-10' },
  { id: 'KB004', question: '如何修改订单？', answer: '请登录您的预订平台进行修改，或联系客服协助处理。', category: '订单管理', lastUpdated: '2024-03-15' },
];

const mockConversations: Conversation[] = [
  { id: 'CONV001', customerName: '张三', startTime: '2024-03-20 10:00', endTime: '2024-03-20 10:05', satisfaction: 'satisfied', transferredToAgent: false, summary: '咨询预订流程' },
  { id: 'CONV002', customerName: '李四', startTime: '2024-03-20 11:30', endTime: '2024-03-20 11:45', satisfaction: 'dissatisfied', transferredToAgent: true, summary: '投诉房间卫生问题' },
  { id: 'CONV003', customerName: '王五', startTime: '2024-03-21 09:15', endTime: '2024-03-21 09:20', satisfaction: 'neutral', transferredToAgent: false, summary: '咨询早餐时间' },
  { id: 'CONV004', customerName: '赵六', startTime: '2024-03-21 15:00', endTime: '2024-03-21 15:02', satisfaction: 'unrated', transferredToAgent: false, summary: '询问周边景点' },
];

const AICustomerServiceSystem: React.FC = () => {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseEntry[]>(mockKnowledgeBase);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const handleAddKnowledge = () => {
    alert('添加新知识条目... (原型中模拟操作)');
  };

  const handleEditKnowledge = (id: string) => {
    alert(`编辑知识条目 ${id}... (原型中模拟操作)`);
  };

  const handleDeleteKnowledge = (id: string) => {
    if (window.confirm(`确定要删除知识条目 ${id} 吗？`)) {
      setKnowledgeBase(prev => prev.filter(entry => entry.id !== id));
      alert(`知识条目 ${id} 已删除。`);
    }
  };

  const getSatisfactionIcon = (satisfaction: Conversation['satisfaction']) => {
    switch (satisfaction) {
      case 'satisfied': return <Smile className="w-4 h-4 text-green-500" />;
      case 'neutral': return <MessageSquare className="w-4 h-4 text-yellow-500" />;
      case 'dissatisfied': return <Frown className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">AI客服系统</h2>

      {/* 智能客服配置 - 常见问题知识库 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">常见问题知识库</h3>
        <div className="flex justify-end">
          <button
            onClick={handleAddKnowledge}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Book className="w-4 h-4" />
            <span>新增知识条目</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">问题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">答案</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上次更新</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {knowledgeBase.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.question}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{entry.answer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditKnowledge(entry.id)}
                      className="text-primary-600 hover:text-primary-900 mr-2"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteKnowledge(entry.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 客服对话管理 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">客服对话记录</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">对话ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">满意度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">转人工</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">摘要</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conversations.map(conv => (
                <tr key={conv.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conv.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <User className="w-4 h-4"/><span>{conv.customerName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conv.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conv.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center space-x-1">{getSatisfactionIcon(conv.satisfaction)}<span>{conv.satisfaction === 'satisfied' ? '满意' : conv.satisfaction === 'neutral' ? '一般' : conv.satisfaction === 'dissatisfied' ? '不满意' : '未评价'}</span></span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {conv.transferredToAgent ? <CheckCircle className="w-4 h-4 text-green-500"/> : <XCircle className="w-4 h-4 text-red-500"/>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{conv.summary || '无摘要'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AICustomerServiceSystem; 