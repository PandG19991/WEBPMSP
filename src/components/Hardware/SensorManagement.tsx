import React, { useState } from 'react';
import { Thermometer, Lightbulb, Droplet, Wind, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';

interface Sensor {
  id: string;
  name: string;
  location: string; // e.g., '豪华湖景别墅 - 客厅', '市中心精品公寓 - 卧室'
  type: 'temperature' | 'humidity' | 'light' | 'air_quality';
  currentValue: number;
  unit: string;
  status: 'normal' | 'alert' | 'offline';
  lastReported: string;
}

interface Alert {
  id: string;
  sensorId: string;
  alertType: 'threshold_exceeded' | 'offline' | 'malfunction';
  message: string;
  timestamp: string;
  isResolved: boolean;
}

const mockSensors: Sensor[] = [
  { id: 'SN001', name: '客厅温度计', location: '豪华湖景别墅 - 客厅', type: 'temperature', currentValue: 24.5, unit: '°C', status: 'normal', lastReported: '2024-03-22 15:00' },
  { id: 'SN002', name: '卧室湿度计', location: '市中心精品公寓 - 卧室', type: 'humidity', currentValue: 55, unit: '% RH', status: 'normal', lastReported: '2024-03-22 14:55' },
  { id: 'SN003', name: '厨房烟雾报警', location: '海滨度假屋 - 厨房', type: 'air_quality', currentValue: 120, unit: 'AQI', status: 'alert', lastReported: '2024-03-22 14:50' },
  { id: 'SN004', name: '门厅光照传感器', location: '豪华湖景别墅 - 门厅', type: 'light', currentValue: 300, unit: 'Lux', status: 'offline', lastReported: '2024-03-21 10:00' },
];

const mockAlerts: Alert[] = [
  { id: 'AL001', sensorId: 'SN003', alertType: 'threshold_exceeded', message: '厨房烟雾浓度过高！', timestamp: '2024-03-22 14:50', isResolved: false },
  { id: 'AL002', sensorId: 'SN004', alertType: 'offline', message: '门厅光照传感器离线。', timestamp: '2024-03-21 10:00', isResolved: false },
  { id: 'AL003', sensorId: 'SN001', alertType: 'malfunction', message: '客厅温度计数据异常。', timestamp: '2024-03-20 09:00', isResolved: true },
];

const SensorManagement: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const getSensorIcon = (type: Sensor['type']) => {
    switch (type) {
      case 'temperature': return <Thermometer className="w-5 h-5 text-red-500" />;
      case 'humidity': return <Droplet className="w-5 h-5 text-blue-500" />;
      case 'light': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'air_quality': return <Wind className="w-5 h-5 text-gray-500" />;
      default: return null;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? { ...alert, isResolved: true } : alert));
    alert(`警报 ${alertId} 已标记为已解决。`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">智能传感器管理</h2>

      {/* 传感器概览 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">传感器设备概览</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensors.map(sensor => (
            <div key={sensor.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-primary-600 p-2 bg-primary-50 rounded-full">
                {getSensorIcon(sensor.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{sensor.name}</p>
                <p className="text-sm text-gray-500">{sensor.location}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{sensor.currentValue}{sensor.unit}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${sensor.status === 'normal' ? 'bg-green-100 text-green-800' : sensor.status === 'alert' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {sensor.status === 'normal' ? '正常' : sensor.status === 'alert' ? '警报' : '离线'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 警报与通知 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">警报与事件日志</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-500">暂无未处理警报。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">警报ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">传感器</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消息</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map(alert => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mockSensors.find(s => s.id === alert.sensorId)?.name || alert.sensorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${alert.alertType === 'threshold_exceeded' ? 'bg-red-100 text-red-800' : alert.alertType === 'offline' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {alert.alertType === 'threshold_exceeded' ? '超限' : alert.alertType === 'offline' ? '离线' : '故障'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{alert.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.isResolved ? (
                      <span className="inline-flex items-center space-x-1 text-green-600"><CheckCircle className="w-4 h-4"/><span>已解决</span></span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-red-600"><AlertTriangle className="w-4 h-4"/><span>未解决</span></span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {!alert.isResolved && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        标记为已解决
                      </button>
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

export default SensorManagement; 