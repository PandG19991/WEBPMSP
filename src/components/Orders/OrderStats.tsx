import React from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const OrderStats: React.FC = () => {
  const stats = [
    {
      title: '待确认订单',
      count: 8,
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
    },
    {
      title: '已确认预订',
      count: 24,
      icon: CheckCircle,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
    },
    {
      title: '今日入住',
      count: 6,
      icon: AlertTriangle,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
    },
    {
      title: '取消订单',
      count: 3,
      icon: XCircle,
      color: 'text-error-600',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={stat.title}
            className={`bg-white border-2 ${stat.borderColor} rounded-lg p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 leading-heading">{stat.count}</p>
                <p className="text-sm font-medium text-gray-600 leading-body">{stat.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;