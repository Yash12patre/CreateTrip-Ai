import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './Createtrip/CreateTrip.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from "@/view-trip/[tripId]/index.jsx" 
import MyTrips from './my-trips/MyTrips.jsx'

const router =createBrowserRouter([

  {
    path:"/",
    element:<App/>
  },
  {
    path:"/createtrip", 
    element :<CreateTrip/>
  },
  { 
      path: '/view-trip/:tripId',
      element: <Viewtrip />,

  },
  { 
      path: '/my-trips',
      element: <MyTrips />,

  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router ={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
