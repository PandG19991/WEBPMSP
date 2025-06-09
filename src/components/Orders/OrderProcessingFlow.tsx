import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Clock, User, Home, CalendarDays, DollarSign, MessageSquare } from 'lucide-react';

interface Order {
  id: string;
  guestName: string;
  property: string;
  room: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'partially-paid';
  specialRequests?: string;
  channel: string;
  arrivalTime?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001', guestName: '张三', property: '豪华湖景别墅', room: 'A101', checkInDate: '2024-03-20', checkOutDate: '2024-03-22', status: 'pending', paymentStatus: 'unpaid', channel: '携程', arrivalTime: '15:00'
  },
  {
    id: 'ORD002', guestName: '李四', property: '市中心精品公寓', room: 'B203', checkInDate: '2024-03-18', checkOutDate: '2024-03-25', status: 'confirmed', paymentStatus: 'paid', channel: '美团'
  },
  {
    id: 'ORD003', guestName: '王五', property: '海滨度假屋', room: 'C301', checkInDate: '2024-03-21', checkOutDate: '2024-03-23', status: 'checked-in', paymentStatus: 'paid', channel: '自有小程序', specialRequests: '需要婴儿床'
  },
  {
    id: 'ORD004', guestName: '赵六', property: '豪华湖景别墅', room: 'A102', checkInDate: '2024-03-15', checkOutDate: '2024-03-17', status: 'checked-out', paymentStatus: 'paid', channel: '电话预订'
  },
];

const OrderProcessingFlow: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleConfirmOrder = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'confirmed', paymentStatus: 'paid' } : order
      )
    );
    alert(`订单 ${orderId} 已确认并设置为已支付。`);
  };

  const handleCheckIn = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'checked-in' } : order
      )
    );
    alert(`客人已办理入住，订单 ${orderId} 状态更新为已入住。`);
  };

  const handleCheckOut = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'checked-out' } : order
      )
    );
    alert(`客人已办理退房，订单 ${orderId} 状态更新为已退房。`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">订单处理流程</h2>

      {/* 待处理订单 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">待确认订单</h3>
        {orders.filter(order => order.status === 'pending').length === 0 ? (
          <p className="text-gray-500">暂无待确认订单。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客人姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源/房间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">入住/退房日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支付状态</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.filter(order => order.status === 'pending').map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><User className="w-4 h-4 text-gray-400"/><span>{order.guestName}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><Home className="w-4 h-4 text-gray-400"/><span>{order.property} / {order.room}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><CalendarDays className="w-4 h-4 text-gray-400"/><span>{order.checkInDate} - {order.checkOutDate}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : order.paymentStatus === 'partially-paid' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {order.paymentStatus === 'paid' ? '已支付' : order.paymentStatus === 'partially-paid' ? '部分支付' : '未支付'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleConfirmOrder(order.id)}
                        className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>确认订单</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 入住前准备流程 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">待入住订单 (今日或即将入住)</h3>
        {orders.filter(order => order.status === 'confirmed' && new Date(order.checkInDate) <= new Date()).length === 0 ? (
          <p className="text-gray-500">暂无待入住订单。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客人姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源/房间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预计到达</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特殊需求</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.filter(order => order.status === 'confirmed' && new Date(order.checkInDate) <= new Date()).map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><User className="w-4 h-4 text-gray-400"/><span>{order.guestName}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><Home className="w-4 h-4 text-gray-400"/><span>{order.property} / {order.room}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><Clock className="w-4 h-4 text-gray-400"/><span>{order.arrivalTime || '未提供'}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                      {order.specialRequests ? (
                        <span className="inline-flex items-center space-x-1 text-primary-600 hover:underline cursor-pointer"><MessageSquare className="w-4 h-4" /><span>查看</span></span>
                      ) : (
                        '无'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCheckIn(order.id)}
                        className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>办理入住</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 退房后处理流程 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">今日待退房/逾期退房订单</h3>
        {orders.filter(order => order.status === 'checked-in' && new Date(order.checkOutDate) <= new Date()).length === 0 ? (
          <p className="text-gray-500">暂无待退房订单。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客人姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源/房间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">退房日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.filter(order => order.status === 'checked-in' && new Date(order.checkOutDate) <= new Date()).map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><User className="w-4 h-4 text-gray-400"/><span>{order.guestName}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><Home className="w-4 h-4 text-gray-400"/><span>{order.property} / {order.room}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2"><CalendarDays className="w-4 h-4 text-gray-400"/><span>{order.checkOutDate}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'checked-in' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {order.status === 'checked-in' ? '已入住' : '逾期未退'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCheckOut(order.id)}
                        className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>办理退房</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderProcessingFlow; 