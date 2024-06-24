// import { useState } from 'react'
import './App.css'
import Auth from './pages/Auth';
import Home from './pages/Home';
import Trains from './pages/Trains';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/trains",
    element: <Trains />,
  }
]);
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
