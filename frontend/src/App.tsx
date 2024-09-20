import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Schedules from './pages/Schedules'
import Appointments from './pages/Appointments'
import Doctors from './pages/Doctors'
import UserRecords from './pages/UserRecords'

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/schedules',
    element: <Schedules />,
  },
  {
    path: '/appointments',
    element: <Appointments />,
  },
  {
    path: '/doctors',
    element: <Doctors />,
  },
  {
    path: '/records',
    element: <UserRecords />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;