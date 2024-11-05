// Import necessary packages
const express = require('express');
const connectDB = require('./config/mydb');   // Import the connectDB function
const routes = require('./routes/routes');

// Initialize Express app
const app = express();

// Middleware
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
});
