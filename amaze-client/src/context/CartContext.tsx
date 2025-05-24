import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

interface CartItem {
	_id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	selectedSize?: string;
	selectedColor?: string;
}

interface CartContextType {
	cartItems: CartItem[];
	cartCount: number;
	addToCart: (item: CartItem) => void;
	updateQuantity: (itemId: string, newQuantity: number) => void;
	removeFromCart: (itemId: string) => void;
	clearCart: () => void;
	total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCart = (): CartItem[] => {
	const savedCart = localStorage.getItem("cart");
	return savedCart ? JSON.parse(savedCart) : [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (item: CartItem) => {
		setCartItems((prev) => {
			const existingItemIndex = prev.findIndex(
				(i) =>
					i._id === item._id &&
					i.selectedSize === item.selectedSize &&
					i.selectedColor === item.selectedColor
			);

			if (existingItemIndex !== -1) {
				// Update quantity if item exists with same options
				const updatedItems = [...prev];
				updatedItems[existingItemIndex].quantity += item.quantity;
				return updatedItems;
			}

			// Add new item if it doesn't exist with these options
			return [...prev, item];
		});
	};

	const updateQuantity = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) return;
		setCartItems((prev) =>
			prev.map((item) =>
				item._id === itemId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const removeFromCart = (itemId: string) => {
		setCartItems((prev) => prev.filter((item) => item._id !== itemId));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				cartCount,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
};
