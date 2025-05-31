import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <h1 className='text-3xl font-bold'>404 Not Found Page <span onClick={() => navigate("/todo")} className=' text-blue-500 underline'>back</span> </h1>

       </div>
  )
}

export default NotFoundPage