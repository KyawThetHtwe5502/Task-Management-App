
import { useNavigate } from 'react-router-dom';
import TaskCreateFrom from '../components/TaskCreateFrom';



const TodoCreatePage = () => {
  const navigate = useNavigate()

  return (
    <div className=" bg-gray-200 flex flex-col h-screen w-full">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className=" text-[#0A56BB] hover:text-gray-800 duration-100 transition"
        >
          Cancel
        </button>
        <h2 className="text-base font-bold">New Task</h2>
        <div className="w-12" /> {/* Spacer for alignment */}
      </div>
      {/* form */}
      <TaskCreateFrom/>
      <div className="bottom-0 fixed w-full border-t bg-white  hover:  border-gray-100 overflow-hidden">
        <button
          type="submit" form="create"
          className="w-full   py-3  text-sm font-medium text-[#0A56BB] hover:bg-[#0A56BB] hover:text-white duration-100 transition-colors"
        >
          Add Task
        </button>
      </div>
      
      
    </div>
  );
};

export default TodoCreatePage;