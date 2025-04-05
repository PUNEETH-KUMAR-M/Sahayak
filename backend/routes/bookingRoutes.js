const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Travel booking endpoint
router.post('/travel', async (req, res) => {
  try {
    const { destination, date, travelType } = req.body;
    
    if (!destination || !date || !travelType) {
      return res.status(400).json({ message: 'Destination, date, and travel type are required' });
    }

    // In a real application, this would connect to a booking API
    // For now, we'll use Gemini to generate a response
    
    const prompt = `You are a travel booking assistant for senior citizens.
    Please provide a helpful response for a ${travelType} booking to ${destination} on ${date}.
    Include information about what the user should expect next in the booking process.`;

    // Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ 
      message: 'Booking request received',
      bookingDetails: { destination, date, travelType },
      response,
      bookingId: 'BK' + Math.floor(Math.random() * 10000)
    });
  } catch (error) {
    console.error('Error in travel booking:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Shopping order endpoint
router.post('/order', async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;
    
    if (!items || !items.length || !deliveryAddress) {
      return res.status(400).json({ message: 'Items and delivery address are required' });
    }

    // In a real application, this would connect to an ordering API
    // For now, we'll just return a confirmation
    
    res.json({ 
      message: 'Order placed successfully',
      orderDetails: { 
        items, 
        deliveryAddress,
        estimatedDelivery: '2-3 business days',
        orderNumber: 'ORD' + Math.floor(Math.random() * 10000)
      }
    });
  } catch (error) {
    console.error('Error in order placement:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
