import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const DateTimePicker = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const handleDateSelect = (date) => {
    onDateChange(date);
  };
  
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="h-10" />
            ))}
            
            {daysInMonth.map((date) => {
              const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              
              return (
                <button type='button'
                  key={date.toString()}
                  onClick={() => handleDateSelect(date)}
                  className={`h-10 rounded-full flex items-center justify-center text-sm transition-colors
                    ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                    ${isToday && !isSelected ? 'text-blue-600 font-semibold' : ''}
                  `}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <label className="block text-sm text-gray-600 mb-2">Start Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;