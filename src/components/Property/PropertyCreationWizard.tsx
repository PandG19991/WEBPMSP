import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, MapPin } from 'lucide-react';

interface PropertyCreationWizardProps {
  onClose: () => void;
}

const PropertyCreationWizard: React.FC<PropertyCreationWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: '',
    amenities: [] as string[],
    images: [] as string[],
    rules: '',
    basePrice: '',
  });

  const steps = [
    { id: 1, title: '基本信息', description: '房源详情和描述' },
    { id: 2, title: '位置布局', description: '地址和房间配置' },
    { id: 3, title: '图片媒体', description: '上传房源照片' },
    { id: 4, title: '设施规则', description: '功能设施和入住规则' },
    { id: 5, title: '价格设置', description: '设置基础价格' },
    { id: 6, title: '审核提交', description: '最终审核和提交' },
  ];

  const amenitiesList = [
    'WiFi', '电视', '厨房', '洗衣机', '空调', 
    '暖气', '停车位', '游泳池', '健身房', '阳台', '花园', '允许宠物'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('房源数据:', formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">房源名称 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="输入房源名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">房源类型 *</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="">选择类型</option>
                <option value="apartment">公寓</option>
                <option value="house">别墅</option>
                <option value="studio">工作室</option>
                <option value="suite">套房</option>
                <option value="villa">度假村</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">房源描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="描述您的房源..."
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">地址 *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="输入完整地址"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">卧室数</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">卫生间数</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">最大入住人数</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxGuests}
                  onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">房源图片 *</label>
              <p className="text-sm text-gray-600 mb-4">至少上传3张高质量图片。第一张图片将作为主图显示。</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">拖拽图片到此处，或点击浏览</p>
                <p className="text-sm text-gray-500">支持JPG、PNG格式，每张图片最大10MB</p>
                <button className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  选择文件
                </button>
              </div>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`房源 ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                          主图
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">设施配置</label>
              <div className="grid grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">入住规则</label>
              <textarea
                value={formData.rules}
                onChange={(e) => handleInputChange('rules', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="输入入住规则（如：禁止吸烟、禁止宠物、安静时间：晚10点-早8点）"
              />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">基础价格（每晚）</label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleInputChange('basePrice', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="输入基础价格"
              />
              <p className="text-sm text-gray-600 mt-1">这是您的标准夜间价格。您可以稍后调整定价。</p>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">审核您的房源</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{formData.name}</h4>
                <p className="text-sm text-gray-600">{formData.type} • {formData.address}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">卧室:</span>
                  <span className="ml-2 font-medium">{formData.bedrooms}</span>
                </div>
                <div>
                  <span className="text-gray-600">卫生间:</span>
                  <span className="ml-2 font-medium">{formData.bathrooms}</span>
                </div>
                <div>
                  <span className="text-gray-600">最大入住:</span>
                  <span className="ml-2 font-medium">{formData.maxGuests}人</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-600">基础价格:</span>
                <span className="ml-2 font-medium">¥{formData.basePrice}/晚</span>
              </div>
              
              <div>
                <span className="text-gray-600">设施:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.amenities.map((amenity) => (
                    <span key={amenity} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-screen overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">添加新房源</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex">
          <div className="w-1/3 bg-gray-50 p-6">
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-start space-x-3 ${
                    currentStep === step.id ? 'text-primary-600' : 
                    currentStep > step.id ? 'text-secondary-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    currentStep === step.id ? 'bg-primary-600 text-white' :
                    currentStep > step.id ? 'bg-secondary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
            
            <div className="min-h-96">
              {renderStepContent()}
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>上一步</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  保存草稿
                </button>
                
                {currentStep < steps.length ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <span>下一步</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors"
                  >
                    提交审核
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCreationWizard;