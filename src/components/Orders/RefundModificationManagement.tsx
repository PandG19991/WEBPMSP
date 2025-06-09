import React, { useState } from 'react';
import { FileText, CalendarDays, DollarSign, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface Order {
  id: string;
  guestName: string;
  property: string;
  room: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'modified';
  channel: string;
}

interface RefundRequest {
  id: string;
  orderId: string;
  requestDate: string;
  refundAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

interface ModificationRequest {
  id: string;
  orderId: string;
  requestDate: string;
  type: 'date' | 'room' | 'guestCount' | 'specialRequest';
  details: string; // Description of modification
  status: 'pending' | 'approved' | 'rejected';
}

const mockOrders: Order[] = [
  { id: 'ORD005', guestName: '孙悟空', property: '豪华湖景别墅', room: 'A103', checkInDate: '2024-04-01', checkOutDate: '2024-04-05', totalAmount: 4000, status: 'confirmed', channel: '携程' },
  { id: 'ORD006', guestName: '猪八戒', property: '市中心精品公寓', room: 'B201', checkInDate: '2024-04-10', checkOutDate: '2024-04-12', totalAmount: 900, status: 'confirmed', channel: '美团' },
  { id: 'ORD007', guestName: '沙悟净', property: '海滨度假屋', room: 'C302', checkInDate: '2024-04-15', checkOutDate: '2024-04-18', totalAmount: 2700, status: 'confirmed', channel: '自有小程序' },
  { id: 'ORD008', guestName: '唐僧', property: '豪华湖景别墅', room: 'A101', checkInDate: '2024-03-25', checkOutDate: '2024-03-27', totalAmount: 1600, status: 'modified', channel: '电话预订' },
];

const mockRefundRequests: RefundRequest[] = [
  { id: 'RF001', orderId: 'ORD005', requestDate: '2024-03-18', refundAmount: 2000, status: 'pending', reason: '行程变更' },
  { id: 'RF002', orderId: 'ORD006', requestDate: '2024-03-05', refundAmount: 900, status: 'approved', reason: '取消预订' },
];

const mockModificationRequests: ModificationRequest[] = [
  { id: 'MOD001', orderId: 'ORD007', requestDate: '2024-03-12', type: 'date', details: '入住日期变更为2024-04-16', status: 'pending' },
  { id: 'MOD002', orderId: 'ORD008', requestDate: '2024-03-20', type: 'guestCount', details: '人数由2人增加至3人', status: 'approved' },
];

const RefundModificationManagement: React.FC = () => {
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(mockRefundRequests);
  const [modificationRequests, setModificationRequests] = useState<ModificationRequest[]>(mockModificationRequests);

  const handleApproveRefund = (id: string) => {
    setRefundRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'approved' } : req));
    alert(`退订申请 ${id} 已批准。`);
  };

  const handleRejectRefund = (id: string) => {
    setRefundRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
    alert(`退订申请 ${id} 已拒绝。`);
  };

  const handleApproveModification = (id: string) => {
    setModificationRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'approved' } : req));
    alert(`修改申请 ${id} 已批准。`);
  };

  const handleRejectModification = (id: string) => {
    setModificationRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
    alert(`修改申请 ${id} 已拒绝。`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">退订和修改管理</h2>

      {/* 退订申请处理 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">退订申请列表</h3>
        {refundRequests.length === 0 ? (
          <p className="text-gray-500">暂无退订申请。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">退款金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原因</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refundRequests.map(req => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                      <FileText className="w-4 h-4" /><span>{req.orderId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                      <CalendarDays className="w-4 h-4" /><span>{req.requestDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" /><span>{req.refundAmount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-800' : req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {req.status === 'approved' ? '已批准' : req.status === 'pending' ? '待审批' : '已拒绝'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveRefund(req.id)}
                            className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1 mb-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>批准</span>
                          </button>
                          <button
                            onClick={() => handleRejectRefund(req.id)}
                            className="text-red-600 hover:text-red-900 flex items-center justify-end space-x-1"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>拒绝</span>
                          </button>
                        </>
                      )}
                      {req.status !== 'pending' && (
                        <span className="text-gray-500">已处理</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 订单修改管理 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">订单修改申请列表</h3>
        {modificationRequests.length === 0 ? (
          <p className="text-gray-500">暂无修改申请。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">修改类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">修改详情</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modificationRequests.map(req => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                      <FileText className="w-4 h-4" /><span>{req.orderId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                      <CalendarDays className="w-4 h-4" /><span>{req.requestDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.type === 'date' && '时间修改'}
                      {req.type === 'room' && '房型变更'}
                      {req.type === 'guestCount' && '人数调整'}
                      {req.type === 'specialRequest' && '特殊需求修改'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-800' : req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {req.status === 'approved' ? '已批准' : req.status === 'pending' ? '待审批' : '已拒绝'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveModification(req.id)}
                            className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1 mb-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>批准</span>
                          </button>
                          <button
                            onClick={() => handleRejectModification(req.id)}
                            className="text-red-600 hover:text-red-900 flex items-center justify-end space-x-1"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>拒绝</span>
                          </button>
                        </>
                      )}
                      {req.status !== 'pending' && (
                        <span className="text-gray-500">已处理</span>
                      )}
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

export default RefundModificationManagement; 