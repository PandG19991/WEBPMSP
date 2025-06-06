import React from 'react';
import { Wifi, Tv, Car, Utensils } from 'lucide-react';

const PropertyStatus: React.FC = () => {
  const properties = [
    {
      id: 'PROP001',
      name: '豪华市中心套房',
      status: 'occupied',
      checkOut: '2024-01-18',
      guest: '张伟',
      amenities: ['wifi', 'tv', 'parking'],
      revenue: 2400,
    },
    {
      id: 'PROP002',
      name: '现代城市公寓',
      status: 'cleaning',
      nextCheckIn: '2024-01-19',
      amenities: ['wifi', 'tv', 'kitchen'],
      revenue: 1800,
    },
    {
      id: 'PROP003',
      name: '行政商务套房',
      status: 'available',
      nextBooking: '2024-01-20',
      amenities: ['wifi', 'tv', 'parking', 'kitchen'],
      revenue: 3200,
    },
    {
      id: 'PROP004',
      name: '温馨工作室',
      status: 'maintenance',
      estimatedReady: '2024-01-22',
      amenities: ['wifi', 'tv'],
      revenue: 1200,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-primary-100 text-primary-800';
      case 'available':
        return 'bg-secondary-100 text-secondary-800';
      case 'cleaning':
        return 'bg-warning-100 text-warning-800';
      case 'maintenance':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'occupied':
        return '已入住';
      case 'available':
        return '可预订';
      case 'cleaning':
        return '清洁中';
      case 'maintenance':
        return '维护中';
      default:
        return status;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'tv':
        return <Tv className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'kitchen':
        return <Utensils className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-heading">房源状态</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          管理全部
        </button>
      </div>
      
      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 leading-heading">{property.name}</h4>
                <p className="text-sm text-gray-500">{property.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                {getStatusText(property.status)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="text-gray-400">
                    {getAmenityIcon(amenity)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {property.status === 'occupied' && property.checkOut && (
                  <span>退房: {property.checkOut}</span>
                )}
                {property.status === 'cleaning' && property.nextCheckIn && (
                  <span>下次入住: {property.nextCheckIn}</span>
                )}
                {property.status === 'available' && property.nextBooking && (
                  <span>下次预订: {property.nextBooking}</span>
                )}
                {property.status === 'maintenance' && property.estimatedReady && (
                  <span>预计完成: {property.estimatedReady}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                月收入: ¥{property.revenue.toLocaleString()}
              </span>
              {property.guest && (
                <span className="text-sm text-gray-600">客人: {property.guest}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyStatus;