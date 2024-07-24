// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51PUp9OA3lETSLMLLquBQYYevSwU3IEC5yWTSx4grBOc1h8hvRaOCYUe1OZH1oXhuW5nkcxKKcP5S1x6ZkTCG6rcm00Li2ndmjJ');

const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'http://localhost:4242/success.html',
  cancel_url: 'http://localhost:4242/cancel.html',
});