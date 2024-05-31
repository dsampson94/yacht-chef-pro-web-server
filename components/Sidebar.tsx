'use client';

import React from 'react';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Box
            sx={{
                width: isOpen ? 200 : '60px',
                transition: 'width 0.3s',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRight: 1,
                borderColor: 'divider'
            }}
        >
            <Toolbar>
                <IconButton onClick={toggleSidebar} edge="start" color="inherit" aria-label="toggle sidebar">
                    {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
            <List>
                <ListItem component="button" onClick={() => handleNavigation('/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Dashboard" />}
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/orders')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Orders" />}
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/menus')}>
                    <ListItemIcon>
                        <RestaurantMenuIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Menus" />}
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/reviews')}>
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Reviews" />}
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/profile')}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Profile" />}
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/location')}>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Locations" />}
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
