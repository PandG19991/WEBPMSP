import React, { useState } from 'react';
import { Key, Send, Search, Clock, AlertTriangle, User } from 'lucide-react';

interface PasswordRecord {
  id: string;
  type: 'guest_temporary' | 'staff_permanent' | 'master';
  target: string; // e.g., order ID, staff name, property name
  password: string; // Simplified for prototype
  validityStart: string;
  validityEnd: string;
  status: 'active' | 'expired' | 'revoked';
  creationDate: string;
  createdBy: string;
}

const mockPasswords: PasswordRecord[] = [
  { id: 'PW001', type: 'guest_temporary', target: 'ORD001', password: '123456', validityStart: '2024-03-20 15:00', validityEnd: '2024-03-22 12:00', status: 'active', creationDate: '2024-03-19', createdBy: '系统' },
  { id: 'PW002', type: 'guest_temporary', target: 'ORD003', password: '654321', validityStart: '2024-03-21 16:00', validityEnd: '2024-03-23 12:00', status: 'active', creationDate: '2024-03-20', createdBy: '张管理员' },
  { id: 'PW003', type: 'staff_permanent', target: '清洁工李华', password: 'cleaner88', validityStart: '2023-01-01 00:00', validityEnd: '2025-12-31 23:59', status: 'active', creationDate: '2023-01-01', createdBy: '系统' },
  { id: 'PW004', type: 'guest_temporary', target: 'ORD004', password: '987654', validityStart: '2024-03-15 15:00', validityEnd: '2024-03-17 12:00', status: 'expired', creationDate: '2024-03-14', createdBy: '系统' },
];

const PasswordManagementSystem: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordRecord[]>(mockPasswords);

  const handleGeneratePassword = () => {
    alert('生成新临时密码... (原型中模拟操作)');
  };

  const handleSendPassword = (passwordId: string) => {
    alert(`发送密码 ${passwordId} 给客人/员工... (原型中模拟操作)`);
  };

  const handleRevokePassword = (passwordId: string) => {
    if (window.confirm(`确定要撤销密码 ${passwordId} 吗？`)) {
      setPasswords(prev => prev.map(pw => pw.id === passwordId ? { ...pw, status: 'revoked' } : pw));
      alert(`密码 ${passwordId} 已撤销。`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">密码管理系统</h2>

      {/* 临时密码生成 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">临时密码生成与管理</h3>
        <div className="flex justify-end">
          <button
            onClick={handleGeneratePassword}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Key className="w-4 h-4" />
            <span>生成临时密码</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">密码ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联目标</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">密码</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有效期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {passwords.map(pw => (
                <tr key={pw.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pw.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pw.type === 'guest_temporary' ? '客人临时' : pw.type === 'staff_permanent' ? '员工' : '主密码'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    {pw.type === 'guest_temporary' ? <User className="w-4 h-4"/> : <User className="w-4 h-4"/>}
                    <span>{pw.target}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{pw.password}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <Clock className="w-4 h-4"/><span>{pw.validityStart} - {pw.validityEnd}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${pw.status === 'active' ? 'bg-green-100 text-green-800' : pw.status === 'expired' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                      {pw.status === 'active' ? '活跃' : pw.status === 'expired' ? '已过期' : '已撤销'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {pw.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleSendPassword(pw.id)}
                          className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1 mb-1"
                        >
                          <Send className="w-4 h-4" />
                          <span>发送密码</span>
                        </button>
                        <button
                          onClick={() => handleRevokePassword(pw.id)}
                          className="text-red-600 hover:text-red-900 flex items-center justify-end space-x-1"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span>撤销密码</span>
                        </button>
                      </>
                    )}
                    {pw.status !== 'active' && (
                      <span className="text-gray-500">已处理</span>
                    )}
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

export default PasswordManagementSystem; 