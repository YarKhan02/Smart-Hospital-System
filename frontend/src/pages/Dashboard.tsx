import React from 'react';
import { Container, Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../components/side-bar';
import Topbar from '../components/top-bar';
// import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
          <Topbar />
          <div className="main-content">
            <Sidebar />
            <div className="content-area">
              {/* Add content here */}
            </div>
          </div>
        </div>
      );
};

export default Dashboard;