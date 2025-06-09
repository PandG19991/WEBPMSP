import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { HardDrive, Cpu, Cloud, Database, AlertTriangle } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
}

const mockSystemMetrics: Metric[] = [
  { name: 'CPU使用率', value: 65, unit: '%', icon: Cpu, color: '#ef4444' },
  { name: '内存使用', value: 82, unit: '%', icon: HardDrive, color: '#3b82f6' },
  { name: '磁盘IO', value: 45, unit: 'MB/s', icon: Database, color: '#22c55e' },
  { name: '网络流量', value: 120, unit: 'Mbps', icon: Cloud, color: '#f97316' },
];

const mockCpuData = [
  { time: '00:00', value: 60 }, { time: '01:00', value: 62 }, { time: '02:00', value: 61 }, { time: '03:00', value: 63 },
  { time: '04:00', value: 65 }, { time: '05:00', value: 64 }, { time: '06:00', value: 66 }, { time: '07:00', value: 68 },
  { time: '08:00', value: 70 }, { time: '09:00', value: 72 }, { time: '10:00', value: 75 }, { time: '11:00', value: 73 },
];

const mockMemoryData = [
  { time: '00:00', value: 78 }, { time: '01:00', value: 80 }, { time: '02:00', value: 79 }, { time: '03:00', value: 81 },
  { time: '04:00', value: 83 }, { time: '05:00', value: 82 }, { time: '06:00', value: 84 }, { time: '07:00', value: 86 },
  { time: '08:00', value: 88 }, { time: '09:00', value: 90 }, { time: '10:00', value: 92 }, { time: '11:00', value: 91 },
];

const SystemPerformanceMonitoring: React.FC = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching real-time alerts
    const interval = setInterval(() => {
      const newAlerts = [];
      if (Math.random() > 0.8) {
        newAlerts.push(`[${new Date().toLocaleTimeString()}] 警告：CPU使用率过高！`);
      }
      if (Math.random() > 0.9) {
        newAlerts.push(`[${new Date().toLocaleTimeString()}] 严重：数据库连接异常！`);
      }
      setAlerts(prev => [...prev, ...newAlerts].slice(-5)); // Keep last 5 alerts
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">系统性能监控</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockSystemMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-${metric.color.replace('#', '')}-100`}>
              <metric.icon className={`w-6 h-6 text-${metric.color.replace('#', '')}-600`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{metric.name}</p>
              <p className="text-xl font-bold text-gray-900">{metric.value}{metric.unit}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">CPU使用率趋势</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockCpuData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#ef4444" activeDot={{ r: 8 }} name="CPU使用率" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">内存使用趋势</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockMemoryData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} name="内存使用率" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-8">系统报警与通知</h3>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">{alert}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">暂无系统报警。</p>
        )}
      </div>
    </div>
  );
};

export default SystemPerformanceMonitoring; 