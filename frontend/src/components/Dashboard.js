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
} from '@mui/material';
import {
  LocalHospital as WellnessIcon,
  Flight as BookingIcon,
  Church as ReligiousIcon,
  Emergency as EmergencyIcon,
} from '@mui/icons-material';

const modeCards = [
  {
    title: 'Religious Companion',
    description: 'Engage in spiritual discussions and learn about religious practices',
    icon: <ReligiousIcon sx={{ fontSize: 60 }} />,
    path: '/religious',
    color: '#4caf50',
  },
  {
    title: 'Wellness Mode',
    description: 'Track your health, medications, and get exercise guidance',
    icon: <WellnessIcon sx={{ fontSize: 60 }} />,
    path: '/wellness',
    color: '#2196f3',
  },
  {
    title: 'Booking & Orders',
    description: 'Easy travel booking and one-click ordering',
    icon: <BookingIcon sx={{ fontSize: 60 }} />,
    path: '/booking',
    color: '#ff9800',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome, {user?.firstName || 'Friend'}!
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          How can I assist you today?
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {modeCards.map((mode) => (
          <Grid item xs={12} md={4} key={mode.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: mode.color,
                  }}
                >
                  {mode.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {mode.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {mode.description}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(mode.path)}
                  sx={{
                    mt: 'auto',
                    backgroundColor: mode.color,
                    '&:hover': {
                      backgroundColor: mode.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Enter Mode
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<EmergencyIcon />}
          onClick={() => navigate('/emergency')}
          sx={{
            py: 2,
            px: 4,
            fontSize: '1.2rem',
          }}
        >
          Emergency Contact
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
