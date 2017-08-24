const passport = require('passport');

// Make Express "app" object available with an exported arrow function from this file
module.exports = app => {
  // When user enters /auth/google route, route handler kicks user into the OAuth flow the first time when visiting and then tells Express to involve Passport
  // Note: GoogleStrategy internally is known as string 'google'
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // User grants permission to access user's profile and email address
      scope: ['profile', 'email']
    })
  );

  // Route handler exchanges the "code" from Google URL into an actual profile instead of kicking user into OAuth flow.
  app.get('/auth/google/callback', passport.authenticate('google'));

  // Logout logic
  app.get('/api/logout', (req, res) => {
    // Passport automatically attaches functions to the "req" object to manipulate the user's authentication status such as "logout()",
    // which takes the cookie and kills the id that's in there
    req.logout();
    res.send(req.user);
  });

  // Add user model instance to req object as "req.user"
  app.get('/api/current_user', (req, res) => {
    // Passport automatically attaches the "user" property from the cookie data to the "req" object
    res.send(req.user);
  });
};
