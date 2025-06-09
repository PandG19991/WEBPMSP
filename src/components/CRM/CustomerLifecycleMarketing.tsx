import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Repeat } from 'lucide-react';

interface LifecycleActivity {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: string;
}

const mockLifecycleActivities: LifecycleActivity[] = [
  { id: '1', name: '新客户欢迎邮件', trigger: '新注册客户', action: '发送欢迎邮件', status: '启用' },
  { id: '2', name: '生日祝福短信', trigger: '客户生日', action: '发送生日祝福短信和优惠券', status: '启用' },
  { id: '3', name: '流失预警通知', trigger: '30天未入住', action: '发送召回邮件', status: '启用' },
  { id: '4', name: '忠诚客户回馈', trigger: '累计入住10次', action: '赠送免费住宿一晚', status: '启用' },
];

const CustomerLifecycleMarketing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<LifecycleActivity | null>(null);

  const openModal = (activity?: LifecycleActivity) => {
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
      <h2 className="text-xl font-semibold text-gray-800">客户生命周期营销</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>创建自动化</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规则名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">触发条件</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">执行动作</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockLifecycleActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.trigger}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
            <h3 className="text-lg font-semibold mb-4">{currentActivity ? '编辑生命周期规则' : '创建生命周期规则'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">规则名称</label>
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
                <label htmlFor="trigger" className="block text-sm font-medium text-gray-700">触发条件</label>
                <input
                  type="text"
                  id="trigger"
                  name="trigger"
                  value={currentActivity?.trigger || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, trigger: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-gray-700">执行动作</label>
                <input
                  type="text"
                  id="action"
                  name="action"
                  value={currentActivity?.action || ''}
                  onChange={(e) => setCurrentActivity({ ...currentActivity!, action: e.target.value })}
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

export default CustomerLifecycleMarketing; 