import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'flowbite';

const clientId = "669320546967-oki9a76uh05294if4f6h5u4ri0o8snrm.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId} >

  <RouterProvider router={router} />
  </GoogleOAuthProvider>

)
