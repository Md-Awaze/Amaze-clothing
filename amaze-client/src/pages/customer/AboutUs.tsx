import React from 'react';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 }
};

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Amaze Clothing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Welcome to Amaze Clothing, where fashion meets comfort and style meets sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2024, Amaze Clothing has quickly become a leading destination for fashion-forward individuals
              seeking quality, sustainable, and stylish clothing. Our journey began with a simple mission: to make
              fashion accessible while maintaining the highest standards of quality and ethical production.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <ul className="text-gray-600 space-y-3">
              <li>• Sustainable and ethical production</li>
              <li>• Quality craftsmanship</li>
              <li>• Customer satisfaction</li>
              <li>• Innovation in design</li>
              <li>• Environmental responsibility</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-gray-600">
            At Amaze Clothing, we're committed to providing our customers with not just clothing, but an experience.
            We carefully curate our collections to ensure each piece meets our high standards of quality, comfort,
            and style. Our commitment to sustainability means we're constantly working to reduce our environmental
            impact while delivering exceptional products.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Journey</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We invite you to be part of our story. Whether you're looking for everyday essentials or statement
            pieces, Amaze Clothing is here to help you express your unique style while making conscious fashion
            choices.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs; 