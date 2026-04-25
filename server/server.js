const express = require('express');
const cors = require('cors');
const servicesRouter = require('./routes/services');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', servicesRouter);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`FreelanceHub server running on port ${PORT}`);
});
