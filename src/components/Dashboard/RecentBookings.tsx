import React from 'react';
import { Calendar, User, MapPin } from 'lucide-react';

const RecentBookings: React.FC = () => {
  const bookings = [
    {
      id: 'BK001',
      guest: '张伟',
      property: '豪华套房A',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'confirmed',
      amount: 2400,
    },
    {
      id: 'BK002',
      guest: '李梅',
      property: '标准房B',
      checkIn: '2024-01-16',
      checkOut: '2024-01-19',
      status: 'pending',
      amount: 1200,
    },
    {
      id: 'BK003',
      guest: '王军',
      property: '行政套房',
      checkIn: '2024-01-17',
      checkOut: '2024-01-20',
      status: 'confirmed',
      amount: 3600,
    },
    {
      id: 'BK004',
      guest: '陈玲',
      property: '豪华房',
      checkIn: '2024-01-18',
      checkOut: '2024-01-21',
      status: 'checked-in',
      amount: 1800,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-secondary-100 text-secondary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'checked-in':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '已确认';
      case 'pending':
        return '待确认';
      case 'checked-in':
        return '已入住';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-heading">最近预订</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          查看全部
        </button>
      </div>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{booking.guest}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{booking.property}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{booking.checkIn} - {booking.checkOut}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">¥{booking.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{booking.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;