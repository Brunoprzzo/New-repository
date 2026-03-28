const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Serve static assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Membership signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, email, phone, plan } = req.body;

  if (!name || !email || !phone || !plan) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, phone, and plan.'
    });
  }

  console.log('New membership signup:', {
    name,
    email,
    phone,
    plan,
    submittedAt: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    message: 'Membership request received successfully!'
  });
});

app.listen(PORT, () => {
  console.log(`Gym website running at http://localhost:${PORT}`);
});
