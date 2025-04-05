const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Religious companion endpoint
router.post('/ask', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Create a religious companion prompt
    const prompt = `You are a religious companion for senior citizens. 
    Please provide a thoughtful, respectful response to the following question about religious practices, stories, or teachings: 
    ${query}`;

    // Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error('Error in religious companion:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
