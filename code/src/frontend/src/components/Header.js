import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WindowIcon from '@mui/icons-material/Window';
import '../App.css';

const Header = ({ onMenuClick, iconColor }) => {
    return (
        <AppBar position="static" className="header" sx={{ background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)', boxShadow: 3 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onMenuClick}>
                    <WindowIcon style={{ color: iconColor }} />
                </IconButton>
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h4" component="div" className="header-title" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px 0', color: '#fff' }}>
                        Integrated Platform Environment
                    </Typography>
                    <Typography variant="subtitle1" component="div" className="header-caption" sx={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'italic', padding: '5px 0', color: '#e0f7fa' }}>
                        Your one-stop solution for managing and monitoring your platform
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;