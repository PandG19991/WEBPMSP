import React from 'react';
import { Wifi, WifiOff, Settings, BarChart3, AlertTriangle } from 'lucide-react';

const ChannelList: React.FC = () => {
  const channels = [
    {
      id: 'airbnb',
      name: 'Airbnb',
      logo: '🏠',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      properties: 12,
      bookings: 156,
      revenue: 45600,
      issues: 0,
    },
    {
      id: 'booking',
      name: 'Booking.com',
      logo: '🏨',
      status: 'connected',
      lastSync: '2024-01-15 14:25',
      properties: 8,
      bookings: 89,
      revenue: 28900,
      issues: 1,
    },
    {
      id: 'expedia',
      name: 'Expedia',
      logo: '✈️',
      status: 'error',
      lastSync: '2024-01-15 10:15',
      properties: 5,
      bookings: 34,
      revenue: 12400,
      issues: 3,
    },
    {
      id: 'agoda',
      name: 'Agoda',
      logo: '🌐',
      status: 'connected',
      lastSync: '2024-01-15 14:20',
      properties: 6,
      bookings: 67,
      revenue: 19800,
      issues: 0,
    },
    {
      id: 'wechat',
      name: '微信小程序',
      logo: '💬',
      status: 'connected',
      lastSync: '2024-01-15 14:35',
      properties: 24,
      bookings: 234,
      revenue: 67800,
      issues: 0,
    },
    {
      id: 'direct',
      name: '直接预订网站',
      logo: '🌍',
      status: 'disconnected',
      lastSync: '2024-01-14 18:00',
      properties: 0,
      bookings: 12,
      revenue: 3600,
      issues: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-5 h-5 text-secondary-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-error-600" />;
      case 'disconnected':
        return <WifiOff className="w-5 h-5 text-gray-400" />;
      default:
        return <WifiOff className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-secondary-100 text-secondary-800';
      case 'error':
        return 'bg-error-100 text-error-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return '已连接';
      case 'error':
        return '错误';
      case 'disconnected':
        return '未连接';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 leading-heading">已连接渠道</h2>
        <div className="text-sm text-gray-500">
          {channels.filter(c => c.status === 'connected').length} / {channels.length} 个渠道已连接
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <div key={channel.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{channel.logo}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-heading">{channel.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(channel.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                      {getStatusText(channel.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">房源数量</p>
                  <p className="font-semibold text-gray-900">{channel.properties}</p>
                </div>
                <div>
                  <p className="text-gray-600">预订数量</p>
                  <p className="font-semibold text-gray-900">{channel.bookings}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">收入（本月）</p>
                <p className="font-semibold text-gray-900">¥{channel.revenue.toLocaleString()}</p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">最后同步:</span>
                  <span className="text-gray-900">{channel.lastSync}</span>
                </div>
                
                {channel.issues > 0 && (
                  <div className="flex items-center space-x-1 mt-2 text-sm text-error-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{channel.issues} 个问题</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                {channel.status === 'connected' ? (
                  <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    立即同步
                  </button>
                ) : (
                  <button className="flex-1 bg-secondary-600 text-white py-2 rounded-lg hover:bg-secondary-700 transition-colors">
                    {channel.status === 'error' ? '重新连接' : '连接'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;