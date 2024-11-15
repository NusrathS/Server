const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse incoming JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Mock database for user validation (for demonstration purposes)
const users = [
  { userCode: 'TEST123', password: 'TEST456' },
];

// Login route to validate credentials
app.post('/login', (req, res) => {
  const { userCode, password } = req.body;

  // Find the user in the mock database
  const user = users.find((user) => user.userCode === userCode && user.password === password);

  if (user) {
    // If user found and credentials match, send status 200 (OK)
    return res.status(200).json({ message: 'Login successful' });
  } else {
    // If credentials don't match, send status 400 (Bad Request)
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Default error handler for other unhandled routes or server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
