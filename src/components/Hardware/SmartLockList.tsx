import React from 'react';
import { Lock, Wifi, WifiOff, Battery, Settings, Key, AlertTriangle } from 'lucide-react';

const SmartLockList: React.FC = () => {
  const smartLocks = [
    {
      id: 'SL001',
      name: '豪华套房A - 主门',
      property: '豪华市中心套房',
      status: 'online',
      battery: 85,
      lastActivity: '2024-01-15 14:30',
      activeCodes: 2,
      totalCodes: 15,
      firmwareVersion: '2.1.4',
    },
    {
      id: 'SL002',
      name: '现代公寓B - 入口',
      property: '现代城市公寓',
      status: 'online',
      battery: 92,
      lastActivity: '2024-01-15 12:15',
      activeCodes: 1,
      totalCodes: 8,
      firmwareVersion: '2.1.4',
    },
    {
      id: 'SL003',
      name: '行政套房 - 主门',
      property: '行政商务套房',
      status: 'offline',
      battery: 23,
      lastActivity: '2024-01-14 18:45',
      activeCodes: 0,
      totalCodes: 12,
      firmwareVersion: '2.0.8',
    },
    {
      id: 'SL004',
      name: '工作室 - 入口门',
      property: '温馨工作室',
      status: 'online',
      battery: 67,
      lastActivity: '2024-01-15 13:22',
      activeCodes: 1,
      totalCodes: 5,
      firmwareVersion: '2.1.4',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-secondary-600" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-error-600" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-secondary-100 text-secondary-800';
      case 'offline':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return '在线';
      case 'offline':
        return '离线';
      default:
        return status;
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-secondary-600';
    if (battery > 20) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 leading-heading">智能门锁设备</h2>
        <div className="text-sm text-gray-500">
          {smartLocks.filter(lock => lock.status === 'online').length} / {smartLocks.length} 设备在线
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {smartLocks.map((lock) => (
          <div key={lock.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Lock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-heading">{lock.name}</h3>
                  <p className="text-sm text-gray-600">{lock.property}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(lock.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lock.status)}`}>
                  {getStatusText(lock.status)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(lock.battery)}`} />
                  <span className="text-sm text-gray-600">电池</span>
                </div>
                <span className={`font-medium ${getBatteryColor(lock.battery)}`}>
                  {lock.battery}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">活跃密码</span>
                </div>
                <span className="font-medium text-gray-900">
                  {lock.activeCodes}/{lock.totalCodes}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <p>最后活动: {lock.lastActivity}</p>
                <p>固件版本: v{lock.firmwareVersion}</p>
              </div>

              {lock.battery < 30 && (
                <div className="flex items-center space-x-2 p-2 bg-warning-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-warning-600" />
                  <span className="text-sm text-warning-800">电池电量低警告</span>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  生成密码
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartLockList;