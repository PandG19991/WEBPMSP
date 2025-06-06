import React from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

const CleaningSchedule: React.FC = () => {
  const cleaningTasks = [
    {
      id: 'CT001',
      property: 'Luxury Downtown Suite',
      type: 'Check-out Cleaning',
      assignedTo: 'Maria Chen',
      scheduledTime: '2024-01-15 15:00',
      estimatedDuration: 90,
      status: 'in-progress',
      priority: 'high',
      checkoutTime: '2024-01-15 11:00',
      nextCheckin: '2024-01-16 15:00',
    },
    {
      id: 'CT002',
      property: 'Modern City Apartment',
      type: 'Maintenance Cleaning',
      assignedTo: 'Li Wei',
      scheduledTime: '2024-01-15 16:30',
      estimatedDuration: 60,
      status: 'pending',
      priority: 'medium',
      checkoutTime: null,
      nextCheckin: '2024-01-17 14:00',
    },
    {
      id: 'CT003',
      property: 'Executive Suite',
      type: 'Deep Cleaning',
      assignedTo: 'Zhang Min',
      scheduledTime: '2024-01-15 10:00',
      estimatedDuration: 120,
      status: 'completed',
      priority: 'low',
      checkoutTime: '2024-01-15 09:00',
      nextCheckin: '2024-01-16 16:00',
    },
    {
      id: 'CT004',
      property: 'Cozy Studio',
      type: 'Check-out Cleaning',
      assignedTo: 'Wang Ling',
      scheduledTime: '2024-01-15 17:00',
      estimatedDuration: 75,
      status: 'pending',
      priority: 'high',
      checkoutTime: '2024-01-15 12:00',
      nextCheckin: '2024-01-15 20:00',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-secondary-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-primary-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-warning-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-secondary-100 text-secondary-800';
      case 'in-progress':
        return 'bg-primary-100 text-primary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-800';
      case 'medium':
        return 'bg-warning-100 text-warning-800';
      case 'low':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 leading-heading">Cleaning Schedule</h2>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            View Calendar
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cleaningTasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{task.property}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority} priority
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.type}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{task.assignedTo}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{task.scheduledTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{task.estimatedDuration} min</span>
                  </div>
                  
                  {task.nextCheckin && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Next check-in: {task.nextCheckin}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(task.status)}
                {task.status === 'pending' && (
                  <button className="bg-secondary-600 text-white px-3 py-1 rounded text-sm hover:bg-secondary-700 transition-colors">
                    Start
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleaningSchedule;