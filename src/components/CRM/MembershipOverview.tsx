import React from 'react';
import { Crown, Star, Award, Users } from 'lucide-react';

const MembershipOverview: React.FC = () => {
  const membershipTiers = [
    {
      name: '青铜会员',
      icon: Award,
      count: 1245,
      percentage: 62,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      name: '白银会员',
      icon: Star,
      count: 587,
      percentage: 29,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
    {
      name: '黄金会员',
      icon: Crown,
      count: 156,
      percentage: 8,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      name: '白金会员',
      icon: Crown,
      count: 24,
      percentage: 1,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const stats = [
    { label: '总会员数', value: '2,012', icon: Users },
    { label: '积分兑换', value: '45,670', icon: Award },
    { label: '平均生命价值', value: '¥8,450', icon: Star },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 leading-heading">会员等级</h3>
        
        <div className="space-y-4">
          {membershipTiers.map((tier) => {
            const Icon = tier.icon;
            
            return (
              <div key={tier.name} className={`border-2 ${tier.borderColor} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${tier.bgColor}`}>
                      <Icon className={`w-5 h-5 ${tier.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                      <p className="text-sm text-gray-600">{tier.count} 位会员</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{tier.percentage}%</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${tier.bgColor.replace('bg-', 'bg-').replace('-50', '-400')}`}
                        style={{ width: `${tier.percentage * 2}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 leading-heading">会员统计</h3>
        
        <div className="space-y-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            
            return (
              <div key={stat.label} className="flex items-center space-x-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
          
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">最近活动</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">• 本周新增23位会员</p>
              <p className="text-gray-600">• 156次积分兑换</p>
              <p className="text-gray-600">• 8位会员升级</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipOverview;