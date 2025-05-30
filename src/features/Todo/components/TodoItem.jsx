import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, ChevronRight } from 'lucide-react';
import TaskForm from './TaskForm';
import { useTaskStore } from '../../../store/useTaskStore';


const TodoItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getBorderColor = () => {
    switch (task.category) {
      case 'green':
        return 'border-l-green-500';
      case 'yellow':
        return 'border-l-yellow-500';
      case 'red':
        return 'border-l-red-500';
      case 'purple':
        return 'border-l-purple-500';
      default:
        return 'border-l-blue-600';
    }
  };

  const getStatusButton = () => {
    switch (task.status) {
      case 'complete':
        return (
          <span className="bg-green-500 text-white px-4 py-1.5 rounded-md">
            Complete
          </span>
        );
      case 'processing':
        return (
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-md">
            Processing
          </span>
        );
      default:
        return (
          <button
            onClick={() => updateTask(task.id, { status: 'processing' })}
            className="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-300 transition-colors"
          >
            To do
          </button>
        );
    }
  };

  const handleStatusToggle = () => {
    if (task.status === 'todo') {
      updateTask(task.id, { status: 'processing' });
    } else if (task.status === 'processing') {
      updateTask(task.id, { status: 'complete' });
    } else {
      updateTask(task.id, { status: 'todo' });
    }
  };

  if (isEditing) {
    return <TaskForm task={task} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${getBorderColor()} overflow-hidden transition-all hover:shadow-md`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`}
                />
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {task.startTime} - {task.endTime}
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Task menu"
            >
              <MoreVertical size={16} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsEditing(true);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Edit size={14} className="mr-2" /> Edit
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        deleteTask(task.id);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <Trash2 size={14} className="mr-2" /> Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-3 text-sm text-gray-600 border-t border-gray-100 pt-3">
            <p>{task.description}</p>
            {task.notifications && (
              <div className="mt-2 text-blue-600">
                Notifications enabled
              </div>
            )}
          </div>
        )}
        
        <div className="mt-3 flex justify-end">
          <div onClick={handleStatusToggle}>{getStatusButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;