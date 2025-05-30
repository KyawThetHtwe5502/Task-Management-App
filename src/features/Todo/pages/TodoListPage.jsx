import TodoList from '../components/TodoList'
import React, {  useState } from 'react';
import { Menu, Search, Filter } from 'lucide-react';
import {   useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';

const TodoListPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleCreateTask = () => {
    navigate("create")
  }
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-semibold flex items-center">
          Today <span className="ml-2">▼</span>
        </h1>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Filter">
            <Filter size={24} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Search">
            <Search size={24} />
          </button>
        </div>
      </div>
      
      {/* Side menu (hidden by default) */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-10 transform transition-transform">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md">All Tasks</a></li>
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md">Today</a></li>
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md">Upcoming</a></li>
              <li><a href="#" className="block p-2 hover:bg-gray-100 rounded-md">Completed</a></li>
            </ul>
          </nav>
        </div>
      )}
      
      <Header />
      
      <main className="flex-1 overflow-auto bg-gray-200">
        <div className='p-4'>
      
        <TodoList/>
    </div>
      </main>
      <button onClick={handleCreateTask} className='fixed bottom-0 h-11 bg-white flex justify-center items-center w-full border-t border-t-[#E5E7EB]'>
        New Task
      </button>
    </div>
      
    
  )
}

export default TodoListPage


