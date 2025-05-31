

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskEditForm from "../components/TaskEditForm";

const TodoEditPage = () => {
  
const navigate = useNavigate()

  return (
    <div className="bg-gray-200 flex flex-col h-screen w-full">
      {/* header */}
      <div className="flex justify-between items-center bg-white  p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-sm font-medium">
          <ChevronLeft />
        </button>
        <h2 className="text-base font-medium">Edit Task</h2>
        <div className="w-12" /> {/* Spacer for alignment */}
      </div>
      {/* form */}
      <TaskEditForm/>
      
      <div className="bottom-0 fixed w-full border-t bg-white  border-gray-100 overflow-hidden">
        <button
          type="submit"
          form="form"
          className="w-full py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Update Task
        </button>
      </div>
    </div>
  );
};

export default TodoEditPage;
