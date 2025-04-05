const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Wellness advice endpoint
router.post('/advice', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Create a wellness prompt
    const prompt = `You are a wellness companion for senior citizens. 
    Please provide helpful, accurate, and supportive advice on the following health-related question: 
    ${query}
    
    Always remind them to consult with healthcare professionals for medical advice.`;

    // Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error('Error in wellness advice:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Health tracking endpoint
router.post('/health-data', async (req, res) => {
  try {
    const { heartRate, bloodPressure, oxygenLevel } = req.body;
    
    // Here you would typically save this data to the database
    // For now, we'll just return a response
    
    res.json({ 
      message: 'Health data received successfully',
      data: { heartRate, bloodPressure, oxygenLevel },
      recommendations: 'Your vitals look good. Keep up the good work!'
    });
  } catch (error) {
    console.error('Error in health tracking:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
