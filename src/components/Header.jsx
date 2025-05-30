import React from 'react';
import { format, addDays, subDays, startOfWeek } from 'date-fns';
import { useTaskStore } from '../store/useTaskStore';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Header = () => {
  const { selectedDate, setSelectedDate } = useTaskStore();

  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handlePrevWeek = () => setSelectedDate(subDays(selectedDate, 7));
  const handleNextWeek = () => setSelectedDate(addDays(selectedDate, 7));

  return (
    <header className="border-b border-gray-200">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-4 py-2">
        <button
          onClick={handlePrevWeek}
          aria-label="Previous week"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
        >
          ◀
        </button>

        <h2 className="text-gray-700 font-medium">
          {format(startDate, 'MMM yyyy')}
        </h2>

        <button
          onClick={handleNextWeek}
          aria-label="Next week"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
        >
          ▶
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* Date Buttons */}
      <div className="grid grid-cols-7 text-center">
        {days.map((day) => {
          const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          return (
            <div key={day.toISOString()} className="py-2">
              <button
                onClick={() => setSelectedDate(day)}
                aria-label={`Select ${format(day, 'eeee, MMM d')}`}
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
