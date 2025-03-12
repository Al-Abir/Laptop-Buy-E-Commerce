import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
               <UserMenu></UserMenu>
          </div>
          {/* Main Content */}
          <div className="w-3/4 mt-3 border border-spacing-2">
        
            <h1 className="text-xl font-bold p-4"> Admin Name:   {auth?.user?.name}</h1>
            <h1 className="text-xl font-bold p-4">Admin Email:    {auth?.user?.email}</h1>
            <h1 className="text-xl font-bold  p-4">Admin Contact:  {auth?.user?.adress}</h1>
         
            
            {/* Add dashboard content here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
