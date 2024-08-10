import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import UploadPage from './components/UploadPage'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import VideoPage from './components/VideoPage'
import './App.css'
const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<><Navbar/><HomePage/></>
    },
    {
      path:'/upload',
      element:<><Navbar/><UploadPage/></>
    },
    {
      path:'/video/:id',
      element:<><Navbar/><VideoPage/></>
    },
  ])
  return (
    <div>
     <RouterProvider router={router}/>
    </div>
  )
}

export default App
