import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {  ChevronLeft, Edit } from 'lucide-react';
import DateTimePicker from '../../../components/DateTimePicker';
import { useTaskStore } from '../../../store/useTaskStore';
import { useNavigate, useParams } from 'react-router-dom';
import useDeleteTask from '../hooks/useDeleteTask';



const TodoDetailPage = () => {
  const { addTask, updateTask, selectedDate } = useTaskStore();
  const [task,setTask] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id,"id")
  const [startTime, setStartTime] = useState(task?.startTime || '09:00');
  const [endTime, setEndTime] = useState(task?.endTime || '10:00');
  const [notifications, setNotifications] = useState( false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  
const accessToken = localStorage.getItem("google_access_token")
const {deleteTask} = useDeleteTask()
const handleDeleteTask = async () => {
  try {
      await deleteTask(id); 
      navigate("/todo")
    
    } catch (error) {
      console.error("Failed to delete:", error);
    }

}
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
useEffect(() => {
  (async () => {
      const res =  await fetch(`https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch task lists");

        const data = await res.json();
        if(data){

          setTask(data);
        }
        console.log(task,"data",data)
    })()  
},[])
  return (
    
    <div className=" bg-gray-200  h-screen w-full">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-blue-600 duration-200 text-sm font-medium"
        >
          <ChevronLeft/>
        </button>
        <h2 className="text-base font-medium"> Task details</h2>
        <button onClick={() => navigate(`/todo/edit/${id}`)}>
          <Edit className='size-5 text-[#4D5761]'/>
        </button>
      </div>
      
      <div  className=" p-4 space-y-9  bg-gray-200">
        
        <h1 className='text-xl font-bold'>{task.title}</h1>
        
        
        <div className=''>
          <div className="space-y-4 w-full p-4  bg-white rounded-md">
          <div className='flex justify-between items-center w-full pr-4 border-b border-gray-100 py-2'>
            <div className="text-sm text-gray-600 ">Starts</div>
            <button
              
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
            {getStatusButton()}
          </div>
          
          
        </div>
        </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-md">
            <div className="text-sm text-gray-600">hidden</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={task?.hidden}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
      </div>
      <div className='p-4 bg-gray-200'>
          <div className='bg-white rounded-md'>
          <div className='p-4'>
          <p className='text-xs text-[#6C737F]'>{task.notes}</p>

        </div>
        </div>
        </div>
        
      <div className="bottom-0 fixed w-full border-t bg-white border-gray-100 overflow-hidden">
        <button
          onClick={handleDeleteTask}
          className="w-full   py-3  text-sm text-[#FF382B] font-medium hover:text-white hover:bg-[#FF382B] transition-colors"
        >
          delete Task
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

export default TodoDetailPage;