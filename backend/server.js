require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Clerk authentication middleware
const requireAuth = ClerkExpressWithAuth({
  // If authentication fails, return a 401 Unauthorized response
  onError: (err, req, res) => {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  },
});

// Routes
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/religious', requireAuth, require('./routes/religiousRoutes'));
app.use('/api/wellness', requireAuth, require('./routes/wellnessRoutes'));
app.use('/api/booking', requireAuth, require('./routes/bookingRoutes'));
app.use('/api/emergency', requireAuth, require('./routes/emergencyRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
