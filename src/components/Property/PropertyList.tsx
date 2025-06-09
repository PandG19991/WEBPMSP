import React from 'react';
import { Eye, Edit, Trash2, MoreHorizontal, MapPin, Bed, Bath, Users } from 'lucide-react';

interface PropertyListProps {
  searchTerm: string;
  statusFilter: string;
  onSelectProperty: (propertyId: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ searchTerm, statusFilter, onSelectProperty }) => {
  const properties = [
    {
      id: 'PROP001',
      name: '豪华市中心套房',
      address: '上海市中央广场123号',
      type: '公寓',
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      status: 'active',
      revenue: 12500,
      occupancy: 87,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'PROP002',
      name: '现代城市公寓',
      address: '北京市商务区456号',
      type: '公寓',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      status: 'active',
      revenue: 8900,
      occupancy: 92,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'PROP003',
      name: '行政商务套房',
      address: '深圳市金融街789号',
      type: '套房',
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      status: 'pending',
      revenue: 15600,
      occupancy: 78,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 'PROP004',
      name: '温馨工作室',
      address: '广州市艺术区321号',
      type: '工作室',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      status: 'draft',
      revenue: 5400,
      occupancy: 65,
      rating: 4.3,
      reviews: 67,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary-100 text-secondary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'inactive':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '已上线';
      case 'pending':
        return '待审核';
      case 'draft':
        return '草稿';
      case 'inactive':
        return '已下线';
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                {getStatusText(property.status)}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {property.type}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 leading-heading">{property.name}</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{property.address}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Bed className="w-3 h-3" />
                <span>{property.bedrooms}室</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath className="w-3 h-3" />
                <span>{property.bathrooms}卫</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{property.maxGuests}人</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600">月收入</p>
                <p className="font-semibold text-gray-900">¥{property.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">入住率</p>
                <p className="font-semibold text-gray-900">{property.occupancy}%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(property.rating))}
                </div>
                <span className="text-sm text-gray-600">
                  {property.rating} ({property.reviews} 评价)
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSelectProperty(property.id)}
                className="flex-1 flex items-center justify-center space-x-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>查看</span>
              </button>
              <button
                onClick={() => onSelectProperty(property.id)}
                className="flex items-center justify-center space-x-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center space-x-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;