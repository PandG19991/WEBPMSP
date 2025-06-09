import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Calendar, DollarSign, Home, User, CheckCircle, XCircle, Clock, Info, CreditCard } from 'lucide-react';

interface OrderDetailsProps {
  orderId: string | null; // null for new order
  onClose: () => void;
}

// Mock data for properties (to link with orders)
interface Property {
  id: string;
  name: string;
  address: string;
}

const mockProperties: Property[] = [
  { id: 'PROP001', name: '豪华市中心套房', address: '上海市中央广场123号' },
  { id: 'PROP002', name: '现代城市公寓', address: '北京市商务区456号' },
  { id: 'PROP003', name: '行政商务套房', address: '深圳市金融街789号' },
  { id: 'PROP004', name: '温馨工作室', address: '广州市艺术区321号' },
];

// Mock data for orders
interface Order {
  id: string;
  orderNumber: string;
  guestName: string;
  contactPhone: string;
  propertyId: string;
  propertyName: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  channel: string;
  notes?: string;
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORDER001',
    orderNumber: '20240701001',
    guestName: '张三',
    contactPhone: '13812345678',
    propertyId: 'PROP001',
    propertyName: '豪华市中心套房',
    checkInDate: '2024-07-10',
    checkOutDate: '2024-07-15',
    totalPrice: 6250,
    status: 'confirmed',
    paymentStatus: 'paid',
    channel: '携程',
    createdAt: '2024-07-01T10:00:00Z',
  },
  {
    id: 'ORDER002',
    orderNumber: '20240702002',
    guestName: '李四',
    contactPhone: '13987654321',
    propertyId: 'PROP002',
    propertyName: '现代城市公寓',
    checkInDate: '2024-07-20',
    checkOutDate: '2024-07-22',
    totalPrice: 1780,
    status: 'pending',
    paymentStatus: 'unpaid',
    channel: '美团',
    createdAt: '2024-07-02T11:30:00Z',
  },
  {
    id: 'ORDER003',
    orderNumber: '20240625003',
    guestName: '王五',
    contactPhone: '13011112222',
    propertyId: 'PROP003',
    propertyName: '行政商务套房',
    checkInDate: '2024-06-28',
    checkOutDate: '2024-07-03',
    totalPrice: 7800,
    status: 'checked-out',
    paymentStatus: 'paid',
    channel: '自有小程序',
    createdAt: '2024-06-25T14:00:00Z',
  },
];

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (orderId) {
      // Simulate fetching existing order data
      const foundOrder = mockOrders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setIsEditing(true);
      } else {
        console.error('订单未找到:', orderId);
        onClose();
      }
    } else {
      // Initialize for a new order
      setOrder({
        id: '',
        orderNumber: `NEW-${Date.now()}`,
        guestName: '',
        contactPhone: '',
        propertyId: '',
        propertyName: '',
        checkInDate: '',
        checkOutDate: '',
        totalPrice: 0,
        status: 'pending',
        paymentStatus: 'unpaid',
        channel: '',
        createdAt: new Date().toISOString(),
      });
      setIsEditing(false);
    }
  }, [orderId, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    if (isEditing) {
      console.log('更新订单:', order);
      // Call API to update order
    } else {
      const newOrder = { ...order, id: `ORDER-${Date.now()}` }; // Simulate ID generation
      console.log('新增订单:', newOrder);
      // Call API to create order
    }
    onClose(); // Go back to list after saving
  };

  const handleDelete = () => {
    if (order && window.confirm(`确定要删除订单 ${order.orderNumber} 吗？`)) {
      console.log('删除订单:', order.id);
      // Call API to delete order
      onClose();
    }
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    if (order && window.confirm(`确定要将订单状态更改为 \'${newStatus}\' 吗？`)) {
      setOrder(prev => ({ ...prev!, status: newStatus }));
      console.log(`订单 ${order.orderNumber} 状态更改为: ${newStatus}`);
      // Call API to update order status
    }
  };

  if (!order) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{isEditing ? `订单详情: ${order.orderNumber}` : '手动预订新订单'}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 订单基础信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">客人姓名</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={order.guestName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={order.contactPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">选择房源</label>
            <select
              id="propertyId"
              name="propertyId"
              value={order.propertyId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            >
              <option value="">请选择房源</option>
              {mockProperties.map(prop => (
                <option key={prop.id} value={prop.id}>{prop.name} ({prop.address})</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">入住日期</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={order.checkInDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">退房日期</label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={order.checkOutDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-1">总价</label>
            <input
              type="number"
              id="totalPrice"
              name="totalPrice"
              value={order.totalPrice}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">订单渠道</label>
            <select
              id="channel"
              name="channel"
              value={order.channel}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            >
              <option value="">请选择渠道</option>
              <option value="携程">携程</option>
              <option value="美团">美团</option>
              <option value="飞猪">飞猪</option>
              <option value="自有小程序">自有小程序</option>
              <option value="电话预订">电话预订</option>
              <option value="线下预订">线下预订</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <textarea
              id="notes"
              name="notes"
              value={order.notes || ''}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            ></textarea>
          </div>
        </div>

        {/* 订单状态和支付状态 */}
        <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">订单状态</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('pending')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'pending' ? 'bg-warning-100 text-warning-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                待确认
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('confirmed')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'confirmed' ? 'bg-secondary-100 text-secondary-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                已确认
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('checked-in')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'checked-in' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                已入住
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('checked-out')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'checked-out' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                已退房
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('cancelled')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'cancelled' ? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                已取消
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">支付状态</h3>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'paid' ? 'bg-success-100 text-success-800' : order.paymentStatus === 'unpaid' ? 'bg-warning-100 text-warning-800' : 'bg-gray-100 text-gray-700'}`}>
                {order.paymentStatus === 'paid' ? '已支付' : order.paymentStatus === 'unpaid' ? '未支付' : '已退款'}
              </span>
              {/* Add payment related actions here, e.g., refund button */}
            </div>
          </div>
        </div>

        {/* 订单操作和底部按钮 */}
        <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>取消/返回</span>
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>删除订单</span>
            </button>
          )}
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? '保存修改' : '创建订单'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails; 