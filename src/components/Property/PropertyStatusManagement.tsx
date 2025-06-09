import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface PropertyStatus {
  date: string; // YYYY-MM-DD
  status: 'available' | 'booked' | 'unavailable';
  propertyId: string;
}

interface Property {
  id: string;
  name: string;
}

// Mock Data for properties
const mockProperties: Property[] = [
  { id: 'P001', name: '豪华湖景别墅' },
  { id: 'P002', name: '市中心精品公寓' },
  { id: 'P003', name: '海滨度假屋' },
];

// Mock Data for property statuses (example: a week's data for P001)
const generateMockStatuses = (propertyId: string, startDate: Date, numDays: number): PropertyStatus[] => {
  const statuses: PropertyStatus[] = [];
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateString = currentDate.toISOString().split('T')[0];
    const statusOptions: ('available' | 'booked' | 'unavailable')[] = ['available', 'booked', 'unavailable'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    statuses.push({
      date: dateString,
      status: randomStatus,
      propertyId: propertyId,
    });
  }
  return statuses;
};

const PropertyStatusManagement: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>(mockProperties[0].id);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [propertyStatuses, setPropertyStatuses] = useState<PropertyStatus[]>([]);

  useEffect(() => {
    // Simulate fetching data for the selected property and current month
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const numDays = (endDate.getDate() - startDate.getDate()) + 1;

    const fetchedStatuses = generateMockStatuses(selectedProperty, startDate, numDays);
    setPropertyStatuses(fetchedStatuses);
  }, [selectedProperty, currentMonth]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const numDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-200"></div>);
    }

    for (let day = 1; day <= numDays; day++) {
      const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const statusData = propertyStatuses.find(s => s.date === dateString);
      let statusClass = '';
      let statusText = '';

      switch (statusData?.status) {
        case 'available':
          statusClass = 'bg-green-100 text-green-800';
          statusText = '可用';
          break;
        case 'booked':
          statusClass = 'bg-red-100 text-red-800';
          statusText = '已预订';
          break;
        case 'unavailable':
          statusClass = 'bg-gray-100 text-gray-500';
          statusText = '不可用';
          break;
        default:
          statusClass = 'bg-white text-gray-700';
          statusText = '未知';
          break;
      }

      days.push(
        <div key={dateString} className={`p-2 border border-gray-200 flex flex-col justify-between items-center text-sm ${statusClass}`}>
          <span className="font-semibold">{day}</span>
          <span className="text-xs mt-1">{statusText}</span>
        </div>
      );
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">房态管理</h2>

      {/* Property Selector and Month Navigation */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
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

        <div className="flex items-center space-x-2 ml-auto">
          <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="font-semibold text-lg text-gray-800">
            {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
          </span>
          <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center border-t border-l border-gray-200">
        {/* Weekday Headers */}
        {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
          <div key={day} className="p-2 font-medium text-gray-700 bg-gray-50 border-b border-r border-gray-200">
            {day}
          </div>
        ))}

        {/* Days of the Month */}
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex justify-end space-x-4 text-sm mt-6">
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span>可用</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span>已预订</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span>不可用</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyStatusManagement; 