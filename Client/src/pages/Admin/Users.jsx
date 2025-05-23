import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
const Users = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
            <AdminMenu/>
          </div>
          {/* Main Content */}
          <div className="w-3/4 mt-3 ">
               <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
