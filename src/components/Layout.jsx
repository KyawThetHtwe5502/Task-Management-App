
import {  Navigate, Outlet } from 'react-router-dom';


const Layout = () => {
  
const accessToken = localStorage.getItem("google_access_token");
const expiresAt = localStorage.getItem("google_access_token_expires_at");

if (Date.now() > Number(expiresAt)) {
  localStorage.removeItem("google_access_token");
  localStorage.removeItem("google_access_token_expires_at")
  alert("accessToken expired, login again!");
  window.location.href = "/";
  
}

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    
      <main>
        <Outlet/>
      </main>
      
  );
};

export default Layout;