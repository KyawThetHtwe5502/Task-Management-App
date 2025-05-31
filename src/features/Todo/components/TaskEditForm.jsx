
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import DateTimePicker from "../../../components/DateTimePicker";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateTask from "../hooks/useUpdateTask";

const TaskEditForm = () => {

  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState("10:00");

  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const navigate = useNavigate();
  const { handleSubmit, register, errors, updateTask, setValue } = useUpdateTask();
  const onSubmit = async (formData) => {
    try {
      await updateTask(formData); 
      navigate(-1)
    
    } catch (error) {
      alert("Failed to delete:", error);
    }
  };

  const { id } = useParams();
  const [task, setTask] = useState(null);

  const accessToken = localStorage.getItem("google_access_token");

  const getStatus = (status) => status === "completed";

  // Fetch the task data once on mount or when id/accessToken changes
  useEffect(() => {
    if (!id || !accessToken) return;

    (async () => {
      try {
        const res = await fetch(
          `https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch task");

        const data = await res.json();

        if (data) {
          setTask(data);
          setChecked(getStatus(data.status));
          setNotifications(!!data.hidden);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, accessToken]);

  // Update dates and times when task changes
  useEffect(() => {
    if (!task) return;

    if (task.updated) {
      const updatedDate = new Date(task.updated);
      setCurrentDate(updatedDate);
      setCurrentTime(format(updatedDate, "hh:mm a"));
    }

    if (task.due) {
      const dueDate = new Date(task.due);
      setEndDate(dueDate);
      setValue("endDate", dueDate.toISOString());
    }
  }, [task, setValue]);
  return (
<form onSubmit={handleSubmit(onSubmit)} id="form" className=" p-4  space-y-8">
        <div className="pr-4">
          <div className="bg-white rounded-md">
            <div className="p-4">
              <input
                type="text"
                defaultValue={task?.title }
                {...register("title")}
                className="w-full px-0 py-2 text-lg border-0 border-b border-gray-200 focus:outline-none focus:ring-0 placeholder-gray-400"
                placeholder="Title"
                autoFocus
              />
              {errors.title && <p className="text-sm text-red-500">Title is required.</p>}

              <textarea
                {...register("notes")}
                defaultValue={task?.notes }
                className="w-full px-0 py-2 text-sm border-0 focus:outline-none placeholder-gray-400 resize-none focus:ring-0"
                placeholder="Notes"
                rows={4}
              />
              {errors.notes && <p className="text-sm text-red-500">Notes are required.</p>}
            </div>
          </div>
        </div>

        <div className="pr-4 ">
          <div className="space-y-4 w-full p-4 bg-white rounded-md">
            <div className="flex justify-between items-center w-full pr-4 border-b border-gray-100 py-2">
              <div className="text-sm text-gray-600">Starts</div>
              <button type="button" className="flex items-center space-x-2" disabled>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                  {currentDate && format(currentDate, "MMM dd, yyyy")}
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

            <div className="flex justify-between items-center pr-4 border-b  border-gray-100 py-2">
              <div className="text-sm text-gray-600 mb-2">Ends</div>
              <button
                type="button"
                onClick={() => setShowEndPicker(true)}
                className="flex items-center space-x-2"
              >
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                  {endDate && format(endDate, "MMM dd, yyyy")}
                </span>
                <input type="hidden" {...register("due")}   />
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
                  {endTime && endTime}
                </span>
                <input type="hidden" readOnly />
              </button>
            </div>
            

            <div className="flex items-center justify-between p-4 bg-white rounded-md">
              <div className="text-sm text-gray-600">Status</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  {...register("status")}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="pr-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-md">
            <div className="text-sm text-gray-600">Hidden</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                {...register("hidden")}
                defaultChecked={task?.hidden}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </form>  )
}

export default TaskEditForm