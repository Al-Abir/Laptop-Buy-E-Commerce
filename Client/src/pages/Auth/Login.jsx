import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios'
const Login= () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const[auth,setAuth] = useAuth();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, formData);
        if(res.data.success){
            toast.success('User Registration Successfully');
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate('/')
        
            
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4"> 
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;