import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
const Profile= () => {
  // context
   const[auth,setAuth] = useAuth()
  // state
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    });
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, formData);
          if(res.data.success){
              toast.success('User Registration Successfully');
          }else{
              toast.error(res.data.message)
  
          }
      } catch (error) {
          console.log(error)
          toast.error("Something went wrong")
          
      }
    };
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
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update</button>
          </form>
        </div>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile;
