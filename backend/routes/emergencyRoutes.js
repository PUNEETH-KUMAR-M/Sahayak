const express = require('express');
const router = express.Router();

// Emergency contact endpoint
router.post('/contact', async (req, res) => {
  try {
    const { contactType, message, location } = req.body;
    
    if (!contactType) {
      return res.status(400).json({ message: 'Contact type is required' });
    }

    // In a real application, this would trigger notifications to emergency contacts
    // For now, we'll just return a confirmation
    
    res.json({ 
      message: 'Emergency contact notified',
      details: { 
        contactType, 
        message: message || 'Emergency assistance needed',
        location: location || 'Location not provided',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in emergency contact:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Location sharing endpoint
router.post('/share-location', async (req, res) => {
  try {
    const { latitude, longitude, contacts } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location coordinates are required' });
    }

    // In a real application, this would send the location to specified contacts
    // For now, we'll just return a confirmation
    
    res.json({ 
      message: 'Location shared successfully',
      locationDetails: { 
        coordinates: { latitude, longitude },
        sharedWith: contacts || 'All emergency contacts',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in location sharing:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
