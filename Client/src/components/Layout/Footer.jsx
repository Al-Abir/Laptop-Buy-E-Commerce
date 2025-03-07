import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-black p-4 text-gray-200'>
      <div className='text-center mb-4'>
        <h1 className='text-3xl'>
          All Rights Reserved &copy; abirSheikh
        </h1>
      </div>
      
      <div className='text-center p-2'>
        <Link to='/about' className='p-3 hover:underline cursor-pointer'>About</Link>
        |
        <Link to='/contact' className='p-3 hover:underline cursor-pointer'>Contact</Link>
        |
        <Link to='/policy' className='p-3 hover:underline cursor-pointer'>Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer
