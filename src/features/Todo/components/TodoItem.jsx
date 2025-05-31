import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, ChevronRight } from 'lucide-react';
import TaskForm from './TaskForm';
import { useTaskStore } from '../../../store/useTaskStore';
import { Link } from 'react-router-dom';


const TodoItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const getBorderColor = () => {
    switch (task.status) {
      case 'completed':
        return 'border-l-[#039855]';
      default:
        return 'border-l-blue-600';
    }
  };

  const getStatusButton = () => {
    switch (task.status) {
      case 'completed':
        return (
          <span className="bg-[#039855] text-white px-4 py-1.5 rounded-md">
            Complete
          </span>
        );
      case 'needsAction':
        return (
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-md">
            needsAction
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

  

  if (isEditing) {
    return <TaskForm task={task} onClose={() => setIsEditing(false)} />;
  }

  return (
    <Link to={`detail/${task.id}`}
      className={`bg-white rounded-lg ${task?.hidden && "opacity-70"} shadow-sm border-l-4 ${getBorderColor()} overflow-hidden transition-all hover:shadow-md`}
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              {/* <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`}
                />
              </button> */}
            </div>
            <div className="text-sm text-gray-500 mt-1 line-clamp-1">
              {task.notes}
            </div>
          </div>
          
          {/* <div className="relative">
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
          </div> */}
        </div>
        
        <div >
          <button >{getStatusButton()}</button>
        </div>
      </div>
    </Link>
  );
};

export default TodoItem;