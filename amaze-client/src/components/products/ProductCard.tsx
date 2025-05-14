import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png'}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ShoppingCartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard; 