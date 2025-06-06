import React from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

const SyncStatus: React.FC = () => {
  const syncEvents = [
    {
      channel: 'Airbnb',
      action: '可用性更新',
      status: 'success',
      timestamp: '2024-01-15 14:30:15',
      properties: 12,
    },
    {
      channel: 'Booking.com',
      action: '价格同步',
      status: 'success',
      timestamp: '2024-01-15 14:25:32',
      properties: 8,
    },
    {
      channel: 'Expedia',
      action: '房源内容',
      status: 'error',
      timestamp: '2024-01-15 10:15:45',
      properties: 0,
      error: 'API调用频率超限',
    },
    {
      channel: '微信小程序',
      action: '新预订导入',
      status: 'in-progress',
      timestamp: '2024-01-15 14:35:00',
      properties: 1,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-secondary-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-error-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-warning-600" />;
      default:
        return <RefreshCw className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-secondary-100 text-secondary-800';
      case 'error':
        return 'bg-error-100 text-error-800';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '成功';
      case 'error':
        return '错误';
      case 'in-progress':
        return '进行中';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 leading-heading">同步活动</h2>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>全部同步</span>
        </button>
      </div>

      <div className="space-y-4">
        {syncEvents.map((event, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(event.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
              </div>
              
              <div>
                <p className="font-medium text-gray-900">{event.channel}</p>
                <p className="text-sm text-gray-600">{event.action}</p>
                {event.error && (
                  <p className="text-sm text-error-600">{event.error}</p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-900">{event.timestamp}</p>
              <p className="text-xs text-gray-500">
                {event.properties > 0 && `${event.properties} 个房源受影响`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncStatus;