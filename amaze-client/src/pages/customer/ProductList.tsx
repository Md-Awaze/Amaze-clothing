import { useState } from 'react';
import ProductCard from '../../components/products/ProductCard';
import { FilterIcon } from '@heroicons/react/24/outline';

const ProductList = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      price: 149.99,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
    },
    {
      id: 4,
      name: 'Fitness Tracker',
      price: 89.99,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
    },
    // Add more products...
  ];

  const filters = {
    categories: ['Electronics', 'Fashion', 'Home & Living', 'Sports'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green'],
    priceRanges: [
      { label: 'Under $50', value: [0, 50] },
      { label: '$50 - $100', value: [50, 100] },
      { label: '$100 - $200', value: [100, 200] },
      { label: 'Over $200', value: [200, Infinity] },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center text-gray-600"
        >
          <FilterIcon className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 space-y-6`}
        >
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {filters.categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-600">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              {filters.priceRanges.map((range) => (
                <label key={range.label} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-3">Colors</h3>
            <div className="space-y-2">
              {filters.colors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-600">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-3">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {filters.sizes.map((size) => (
                <button
                  key={size}
                  className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList; 