import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Gift } from 'lucide-react';

interface PointRule {
  id: string;
  name: string;
  type: 'earn' | 'redeem';
  value: number;
  description: string;
  status: string;
}

const mockPointRules: PointRule[] = [
  { id: '1', name: '预订成功', type: 'earn', value: 100, description: '每成功预订一笔订单获得100积分', status: '启用' },
  { id: '2', name: '消费一元', type: 'earn', value: 1, description: '每消费1元获得1积分', status: '启用' },
  { id: '3', name: '积分兑换折扣', type: 'redeem', value: 500, description: '500积分可兑换50元住宿折扣', status: '启用' },
  { id: '4', name: '积分兑换礼品', type: 'redeem', value: 1000, description: '1000积分可兑换指定礼品一份', status: '启用' },
];

const PointsSystemManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<PointRule | null>(null);

  const openModal = (rule?: PointRule) => {
    setCurrentRule(rule || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRule(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (add/edit logic)
    console.log('提交规则:', currentRule);
    closeModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">积分系统管理</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>添加规则</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规则名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">值</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPointRules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.type === 'earn' ? '获取' : '兑换'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rule.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {rule.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(rule)} className="text-primary-600 hover:text-primary-900 mr-4">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 bg-white w-96 max-w-full mx-auto rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{currentRule ? '编辑积分规则' : '添加积分规则'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">规则名称</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentRule?.name || ''}
                  onChange={(e) => setCurrentRule({ ...currentRule!, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">类型</label>
                <select
                  id="type"
                  name="type"
                  value={currentRule?.type || 'earn'}
                  onChange={(e) => setCurrentRule({ ...currentRule!, type: e.target.value as 'earn' | 'redeem' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                >
                  <option value="earn">获取</option>
                  <option value="redeem">兑换</option>
                </select>
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">值</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={currentRule?.value || 0}
                  onChange={(e) => setCurrentRule({ ...currentRule!, value: parseInt(e.target.value) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentRule?.description || ''}
                  onChange={(e) => setCurrentRule({ ...currentRule!, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {currentRule ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsSystemManagement; 