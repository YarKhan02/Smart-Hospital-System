import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { FaHospital } from 'react-icons/fa';
import './App.css';

import Home from './pages/Home'
import Reception from './pages/Reception'
import Schedules from './pages/Schedules'
import Appointments from './pages/Appointments'
import Doctors from './pages/Doctors'
import UserRecords from './pages/UserRecords'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reservation from './pages/Reservation'
import DoctorsPanel from './pages/DoctorsPanel'
import PatientPanel from './pages/PatientPanel'

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Reception />,
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
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/reservation',
    element: <Reservation />
  },
  {
    path: '/doctors-panel',
    element: <DoctorsPanel />
  },
  {
    path: '/patient-panel',
    element: <PatientPanel />
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