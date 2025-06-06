import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Home, Calendar, Users } from 'lucide-react';

const KPICards: React.FC = () => {
  const kpis = [
    {
      title: '总收入',
      value: '¥156,840',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
    },
    {
      title: '活跃房源',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Home,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: '入住率',
      value: '87.3%',
      change: '-2.1%',
      trend: 'down',
      icon: Calendar,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      title: '总客人数',
      value: '1,247',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={kpi.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi.trend === 'up' ? 'text-secondary-600' : 'text-error-500'
              }`}>
                <TrendIcon className="w-4 h-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 leading-body">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 leading-heading">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;