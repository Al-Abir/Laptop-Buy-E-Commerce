import React from 'react'
import Layout from '../components/Layout/Layout'

const Contact = () => {
  return (
    <Layout title={"Contact Me"}>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 md:flex justify-between items-center gap-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Email:</h2>
            <a 
              href="mailto:sheikhabir196@gmail.com" 
              className="text-blue-600 hover:underline block"
            >
              sheikhabir196@gmail.com
            </a>

            <h2 className="text-xl font-semibold mt-4 mb-2">Contact:</h2>
            <p className="text-gray-700">+8801402741287</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Address:</h2>
            <p className="text-gray-700">1185 East Monipur, Mirpur-2, Dhaka 1216</p>
          </div>

          <div className="w-full md:w-1/2 h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.445510003333!2d90.36480277595864!3d23.802751886763307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d0e6edb5ed%3A0x15587102c9ecb8eb!2s1185%20E%20Monipur%20Rd%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1743996978248!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
