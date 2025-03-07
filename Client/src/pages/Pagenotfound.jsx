import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-8xl font-bold text-red-600'>404</h1>
        <h2 className='text-4xl font-medium text-gray-800 mt-4'>
          Oops! Page Not Found
        </h2>
        <Link to='/'>
          <button className='mt-6 px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md'>
            Go back to Home
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound
