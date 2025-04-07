import React from 'react'
import Layout from '../components/Layout/Layout'
import showroom from '../assets/showroom.jpg' // ✅ Correct path and extension

const About = () => {
  return (
    <Layout title={"About Us - Ecommerce App"}>
      <div className="container mx-auto px-4 py-8">
        {/* Company Intro */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Our Store</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Welcome to our e-commerce platform! We are dedicated to bringing you the best products
            at unbeatable prices with fast delivery and top-notch customer service.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          <img
            src={showroom}
            alt="Showroom"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Journey</h2>
            <p className="text-gray-600">
              Started in 2020, we’ve grown from a small shop to a large e-commerce platform serving
              thousands of happy customers. Our passion for quality and customer satisfaction drives us every day.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We ensure lightning-fast delivery across the country.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600">Only the best and most reliable items on the market.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Customer Support</h3>
              <p className="text-gray-600">24/7 support to help you with any issues.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-3">Want to know more?</h2>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default About
