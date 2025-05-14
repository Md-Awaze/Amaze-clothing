import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/amaze';

const mintGreenHoodie = {
  name: 'Amaze Hoodie – Mint Green',
  price: 45.00,
  images: [
    '/images/hoodies/Green Hoodie back.png',
    '/images/hoodies/Green Hoodie.png'
  ],
  category: 'Men',
  subcategory: 'Hoodies',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Mint Green'],
  description: "Premium mint green hoodie featuring the Amaze logo and 'Yourself, Daily.' branding on front and back. Comfortable, stylish, and bold.",
  stock: 30,
  rating: 4.8,
  featured: false
};

const redHoodie = {
  name: 'Amaze Hoodie - Red',
  price: 45.00,
  images: [
    '/images/hoodies/amaze-red-back.png',
    '/images/hoodies/amaze-red-front.png'
  ],
  category: 'Men',
  subcategory: 'Hoodies',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Red'],
  description: "Bright red hoodie with the colorful Amaze logo and 'Yourself, Daily.' branding on both front and back. Stylish, comfortable, and bold — perfect for everyday wear.",
  stock: 28,
  rating: 4.9,
  featured: true
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared products collection');
    await Product.create([mintGreenHoodie, redHoodie]);
    console.log('Seeded mint green and red hoodies');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
