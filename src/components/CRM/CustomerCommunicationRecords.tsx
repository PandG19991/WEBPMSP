import React from 'react';
import { Mail, Search, Plus, Trash2, Edit2 } from 'lucide-react';

interface CommunicationRecord {
  id: string;
  customerName: string;
  type: string;
  date: string;
  summary: string;
}

const mockCommunicationRecords: CommunicationRecord[] = [
  { id: '1', customerName: '张三', type: '电话', date: '2023-01-15', summary: '咨询房源详情，对豪华套房感兴趣。' },
  { id: '2', customerName: '李四', type: '邮件', date: '2023-02-20', summary: '反馈入住体验，建议增加房间设施。' },
  { id: '3', customerName: '王五', type: '微信', date: '2023-03-01', summary: '咨询会员积分规则。' },
  { id: '4', customerName: '赵六', type: '电话', date: '2023-03-10', summary: '投诉清洁服务不及时。' },
  { id: '5', customerName: '钱七', type: '邮件', date: '2023-04-05', summary: '预订团建活动，询问团队优惠。' },
];

const CustomerCommunicationRecords: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">客户沟通记录</h2>

      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索客户名称或记录内容..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>添加记录</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">沟通类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">概要</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCommunicationRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.summary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerCommunicationRecords; 