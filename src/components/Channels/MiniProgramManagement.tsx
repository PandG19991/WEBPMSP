import React, { useState } from 'react';
import { Settings, Image, Text, MessageSquare, CreditCard, CheckCircle, XCircle, ClipboardList } from 'lucide-react';

interface MiniProgramConfig {
  id: string;
  name: string;
  appId: string;
  status: 'active' | 'inactive';
  theme: string; // e.g., 'default', 'custom'
}

interface ContentPage {
  id: string;
  title: string;
  type: 'property_display' | 'activity' | 'customer_service' | 'user_agreement';
  status: 'published' | 'draft';
  lastUpdated: string;
}

const mockMiniProgramConfigs: MiniProgramConfig[] = [
  { id: 'MP001', name: 'PMS酒店小程序', appId: 'wx1234567890', status: 'active', theme: '蓝色经典' },
];

const mockContentPages: ContentPage[] = [
  { id: 'CP001', title: '豪华湖景别墅详情页', type: 'property_display', status: 'published', lastUpdated: '2024-03-22 11:00' },
  { id: 'CP002', title: '春季特惠活动', type: 'activity', status: 'published', lastUpdated: '2024-03-20 14:00' },
  { id: 'CP003', title: '客服中心', type: 'customer_service', status: 'published', lastUpdated: '2024-01-01 09:00' },
  { id: 'CP004', title: '用户隐私协议', type: 'user_agreement', status: 'published', lastUpdated: '2023-12-15 10:00' },
  { id: 'CP005', title: '夏季促销活动 (草稿)', type: 'activity', status: 'draft', lastUpdated: '2024-03-21 16:00' },
];

const MiniProgramManagement: React.FC = () => {
  const [config, setConfig] = useState<MiniProgramConfig>(mockMiniProgramConfigs[0]);
  const [contentPages, setContentPages] = useState<ContentPage[]>(mockContentPages);

  const handleSaveConfig = () => {
    alert('小程序配置已保存！');
    // In a real app, this would send an update request to the backend
  };

  const handlePublishPage = (id: string) => {
    setContentPages(prev => prev.map(page => page.id === id ? { ...page, status: 'published' } : page));
    alert(`页面 ${id} 已发布！`);
  };

  const handleEditPage = (id: string) => {
    alert(`编辑页面 ${id}... (原型中模拟操作)`);
    // In a real app, this would navigate to a page editor
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">小程序管理</h2>

      {/* 小程序配置 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">小程序基础配置</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">小程序名称</label>
            <input
              type="text"
              id="appName"
              name="appName"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="appId" className="block text-sm font-medium text-gray-700 mb-1">App ID</label>
            <input
              type="text"
              id="appId"
              name="appId"
              value={config.appId}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="appTheme" className="block text-sm font-medium text-gray-700 mb-1">界面主题</label>
            <select
              id="appTheme"
              name="appTheme"
              value={config.theme}
              onChange={(e) => setConfig({ ...config, theme: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="蓝色经典">蓝色经典</option>
              <option value="简约白">简约白</option>
              <option value="自定义">自定义</option>
            </select>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="appStatus"
              name="appStatus"
              checked={config.status === 'active'}
              onChange={(e) => setConfig({ ...config, status: e.target.checked ? 'active' : 'inactive' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="appStatus" className="ml-2 block text-sm font-medium text-gray-700">启用小程序</label>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={handleSaveConfig}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>保存配置</span>
          </button>
        </div>
      </div>

      {/* 内容管理 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">页面内容管理</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">页面标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">页面类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上次更新</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentPages.map(page => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.type === 'property_display' && <span className="flex items-center space-x-1"><Image className="w-4 h-4"/><span>房源展示</span></span>}
                    {page.type === 'activity' && <span className="flex items-center space-x-1"><Text className="w-4 h-4"/><span>活动页面</span></span>}
                    {page.type === 'customer_service' && <span className="flex items-center space-x-1"><MessageSquare className="w-4 h-4"/><span>客服信息</span></span>}
                    {page.type === 'user_agreement' && <span className="flex items-center space-x-1"><ClipboardList className="w-4 h-4"/><span>用户协议</span></span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {page.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditPage(page.id)}
                      className="text-primary-600 hover:text-primary-900 mr-2"
                    >
                      编辑
                    </button>
                    {page.status === 'draft' && (
                      <button
                        onClick={() => handlePublishPage(page.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        发布
                      </button>
                    )}
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

export default MiniProgramManagement; 