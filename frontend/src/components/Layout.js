import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  Church as ReligiousIcon,
  LocalHospital as WellnessIcon,
  Flight as BookingIcon,
  Phone as EmergencyIcon,
  Logout as LogoutIcon,
  AccountBalance as WalletIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Religious Companion', icon: <ReligiousIcon />, path: '/religious' },
    { text: 'Wellness', icon: <WellnessIcon />, path: '/wellness' },
    { text: 'Booking & Orders', icon: <BookingIcon />, path: '/booking' },
    { text: 'My Wallet', icon: <WalletIcon />, path: '/wallet' },
    { text: 'Activity Planner', icon: <CalendarIcon />, path: '/calendar' },
    { text: 'Emergency', icon: <EmergencyIcon />, path: '/emergency' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sahayak
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Sahayak</Typography>
            <Typography variant="body2" color="text.secondary">
              Hello, {user?.firstName || 'User'}
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                onClick={() => handleNavigation(item.path)}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleSignOut} sx={{ py: 1.5 }}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Sahayak - AI Companion for Senior Citizens
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
