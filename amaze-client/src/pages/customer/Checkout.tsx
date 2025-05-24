import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { validateCart, createPaymentIntent } from "../../services/api";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { appearance } from "./stripeAppearance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

const PaymentForm: React.FC<{
	formData: FormData;
	total: number;
}> = ({ formData, total }) => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		try {
			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/order-confirmation`,
					payment_method_data: {
						billing_details: {
							name: `${formData.firstName} ${formData.lastName}`,
							email: formData.email,
							address: {
								line1: formData.address,
								city: formData.city,
								state: formData.state,
								postal_code: formData.zipCode,
								country: formData.country,
							},
						},
					},
				},
			});

			if (error) {
				setError(error.message || "Payment failed");
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div className="bg-white rounded-lg shadow-sm border border-gray-100">
				<div className="p-6">
					<PaymentElement
						options={{
							layout: {
								type: "tabs",
								defaultCollapsed: false,
							},
						}}
					/>
				</div>
			</div>

			{error && (
				<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
					{error}
				</div>
			)}

			<button
				type="submit"
				disabled={!stripe || isProcessing}
				className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium shadow-sm"
			>
				{isProcessing ? (
					<span className="flex items-center justify-center">
						<svg
							className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Processing...
					</span>
				) : (
					`Pay ${new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(total)}`
				)}
			</button>
		</form>
	);
};

const Checkout: React.FC = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [validationError, setValidationError] = useState<string | null>(null);
	const [clientSecret, setClientSecret] = useState<string>("");
	const { cartItems } = useCart();
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
	});

	const subtotal = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const shipping = 10;
	const tax = subtotal * 0.1;
	const total = subtotal + shipping + tax;

	useEffect(() => {
		const validateCartItems = async () => {
			try {
				const result = await validateCart(cartItems);
				if (!result.isValid) {
					setValidationError(
						result.errors?.join("\n") ||
							result.message ||
							"Cart validation failed"
					);
					navigate("/cart");
				}
			} catch (error) {
				setValidationError("Failed to validate cart");
				navigate("/cart");
			}
		};

		validateCartItems();
	}, [cartItems, navigate]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (step === 1) {
			try {
				const result = await validateCart(cartItems);
				if (!result.isValid) {
					setValidationError(
						result.errors?.join("\n") ||
							result.message ||
							"Cart validation failed"
					);
					navigate("/cart");
					return;
				}

				const { clientSecret: secret } = await createPaymentIntent(
					total
				);
				setClientSecret(secret);
				setStep(2);
			} catch (error) {
				setValidationError("Failed to initialize payment");
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="space-y-8">
					{validationError && (
						<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
							{validationError}
						</div>
					)}

					{/* Progress Steps */}
					<nav aria-label="Progress" className="mb-8">
						<ol className="flex items-center justify-center">
							<li className="relative">
								<div
									className={`flex items-center ${
										step === 1
											? "text-primary-600"
											: "text-gray-500"
									}`}
								>
									<span
										className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${
											step === 1
												? "border-primary-600 bg-primary-600 text-white"
												: "border-gray-300 bg-white"
										}`}
									>
										1
									</span>
									<span className="ml-4 text-sm font-medium">
										Shipping
									</span>
								</div>
							</li>
							<div
								className={`w-20 h-0.5 mx-4 ${
									step >= 2 ? "bg-primary-600" : "bg-gray-200"
								}`}
							/>
							<li className="relative">
								<div
									className={`flex items-center ${
										step === 2
											? "text-primary-600"
											: "text-gray-500"
									}`}
								>
									<span
										className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${
											step === 2
												? "border-primary-600 bg-primary-600 text-white"
												: "border-gray-300 bg-white"
										}`}
									>
										2
									</span>
									<span className="ml-4 text-sm font-medium">
										Payment
									</span>
								</div>
							</li>
						</ol>
					</nav>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Form Section */}
						<div className="lg:col-span-2 space-y-6">
							{step === 1 ? (
								<div className="bg-white rounded-lg shadow-sm border border-gray-100">
									<div className="p-6">
										<h2 className="text-2xl font-bold text-gray-900 mb-6">
											Shipping Information
										</h2>
										<form
											onSubmit={handleSubmit}
											className="space-y-6"
										>
											<div className="grid grid-cols-2 gap-6">
												<div>
													<label className="block text-sm font-medium text-gray-700">
														First Name
													</label>
													<input
														type="text"
														name="firstName"
														value={
															formData.firstName
														}
														onChange={
															handleInputChange
														}
														required
														className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Last Name
													</label>
													<input
														type="text"
														name="lastName"
														value={
															formData.lastName
														}
														onChange={
															handleInputChange
														}
														required
														className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
													/>
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700">
													Email
												</label>
												<input
													type="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													required
													className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700">
													Address
												</label>
												<input
													type="text"
													name="address"
													value={formData.address}
													onChange={handleInputChange}
													required
													className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
												/>
											</div>

											<div className="grid grid-cols-6 gap-6">
												<div className="col-span-3">
													<label className="block text-sm font-medium text-gray-700">
														City
													</label>
													<input
														type="text"
														name="city"
														value={formData.city}
														onChange={
															handleInputChange
														}
														required
														className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
													/>
												</div>
												<div className="col-span-2">
													<label className="block text-sm font-medium text-gray-700">
														State
													</label>
													<input
														type="text"
														name="state"
														value={formData.state}
														onChange={
															handleInputChange
														}
														required
														className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														ZIP
													</label>
													<input
														type="text"
														name="zipCode"
														value={formData.zipCode}
														onChange={
															handleInputChange
														}
														required
														className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
													/>
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700">
													Country
												</label>
												<select
													name="country"
													value={formData.country}
													onChange={handleInputChange}
													required
													className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
												>
													<option value="">
														Select a country
													</option>
													<option value="AU">
														Australia
													</option>
													<option value="US">
														United States
													</option>
													<option value="GB">
														United Kingdom
													</option>
													<option value="CA">
														Canada
													</option>
												</select>
											</div>

											<div className="flex justify-end pt-6">
												<button
													type="submit"
													className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
												>
													Continue to Payment
												</button>
											</div>
										</form>
									</div>
								</div>
							) : (
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-6">
										Payment Information
									</h2>
									{clientSecret && (
										<Elements
											stripe={stripePromise}
											options={{
												clientSecret,
												appearance,
											}}
										>
											<PaymentForm
												formData={formData}
												total={total}
											/>
										</Elements>
									)}
								</div>
							)}
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm border border-gray-100">
								<div className="p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										Order Summary
									</h3>
									<div className="space-y-4">
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">
												Subtotal
											</span>
											<span className="text-gray-900">
												${subtotal.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">
												Shipping
											</span>
											<span className="text-gray-900">
												${shipping.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">
												Tax
											</span>
											<span className="text-gray-900">
												${tax.toFixed(2)}
											</span>
										</div>
										<div className="border-t border-gray-200 pt-4 mt-4">
											<div className="flex justify-between">
												<span className="text-base font-medium text-gray-900">
													Total
												</span>
												<span className="text-base font-medium text-gray-900">
													${total.toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
