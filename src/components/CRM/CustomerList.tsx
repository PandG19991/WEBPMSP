import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, Crown, Star, Award } from 'lucide-react';

const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const customers = [
    {
      id: 'CU001',
      name: '张伟',
      email: 'zhang.wei@email.com',
      phone: '+86 138 0013 8000',
      tier: '黄金会员',
      points: 8420,
      totalBookings: 12,
      totalSpent: 24600,
      lastBooking: '2024-01-10',
      joinDate: '2023-03-15',
      avatar: '张伟',
    },
    {
      id: 'CU002',
      name: '李梅',
      email: 'li.mei@email.com',
      phone: '+86 139 0013 9000',
      tier: '白银会员',
      points: 3280,
      totalBookings: 8,
      totalSpent: 15400,
      lastBooking: '2024-01-08',
      joinDate: '2023-06-22',
      avatar: '李梅',
    },
    {
      id: 'CU003',
      name: '王军',
      email: 'wang.jun@email.com',
      phone: '+86 137 0013 7000',
      tier: '白金会员',
      points: 15670,
      totalBookings: 28,
      totalSpent: 89400,
      lastBooking: '2024-01-12',
      joinDate: '2022-11-08',
      avatar: '王军',
    },
    {
      id: 'CU004',
      name: '陈玲',
      email: 'chen.ling@email.com',
      phone: '+86 136 0013 6000',
      tier: '青铜会员',
      points: 1450,
      totalBookings: 5,
      totalSpent: 7800,
      lastBooking: '2024-01-05',
      joinDate: '2023-09-12',
      avatar: '陈玲',
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesTier = tierFilter === 'all' || customer.tier.includes(tierFilter);
    return matchesSearch && matchesTier;
  });

  const getTierIcon = (tier: string) => {
    if (tier.includes('白金')) return <Crown className="w-4 h-4 text-purple-600" />;
    if (tier.includes('黄金')) return <Crown className="w-4 h-4 text-yellow-600" />;
    if (tier.includes('白银')) return <Star className="w-4 h-4 text-gray-600" />;
    if (tier.includes('青铜')) return <Award className="w-4 h-4 text-amber-600" />;
    return <Award className="w-4 h-4 text-gray-400" />;
  };

  const getTierColor = (tier: string) => {
    if (tier.includes('白金')) return 'bg-purple-100 text-purple-800';
    if (tier.includes('黄金')) return 'bg-yellow-100 text-yellow-800';
    if (tier.includes('白银')) return 'bg-gray-100 text-gray-800';
    if (tier.includes('青铜')) return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-heading">客户数据库</h3>
        <div className="text-sm text-gray-500">
          {filteredCustomers.length} 位客户
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="搜索客户..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">全部等级</option>
          <option value="白金">白金会员</option>
          <option value="黄金">黄金会员</option>
          <option value="白银">白银会员</option>
          <option value="青铜">青铜会员</option>
        </select>
        
        <button className="flex items-center space-x-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>筛选</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">客户</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">联系方式</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">会员等级</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">积分</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">预订次数</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">总消费</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">最后预订</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.id}</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getTierIcon(customer.tier)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}>
                      {customer.tier}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <p className="font-semibold text-gray-900">{customer.points.toLocaleString()}</p>
                </td>
                
                <td className="py-4 px-4">
                  <p className="font-medium text-gray-900">{customer.totalBookings}</p>
                </td>
                
                <td className="py-4 px-4">
                  <p className="font-semibold text-gray-900">¥{customer.totalSpent.toLocaleString()}</p>
                </td>
                
                <td className="py-4 px-4">
                  <p className="text-sm text-gray-900">{customer.lastBooking}</p>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;