import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Shield, User, Edit, Trash2 } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-error-100 text-error-800';
      case 'Manager':
        return 'bg-primary-100 text-primary-800';
      case 'Receptionist':
        return 'bg-secondary-100 text-secondary-800';
      case 'Staff':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary-100 text-secondary-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 leading-heading">User Management</h2>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Login</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Permissions</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                
                <td className="py-4 px-4">
                  <p className="text-sm text-gray-900">{user.lastLogin}</p>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.slice(0, 2).map((permission) => (
                      <span key={permission} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {permission}
                      </span>
                    ))}
                    {user.permissions.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{user.permissions.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-error-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;