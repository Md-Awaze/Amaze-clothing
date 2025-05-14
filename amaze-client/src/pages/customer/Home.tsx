import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import Hero from '../../components/home/Hero';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const Home: React.FC = () => {
  // Sample data - replace with actual data from API
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      category: 'Electronics',
    },
    // Add more products as needed
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    },
    {
      id: '2',
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    },
    // Add more categories as needed
  ];

  const handleAddToCart = (product: Product) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      {/* Add other sections below the hero as needed */}
      {/* Featured Products section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {categories.map((category) => (
                <div key={category.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/categories/${category.id}`}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 