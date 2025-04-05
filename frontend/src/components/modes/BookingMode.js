import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Flight as FlightIcon,
  ShoppingCart as CartIcon,
  Train as TrainIcon,
  LocalTaxi as TaxiIcon,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`booking-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const BookingMode = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const services = [
    {
      title: 'Book Flight',
      icon: <FlightIcon sx={{ fontSize: 40 }} />,
      description: 'Book domestic and international flights',
    },
    {
      title: 'Book Train',
      icon: <TrainIcon sx={{ fontSize: 40 }} />,
      description: 'Reserve train tickets for your journey',
    },
    {
      title: 'Book Taxi',
      icon: <TaxiIcon sx={{ fontSize: 40 }} />,
      description: 'Book a cab for local travel',
    },
    {
      title: 'Order Groceries',
      icon: <CartIcon sx={{ fontSize: 40 }} />,
      description: 'Order daily essentials and groceries',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Booking & Orders
      </Typography>

      <Paper sx={{ width: '100%', mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Travel" />
          <Tab label="Shopping" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {services.slice(0, 3).map((service, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {service.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 'auto', width: '100%' }}
                  >
                    Book Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {services[3].icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {services[3].title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {services[3].description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  startIcon={<CartIcon />}
                >
                  Start Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default BookingMode;
