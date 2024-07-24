// This is your test secret API key.
const stripe = Stripe("pk_test_51PUp9OA3lETSLMLLhWwwmjSoZDgzyvMN6OLd4FJ0Qp4F73HOMjl1AEoO5bEA1xJXTtrMoiLfuekB8WYUDP1f8FTI00OOXyOZh1");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}