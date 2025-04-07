import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Ecommerce App"}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700">
            At [Your Store Name], we value your privacy and are committed to protecting the personal
            information you share with us. This Privacy Policy explains how we collect, use, and protect
            your personal data when you visit and shop on our website.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700">
            We collect personal information to provide a better shopping experience. This includes:
          </p>
          <ul className="list-disc ml-8 mt-4 text-gray-700">
            <li>Name, email address, and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>Payment details (credit/debit card information, PayPal, etc.)</li>
            <li>IP address and browser information</li>
            <li>Order history and preferences</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700">
            Your information is used for the following purposes:
          </p>
          <ul className="list-disc ml-8 mt-4 text-gray-700">
            <li>Processing and fulfilling your orders</li>
            <li>Providing customer support and responding to inquiries</li>
            <li>Improving our website and services</li>
            <li>Sending promotional offers, updates, and newsletters (with your consent)</li>
            <li>Ensuring the security of your personal information</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700">
            We take data security seriously and employ industry-standard security measures to protect
            your personal information. This includes using SSL encryption for sensitive data transmission
            and securely storing payment information.
          </p>
        </div>

        {/* Cookies */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance your shopping experience. Cookies allow us to remember your preferences,
            analyze website traffic, and improve functionality. You can choose to disable cookies through your
            browser settings, but this may affect your experience on our website.
          </p>
        </div>

        {/* Sharing Your Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
          <p className="text-gray-700">
            We do not sell or rent your personal information to third parties. However, we may share your information
            with trusted partners who assist in running our business, such as payment processors and shipping companies.
            All such partners are obligated to keep your information confidential.
          </p>
        </div>

        {/* Your Rights */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, update, and delete your personal information. If you wish to exercise
            these rights, please contact us at [Your Email Address].
          </p>
        </div>

        {/* Changes to This Privacy Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page,
            and the revised policy will be effective as soon as it is published.
          </p>
        </div>

        {/* Contact Us */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Have Questions?</h2>
          <p className="text-gray-700">
            If you have any questions about our privacy practices, please feel free to <a href="/contact" className="text-blue-600">contact us</a>.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
