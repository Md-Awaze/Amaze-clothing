import Stripe from "stripe";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
const createPaymentIntent = expressAsyncHandler(async (req, res) => {
	try {
		const { amount } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100, // Convert to cents
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.status(200).json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error);
		res.status(500).json({ message: "Error creating payment intent" });
	}
});

export { createPaymentIntent };
