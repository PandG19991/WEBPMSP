import React, { useState } from 'react';
import { Plus, Search, DollarSign, Tag, CalendarDays, Edit, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string; // e.g., '水电费', '员工工资', '采购', '维修'
  paymentMethod: 'bank_transfer' | 'cash' | 'alipay' | 'wechatpay';
  transactionDate: string;
  notes?: string;
}

const mockExpenses: Expense[] = [
  { id: 'EXP001', description: '3月份水电费', amount: 1200, category: '运营成本', paymentMethod: 'bank_transfer', transactionDate: '2024-03-05' },
  { id: 'EXP002', description: '员工李四3月工资', amount: 8000, category: '人力资源', paymentMethod: 'bank_transfer', transactionDate: '2024-03-10' },
  { id: 'EXP003', description: '客房清洁用品采购', amount: 500, category: '采购', paymentMethod: 'alipay', transactionDate: '2024-03-12', notes: '洗发水、沐浴露等' },
  { id: 'EXP004', description: '空调维修费', amount: 300, category: '维修', paymentMethod: 'cash', transactionDate: '2024-03-15' },
  { id: 'EXP005', description: '网络服务费', amount: 200, category: '运营成本', paymentMethod: 'wechatpay', transactionDate: '2024-03-20' },
];

const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    description: '',
    amount: 0,
    category: '',
    paymentMethod: 'bank_transfer',
    transactionDate: new Date().toISOString().slice(0, 10),
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
  };

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0 || !newExpense.category) {
      alert('请填写完整的支出信息！');
      return;
    }
    setExpenses(prev => [...prev, { ...newExpense, id: `EXP${(prev.length + 1).toString().padStart(3, '0')}` }]);
    setNewExpense({
      description: '',
      amount: 0,
      category: '',
      paymentMethod: 'bank_transfer',
      transactionDate: new Date().toISOString().slice(0, 10),
      notes: '',
    });
    setIsAddingNew(false);
    alert('支出记录添加成功！');
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm(`确定要删除支出记录 ${id} 吗？`)) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      alert(`支出记录 ${id} 已删除。`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">支出管理</h2>

      {/* 支出录入与分类 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">新增支出记录</h3>
        {!isAddingNew ? (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>添加新支出</span>
          </button>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">支出描述</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
                placeholder="例如：3月份水电费"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">金额</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newExpense.amount}
                onChange={handleInputChange}
                placeholder="例如：1200.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">类别</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newExpense.category}
                onChange={handleInputChange}
                placeholder="例如：运营成本、采购"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">支付方式</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={newExpense.paymentMethod}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="bank_transfer">银行转账</option>
                <option value="cash">现金</option>
                <option value="alipay">支付宝</option>
                <option value="wechatpay">微信支付</option>
              </select>
            </div>
            <div>
              <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700 mb-1">交易日期</label>
              <input
                type="date"
                id="transactionDate"
                name="transactionDate"
                value={newExpense.transactionDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">备注</label>
              <textarea
                id="notes"
                name="notes"
                value={newExpense.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              ></textarea>
            </div>
            <div className="col-span-2 flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddExpense}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>保存支出</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 支出明细查询和筛选 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">支出明细</h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索描述或类别..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
            <option>所有类别</option>
            <option>运营成本</option>
            <option>人力资源</option>
            <option>采购</option>
            <option>维修</option>
          </select>
          <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支付方式</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" /><span>-{expense.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <Tag className="w-4 h-4" /><span>{expense.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.paymentMethod === 'bank_transfer' ? '银行转账' : expense.paymentMethod === 'cash' ? '现金' : expense.paymentMethod === 'alipay' ? '支付宝' : '微信支付'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4" /><span>{expense.transactionDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert(`编辑支出 ${expense.id}... (原型中模拟操作)`)}
                      className="text-primary-600 hover:text-primary-900 mr-2"
                    >
                      <Edit className="w-4 h-4 inline-block mr-1" />编辑
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4 inline-block mr-1" />删除
                    </button>
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

export default ExpenseManagement; 