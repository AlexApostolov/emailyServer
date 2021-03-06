// Initial application setup
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Model needs to be declared before passport tries to use it
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// MIDDLEWARES for preprocessing of incoming requests before send off to route handlers
// Tell Express it needs to parse body of any request, which it will then assign the contents to req.body property
app.use(bodyParser.json());
// Tell Express it needs to make use of cookies inside of application
app.use(
  cookieSession({
    // Cookie will expire in 30 days worth of milliseconds: 30 days of 24 hrs each, made of 60 min each, made of 60 sec each, made of 1000 ms
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Cookie will be encrypted automatically by default. Multiple keys are supported through array allowing for random key choice to bolster security
    keys: [keys.cookieKey]
  })
);

// Tell Passport to make use of cookie authentication
app.use(passport.initialize());
app.use(passport.session());

// FIRST TRY
// authRoutes... is a function that's immediately called with your app object and attaches the routes to it.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Ensure Express behaves correctly when run in the production environment
if (process.env.NODE_ENV === 'production') {
  // SECOND TRY
  // Express will serve up production assets like main.js and main.css
  // If Express does not recognize the specific file, look to the client side location
  app.use(express.static('client/build'));
  //THIRD TRY
  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
