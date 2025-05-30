import React, { useState } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import DateTimePicker from '../../../components/DateTimePicker';
import { useTaskStore } from '../../../store/useTaskStore';
import { useNavigate } from 'react-router-dom';
import useCreateTask from '../hooks/useCreateTask';



const TaskForm = ({ task, onClose }) => {
  const { addTask, updateTask, selectedDate } = useTaskStore();
  const navigate = useNavigate()
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [startTime, setStartTime] = useState(task?.startTime || '09:00');
  const [endTime, setEndTime] = useState(task?.endTime || '10:00');
  const [notifications, setNotifications] = useState(task?.notifications || false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const {handleSubmit,register,errors, addToTask} = useCreateTask()
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if (!title.trim()) {
  //     return;
  //   }
    
  //   const taskData = {
  //     title,
  //     description,
  //     category: 'blue' ,
  //     startTime,
  //     endTime,
  //     notifications,
  //     status: 'todo' ,
  //     date: format(startDate, 'yyyy-MM-dd'),
  //   };
    
  //   if (task) {
  //     updateTask(task.id, taskData);
  //   } else {
  //     addTask(taskData);
  //   }
    
  //   onClose();
  // };

//   const addToTask = async ( ) => {
//   try {
//     const response = await fetch(
//       "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // ✅ fixed template literal
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: "title",
//           notes:   "dessfdf",
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || "Failed to add task");
//     }

//     const data = await response.json();
//     console.log("✅ Task Created:", data);
//     return data; // optionally return for further handling
//   } catch (error) {
//     console.error("❌ Error adding task:", error.message);
//   }
// };
const onSubmit = async (formData) => {
  await addToTask(formData);
}

  return (
    <div className=" bg-gray-200 flex flex-col h-full w-full">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 text-sm font-medium"
        >
          Cancel
        </button>
        <h2 className="text-base font-medium">New Task</h2>
        <div className="w-12" /> {/* Spacer for alignment */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} id='form' className="flex-1 p-4 space-y-8 ">
        <div className='pr-4'>
          <div className='bg-white rounded-md'>
          <div className='p-4'>
          <input
            type="text"
          {...register("title",{ required: true })}
            className="w-full px-0 py-2 text-lg border-0 border-b border-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-400"
            placeholder="Title"
            autoFocus
          />
                {errors.title && <p className='text-sm text-red-500'>title is required.</p>}

          <textarea
                    {...register("notes",{ required: true })}

          className="w-full px-0 py-2 text-base border-0 focus:outline-none placeholder-gray-400 resize-none"
          placeholder="Text"
          rows={4}
        />
                        {errors.notes && <p className='text-sm text-red-500'>notes is required.</p>}

        </div>
        </div>
        </div>
        
        
        
        <div className='pr-4'>
          <div className="space-y-4 w-full p-4  bg-white rounded-md">
          <div className='flex justify-between items-center w-full pr-4 border-b border-gray-100 py-2'>
            <div className="text-sm text-gray-600 ">Starts</div>
            <button
              type="button"
              onClick={() => setShowStartPicker(true)}
              className="flex items-center space-x-2"
            >
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {format(startDate, 'MMM dd, yyyy')}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {startTime}
              </span>
            </button>
          </div>
          
          <div className='flex justify-between items-center pr-4 border-b border-gray-100 py-2'>
            <div className="text-sm text-gray-600 mb-2">Ends</div>
            <button
              type="button"
              onClick={() => setShowEndPicker(true)}
              className=" flex items-center space-x-2"
            >
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {format(endDate, 'MMM dd, yyyy')}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {endTime}
              </span>
            </button>
          </div>
          
          <div className='flex justify-between items-center pr-4 border-b border-gray-100 py-2'>
            <div className="text-sm text-gray-600 mb-2">Status</div>
            <button
              type="button"
              className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-sm"
              disabled
            >
              Not start
            </button>
          </div>
          
          
        </div>
        </div>

        <div className='pr-4'>
          <div className="flex items-center justify-between p-4 bg-white rounded-md">
            <div className="text-sm text-gray-600">Notification</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </form>
      
      <div className="bottom-0 fixed w-full border-t border-gray-100 overflow-hidden">
        <button
          type="submit" form="form"
          className="w-full   py-3  text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
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

export default TaskForm;