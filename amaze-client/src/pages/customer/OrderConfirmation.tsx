import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface OrderConfirmationProps {}

const OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState<"success" | "processing" | "failed">(
		"processing"
	);
	const { clearCart } = useCart();
	const [orderDetails, setOrderDetails] = useState<{
		payment_intent: string;
		payment_intent_client_secret: string;
	} | null>(null);

	useEffect(() => {
		const payment_intent = searchParams.get("payment_intent");
		const payment_intent_client_secret = searchParams.get(
			"payment_intent_client_secret"
		);
		const redirect_status = searchParams.get("redirect_status");

		if (!payment_intent || !payment_intent_client_secret) {
			navigate("/");
			return;
		}

		setOrderDetails({ payment_intent, payment_intent_client_secret });

		if (redirect_status === "succeeded") {
			setStatus("success");
			clearCart(); // Clear the cart after successful payment
		} else if (redirect_status === "failed") {
			setStatus("failed");
		}
	}, [searchParams, navigate, clearCart]);

	if (!orderDetails) {
		return null;
	}

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow">
				{status === "success" && (
					<>
						<div className="text-center">
							<CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
							<h2 className="mt-4 text-3xl font-extrabold text-gray-900">
								Thank you for your order!
							</h2>
							<p className="mt-2 text-gray-600">
								Your order has been successfully processed and
								confirmed.
							</p>
						</div>
						<div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
							<div>
								<h3 className="text-lg font-medium text-gray-900">
									Order Details
								</h3>
								<div className="mt-2 text-sm text-gray-600">
									<p>
										<span className="font-medium">
											Order ID:
										</span>{" "}
										{orderDetails.payment_intent}
									</p>
									<p>
										<span className="font-medium">
											Date:
										</span>{" "}
										{formatDate(new Date())}
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-medium text-gray-900">
									Delivery Information
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									You will receive an email with tracking
									details once your order ships.
								</p>
							</div>
						</div>
						<div className="mt-8 flex gap-4">
							<button
								onClick={() => navigate("/")}
								className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
							>
								Continue Shopping
							</button>
							<button
								onClick={() => navigate("/profile")}
								className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
							>
								View Orders
							</button>
						</div>
					</>
				)}

				{status === "failed" && (
					<>
						<div className="text-center">
							<XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
							<h2 className="mt-4 text-3xl font-extrabold text-gray-900">
								Payment Failed
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								We're sorry, but your payment could not be
								processed. Please try again or contact support
								if the issue persists.
							</p>
						</div>
						<div className="mt-8 flex gap-4">
							<button
								onClick={() => navigate("/checkout")}
								className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
							>
								Try Again
							</button>
							<button
								onClick={() => navigate("/contact")}
								className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
							>
								Contact Support
							</button>
						</div>
					</>
				)}

				{status === "processing" && (
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
						<h2 className="mt-4 text-3xl font-extrabold text-gray-900">
							Processing Order
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Please wait while we confirm your payment...
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderConfirmation;
