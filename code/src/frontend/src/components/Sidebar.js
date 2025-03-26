import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // Import your CSS file

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#072557',
    color: '#ffffff',
  },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#a1c4fd', // Lighter color
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  color: 'black'
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white'
}));

const Sidebar = () => {
  const location = useLocation();

  return (
    <DrawerStyled variant="permanent">
      <List>
        <ListItemStyled button component={Link} to="/" className={location.pathname === '/' ? 'selected' : ''}>
          <ListItemIconStyled><DashboardIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Dashboard" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/monitoring" className={location.pathname === '/monitoring' ? 'selected' : ''}>
          <ListItemIconStyled><MonitorIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Monitoring" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/incident" className={location.pathname === '/incident' ? 'selected' : ''}>
          <ListItemIconStyled><ReportIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Incident Management" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/config-management" className={location.pathname === '/config-management' ? 'selected' : ''}>
          <ListItemIconStyled><SettingsIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Config Management" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/reporting" className={location.pathname === '/reporting' ? 'selected' : ''}>
          <ListItemIconStyled><ReportIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Reporting" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/automation" className={location.pathname === '/automation' ? 'selected' : ''}>
          <ListItemIconStyled><BuildIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Automation" />
        </ListItemStyled>
      </List>
    </DrawerStyled>
  );
};

export default Sidebar;