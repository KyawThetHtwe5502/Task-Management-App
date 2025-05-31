import React, {  useState } from 'react';
import { Menu, Search, Filter, MoveLeft, SquareArrowLeft, AlignLeft, PanelLeft, ArrowLeftSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/useTaskStore';

const Nav = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {setFilterValue,setSearchQuery} = useTaskStore();
  const [search,setSearch] = useState(false)
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  const handleSearchBtn = () => {
    setSearch(!search);
    setSearchQuery("")
  }
const logOut = () => {
  
  localStorage.removeItem("google_access_token");
  localStorage.removeItem("google_access_token_expires_at")
  navigate("/")
}
  return (
    <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-semibold ">
          Today 
        </h1>
        
        <div className="flex space-x-2">
          
          {search ? <input type="text" className="border border-gray-800 outline-none p-2 rounded-md" onKeyUp={handleSearch} /> : <div className='md:w-[200px]'></div>}

          <button onClick={handleSearchBtn} className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Search">
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
              
              <li  onClick={() => setFilterValue("needsAction")} className="block p-2 hover:bg-gray-100 rounded-md">needsAction</li>
              <li  onClick={() => setFilterValue("completed")}className="block p-2 hover:bg-gray-100 rounded-md">Completed</li>
                            <li onClick={logOut} className=" p-2 hover:bg-gray-100 rounded-md flex items-center justify-between">Logout <ArrowLeftSquare/></li>

            </ul>
          </nav>
        </div>
      )}
      
    </div>
  )
}

export default Nav