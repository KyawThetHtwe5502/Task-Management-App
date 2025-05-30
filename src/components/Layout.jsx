
import {  Navigate, Outlet } from 'react-router-dom';


const Layout = () => {
  

  if (!localStorage.getItem("google_access_token")) {
    return <Navigate to="/" />;
  }
  return (
    
      <main className="">
        <Outlet/>
      </main>
      
  );
};

export default Layout;