import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NGMruKGu6dF8xkrBUoaCa1RPmAqa4hDCftArKzusCu5kcphBNi9M14tOZN7UNkCxWfHfPoXfEvqV4DJriGJcpiX00KhTiHzt5"
);

const Checkout = () => {

  const user = useSelector((state) => state.auth.token);
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const item = {
    price: "price_1NGY2eKGu6dF8xkrK8hfn5Sa",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success?success=true`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout(checkoutOptions);
      if (error) {
        console.log("Stripe checkout error: " + error.message);
        setStripeError(error.message);
      }
    } catch (error) {
      console.log("Error redirecting to Stripe checkout: " + error.message);
      setStripeError(error.message);
    }
  
    setIsLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div>
      <button
        className="checkout-button"
        type="button"
        class="btn btn-primary"
        style={{ borderRadius: "10px" }}
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Continue to checkout"}
      </button>
    </div>
  );
};

export default Checkout;
