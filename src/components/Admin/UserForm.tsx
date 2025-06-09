import React, { useState, useEffect } from 'react';
import { Save, XCircle } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

interface UserFormProps {
  userId: string | null; // null for new user
  onSave: (user: UserData) => void;
  onCancel: () => void;
}

const mockUsers: UserData[] = [
  {
    id: 'U001',
    name: 'Admin User',
    email: 'admin@pms.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    permissions: ['all'],
  },
  {
    id: 'U002',
    name: 'Property Manager',
    email: 'manager@pms.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15 12:15',
    permissions: ['properties', 'orders', 'analytics'],
  },
  {
    id: 'U003',
    name: 'Front Desk',
    email: 'frontdesk@pms.com',
    role: 'Receptionist',
    status: 'active',
    lastLogin: '2024-01-15 09:45',
    permissions: ['orders', 'customers'],
  },
  {
    id: 'U004',
    name: 'Maintenance Staff',
    email: 'maintenance@pms.com',
    role: 'Staff',
    status: 'inactive',
    lastLogin: '2024-01-12 16:20',
    permissions: ['hardware'],
  },
];

const mockRoles = ['Administrator', 'Manager', 'Receptionist', 'Staff', 'Guest'];

const UserForm: React.FC<UserFormProps> = ({ userId, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserData | null>(null);
  const isEditing = userId !== null;

  useEffect(() => {
    if (isEditing) {
      const userToEdit = mockUsers.find(user => user.id === userId);
      if (userToEdit) {
        setFormData(userToEdit);
      } else {
        console.error("编辑用户未找到:", userId);
        onCancel(); // Go back if user not found
      }
    } else {
      // Initialize for a new user
      setFormData({
        id: '',
        name: '',
        email: '',
        role: '',
        status: 'active',
        lastLogin: new Date().toLocaleString('zh-CN'), // Mock current time
        permissions: [],
      });
    }
  }, [userId, isEditing, onCancel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  if (!formData) {
    return <div>加载中...</div>; // Or a loading spinner
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{isEditing ? '编辑用户' : '新增用户'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">角色</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          >
            <option value="">请选择角色</option>
            {mockRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status === 'active'}
            onChange={(e) => setFormData(prev => ({ ...prev!, status: e.target.checked ? 'active' : 'inactive' }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="status" className="ml-2 block text-sm font-medium text-gray-700">活跃</label>
        </div>

        <div className="flex justify-end space-x-4 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <XCircle className="w-4 h-4" />
            <span>取消</span>
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? '保存修改' : '创建用户'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 