import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, CalendarDays, DollarSign, AlertCircle, Upload } from 'lucide-react';

interface TransactionRecord {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  platform: string;
  status: 'matched' | 'unmatched' | 'discrepancy';
}

interface BankStatementEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

const mockTransactionRecords: TransactionRecord[] = [
  { id: 'T001', date: '2024-03-20', description: '携程订单ORD001收入', type: 'income', amount: 800, platform: '携程', status: 'matched' },
  { id: 'T002', date: '2024-03-20', description: '美团订单ORD002收入', type: 'income', amount: 900, platform: '美团', status: 'matched' },
  { id: 'T003', date: '2024-03-21', description: '客房清洁用品采购', type: 'expense', amount: 500, platform: '支付宝', status: 'unmatched' },
  { id: 'T004', date: '2024-03-22', description: '官网预订收入', type: 'income', amount: 1200, platform: '自有渠道', status: 'unmatched' },
  { id: 'T005', date: '2024-03-22', description: '电费支出', type: 'expense', amount: 300, platform: '银行', status: 'discrepancy' },
];

const mockBankStatementEntries: BankStatementEntry[] = [
  { id: 'B001', date: '2024-03-20', description: '携程入账', amount: 800, type: 'deposit' },
  { id: 'B002', date: '2024-03-20', description: '美团入账', amount: 900, type: 'deposit' },
  { id: 'B003', date: '2024-03-21', description: '超市购物', amount: 500, type: 'withdrawal' },
  { id: 'B004', date: '2024-03-22', description: '银行转账电费', amount: 350, type: 'withdrawal' },
];

const ReconciliationCenter: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(mockTransactionRecords);
  const [bankStatements, setBankStatements] = useState<BankStatementEntry[]>(mockBankStatementEntries);

  const handleMatch = (transactionId: string, bankStatementId: string) => {
    setTransactions(prev =>
      prev.map(t => (t.id === transactionId ? { ...t, status: 'matched' } : t))
    );
    setBankStatements(prev =>
      prev.map(b => (b.id === bankStatementId ? { ...b, description: b.description + ' (已匹配)' } : b))
    );
    alert(`交易 ${transactionId} 和银行流水 ${bankStatementId} 已匹配！`);
  };

  const handleResolveDiscrepancy = (transactionId: string) => {
    alert(`解决交易 ${transactionId} 的差异... (原型中模拟操作)`);
    setTransactions(prev =>
      prev.map(t => (t.id === transactionId ? { ...t, status: 'matched' } : t))
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">对账中心</h2>

      {/* 交易记录与银行流水匹配 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">待匹配交易概览</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(trx => (
                <tr key={trx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4" /><span>{trx.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{trx.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trx.type === 'income' ? '收入' : '支出'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${trx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    <DollarSign className="w-4 h-4 inline-block mr-1" />{trx.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${trx.status === 'matched' ? 'bg-green-100 text-green-800' : trx.status === 'unmatched' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {trx.status === 'matched' ? '已匹配' : trx.status === 'unmatched' ? '未匹配' : '有差异'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {trx.status === 'unmatched' && (
                      <button
                        onClick={() => handleMatch(trx.id, mockBankStatementEntries[0].id)} // Simplified: auto-match to first bank entry for demo
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <CheckCircle className="w-4 h-4 inline-block mr-1" />匹配
                      </button>
                    )}
                    {trx.status === 'discrepancy' && (
                      <button
                        onClick={() => handleResolveDiscrepancy(trx.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <AlertCircle className="w-4 h-4 inline-block mr-1" />解决差异
                      </button>
                    )}
                    {trx.status === 'matched' && (
                      <span className="text-gray-500">已处理</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 银行流水导入与分析 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">银行流水（模拟导入）</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">最近导入：{new Date().toLocaleString('zh-CN')}</p>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>导入银行流水</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bankStatements.map(stmt => (
                <tr key={stmt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stmt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stmt.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${stmt.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {stmt.type === 'deposit' ? '+' : '-'}{stmt.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stmt.type === 'deposit' ? '收入' : '支出'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReconciliationCenter; 