import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useTaskStore } from '../../../store/useTaskStore';
import TodoItem from './TodoItem';

const TodoList = () => {
  
  const {selectedDate,tasks,setTasks,filterValue,searchQuery} = useTaskStore();
  console.log(tasks,"tasks")
const accessToken = localStorage.getItem("google_access_token")
  useEffect(() => {
    (async () => {
      const res =  await fetch("https://tasks.googleapis.com/tasks/v1/lists/@default/tasks", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch task lists");

        const data = await res.json();
        setTasks(data.items)
        console.log(data,"data")
    })()  
  
  },[])


  const getFilteredTasks = (tasks, selectedDate, filterValue, searchQuery) => {
  return tasks.filter((task) => {
    const matchesFilterValue =
      filterValue === "All tasks" || !filterValue
        ? true
        : task.status === filterValue;

    const matchesSearch =
      !searchQuery ||
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate =
      !selectedDate ||
      format(new Date(task.updated), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

    return matchesFilterValue && matchesSearch && matchesDate;
  });
};



  const filteredTasks = getFilteredTasks(tasks,selectedDate,filterValue,searchQuery)
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
      
      
    </div>
  );
};

export default TodoList;