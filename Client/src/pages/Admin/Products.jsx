import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Products = () => {
  return (
    <Layout>
          <div className='container mx-auto '>
            <div className='flex gap-5'>

                <div className='w-1/4'>
                      <AdminMenu></AdminMenu>
                </div>
                <div className='w-3/4'>
                       <h1 className='text-center'>All Product List</h1>
                </div>
            </div>

          </div>
    </Layout>
  )
}

export default Products
