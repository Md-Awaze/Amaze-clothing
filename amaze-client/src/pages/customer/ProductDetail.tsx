import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock data
  const product = {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    description:
      'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    images: [
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600',
    ],
    colors: ['Black', 'White', 'Silver'],
    sizes: ['One Size'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Adding to cart:', {
      productId: id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75"
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </p>
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedColor === color
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 flex space-x-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedSize === size
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
            disabled={!product.inStock}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 