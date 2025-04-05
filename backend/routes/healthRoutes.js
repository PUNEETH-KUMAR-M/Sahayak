const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

module.exports = router;
