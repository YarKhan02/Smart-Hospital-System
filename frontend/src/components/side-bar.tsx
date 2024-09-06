import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Divider, Drawer, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for toggle button
import CloseIcon from '@mui/icons-material/Close'; // Icon to close the sidebar

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        sx={{ position: 'absolute', top: 10, left: 10}}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        // variant="persistent"
        open={open}
        onClose={toggleSidebar}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#06e602', // Default background color
            color: '#000', // Default text color
            borderRight: '1px solid rgba(0, 0, 0, 0.12)', // Default border
            position: 'relative',
          },
        }}
      >
        <div>
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={toggleSidebar}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <List sx={{ marginTop: '50px' }}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/schedules">
                <ListItemText primary="Schedules" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/appointments">
                <ListItemText primary="Appointments" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/available-doctors">
                <ListItemText primary="Available Doctors" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/patient-query">
                <ListItemText primary="Patient Query" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;