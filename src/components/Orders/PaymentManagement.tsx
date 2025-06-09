import React, { useState } from 'react';
import { DollarSign, CheckCircle, XCircle, Search, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'refund' | 'deposit' | 'withdrawal';
  method: 'alipay' | 'wechatpay' | 'cash' | 'bank_transfer';
  status: 'success' | 'failed' | 'pending';
  transactionDate: string;
  notes?: string;
}

interface AccountStatement {
  date: string;
  platform: string;
  income: number;
  expense: number;
  netAmount: number;
}

const mockTransactions: Transaction[] = [
  { id: 'TRX001', orderId: 'ORD001', amount: 800, type: 'payment', method: 'alipay', status: 'success', transactionDate: '2024-03-19', notes: '订单首付' },
  { id: 'TRX002', orderId: 'ORD002', amount: 900, type: 'payment', method: 'wechatpay', status: 'success', transactionDate: '2024-03-18' },
  { id: 'TRX003', orderId: 'ORD005', amount: 2000, type: 'refund', method: 'bank_transfer', status: 'pending', transactionDate: '2024-03-20' },
  { id: 'TRX004', orderId: 'ORD003', amount: 500, type: 'deposit', method: 'cash', status: 'success', transactionDate: '2024-03-21', notes: '入住押金' },
  { id: 'TRX005', orderId: 'ORD004', amount: 1600, type: 'payment', method: 'alipay', status: 'failed', transactionDate: '2024-03-15', notes: '支付失败，需重新处理' },
];

const mockAccountStatements: AccountStatement[] = [
  { date: '2024-03-01', platform: '携程', income: 1500, expense: 150, netAmount: 1350 },
  { date: '2024-03-01', platform: '美团', income: 1200, expense: 120, netAmount: 1080 },
  { date: '2024-03-02', platform: '携程', income: 2000, expense: 200, netAmount: 1800 },
  { date: '2024-03-02', platform: '自有小程序', income: 800, expense: 0, netAmount: 800 },
];

const PaymentManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [statements, setStatements] = useState<AccountStatement[]>(mockAccountStatements);

  const handleProcessTransaction = (id: string, newStatus: 'success' | 'failed') => {
    setTransactions(prev =>
      prev.map(trx =>
        trx.id === id ? { ...trx, status: newStatus, notes: newStatus === 'success' ? '处理成功' : '处理失败' } : trx
      )
    );
    alert(`交易 ${id} 已${newStatus === 'success' ? '成功' : '失败'}处理。`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">支付管理</h2>

      {/* 支付方式管理 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">交易记录</h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索订单号或交易ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
            <option>全部类型</option>
            <option>支付</option>
            <option>退款</option>
            <option>押金</option>
            <option>提现</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
            <option>全部方式</option>
            <option>支付宝</option>
            <option>微信支付</option>
            <option>现金</option>
            <option>银行转账</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方式</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(trx => (
                <tr key={trx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trx.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <FileText className="w-4 h-4" /><span>{trx.orderId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" /><span>{trx.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.type === 'payment' ? '支付' : trx.type === 'refund' ? '退款' : trx.type === 'deposit' ? '押金' : '提现'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trx.method === 'alipay' ? '支付宝' : trx.method === 'wechatpay' ? '微信支付' : trx.method === 'cash' ? '现金' : '银行转账'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${trx.status === 'success' ? 'bg-green-100 text-green-800' : trx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {trx.status === 'success' ? '成功' : trx.status === 'pending' ? '待处理' : '失败'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.transactionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {trx.status === 'pending' || trx.status === 'failed' ? (
                      <>
                        <button
                          onClick={() => handleProcessTransaction(trx.id, 'success')}
                          className="text-primary-600 hover:text-primary-900 flex items-center justify-end space-x-1 mb-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>设为成功</span>
                        </button>
                        <button
                          onClick={() => handleProcessTransaction(trx.id, 'failed')}
                          className="text-red-600 hover:text-red-900 flex items-center justify-end space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>设为失败</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">已处理</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 财务对账 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">平台对账概览 (简化)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收入</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支出</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">净额</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statements.map(stmt => (
                <tr key={`${stmt.date}-${stmt.platform}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stmt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stmt.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+ {stmt.income.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">- {stmt.expense.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{stmt.netAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement; 