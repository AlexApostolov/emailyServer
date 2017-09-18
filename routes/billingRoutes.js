const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // POST requests made to the api/stripe route
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Handle token, reach out to Stripe API, and finalize actual charge
    const charge = await stripe.charges.create({
      amount: 500, // 500 cents specified on backend too, frontend price was just authorization
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id // CC identifier parsed from body
    });
    // Update user's number of credits using Passport's session which populates req.user with the current user automatically
    req.user.credits += 5;
    // save() is async and when complete it returns the updated user model, then collect a copy to ensure you're working with the most up to date user model
    const user = await req.user.save();
    res.send(user);
  });
};
