import React, { useState } from 'react';
import { Filter, Check } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

const FilterMenu= () => {
  const { filterValue, setFilterValue } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFilterChange = (value) => {
    setFilterValue(value === filterValue ? '' : value);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
          filterValue ? 'bg-blue-100 text-blue-600' : ''
        }`}
        aria-label="Filter"
      >
        <Filter size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
              Filter by status
            </h3>
            <ul className="mt-1">
              <FilterOption 
                label="All"
                value=""
                isSelected={filterValue === ''}
                onChange={handleFilterChange}
              />
              <FilterOption 
                label="To Do"
                value="todo"
                isSelected={filterValue === 'todo'}
                onChange={handleFilterChange}
              />
              <FilterOption 
                label="Processing"
                value="processing"
                isSelected={filterValue === 'processing'}
                onChange={handleFilterChange}
              />
              <FilterOption 
                label="Complete"
                value="complete"
                isSelected={filterValue === 'complete'}
                onChange={handleFilterChange}
              />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};



const FilterOption = ({ 
  label, 
  value, 
  isSelected, 
  onChange 
}) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => onChange(value)}
        className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
      >
        <span className="w-5 h-5 mr-2 flex-shrink-0">
          {isSelected && <Check size={18} className="text-blue-600" />}
        </span>
        <span>{label}</span>
      </button>
    </li>
  );
};

export default FilterMenu;