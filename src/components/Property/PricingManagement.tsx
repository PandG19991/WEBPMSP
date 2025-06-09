import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Home, CalendarDays, DollarSign } from 'lucide-react';

interface Property {
  id: string;
  name: string;
}

interface PricingRule {
  id: string;
  propertyId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  basePrice: number;
  minStay: number; // minimum nights
  specialOffer?: string; // e.g., "early bird discount"
}

// Mock Data for properties
const mockProperties: Property[] = [
  { id: 'P001', name: '豪华湖景别墅' },
  { id: 'P002', name: '市中心精品公寓' },
  { id: 'P003', name: '海滨度假屋' },
];

// Mock Data for pricing rules
const mockPricingRules: PricingRule[] = [
  {
    id: 'PR001',
    propertyId: 'P001',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    basePrice: 800,
    minStay: 2,
    specialOffer: '春季特惠',
  },
  {
    id: 'PR002',
    propertyId: 'P001',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    basePrice: 950,
    minStay: 1,
  },
  {
    id: 'PR003',
    propertyId: 'P002',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    basePrice: 450,
    minStay: 3,
  },
];

const PricingManagement: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>(mockProperties[0].id);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);

  // State for new rule form
  const [newRule, setNewRule] = useState<Omit<PricingRule, 'id'>>({
    propertyId: mockProperties[0].id,
    startDate: '',
    endDate: '',
    basePrice: 0,
    minStay: 1,
    specialOffer: '',
  });

  useEffect(() => {
    // Filter rules based on selected property
    const filteredRules = mockPricingRules.filter(rule => rule.propertyId === selectedProperty);
    setPricingRules(filteredRules);
    setNewRule(prev => ({ ...prev, propertyId: selectedProperty }));
  }, [selectedProperty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({
      ...prev!,
      [name]: name === 'basePrice' || name === 'minStay' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!newRule.startDate || !newRule.endDate || newRule.basePrice <= 0) {
      alert('请填写所有必填字段并确保价格大于0。');
      return;
    }
    // Add new rule to mock data (for demonstration)
    const newId = `PR${(mockPricingRules.length + 1).toString().padStart(3, '0')}`;
    const ruleToAdd: PricingRule = { ...newRule, id: newId };
    mockPricingRules.push(ruleToAdd); // Directly modifying mock data
    setPricingRules(prev => [...prev, ruleToAdd]);
    // Reset form
    setNewRule({
      propertyId: selectedProperty,
      startDate: '',
      endDate: '',
      basePrice: 0,
      minStay: 1,
      specialOffer: '',
    });
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('确定要删除此价格规则吗？')) {
      const updatedRules = pricingRules.filter(rule => rule.id !== id);
      setPricingRules(updatedRules);
      // In a real app, you would send a delete request to the backend
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">价格管理</h2>

      {/* Property Selector */}
      <div className="flex items-center space-x-2 mb-4">
        <Home className="w-5 h-5 text-gray-600" />
        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          {mockProperties.map(prop => (
            <option key={prop.id} value={prop.id}>{prop.name}</option>
          ))}
        </select>
      </div>

      {/* Add New Pricing Rule Form */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">添加新价格规则</h3>
        <form onSubmit={handleAddRule} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="newStartDate" className="block text-sm font-medium text-gray-700 mb-1">起始日期</label>
            <input
              type="date"
              id="newStartDate"
              name="startDate"
              value={newRule.startDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="newEndDate" className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
            <input
              type="date"
              id="newEndDate"
              name="endDate"
              value={newRule.endDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="newBasePrice" className="block text-sm font-medium text-gray-700 mb-1">基础价格</label>
            <input
              type="number"
              id="newBasePrice"
              name="basePrice"
              value={newRule.basePrice === 0 ? '' : newRule.basePrice}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="每日价格"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="newMinStay" className="block text-sm font-medium text-gray-700 mb-1">最少入住天数</label>
            <input
              type="number"
              id="newMinStay"
              name="minStay"
              value={newRule.minStay}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              min="1"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label htmlFor="newSpecialOffer" className="block text-sm font-medium text-gray-700 mb-1">特殊优惠（可选）</label>
            <input
              type="text"
              id="newSpecialOffer"
              name="specialOffer"
              value={newRule.specialOffer || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="例如：早鸟优惠、连住折扣"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>添加价格规则</span>
            </button>
          </div>
        </form>
      </div>

      {/* Existing Pricing Rules Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">起始日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基础价格 (每日)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最少入住天数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特殊优惠</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pricingRules.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  暂无价格规则。
                </td>
              </tr>
            ) : (
              pricingRules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mockProperties.find(p => p.id === rule.propertyId)?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.basePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.minStay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.specialOffer || '无'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-600 hover:text-red-900 flex items-center justify-end space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>删除</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingManagement; 