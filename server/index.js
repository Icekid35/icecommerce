// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
  "sk_test_51MiesiJNZ87LbpJTXNi5C52tSe0Zt1jluPEWg71m2LMhuFrHvuPGJeopVoJtdT35TKpnGYzjuMwfjgz0WOIH1fv900LogCHOIx"
);
const express = require("express");
const fake = require("./asset/fake.json");
const app = express();

const coupons=require('./asset/coupons.json')
app.use(express.static("public"));
app.use(express.json());

app.post('/get-products', (req, res) => {
  res.status(200).json(fake)
})

app.post('/verify-coupon', (req, res) => {
  try {
    const {coupon} = req.body
  console.log(coupon)
    const result = coupons.find(({ code }) => code == coupon)
    console.log(result)
  if (!result) return res.json({ error: 'coupon not available', off: 0 })
  res.json({off:result.off})
} catch (err) {
  res.status(500)
}
})

app.post("/create-checkout-session", async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:3000';
  const cart = req.body.cart.map(({ id,quantity,sizes,colors }) => {
    return {...fake.find((item) => item.id == id),quantity,sizes,colors};
  });
  // console.log(cart);
  const params = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: cart.map((item) => {
      const { images, price, quantity, title,colors,sizes,description } = item;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
            images,
        description,
            metadata: {
              colors: colors.join(', '),
            sizes:sizes.join(', ')
           }
          },
          unit_amount: price * 100,

        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,

        },
        quantity: quantity||1,

      
      };
    }),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/thank-you`,
    cancel_url: `${YOUR_DOMAIN}/error`,
  };
  try {
    
    const session = await stripe.checkout.sessions.create(params);
    res.json(200, { ...session });
  } catch (e) {
    console.log(e)
    res.status(500).json({message:'unexpected error occured'});

  }

});

app.listen(3001, () => console.log("Running on port 3001"));
