import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface Product {
	_id: string;
	name: string;
	price: number;
	images: string[];
	category: string;
	subcategory?: string;
	sizes: string[];
	colors: string[];
	description: string;
	stock: number;
	rating: number;
}

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string>("");
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch(
					`http://localhost:5000/api/products/${id}`
				);
				if (!res.ok) throw new Error("Product not found");
				const data = await res.json();
				setProduct(data);
			} catch (err: any) {
				setError(err.message || "Failed to fetch product");
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);

	const handleAddToCart = () => {
		if (!product) return;

		// Validate product and selections
		if (product.sizes?.length > 0 && !selectedSize) {
			alert("Please select a size");
			return;
		}

		if (product.colors?.length > 0 && !selectedColor) {
			alert("Please select a color");
			return;
		}

		// Validate quantity
		if (quantity < 1 || quantity > product.stock) {
			alert(`Please select a quantity between 1 and ${product.stock}`);
			return;
		}

		// Add to cart
		addToCart({
			_id: product._id,
			name: product.name,
			price: product.price,
			image: product.images[0], // Use first image as main product image
			quantity,
			selectedSize,
			selectedColor,
		});

		// Show success message
		alert("Product added to cart successfully!");
	};

	if (loading) return <div className="p-8 text-center">Loading...</div>;
	if (error || !product)
		return (
			<div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
				<div className="max-w-max mx-auto">
					<main className="sm:flex">
						<p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
							404
						</p>
						<div className="sm:ml-6">
							<div className="sm:border-l sm:border-gray-200 sm:pl-6">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
									Product not found
								</h1>
								<p className="mt-1 text-base text-gray-500">
									Please check the product ID and try again.
								</p>
							</div>
							<div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
								<button
									onClick={() => navigate("/products")}
									className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Go back to products
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
				{/* Product images carousel/tabs */}
				<div className="lg:max-w-lg lg:self-end">
					<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg mb-4">
						<img
							src={
								product.images && product.images.length > 0
									? product.images[selectedImage]
									: "/images/placeholder.png"
							}
							alt={product.name}
							className="h-full w-full object-cover object-center"
						/>
					</div>
					{/* Thumbnails */}
					<div className="flex space-x-2">
						{product.images &&
							product.images.map((img, idx) => (
								<button
									key={img}
									onClick={() => setSelectedImage(idx)}
									className={`border rounded ${
										selectedImage === idx
											? "border-indigo-500"
											: "border-gray-200"
									}`}
								>
									<img
										src={img}
										alt={product.name + " thumbnail"}
										className="w-16 h-16 object-cover rounded"
									/>
								</button>
							))}
					</div>
				</div>

				{/* Product details */}
				<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						{product.name}
					</h1>
					<div className="mt-3">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							${product.price.toFixed(2)}
						</p>
					</div>

					<div className="mt-6">
						<h3 className="sr-only">Description</h3>
						<p className="text-base text-gray-700">
							{product.description}
						</p>
					</div>

					{/* Sizes */}
					{product.sizes && product.sizes.length > 0 && (
						<div className="mt-6">
							<h3 className="text-sm font-medium text-gray-900">
								Sizes
							</h3>
							<div className="mt-2 flex space-x-3">
								{product.sizes.map((size) => (
									<button
										key={size}
										onClick={() => setSelectedSize(size)}
										className={`px-4 py-2 border rounded-md text-sm ${
											selectedSize === size
												? "border-indigo-600 bg-indigo-50 text-indigo-600"
												: "border-gray-300 text-gray-700 hover:bg-gray-50"
										}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Colors */}
					{product.colors && product.colors.length > 0 && (
						<div className="mt-6">
							<h3 className="text-sm font-medium text-gray-900">
								Colors
							</h3>
							<div className="mt-2 flex space-x-3">
								{product.colors.map((color) => (
									<button
										key={color}
										onClick={() => setSelectedColor(color)}
										className={`px-4 py-2 border rounded-md text-sm ${
											selectedColor === color
												? "border-indigo-600 bg-indigo-50 text-indigo-600"
												: "border-gray-300 text-gray-700 hover:bg-gray-50"
										}`}
									>
										{color}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Quantity */}
					<div className="mt-6">
						<h3 className="text-sm font-medium text-gray-900">
							Quantity
						</h3>
						<div className="mt-2 flex items-center space-x-3">
							<button
								onClick={() =>
									setQuantity(Math.max(1, quantity - 1))
								}
								className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50"
							>
								-
							</button>
							<span className="text-gray-900">{quantity}</span>
							<button
								onClick={() => setQuantity(quantity + 1)}
								className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50"
							>
								+
							</button>
						</div>
					</div>

					{/* Add to Cart */}
					<button
						onClick={handleAddToCart}
						className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
