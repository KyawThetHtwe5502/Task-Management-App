import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Bell, Clock } from 'lucide-react';
import DateTimePicker from '../../../components/DateTimePicker';
import { useTaskStore } from '../../../store/useTaskStore';



const TaskForm = ({ task, onClose }) => {
  const { addTask, updateTask, selectedDate } = useTaskStore();
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || 'blue');
  const [startTime, setStartTime] = useState(task?.startTime || '09:00');
  const [endTime, setEndTime] = useState(task?.endTime || '10:00');
  const [notifications, setNotifications] = useState(task?.notifications || false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    const taskData = {
      title,
      description,
      category,
      startTime,
      endTime,
      notifications,
      status: task?.status || 'todo',
      date: format(startDate, 'yyyy-MM-dd'),
    };
    
    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{task ? 'Edit Task' : 'New Task'}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => setShowStartPicker(true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center space-x-2 hover:bg-gray-50"
                >
                  <Clock size={16} className="text-gray-500" />
                  <span>{format(startDate, 'MMM dd')} {startTime}</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setShowEndPicker(true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center space-x-2 hover:bg-gray-50"
                >
                  <Clock size={16} className="text-gray-500" />
                  <span>{format(endDate, 'MMM dd')} {endTime}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add details about your task"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="flex space-x-3">
              <CategoryButton 
                color="blue"
                selected={category === 'blue'}
                onClick={() => setCategory('blue')}
              />
              <CategoryButton 
                color="green"
                selected={category === 'green'}
                onClick={() => setCategory('green')}
              />
              <CategoryButton 
                color="yellow"
                selected={category === 'yellow'}
                onClick={() => setCategory('yellow')}
              />
              <CategoryButton 
                color="red"
                selected={category === 'red'}
                onClick={() => setCategory('red')}
              />
              <CategoryButton 
                color="purple"
                selected={category === 'purple'}
                onClick={() => setCategory('purple')}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Bell size={20} className="text-gray-500" />
              <span className="text-sm text-gray-700">Notification</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-200">
            {task && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this task?')) {
                    onClose();
                  }
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Delete Task
              </button>
            )}
            <div className="flex space-x-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {task ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {showStartPicker && (
        <DateTimePicker
          selectedDate={startDate}
          selectedTime={startTime}
          onDateChange={setStartDate}
          onTimeChange={setStartTime}
          onClose={() => setShowStartPicker(false)}
        />
      )}
      
      {showEndPicker && (
        <DateTimePicker
          selectedDate={endDate}
          selectedTime={endTime}
          onDateChange={setEndDate}
          onTimeChange={setEndTime}
          onClose={() => setShowEndPicker(false)}
        />
      )}
    </div>
  );
};


const CategoryButton = ({ color, selected, onClick }) => {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-blue-600';
    }
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 rounded-full ${getColorClass()} ${
        selected ? 'ring-2 ring-offset-2 ring-gray-400' : ''
      }`}
      aria-label={`${color} category`}
    />
  );
};

export default TaskForm;