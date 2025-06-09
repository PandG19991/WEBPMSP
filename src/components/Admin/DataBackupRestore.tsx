import React, { useState } from 'react';
import { Upload, Download, Settings, RefreshCw, HardDrive, Trash2 } from 'lucide-react';

interface BackupRecord {
  id: string;
  type: string;
  date: string;
  size: string;
  status: string;
}

const mockBackupRecords: BackupRecord[] = [
  { id: '1', type: '数据库备份', date: '2023-11-20 03:00', size: '1.2GB', status: '成功' },
  { id: '2', type: '文件系统备份', date: '2023-11-19 04:00', size: '5.8GB', status: '成功' },
  { id: '3', type: '数据库备份', date: '2023-11-13 03:00', size: '1.1GB', status: '成功' },
  { id: '4', type: '文件系统备份', date: '2023-11-12 04:00', size: '5.5GB', status: '失败' },
];

const DataBackupRestore: React.FC = () => {
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [backupType, setBackupType] = useState('database');

  const handleBackup = () => {
    console.log(`执行 ${backupType} 备份`);
    setIsBackupModalOpen(false);
    // Implement backup logic here
  };

  const handleRestore = () => {
    console.log('执行数据恢复');
    setIsRestoreModalOpen(false);
    // Implement restore logic here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">数据备份与恢复</h2>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsBackupModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>立即备份</span>
        </button>
        <button
          onClick={() => setIsRestoreModalOpen(true)}
          className="flex items-center space-x-2 border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>数据恢复</span>
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-8">备份记录</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备份类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备份时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockBackupRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === '成功' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">
                    <Download className="w-4 h-4" />
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

      {/* Backup Modal */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 bg-white w-96 max-w-full mx-auto rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">选择备份类型</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="backupType"
                  value="database"
                  checked={backupType === 'database'}
                  onChange={(e) => setBackupType(e.target.value)}
                  className="form-radio text-primary-600"
                />
                <span>数据库备份</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="backupType"
                  value="filesystem"
                  checked={backupType === 'filesystem'}
                  onChange={(e) => setBackupType(e.target.value)}
                  className="form-radio text-primary-600"
                />
                <span>文件系统备份</span>
              </label>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleBackup}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                开始备份
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 bg-white w-96 max-w-full mx-auto rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">数据恢复</h3>
            <p className="text-sm text-gray-600 mb-4">请谨慎操作，数据恢复将覆盖现有数据。</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="restoreFile" className="block text-sm font-medium text-gray-700">选择备份文件 (.sql, .zip)</label>
                <input
                  type="file"
                  id="restoreFile"
                  name="restoreFile"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setIsRestoreModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleRestore}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                确认恢复
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBackupRestore; 