// Wrap Stripe checkout and pass it configs
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      /* amount is by default in USD and in cents, add a name and description to the Stripe generated form */
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        /* "onToken" would've been a better name here, because token is actually a callback after retrieving a Stripe API token */
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* Instead of default Stripe button, use your own */}
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
