import React from 'react'
import { useForm } from 'react-hook-form';

const useCreateTask = () => {
          const accessToken = localStorage.getItem("google_access_token");
const {
    register,
    handleSubmit,
    formState: { errors },setValue} = useForm();
           

const getStatus = (status) => {
    switch (status) {
      case true:
      return 'completed';
      default:
        return 'needsActions';
    }
  };
      const addToTask = async (formData ) => {
        console.log(formData,"formdata")

  try {
    const response = await fetch(
      "https://tasks.googleapis.com/tasks/v1/lists/@default/tasks",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // ✅ fixed template literal
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          notes:   formData.notes,
          status: getStatus(formData.status),
          hidden: formData.hidden,
          due: formData.due,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to add task");
    }

    const data = await response.json();
    console.log("✅ Task Created:", data);
    return data; // optionally return for further handling
  } catch (error) {
    console.error("❌ Error adding task:", error.message);
  }
};

  return (
    {
        register,
        handleSubmit,
        errors,
        setValue,
        addToTask
    }
  )
}

export default useCreateTask