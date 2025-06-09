import React, { useState } from 'react';
import { Search, Filter, Plus, Download, ArrowLeft } from 'lucide-react';
import OrderList from './OrderList';
import OrderStats from './OrderStats';
import OrderDetails from './OrderDetails';
import OrderAccessManagement from './OrderAccessManagement';
import OrderProcessingFlow from './OrderProcessingFlow';
import RefundModificationManagement from './RefundModificationManagement';
import PaymentManagement from './PaymentManagement';

type View = 'list' | 'details';
type Tab = 'list' | 'access' | 'processing' | 'refundModification' | 'payment';

const OrderManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  const handleViewOrderDetails = (orderId: string | null = null) => {
    setSelectedOrderId(orderId);
    setCurrentView('details');
    setActiveTab('list');
  };

  const handleCloseDetails = () => {
    setCurrentView('list');
    setSelectedOrderId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-heading">订单管理</h1>
        {(activeTab === 'list' && currentView === 'list') && (
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>导出</span>
            </button>
            <button
              onClick={() => handleViewOrderDetails()}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>手动预订</span>
            </button>
          </div>
        )}
        {(activeTab === 'list' && currentView === 'details') && (
          <button
            onClick={handleCloseDetails}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回列表</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-2 flex space-x-2">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          订单列表
        </button>
        <button
          onClick={() => setActiveTab('access')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'access' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          订单接入
        </button>
        <button
          onClick={() => setActiveTab('processing')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'processing' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          订单处理
        </button>
        <button
          onClick={() => setActiveTab('refundModification')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'refundModification' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          退订与修改
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'payment' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          支付管理
        </button>
      </div>

      {activeTab === 'list' && (
        currentView === 'list' ? (
          <>
            <OrderStats />
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索客人姓名、订单号或房源..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="all">全部状态</option>
                  <option value="pending">待确认</option>
                  <option value="confirmed">已确认</option>
                  <option value="checked-in">已入住</option>
                  <option value="checked-out">已退房</option>
                  <option value="cancelled">已取消</option>
                </select>
                
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="today">今天</option>
                  <option value="week">本周</option>
                  <option value="month">本月</option>
                  <option value="all">全部时间</option>
                </select>
                
                <button className="flex items-center space-x-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>更多筛选</span>
                </button>
              </div>

              <OrderList searchTerm={searchTerm} statusFilter={statusFilter} dateRange={dateRange} onSelectOrder={handleViewOrderDetails} />
            </div>
          </>
        ) : (
          <OrderDetails orderId={selectedOrderId} onClose={handleCloseDetails} />
        )
      )}

      {activeTab === 'access' && (
        <OrderAccessManagement />
      )}

      {activeTab === 'processing' && (
        <OrderProcessingFlow />
      )}

      {activeTab === 'refundModification' && (
        <RefundModificationManagement />
      )}

      {activeTab === 'payment' && (
        <PaymentManagement />
      )}
    </div>
  );
};

export default OrderManagement;