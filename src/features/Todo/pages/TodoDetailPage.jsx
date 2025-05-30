import React from 'react'
import Header from '../../../components/Header'

const TodoDetailPage = () => {
  return (
    <div>
      <Header/>
      <div className='p-4'>
        
      <h1 className='py-2'>Design for home page</h1>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" >
            <div> 
              <span>Starts</span>
              <div>
                <button type="button" className=" bg-[#BFDBFE] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-md  px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
               <button type="button" className=" bg-[#BFDBFE] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-md  px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
                <input type='date' />
              </div>


            </div>
            <div></div>
            <div></div>
          </div>
      </div>
    </div>
  )
}

export default TodoDetailPage