import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, XCircle } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface PermissionGroup {
  name: string;
  permissions: string[];
}

const mockRoles: Role[] = [
  {
    id: 'role-admin',
    name: '管理员',
    description: '拥有系统所有管理权限',
    permissions: [
      'dashboard_view',
      'property_manage',
      'order_manage',
      'channel_manage',
      'analytics_view',
      'crm_manage',
      'hardware_manage',
      'admin_manage',
    ],
  },
  {
    id: 'role-pm',
    name: '房源经理',
    description: '管理房源信息和状态',
    permissions: [
      'dashboard_view',
      'property_manage',
    ],
  },
  {
    id: 'role-om',
    name: '订单处理员',
    description: '处理日常订单，包括确认、退订等',
    permissions: [
      'dashboard_view',
      'order_manage',
    ],
  },
  {
    id: 'role-guest_service',
    name: '客服人员',
    description: '处理客户咨询和反馈',
    permissions: [
      'dashboard_view',
      'crm_manage',
    ],
  },
];

const availablePermissions: PermissionGroup[] = [
  {
    name: '仪表盘',
    permissions: ['dashboard_view'],
  },
  {
    name: '房源管理',
    permissions: ['property_manage', 'property_add', 'property_edit', 'property_delete'],
  },
  {
    name: '订单管理',
    permissions: ['order_manage', 'order_add', 'order_edit', 'order_delete', 'order_confirm', 'order_cancel'],
  },
  {
    name: '渠道管理',
    permissions: ['channel_manage'],
  },
  {
    name: '数据统计',
    permissions: ['analytics_view'],
  },
  {
    name: '客户关系',
    permissions: ['crm_manage'],
  },
  {
    name: '智能硬件',
    permissions: ['hardware_manage'],
  },
  {
    name: '系统管理',
    permissions: ['admin_manage', 'admin_user_manage', 'admin_role_manage', 'admin_settings_manage'],
  },
];

const RolePermissionManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);

  const handleAddRole = () => {
    setEditingRole(null);
    setShowRoleForm(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole({ ...role }); // Create a copy to edit
    setShowRoleForm(true);
  };

  const handleSaveRole = (savedRole: Role) => {
    if (savedRole.id) {
      setRoles(roles.map(r => (r.id === savedRole.id ? savedRole : r)));
      console.log('更新角色:', savedRole);
    } else {
      const newId = `role-${Date.now()}`;
      setRoles([...roles, { ...savedRole, id: newId }]);
      console.log('新增角色:', { ...savedRole, id: newId });
    }
    setShowRoleForm(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('确定要删除此角色吗？')) {
      setRoles(roles.filter(r => r.id !== roleId));
      console.log('删除角色:', roleId);
    }
  };

  const RoleForm: React.FC<{ role: Role | null; onSave: (role: Role) => void; onCancel: () => void }> = ({ role, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Role>(role || {
      id: '',
      name: '',
      description: '',
      permissions: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionToggle = (permission: string) => {
      setFormData(prev => {
        const currentPermissions = prev.permissions;
        if (currentPermissions.includes(permission)) {
          return { ...prev, permissions: currentPermissions.filter(p => p !== permission) };
        } else {
          return { ...prev, permissions: [...currentPermissions, permission] };
        }
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">{role ? '编辑角色' : '新增角色'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">角色名称</label>
            <input
              type="text"
              id="roleName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 mb-1">角色描述</label>
            <textarea
              id="roleDescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            ></textarea>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-3">权限分配</h4>
            {availablePermissions.map(group => (
              <div key={group.name} className="mb-4">
                <p className="font-medium text-gray-700 mb-2">{group.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.permissions.map(permission => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`perm-${permission}`}
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`perm-${permission}`} className="ml-2 block text-sm text-gray-700">{permission}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              <span>保存角色</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {showRoleForm ? (
        <RoleForm role={editingRole} onSave={handleSaveRole} onCancel={() => setShowRoleForm(false)} />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">角色列表</h2>
            <button
              onClick={handleAddRole}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>添加角色</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色描述</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map(role => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEditRole(role)}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {roles.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      暂无角色
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissionManagement; 