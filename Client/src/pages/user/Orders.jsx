import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';

const Orders= () => {
  return (
    <Layout>
         <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
            <UserMenu />
          </div>
          {/* Main Content */}
          <div className="w-3/4 mt-3 ">
               <h2>All orders</h2>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders;