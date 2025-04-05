import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ContactPhone as ContactIcon,
} from '@mui/icons-material';

const EmergencyContact = () => {
  const emergencyContacts = [
    {
      name: 'Dr. Smith (Family Doctor)',
      phone: '+1 (555) 123-4567',
      type: 'Medical',
      icon: <HospitalIcon color="error" />,
    },
    {
      name: 'John (Son)',
      phone: '+1 (555) 234-5678',
      type: 'Family',
      icon: <ContactIcon color="primary" />,
    },
    {
      name: 'Local Ambulance',
      phone: '102',
      type: 'Emergency',
      icon: <HospitalIcon color="error" />,
    },
  ];

  const handleEmergencyCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // TODO: Implement location sharing with emergency contacts
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: '#ffebee',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" color="error" align="center">
          Emergency Contact
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<PhoneIcon />}
                onClick={() => handleEmergencyCall('102')}
                sx={{ flex: 1, py: 2 }}
              >
                Call Ambulance
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LocationIcon />}
                onClick={handleShareLocation}
                sx={{ flex: 1, py: 2 }}
              >
                Share Location
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Emergency Contacts
            </Typography>
            <List>
              {emergencyContacts.map((contact, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 2,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <ListItemIcon>{contact.icon}</ListItemIcon>
                  <ListItemText
                    primary={contact.name}
                    secondary={`${contact.type} - ${contact.phone}`}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PhoneIcon />}
                    onClick={() => handleEmergencyCall(contact.phone)}
                  >
                    Call
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmergencyContact;
