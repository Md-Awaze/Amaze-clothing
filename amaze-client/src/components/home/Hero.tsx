import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Logo-style Gradient Text */}
        <h1
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-2 animate-fade-in bg-gradient-to-r from-[#FFB6A3] via-[#FFD966] via-[#6EE7B7] to-[#6EC1E4] bg-clip-text text-transparent drop-shadow-lg"
          style={{
            fontFamily: 'Fredoka, Quicksand, Arial, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          AMAZE
        </h1>
        {/* Tagline */}
        <p className="text-xl md:text-2xl font-light text-white/90 mb-8 animate-slide-up" style={{fontFamily: 'Quicksand, Arial, sans-serif'}}>Wear Confidence. Daily.</p>
        {/* Shop Now Button */}
        <Link
          to="/products"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-green-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero; 