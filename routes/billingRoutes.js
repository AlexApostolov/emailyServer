const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  // POST requests made to the api/stripe route
  app.post('/api/stripe', async (req, res) => {
    // Handle token, reach out to Stripe API, and finalize actual charge
    const charge = await stripe.charges.create({
      amount: 500, // 500 cents specified on backend too, frontend price was just authorization
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id // CC identifier parsed from body
    });
    console.log(charge);
    // Update user's number of credits
  });
};
