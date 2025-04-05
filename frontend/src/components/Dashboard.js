import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  LocalHospital as WellnessIcon,
  Flight as BookingIcon,
  Church as ReligiousIcon,
  Phone as EmergencyIcon,
  AccountBalance as WalletIcon,
  CalendarMonth as CalendarIcon,
  Notifications as NotificationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const modeCards = [
  {
    title: 'Religious Companion',
    description: 'Engage in spiritual discussions and learn about religious practices',
    icon: <ReligiousIcon sx={{ fontSize: 60 }} />,
    path: '/religious',
    color: '#4caf50',
    gradient: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
  },
  {
    title: 'Wellness Mode',
    description: 'Track your health, medications, and get exercise guidance',
    icon: <WellnessIcon sx={{ fontSize: 60 }} />,
    path: '/wellness',
    color: '#2196f3',
    gradient: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
  },
  {
    title: 'Booking & Orders',
    description: 'Easy travel booking and one-click ordering',
    icon: <BookingIcon sx={{ fontSize: 60 }} />,
    path: '/booking',
    color: '#ff9800',
    gradient: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
  },
  {
    title: 'My Wallet',
    description: 'Manage your funds and make secure payments',
    icon: <WalletIcon sx={{ fontSize: 60 }} />,
    path: '/wallet',
    color: '#9c27b0',
    gradient: 'linear-gradient(45deg, #9c27b0 30%, #ce93d8 90%)',
  },
  {
    title: 'Activity Planner',
    description: 'Plan your daily activities and set reminders',
    icon: <CalendarIcon sx={{ fontSize: 60 }} />,
    path: '/calendar',
    color: '#f44336',
    gradient: 'linear-gradient(45deg, #f44336 30%, #ef9a9a 90%)',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Mock data for upcoming activities
  const upcomingActivities = [
    { id: 1, title: 'Doctor Appointment', time: '10:00 AM', type: 'medical' },
    { id: 2, title: 'Take Medication', time: '12:30 PM', type: 'medication' },
    { id: 3, title: 'Evening Walk', time: '5:00 PM', type: 'exercise' },
  ];

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'medical':
        return <WellnessIcon color="error" />;
      case 'medication':
        return <WellnessIcon color="warning" />;
      case 'exercise':
        return <WellnessIcon color="info" />;
      default:
        return <TimeIcon color="primary" />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section with Gradient Background */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 4, 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(120deg, #2196f3 0%, #1976d2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Welcome, {user?.firstName || 'Friend'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                How can Sahayak assist you today?
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                onClick={() => navigate('/emergency')}
                sx={{ 
                  mt: 2, 
                  bgcolor: 'error.main', 
                  '&:hover': { bgcolor: 'error.dark' },
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                }}
                startIcon={<EmergencyIcon />}
              >
                Emergency Contact
              </Button>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src="https://img.icons8.com/color/240/000000/elderly-person.png" 
                  alt="Elderly Care"
                  style={{ maxWidth: '80%', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Decorative circles in background */}
        <Box sx={{ 
          position: 'absolute', 
          top: -50, 
          right: -50, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.1)' 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -30, 
          left: -30, 
          width: 150, 
          height: 150, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.1)' 
        }} />
      </Paper>

      <Grid container spacing={4}>
        {/* Main Features Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
            Services & Features
          </Typography>
          <Grid container spacing={3}>
            {modeCards.map((mode) => (
              <Grid item xs={12} sm={6} md={4} key={mode.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box 
                    sx={{
                      p: 3,
                      background: mode.gradient,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        bgcolor: 'white', 
                        color: mode.color,
                        margin: '0 auto',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      {mode.icon}
                    </Avatar>
                  </Box>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                      {mode.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {mode.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate(mode.path)}
                      sx={{
                        borderColor: mode.color,
                        color: mode.color,
                        '&:hover': {
                          borderColor: mode.color,
                          backgroundColor: `${mode.color}10`,
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'medium',
                      }}
                    >
                      Open
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={3}>
            {/* Today's Activities */}
            <Grid item>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="medium">
                    Today's Activities
                  </Typography>
                  <Chip 
                    icon={<CalendarIcon fontSize="small" />} 
                    label="View All" 
                    size="small" 
                    onClick={() => navigate('/calendar')}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {upcomingActivities.length > 0 ? (
                  upcomingActivities.map((activity) => (
                    <Box key={activity.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', mr: 2 }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{activity.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          <TimeIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                    No activities scheduled for today
                  </Typography>
                )}
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => navigate('/calendar')}
                  sx={{ mt: 2 }}
                >
                  Plan Your Day
                </Button>
              </Paper>
            </Grid>
            
            {/* Wallet Quick Access */}
            <Grid item>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #9c27b0 30%, #ce93d8 90%)',
                  color: 'white',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="medium">
                    My Wallet
                  </Typography>
                  <WalletIcon />
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  ₹2,500
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                  Available Balance
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => navigate('/wallet')}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                    color: 'white',
                    borderRadius: 2,
                  }}
                >
                  Manage Funds
                </Button>
              </Paper>
            </Grid>
            
            {/* Emergency Contact */}
            <Grid item>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  bgcolor: 'error.50',
                  border: '1px solid',
                  borderColor: 'error.100',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                    <EmergencyIcon />
                  </Avatar>
                  <Typography variant="h6" color="error.main" fontWeight="medium">
                    Emergency Help
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get immediate assistance in case of emergency
                </Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth
                  onClick={() => navigate('/emergency')}
                  startIcon={<EmergencyIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Emergency Contact
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
