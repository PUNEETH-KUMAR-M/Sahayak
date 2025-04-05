import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Event as EventIcon,
  MedicalServices as MedicalIcon,
  Restaurant as MealIcon,
  DirectionsWalk as ExerciseIcon,
  Medication as MedicationIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Today as TodayIcon,
} from '@mui/icons-material';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('appointment');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      title: 'Doctor Appointment',
      type: 'medical',
      time: '10:00',
      description: 'Regular checkup with Dr. Smith'
    },
    {
      id: 2,
      date: new Date().toISOString().split('T')[0],
      title: 'Morning Walk',
      type: 'exercise',
      time: '07:00',
      description: '30 minutes walk in the park'
    },
    {
      id: 3,
      date: new Date().toISOString().split('T')[0],
      title: 'Take Medication',
      type: 'medication',
      time: '09:00',
      description: 'Blood pressure medicine'
    }
  ]);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  // Open event dialog
  const handleOpenEventDialog = () => {
    setOpenEventDialog(true);
  };

  // Close event dialog
  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
    setEventTitle('');
    setEventType('appointment');
    setEventTime('');
    setEventDescription('');
  };

  // Add new event
  const handleAddEvent = () => {
    if (!eventTitle || !eventTime) return;

    const newEvent = {
      id: Date.now(),
      date: selectedDate.toISOString().split('T')[0],
      title: eventTitle,
      type: eventType,
      time: eventTime,
      description: eventDescription
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    handleCloseEventDialog();
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    return events.filter(event => event.date === selectedDate.toISOString().split('T')[0])
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Get event count for a specific date
  const getEventCountForDate = (date) => {
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toISOString().split('T')[0];
    return events.filter(event => event.date === dateString).length;
  };

  // Render calendar grid
  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ p: 2 }}></Box>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const eventCount = getEventCountForDate(day);
      
      days.push(
        <Box 
          key={day} 
          onClick={() => handleDateSelect(day)}
          sx={{
            p: 2,
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: 1,
            position: 'relative',
            backgroundColor: isSelected ? 'primary.light' : isToday ? 'primary.50' : 'transparent',
            color: isSelected ? 'white' : 'inherit',
            border: isToday && !isSelected ? '1px solid' : 'none',
            borderColor: 'primary.main',
            '&:hover': {
              backgroundColor: isSelected ? 'primary.light' : 'action.hover',
            }
          }}
        >
          <Typography variant="body1">{day}</Typography>
          {eventCount > 0 && (
            <Chip 
              label={eventCount} 
              color="primary" 
              size="small" 
              sx={{ 
                position: 'absolute', 
                top: 2, 
                right: 2, 
                height: 20, 
                minWidth: 20, 
                fontSize: '0.7rem' 
              }} 
            />
          )}
        </Box>
      );
    }
    
    return days;
  };

  // Get icon for event type
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'medical':
        return <MedicalIcon />;
      case 'meal':
        return <MealIcon />;
      case 'exercise':
        return <ExerciseIcon />;
      case 'medication':
        return <MedicationIcon />;
      default:
        return <EventIcon />;
    }
  };

  // Get color for event type
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'medical':
        return 'error';
      case 'meal':
        return 'success';
      case 'exercise':
        return 'info';
      case 'medication':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Activity Planner
      </Typography>

      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            {/* Calendar Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <IconButton onClick={handlePrevMonth} color="primary">
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h5">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Typography>
              <IconButton onClick={handleNextMonth} color="primary">
                <ChevronRightIcon />
              </IconButton>
            </Box>

            {/* Calendar Days Header */}
            <Grid container columns={7} sx={{ mb: 1 }}>
              {dayNames.map(day => (
                <Grid item xs={1} key={day}>
                  <Typography variant="subtitle2" align="center" fontWeight="bold">
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Grid */}
            <Grid container columns={7}>
              {renderCalendarGrid()}
            </Grid>
          </Paper>
        </Grid>

        {/* Selected Day Events */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TodayIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenEventDialog}
              >
                Add
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Events List */}
            <List>
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map(event => (
                  <ListItem
                    key={event.id}
                    sx={{
                      mb: 1,
                      backgroundColor: 'background.paper',
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${getEventTypeColor(event.type)}.main` }}>
                        {getEventTypeIcon(event.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {event.time}
                          </Typography>
                          {event.description && (
                            <Typography variant="body2" color="text.secondary" display="block">
                              {event.description}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No activities planned for this day
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleOpenEventDialog}
                    sx={{ mt: 2 }}
                  >
                    Add Activity
                  </Button>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={openEventDialog} onClose={handleCloseEventDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Activity Title"
              fullWidth
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={eventType}
                label="Activity Type"
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="appointment">Appointment</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
                <MenuItem value="medication">Medication</MenuItem>
                <MenuItem value="exercise">Exercise</MenuItem>
                <MenuItem value="meal">Meal</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Description (Optional)"
              fullWidth
              multiline
              rows={3}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog}>Cancel</Button>
          <Button
            onClick={handleAddEvent}
            variant="contained"
            color="primary"
            disabled={!eventTitle || !eventTime}
          >
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Calendar;
