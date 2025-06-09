import React, { useState } from 'react';
import { Settings, RefreshCw, Upload, Download, ExternalLink, Link, Bell, CheckCircle, XCircle } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  type: 'OTA' | 'PMS_OWNED';
  connectionStatus: 'connected' | 'disconnected' | 'pending';
  lastSyncDate: string;
  apiKeyConfigured: boolean;
}

interface SyncLog {
  id: string;
  platformId: string;
  syncType: 'property_info' | 'price_inventory';
  status: 'success' | 'failed' | 'in_progress';
  message: string;
  timestamp: string;
}

const mockPlatforms: Platform[] = [
  { id: 'P001', name: '携程', type: 'OTA', connectionStatus: 'connected', lastSyncDate: '2024-03-22 10:30', apiKeyConfigured: true },
  { id: 'P002', name: '美团', type: 'OTA', connectionStatus: 'connected', lastSyncDate: '2024-03-22 10:25', apiKeyConfigured: true },
  { id: 'P003', name: '飞猪', type: 'OTA', connectionStatus: 'disconnected', lastSyncDate: '2024-03-21 18:00', apiKeyConfigured: false },
  { id: 'P004', name: '途家', type: 'OTA', connectionStatus: 'pending', lastSyncDate: '-', apiKeyConfigured: false },
];

const mockSyncLogs: SyncLog[] = [
  { id: 'SL001', platformId: 'P001', syncType: 'property_info', status: 'success', message: '房源信息同步成功', timestamp: '2024-03-22 10:30' },
  { id: 'SL002', platformId: 'P002', syncType: 'price_inventory', status: 'success', message: '价格库存同步成功', timestamp: '2024-03-22 10:25' },
  { id: 'SL003', platformId: 'P003', syncType: 'property_info', status: 'failed', message: 'API密钥无效', timestamp: '2024-03-21 18:00' },
  { id: 'SL004', platformId: 'P001', syncType: 'price_inventory', status: 'in_progress', message: '正在同步最新价格', timestamp: '2024-03-22 10:40' },
];

const OTAPlatformManagement: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>(mockPlatforms);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>(mockSyncLogs);

  const handleConfigurePlatform = (platformId: string) => {
    alert(`配置平台 ${platformId} 的API接入... (原型中模拟操作)`);
    // In a real app, this would open a modal or navigate to a config page
  };

  const handleSyncData = (platformId: string, syncType: 'property_info' | 'price_inventory') => {
    alert(`开始同步 ${platformId} 的 ${syncType === 'property_info' ? '房源信息' : '价格和库存'}... (原型中模拟操作)`);
    // Simulate a pending status for a brief moment
    setSyncLogs(prev => [...prev, {
      id: `SL${(prev.length + 1).toString().padStart(3, '0')}`,
      platformId,
      syncType,
      status: 'in_progress',
      message: `正在同步 ${syncType === 'property_info' ? '房源信息' : '价格和库存'}`,
      timestamp: new Date().toLocaleString('zh-CN'),
    }]);
    setTimeout(() => {
      setSyncLogs(prev => prev.map(log => log.id === `SL${(mockSyncLogs.length + 1).toString().padStart(3, '0')}` ? { ...log, status: 'success', message: '同步成功' } : log));
      alert('同步完成！');
    }, 2000); // Simulate a 2-second sync
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">OTA平台管理</h2>

      {/* 平台接入配置 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">已接入平台概览</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">连接状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API配置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上次同步</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {platforms.map(platform => (
                <tr key={platform.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{platform.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.type === 'OTA' ? 'OTA平台' : '自有渠道'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${platform.connectionStatus === 'connected' ? 'bg-green-100 text-green-800' : platform.connectionStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {platform.connectionStatus === 'connected' ? '已连接' : platform.connectionStatus === 'pending' ? '待配置' : '未连接'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {platform.apiKeyConfigured ? (
                      <span className="text-green-600 flex items-center space-x-1"><CheckCircle className="w-4 h-4"/><span>已配置</span></span>
                    ) : (
                      <span className="text-red-600 flex items-center space-x-1"><XCircle className="w-4 h-4"/><span>未配置</span></span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.lastSyncDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleConfigurePlatform(platform.id)}
                      className="text-primary-600 hover:text-primary-900 mr-2"
                    >
                      <Settings className="w-4 h-4 inline-block mr-1"/>配置
                    </button>
                    <button
                      onClick={() => handleSyncData(platform.id, 'property_info')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <RefreshCw className="w-4 h-4 inline-block mr-1"/>同步房源
                    </button>
                    <button
                      onClick={() => handleSyncData(platform.id, 'price_inventory')}
                      className="text-blue-600 hover:text-blue-900 ml-2"
                    >
                      <RefreshCw className="w-4 h-4 inline-block mr-1"/>同步价格
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 房源信息同步和价格库存同步 - 简化为同步日志 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">同步日志</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">同步类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syncLogs.map(log => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mockPlatforms.find(p => p.id === log.platformId)?.name || log.platformId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.syncType === 'property_info' ? '房源信息' : '价格库存'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'success' ? 'bg-green-100 text-green-800' : log.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {log.status === 'success' ? '成功' : log.status === 'in_progress' ? '进行中' : '失败'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OTAPlatformManagement; 