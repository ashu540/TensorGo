const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/saas_billing');
const User = mongoose.model('User', { googleId: String, displayName: String });

// Passport setup
passport.use(new GoogleStrategy({
    clientID: '632285865108-s6uv3qj89iv12b8l8rbis51aq7uo1483.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3001/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOneAndUpdate({ googleId: profile.id }, { displayName: profile.displayName }, { upsert: true, new: true }, (err, user) => {
      return done(err, user);
    });
  }
));

app.use(passport.initialize());

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, 'your_secret_key'); // Change 'your_secret_key' to a secure secret
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

// Usage details
app.get('/api/usage-details', (req, res) => {
  // Implement logic to fetch and return usage details
  res.json({ usage: 'sample usage data' });
});

// Billing information
app.get('/api/billing-information', (req, res) => {
  // Implement logic to calculate billing information
  res.json({ billing: 'sample billing data' });
});

// Invoice generation
app.post('/api/generate-invoice', (req, res) => {
  // Implement logic to generate an invoice
  res.json({ invoice: 'sample invoice data' });
});

// Listen on port 3001
app.listen(3001, () => {
  console.log('Backend server is running on http://localhost:3001');
});
