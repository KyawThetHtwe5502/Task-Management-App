import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DateTimePicker from '../../../components/DateTimePicker';
import { useTaskStore } from '../../../store/useTaskStore';
import useCreateTask from '../hooks/useCreateTask';
import { useNavigate } from 'react-router-dom';

const TaskCreateFrom = () => {
  const { addTask, updateTask, selectedDate } = useTaskStore();
  const navigate = useNavigate()

  const [endTime, setEndTime] = useState( '10:00');
  const [notifications, setNotifications] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [endDate, setEndDate] = useState(selectedDate);
  const {handleSubmit,register,errors, addToTask,setValue} = useCreateTask()
      const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState("");
console.log(currentTime)
  useEffect(() => {
    // Set current time formatted as HH:mm or whatever you want
    const now = new Date();
    setCurrentTime(format(now, "HH:mm a"));
    setCurrentDate(now);
  }, []);

  const formatEnd = (timeStr) => {
  const [hourStr, minute] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${ampm}`;
}


const onSubmit = async (formData) => {
  try{

    await addToTask(formData);
    navigate("/todo")
  } catch(err) {
    alert(err)
  }
}
  const [checked, setChecked] = useState(false);
  return (
<form onSubmit={handleSubmit(onSubmit)} id='create' className="flex-1 p-4 space-y-8 ">
        <div className='pr-4'>
          <div className='bg-white rounded-md'>
          <div className='p-4'>
          <input
            type="text"
          {...register("title",{ required: true })}
            className="w-full px-0 py-2 text-lg border-0 border-b border-gray-200 focus:outline-none focus:ring-0 placeholder-gray-400"
            placeholder="Title"
            autoFocus
          />
                {errors.title && <p className='text-sm text-red-500'>title is required.</p>}

          <textarea
                    {...register("notes",{ required: true })}

          className="w-full px-0 py-2 text-base border-0 focus:outline-none placeholder-gray-400 resize-none focus:ring-0"
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
              className="flex items-center space-x-2"
            >


              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {format(currentDate, 'MMM dd, yyyy')}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {currentTime}
              </span>
            </button>
          </div>
        
      
      {showEndPicker && (
        <DateTimePicker
          selectedDate={endDate}
          selectedTime={endTime}
onDateChange={(date) => {
    setEndDate(date);
    setValue("due", date.toISOString());
  }}
    onTimeChange={(time) => {
    setEndTime(time);
  }}

          value={endDate}
          onClose={() => setShowEndPicker(false)}
        />
      )}
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
      <input type="hidden" {...register("due")} value={endDate} />
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                {formatEnd(endTime)}


              </span>
      <input type="hidden" readOnly  />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-md">
            <div className="text-sm text-gray-600">status</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                {...register("status")}
                onChange={(e) => {

      const isChecked = e.target.checked;
      setChecked(isChecked);
      setValue("status", isChecked ? "completed" : "needsAction");

                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
        </div>
        </div>

        <div className='pr-4'>
          <div className="flex items-center justify-between p-4 bg-white rounded-md">
            <div className="text-sm text-gray-600">hidden</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                {...register("hidden")}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </form>
        )
}

export default TaskCreateFrom