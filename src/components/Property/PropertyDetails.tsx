import React, { useState, useEffect } from 'react';
import { Camera, Tag, Home, Bed, Bath, LayoutDashboard, Utensils, Wifi, Tv, Coffee, Snowflake, Car, WashingMachine, Dumbbell, ArrowLeft, Save, Trash2, XCircle } from 'lucide-react';

interface PropertyDetailsProps {
  propertyId: string | null; // null for new property
  onClose: () => void;
}

// Mock data (will be replaced with actual data fetching later)
interface Property {
  id: string;
  name: string;
  address: string;
  area: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  kitchen: boolean;
  facilities: string[];
  tags: string[];
  images: string[];
  status: 'active' | 'draft' | 'pending' | 'inactive';
}

const mockProperties: Property[] = [
  {
    id: 'prop-001',
    name: '豪华市中心公寓',
    address: '北京市朝阳区CBD中央大街1号',
    area: 120,
    type: '公寓',
    bedrooms: 3,
    bathrooms: 2,
    livingRooms: 1,
    kitchen: true,
    facilities: ['wifi', 'tv', 'coffee', 'air_conditioning', 'parking', 'washing_machine', 'gym'],
    tags: ['豪华', '市中心', '新装修'],
    images: ['https://source.unsplash.com/random/400x300?apartment1', 'https://source.unsplash.com/random/400x300?apartment2'],
    status: 'active',
  },
  {
    id: 'prop-002',
    name: '温馨郊区别墅',
    address: '上海市青浦区淀山湖大道88号',
    area: 200,
    type: '别墅',
    bedrooms: 4,
    bathrooms: 3,
    livingRooms: 2,
    kitchen: true,
    facilities: ['wifi', 'tv', 'coffee', 'air_conditioning', 'parking', 'washing_machine'],
    tags: ['郊区', '宁静', '家庭'],
    images: ['https://source.unsplash.com/random/400x300?villa1', 'https://source.unsplash.com/random/400x300?villa2'],
    status: 'draft',
  },
  {
    id: 'prop-003',
    name: '现代精品酒店式公寓',
    address: '广州市天河区珠江新城花城大道99号',
    area: 80,
    type: '酒店式公寓',
    bedrooms: 1,
    bathrooms: 1,
    livingRooms: 1,
    kitchen: true,
    facilities: ['wifi', 'tv', 'coffee', 'air_conditioning', 'gym'],
    tags: ['精品', '商务', '交通便利'],
    images: ['https://source.unsplash.com/random/400x300?hotelapartment1', 'https://source.unsplash.com/random/400x300?hotelapartment2'],
    status: 'pending',
  }
];

