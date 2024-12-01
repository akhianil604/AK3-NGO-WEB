// Import necessary packages
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mydb');   // Import the connectDB function
const routes = require('./routes/routes');
// const { generateToken } = require('./auth');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // URL of your frontend (React, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If you need to send cookies or authentication headers
  }));
app.use(express.json());

// Connect to MongoDB
connectDB();   // Establish MongoDB connection

// Route setup
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(generateToken({id:"teest", role:"user"}))
});
