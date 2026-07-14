export function openRazorpayCheckout({
  order,
  user,
  onSuccess,
}) {

  const options = {

    key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: order.amount,

    currency: order.currency,

    name: "ORIVEX",

    description: "Contract Payment",

    order_id: order.orderId,

    prefill: {

      name: user.name,

      email: user.email,

    },

    theme: {

      color: "#2563eb",

    },

    handler(response) {

      onSuccess(response);

    },

  };

  const razorpay = new window.Razorpay(options);

  razorpay.open();

}