import React, { useState } from 'react';
import { Globe, Smartphone, Phone, ClipboardList, Scan, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  type: 'OTA' | '小程序' | '电话' | '线下';
  status: 'connected' | 'disconnected' | 'pending';
}

interface OrderRecord {
  id: string;
  platform: string;
  rawOrderData: string; // Simplified for prototype
  parseStatus: 'success' | 'failed' | 'pending';
  parseMessage?: string;
  isDuplicate: boolean;
}

const mockChannels: Channel[] = [
  { id: 'C001', name: '携程', type: 'OTA', status: 'connected' },
  { id: 'C002', name: '美团', type: 'OTA', status: 'connected' },
  { id: 'C003', name: '飞猪', type: 'OTA', status: 'pending' },
  { id: 'C004', name: '官方小程序', type: '小程序', status: 'connected' },
  { id: 'C005', name: '电话预订', type: '电话', status: 'connected' },
  { id: 'C006', name: '线下录入', type: '线下', status: 'connected' },
];

const mockOrderRecords: OrderRecord[] = [
  { id: 'OR001', platform: '携程', rawOrderData: 'OTA订单数据... (简化)', parseStatus: 'success', isDuplicate: false },
  { id: 'OR002', platform: '美团', rawOrderData: 'OTA订单数据... (简化)', parseStatus: 'success', isDuplicate: false },
  { id: 'OR003', platform: '飞猪', rawOrderData: '订单截图数据... (简化)', parseStatus: 'pending', parseMessage: '等待OCR识别', isDuplicate: false },
  { id: 'OR004', platform: '自有小程序', rawOrderData: '小程序订单数据... (简化)', parseStatus: 'success', isDuplicate: false },
  { id: 'OR005', platform: '电话预订', rawOrderData: '电话预订录入... (简化)', parseStatus: 'success', isDuplicate: false },
  { id: 'OR006', platform: '线下录入', rawOrderData: '线下录入数据... (简化)', parseStatus: 'success', isDuplicate: false },
  { id: 'OR007', platform: '携程', rawOrderData: '重复订单数据... (简化)', parseStatus: 'failed', parseMessage: '订单号重复', isDuplicate: true },
];

const OrderAccessManagement: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [orderRecords, setOrderRecords] = useState<OrderRecord[]>(mockOrderRecords);

  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'OTA': return <Globe className="w-4 h-4" />;
      case '小程序': return <Smartphone className="w-4 h-4" />;
      case '电话': return <Phone className="w-4 h-4" />;
      case '线下': return <ClipboardList className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">订单接入管理</h2>

      {/* 多渠道订单统一接入 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">渠道接入状态</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map(channel => (
            <div key={channel.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-primary-600">{getChannelIcon(channel.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{channel.name}</p>
                <p className="text-sm text-gray-500">{channel.type}</p>
              </div>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${channel.status === 'connected' ? 'bg-green-100 text-green-800' : channel.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
              >
                {channel.status === 'connected' ? '已连接' : channel.status === 'pending' ? '待配置' : '未连接'}
              </span>
              <button className="text-sm text-primary-600 hover:text-primary-800">配置</button>
            </div>
          ))}
        </div>
      </div>

      {/* 订单识别和解析 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">订单解析记录</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原始数据（简化）</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">解析状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">重复检测</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderRecords.map(record => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center space-x-1 text-primary-600 hover:underline cursor-pointer">
                      <FileText className="w-4 h-4" />
                      <span>查看数据</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      {record.parseStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {record.parseStatus === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {record.parseStatus === 'pending' && <span className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></span>}
                      <span>
                        {record.parseStatus === 'success' ? '成功' : record.parseStatus === 'failed' ? '失败' : '进行中'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.parseMessage || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.isDuplicate ? (
                      <span className="text-red-600 font-medium">是</span>
                    ) : (
                      <span className="text-green-600 font-medium">否</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-2">处理</button>
                    <button className="text-gray-600 hover:text-gray-900">忽略</button>
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

export default OrderAccessManagement; 