const facilityIcons: { [key: string]: React.ElementType } = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  air_conditioning: Snowflake,
  parking: Car,
  washing_machine: WashingMachine,
  gym: Dumbbell,
  kitchen: Utensils,
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (propertyId) {
      // In a real application, you'd fetch data from an API
      const foundProperty = mockProperties.find(p => p.id === propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
        setIsEditing(true); // If propertyId exists, it's an edit
      } else {
        // Handle property not found, maybe show an error or go back to list
                    console.error('房源未找到:', propertyId);
        onClose();
      }
    } else {
      // Creating a new property
      setProperty({
        id: '', // Will be generated on save
        name: '',
        address: '',
        area: 0,
        type: '',
        bedrooms: 0,
        bathrooms: 0,
        livingRooms: 0,
        kitchen: false,
        facilities: [],
        tags: [],
        images: [],
        status: 'draft',
      });
      setIsEditing(false); // It's a new property, not editing
    }
  }, [propertyId, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProperty(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setProperty(prev => {
      const currentFacilities = prev?.facilities || [];
      if (currentFacilities.includes(facility)) {
        return { ...prev!, facilities: currentFacilities.filter(f => f !== facility) };
      } else {
        return { ...prev!, facilities: [...currentFacilities, facility] };
      }
    });
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newTag = e.currentTarget.value.trim();
      setProperty(prev => {
        const currentTags = prev?.tags || [];
        if (!currentTags.includes(newTag)) {
          return { ...prev!, tags: [...currentTags, newTag] };
        }
        return prev;
      });
      e.currentTarget.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProperty(prev => ({
      ...prev!,
      tags: (prev?.tags || []).filter(tag => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // In a real app, you'd upload these files and get URLs
      // For mock, we'll just use placeholder URLs
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file)); // Using Blob URL for preview
      setProperty(prev => ({
        ...prev!,
        images: [...(prev?.images || []), ...newImageUrls],
      }));
    }
  };

  const handleRemoveImage = (imageUrlToRemove: string) => {
    setProperty(prev => ({
      ...prev!,
      images: (prev?.images || []).filter(url => url !== imageUrlToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    if (isEditing) {
      console.log('更新房源:', property);
      // In a real app: call API to update property
    } else {
      const newProperty = { ...property, id: `prop-${Date.now()}` }; // Simulate ID generation
      console.log('新增房源:', newProperty);
      // In a real app: call API to create property
    }
    onClose(); // Go back to list after saving
  };

  if (!property) {
    return <div>加载中...</div>; // Or a loading spinner
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{isEditing ? '编辑房源' : '新增房源'}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基础信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">房源名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={property.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">房源地址</label>
            <input
              type="text"
              id="address"
              name="address"
              value={property.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">面积 (m²)</label>
            <input
              type="number"
              id="area"
              name="area"
              value={property.area}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">房源类型</label>
            <select
              id="type"
              name="type"
              value={property.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            >
              <option value="">请选择</option>
              <option value="公寓">公寓</option>
              <option value="别墅">别墅</option>
              <option value="酒店式公寓">酒店式公寓</option>
              <option value="客栈">客栈</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">卧室数量</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={property.bedrooms}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">卫生间数量</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={property.bathrooms}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="livingRooms" className="block text-sm font-medium text-gray-700 mb-1">客厅数量</label>
            <input
              type="number"
              id="livingRooms"
              name="livingRooms"
              value={property.livingRooms}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="kitchen"
              name="kitchen"
              checked={property.kitchen}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="kitchen" className="ml-2 block text-sm font-medium text-gray-700">有厨房</label>
          </div>
        </div>

        {/* 设施配置 */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">设施配置</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(facilityIcons).map(([key, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleFacilityToggle(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors
                  ${property.facilities.includes(key) ? 'bg-primary-100 border-primary-500 text-primary-700' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{key === 'wifi' ? '无线网络' : key === 'tv' ? '电视' : key === 'coffee' ? '咖啡机' : key === 'air_conditioning' ? '空调' : key === 'parking' ? '停车位' : key === 'washing_machine' ? '洗衣机' : key === 'gym' ? '健身房' : key === 'kitchen' ? '厨房' : key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 标签管理 */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">标签管理</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {property.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 -mr-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-600 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <XCircle className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="输入标签并按回车添加"
            onKeyDown={handleTagInput}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        {/* 房源图片上传 */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">房源图片</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {property.images.map((imageUrl, index) => (
              <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                <img src={imageUrl} alt={`Property Image ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="删除图片"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors cursor-pointer">
              <label htmlFor="image-upload" className="flex flex-col items-center justify-center p-4 cursor-pointer text-gray-500 hover:text-primary-600">
                <Camera className="w-8 h-8 mb-2" />
                <span>上传图片</span>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 状态选择 */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">房源状态</h3>
          <select
            id="status"
            name="status"
            value={property.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          >
            <option value="draft">草稿</option>
            <option value="pending">待审核</option>
            <option value="active">已上线</option>
            <option value="inactive">已下线</option>
          </select>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>取消/返回</span>
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => console.log('删除房源:', property.id)} // 删除逻辑占位符
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>删除房源</span>
            </button>
          )}
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? '保存修改' : '创建房源'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyDetails; 