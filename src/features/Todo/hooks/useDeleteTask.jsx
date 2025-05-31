import React from 'react'

const useDeleteTask = () => {
              const accessToken = localStorage.getItem("google_access_token");

    const deleteTask = async (id) => {
        const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/@default/tasks/${id}`,{
            method: "DELETE",
            headers: {
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json",
        }
        });
        console.log(res,"res")
    }
  return (
    {
        deleteTask
    }
  )
}

export default useDeleteTask