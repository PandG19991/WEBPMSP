import React, { useState } from 'react';
import { Search, History, Download } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  result: string;
  ipAddress: string;
}

const mockAuditLogs: AuditLog[] = [
  { id: '1', timestamp: '2023-11-20 10:30:00', user: 'admin', action: '修改房源信息', target: '豪华套房A101', result: '成功', ipAddress: '192.168.1.100' },
  { id: '2', timestamp: '2023-11-20 10:25:15', user: 'editor', action: '发布文章', target: 'PMS系统新功能介绍', result: '成功', ipAddress: '192.168.1.102' },
  { id: '3', timestamp: '2023-11-20 10:20:40', user: 'admin', action: '删除用户', target: 'user_zhangsan', result: '失败 (权限不足)', ipAddress: '192.168.1.100' },
  { id: '4', timestamp: '2023-11-20 10:15:05', user: 'viewer', action: '查看订单详情', target: '订单#20231120001', result: '成功', ipAddress: '192.168.1.105' },
  { id: '5', timestamp: '2023-11-20 10:10:30', user: 'admin', action: '系统配置更改', target: '支付网关设置', result: '成功', ipAddress: '192.168.1.100' },
  { id: '6', timestamp: '2023-11-20 10:05:50', user: 'editor', action: '上传图片', target: '房源图片集', result: '成功', ipAddress: '192.168.1.102' },
  { id: '7', timestamp: '2023-11-20 10:00:20', user: 'guest', action: '登录失败', target: '系统登录', result: '失败 (密码错误)', ipAddress: '203.0.113.45' },
];

const OperationAuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterResult, setFilterResult] = useState('all');

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    const matchesResult = filterResult === 'all' || log.result.includes(filterResult);
    return matchesSearch && matchesUser && matchesResult;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">操作审计日志</h2>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索用户、操作或目标..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">所有用户</option>
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
          <option value="guest">guest</option>
        </select>
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">所有结果</option>
          <option value="成功">成功</option>
          <option value="失败">失败</option>
        </select>
        <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          <span>导出日志</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间戳</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结果</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.target}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.result === '成功' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {log.result}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationAuditLog; 