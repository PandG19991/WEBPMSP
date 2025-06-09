import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';

interface MembershipLevel {
  id: string;
  name: string;
  minPoints: number;
  benefits: string[];
  status: string;
}

const mockMembershipLevels: MembershipLevel[] = [
  { id: '1', name: '普通会员', minPoints: 0, benefits: ['预订折扣', '生日礼遇'], status: '启用' },
  { id: '2', name: '银卡会员', minPoints: 1000, benefits: ['优先入住', '专属客服'], status: '启用' },
  { id: '3', name: '金卡会员', minPoints: 5000, benefits: ['免费升级房型', '延迟退房'], status: '启用' },
  { id: '4', name: '铂金会员', minPoints: 10000, benefits: ['免费早餐', '机场接送', '专属管家'], status: '启用' },
];

const MembershipLevelSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<MembershipLevel | null>(null);

  const openModal = (level?: MembershipLevel) => {
    setCurrentLevel(level || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLevel(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (add/edit logic)
    console.log('提交等级:', currentLevel);
    closeModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">会员等级设置</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>添加等级</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">等级名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最低积分</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会员权益</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockMembershipLevels.map((level) => (
              <tr key={level.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{level.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{level.minPoints}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{level.benefits.join('，')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${level.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {level.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(level)} className="text-primary-600 hover:text-primary-900 mr-4">
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
            <h3 className="text-lg font-semibold mb-4">{currentLevel ? '编辑会员等级' : '添加会员等级'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">等级名称</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentLevel?.name || ''}
                  onChange={(e) => setCurrentLevel({ ...currentLevel!, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="minPoints" className="block text-sm font-medium text-gray-700">最低积分</label>
                <input
                  type="number"
                  id="minPoints"
                  name="minPoints"
                  value={currentLevel?.minPoints || 0}
                  onChange={(e) => setCurrentLevel({ ...currentLevel!, minPoints: parseInt(e.target.value) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">会员权益 (逗号分隔)</label>
                <input
                  type="text"
                  id="benefits"
                  name="benefits"
                  value={currentLevel?.benefits.join('，') || ''}
                  onChange={(e) => setCurrentLevel({ ...currentLevel!, benefits: e.target.value.split(/[,，]/).map(b => b.trim()) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
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
                  {currentLevel ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipLevelSettings; 