import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'


const Products = () => {
  const [product,setProducts] = useState([]);

  const getAllProducts = async()=>{
     try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product`,
        {
        headers:{
          Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`
        }
      }) 
      setProducts(data.products)
      
     } catch (error) {
        console.log(error)
     }
  }

    useEffect(()=>{
      getAllProducts()
    },[])
  return (
    <Layout>
          <div className='container mx-auto p-4 '>
            <div className='flex gap-5'>

                <div className='w-1/4'>
                      <AdminMenu></AdminMenu>
                </div>
                <div className='w-3/4'>
                       <h1 className='text-center text-4xl'>All Product List</h1>
                </div>
            </div>

          </div>
    </Layout>
  )
}

export default Products
