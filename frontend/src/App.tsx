import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Schedules from './pages/Schedules'
import Appointments from './pages/Appointments'
import Doctors from './pages/Doctors'
import UserRecords from './pages/UserRecords'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reservation from './pages/Reservation'
import DoctorsPanel from './pages/DoctorsPanel'

import { Amplify } from 'aws-amplify'

Amplify.configure({
  // "aws_project_region": process.env.REACT_APP_AWS_PROJECT_REGION,
  // "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
  // "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
  // "aws_user_pools_web_client_id": process.env.REACT_APP_CLIENT_ID,
  // "oauth": {},
  Auth: {
    region: process.env.REACT_APP_AWS_PROJECT_REGION,           // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,         // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,   // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  }
});

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
    path: '/doctorspanel',
    element: <DoctorsPanel />
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