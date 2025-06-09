import React from 'react';
import { Calendar, MapPin, User, Phone, CreditCard, MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react';

interface OrderListProps {
  searchTerm: string;
  statusFilter: string;
  dateRange: string;
  onSelectOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ searchTerm, statusFilter, dateRange, onSelectOrder }) => {
  const orders = [
    {
      id: 'BK001',
      guest: {
        name: '张伟',
        phone: '+86 138 0013 8000',
        email: 'zhang.wei@email.com',
      },
      property: '豪华市中心套房',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      nights: 3,
      guests: 2,
      amount: 2400,
      channel: 'Airbnb',
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: '2024-01-10',
    },
    {
      id: 'BK002',
      guest: {
        name: '李梅',
        phone: '+86 139 0013 9000',
        email: 'li.mei@email.com',
      },
      property: '现代城市公寓',
      checkIn: '2024-01-16',
      checkOut: '2024-01-19',
      nights: 3,
      guests: 1,
      amount: 1200,
      channel: 'Booking.com',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-01-12',
    },
    {
      id: 'BK003',
      guest: {
        name: '王军',
        phone: '+86 137 0013 7000',
        email: 'wang.jun@email.com',
      },
      property: '行政套房',
      checkIn: '2024-01-17',
      checkOut: '2024-01-20',
      nights: 3,
      guests: 4,
      amount: 3600,
      channel: '直接预订',
      status: 'checked-in',
      paymentStatus: 'paid',
      createdAt: '2024-01-08',
    },
    {
      id: 'BK004',
      guest: {
        name: '陈玲',
        phone: '+86 136 0013 6000',
        email: 'chen.ling@email.com',
      },
      property: '温馨工作室',
      checkIn: '2024-01-14',
      checkOut: '2024-01-17',
      nights: 3,
      guests: 2,
      amount: 900,
      channel: '微信小程序',
      status: 'checked-out',
      paymentStatus: 'paid',
      createdAt: '2024-01-05',
    },
    {
      id: 'BK005',
      guest: {
        name: '刘浩',
        phone: '+86 135 0013 5000',
        email: 'liu.hao@email.com',
      },
      property: '豪华市中心套房',
      checkIn: '2024-01-20',
      checkOut: '2024-01-23',
      nights: 3,
      guests: 3,
      amount: 2400,
      channel: 'Airbnb',
      status: 'cancelled',
      paymentStatus: 'refunded',
      createdAt: '2024-01-13',
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-secondary-100 text-secondary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'checked-in':
        return 'bg-primary-100 text-primary-800';
      case 'checked-out':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '已确认';
      case 'pending':
        return '待确认';
      case 'checked-in':
        return '已入住';
      case 'checked-out':
        return '已退房';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-secondary-600';
      case 'pending':
        return 'text-warning-600';
      case 'refunded':
        return 'text-error-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return '已支付';
      case 'pending':
        return '待支付';
      case 'refunded':
        return '已退款';
      default:
        return status;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Airbnb':
        return 'bg-red-100 text-red-800';
      case 'Booking.com':
        return 'bg-blue-100 text-blue-800';
      case '直接预订':
        return 'bg-purple-100 text-purple-800';
      case '微信小程序':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">订单号</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">客人</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">房源</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">入住日期</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">金额</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">渠道</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">状态</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.createdAt}</p>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.guest.name}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span>{order.guest.phone}</span>
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{order.property}</p>
                    <p className="text-sm text-gray-500">{order.guests}位客人</p>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">{order.checkIn}</p>
                    <p className="text-sm text-gray-500">{order.nights}晚</p>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div>
                  <p className="font-semibold text-gray-900">¥{order.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3 text-gray-400" />
                    <span className={`text-sm ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChannelColor(order.channel)}`}>
                  {order.channel}
                </span>
              </td>
              
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSelectOrder(order.id); }}
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {order.status === 'pending' && (
                    <button className="p-1 text-gray-400 hover:text-secondary-600 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <button className="p-1 text-gray-400 hover:text-error-600 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          没有找到符合条件的订单。
        </div>
      )}
    </div>
  );
};

export default OrderList;