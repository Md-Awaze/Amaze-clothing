import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

const Cart = () => {
  // Sample data - replace with actual data from API
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      quantity: 1,
      color: 'Black',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      quantity: 1,
      color: 'Silver',
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-7">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-lg font-medium text-gray-900">
                    Your cart is empty
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Start shopping to add items to your cart.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/products"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={`/products/${item.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                            </div>
                            {item.color && (
                              <p className="mt-1 text-sm text-gray-500">
                                Color: {item.color}
                              </p>
                            )}
                            {item.size && (
                              <p className="mt-1 text-sm text-gray-500">
                                Size: {item.size}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="rounded-md p-1 text-gray-400 hover:text-gray-500"
                                >
                                  -
                                </button>
                                <span className="mx-2 text-gray-500">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="rounded-md p-1 text-gray-400 hover:text-gray-500"
                                >
                                  +
                                </button>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            <div className="absolute right-0 top-0">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Order summary */}
            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Subtotal</div>
                  <div className="text-sm font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600">Shipping estimate</div>
                  <div className="text-sm font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600">Tax estimate</div>
                  <div className="text-sm font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-base font-medium text-gray-900">
                    Order total
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 