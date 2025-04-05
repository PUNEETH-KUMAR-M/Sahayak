import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Favorite as HeartIcon,
  DirectionsRun as ExerciseIcon,
  LocalHospital as MedicineIcon,
} from '@mui/icons-material';

const WellnessMode = () => {
  const [healthData, setHealthData] = useState({
    heartRate: '72',
    bloodPressure: '120/80',
    oxygenLevel: '98',
  });

  const activities = [
    {
      title: 'Morning Yoga',
      time: '7:00 AM',
      description: 'Gentle stretching and breathing exercises',
      icon: <ExerciseIcon />,
    },
    {
      title: 'Medicine Reminder',
      time: '9:00 AM',
      description: 'Blood pressure medication',
      icon: <MedicineIcon />,
    },
    {
      title: 'Evening Walk',
      time: '5:00 PM',
      description: '20 minutes of light walking',
      icon: <ExerciseIcon />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Wellness Mode
      </Typography>

      <Grid container spacing={4}>
        {/* Health Metrics */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Health Metrics
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HeartIcon color="error" sx={{ mr: 1 }} />
              <Typography>Heart Rate: {healthData.heartRate} BPM</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MedicineIcon color="primary" sx={{ mr: 1 }} />
              <Typography>Blood Pressure: {healthData.bloodPressure}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ExerciseIcon color="success" sx={{ mr: 1 }} />
              <Typography>Oxygen Level: {healthData.oxygenLevel}%</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Daily Activities */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Today's Activities
          </Typography>
          <Grid container spacing={2}>
            {activities.map((activity, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {activity.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {activity.title}
                      </Typography>
                    </Box>
                    <Typography color="textSecondary" gutterBottom>
                      {activity.time}
                    </Typography>
                    <Typography variant="body2">{activity.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary">
              Talk to Health Assistant
            </Button>
            <Button variant="outlined" color="primary">
              View Health History
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WellnessMode;
