import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../../store/useTaskStore';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { 
    tasks, 
    selectedDate, 
    filterValue, 
    searchQuery 
  } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filteredTasks = tasks.filter((task) => {
    // Filter by date
    const matchesDate = task.date === format(selectedDate, 'yyyy-MM-dd');
    
    // Filter by status (if filter is active)
    const matchesFilter = !filterValue || task.status === filterValue;
    
    // Filter by search query
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDate && matchesFilter && matchesSearch;
  });
const accessToken = localStorage.getItem("google_access_token")
  useEffect(() => {
    (async () => {
      const res =  await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch task lists");

        const data = await res.json();
        console.log(data,"data")
    })()  
  
  },[])
  
  return (
    <div className="p-4 space-y-4 ">
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No tasks for this day</p>
          </div>
        )}
      </div>
      
      {/* {isFormOpen ? (
        <TaskForm onClose={() => setIsFormOpen(false)} />
      ) : (
        <button
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Add task"
        >
          <Plus size={24} />
        </button>
      )} */}
      
    </div>
  );
};

export default TodoList;