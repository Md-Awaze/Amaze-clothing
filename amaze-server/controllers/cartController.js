import Product from "../models/product.js";

// Validate cart
export const validateCart = async (req, res) => {
	try {
		const { items } = req.body;

		if (!Array.isArray(items) || items.length === 0) {
			return res.status(400).json({
				isValid: false,
				message: "Cart is empty",
			});
		}

		const errors = [];

		// Check each item in the cart
		for (const item of items) {
			const product = await Product.findById(item._id);

			if (!product) {
				errors.push(`Product ${item._id} not found`);
				continue;
			}

			if (product.stock < item.quantity) {
				errors.push(
					`Insufficient stock for ${product.name}. Available: ${product.stock}`
				);
				continue;
			}

			// Validate size if product has sizes
			if (product.sizes.length > 0 && item.selectedSize) {
				if (!product.sizes.includes(item.selectedSize)) {
					errors.push(`Invalid size selected for ${product.name}`);
				}
			}

			// Validate color if product has colors
			if (product.colors.length > 0 && item.selectedColor) {
				if (!product.colors.includes(item.selectedColor)) {
					errors.push(`Invalid color selected for ${product.name}`);
				}
			}
		}

		if (errors.length > 0) {
			return res.status(400).json({
				isValid: false,
				errors,
			});
		}

		return res.status(200).json({
			isValid: true,
			message: "Cart is valid",
		});
	} catch (error) {
		return res.status(500).json({
			isValid: false,
			message: error.message,
		});
	}
};
