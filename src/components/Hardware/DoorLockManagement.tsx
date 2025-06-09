import React, { useState } from 'react';
import { Wifi, Lock, Unlock, AlertTriangle, BatteryCharging, List } from 'lucide-react';

interface DoorLock {
  id: string;
  name: string;
  location: string; // e.g., '豪华湖景别墅 - A101', '市中心精品公寓 - B203'
  status: 'online' | 'offline' | 'faulty';
  batteryLevel: number; // percentage
  lastReported: string;
  firmwareVersion: string;
}

interface EventLog {
  id: string;
  lockId: string;
  eventType: 'locked' | 'unlocked' | 'battery_low' | 'tamper_alarm' | 'offline';
  timestamp: string;
  details: string;
}

const mockDoorLocks: DoorLock[] = [
  { id: 'DL001', name: 'A101主卧锁', location: '豪华湖景别墅 - A101', status: 'online', batteryLevel: 85, lastReported: '2024-03-22 14:00', firmwareVersion: '1.2.0' },
  { id: 'DL002', name: 'B203入户锁', location: '市中心精品公寓 - B203', status: 'online', batteryLevel: 20, lastReported: '2024-03-22 14:05', firmwareVersion: '1.2.1' },
  { id: 'DL003', name: 'C301露台锁', location: '海滨度假屋 - C301', status: 'offline', batteryLevel: 0, lastReported: '2024-03-21 18:00', firmwareVersion: '1.1.5' },
  { id: 'DL004', name: 'A101客卧锁', location: '豪华湖景别墅 - A101', status: 'faulty', batteryLevel: 60, lastReported: '2024-03-22 13:45', firmwareVersion: '1.2.0' },
];

const mockEventLogs: EventLog[] = [
  { id: 'EL001', lockId: 'DL001', eventType: 'unlocked', timestamp: '2024-03-22 14:00', details: '密码开锁 - 订单ORD003' },
  { id: 'EL002', lockId: 'DL002', eventType: 'battery_low', timestamp: '2024-03-22 13:50', details: '电量低于20%' },
  { id: 'EL003', lockId: 'DL003', eventType: 'offline', timestamp: '2024-03-21 18:00', details: '设备离线' },
  { id: 'EL004', lockId: 'DL004', eventType: 'tamper_alarm', timestamp: '2024-03-22 13:40', details: '防撬报警触发' },
  { id: 'EL005', lockId: 'DL001', eventType: 'locked', timestamp: '2024-03-22 10:00', details: '自动上锁' },
];

const DoorLockManagement: React.FC = () => {
  const [doorLocks, setDoorLocks] = useState<DoorLock[]>(mockDoorLocks);
  const [eventLogs, setEventLogs] = useState<EventLog[]>(mockEventLogs);

  const handleRegisterDevice = () => {
    alert('注册新门锁设备... (原型中模拟操作)');
  };

  const handleViewDetails = (lockId: string) => {
    alert(`查看门锁 ${lockId} 详情和配置... (原型中模拟操作)`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">门锁设备管理</h2>

      {/* 设备接入管理 - 门锁概览 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">门锁设备概览</h3>
        <div className="flex justify-end">
          <button
            onClick={handleRegisterDevice}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>注册新设备</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">电量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上次报告</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doorLocks.map(lock => (
                <tr key={lock.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lock.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lock.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${lock.status === 'online' ? 'bg-green-100 text-green-800' : lock.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {lock.status === 'online' ? '在线' : lock.status === 'offline' ? '离线' : '故障'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <BatteryCharging className={`w-4 h-4 ${lock.batteryLevel < 30 ? 'text-red-500' : 'text-green-500'}`}/>
                    <span>{lock.batteryLevel}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lock.lastReported}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(lock.id)}
                      className="text-primary-600 hover:text-primary-900 mr-2"
                    >
                      <List className="w-4 h-4 inline-block mr-1"/>详情
                    </button>
                    <button
                      onClick={() => alert(`发送开锁指令到 ${lock.name}...`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Unlock className="w-4 h-4 inline-block mr-1"/>远程开锁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 密码管理系统 - 临时密码生成和密码发送管理（简化为日志） */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">门锁事件日志</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日志ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">门锁</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事件类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">详情</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventLogs.map(log => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mockDoorLocks.find(lock => lock.id === log.lockId)?.name || log.lockId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${log.eventType === 'unlocked' ? 'bg-green-100 text-green-800' : log.eventType === 'locked' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                      {log.eventType === 'locked' ? '上锁' : log.eventType === 'unlocked' ? '开锁' : log.eventType === 'battery_low' ? '低电量' : log.eventType === 'tamper_alarm' ? '防撬报警' : '离线'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoorLockManagement; 