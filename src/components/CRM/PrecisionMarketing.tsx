import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Send } from 'lucide-react';

interface MarketingActivity {
  id: string;
  name: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  status: string;
}

const mockMarketingActivities: MarketingActivity[] = [
  { id: '1', name: '新客户欢迎礼', targetAudience: '新注册客户', startDate: '2023-01-01', endDate: '2023-12-31', status: '进行中' },
  { id: '2', name: '春季住宿折扣', targetAudience: '所有会员', startDate: '2023-03-01', endDate: '2023-03-31', status: '已结束' },
  { id: '3', name: '生日专属优惠', targetAudience: '当月生日客户', startDate: '2023-01-01', endDate: '2023-12-31', status: '进行中' },
  { id: '4', name: '五一特惠', targetAudience: '所有客户', startDate: '2023-04-28', endDate: '2023-05-05', status: '即将开始' },
];

const PrecisionMarketing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<MarketingActivity | null>(null);

  const openModal = (activity?: MarketingActivity) => {
    setCurrentActivity(activity || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentActivity(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (add/edit logic)
    console.log('提交活动:', currentActivity);
    closeModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">精准营销活动管理</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>创建活动</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活动名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标受众</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockMarketingActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.targetAudience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.status === '进行中' ? 'bg-green-100 text-green-800' : activity.status === '已结束' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(activity)} className="text-primary-600 hover:text-primary-900 mr-4">
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
            <h3 className="text-lg font-semibold mb-4">{currentActivity ? '编辑营销活动' : '创建营销活动'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">活动名称</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentActivity?.name || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">目标受众</label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={currentActivity?.targetAudience || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, targetAudience: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">开始日期</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={currentActivity?.startDate || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, startDate: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">结束日期</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={currentActivity?.endDate || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, endDate: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
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
                  {currentActivity ? '保存' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrecisionMarketing; 