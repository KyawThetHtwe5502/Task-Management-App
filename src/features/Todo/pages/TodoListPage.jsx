import TodoList from '../components/TodoList'
import {   useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Nav from '../../../components/Nav';

const TodoListPage = () => {
    const navigate = useNavigate();

 const handleCreateTask = () => {
    navigate("create")
  }
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Nav/>
      <Header />
      
      <main className="flex-1 overflow-auto bg-gray-200">
        <div className='p-4'>
      
        <TodoList/>
    </div>
      </main>
      <button onClick={handleCreateTask} className='fixed bottom-0 h-11 bg-white text-[#0A56BB] hover:bg-[#0A56BB] hover:text-white duration-100 transition-all flex justify-center items-center w-full border-t border-t-[#E5E7EB]'>
        New Task
      </button>
    </div>
      
    
  )
}

export default TodoListPage


