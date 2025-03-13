
import { useEffect,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
const CreateCategory = () => {
  const[categories,setCategorie] = useState([]);

 // get all data
 const getAllCategory = async()=>{
  
     try {
          const{data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/category-all`)
          if(data.success){
            setCategorie(data.categories)
          }
     } catch (error) {
          console.log(error)
          toast.error("Something went wrong in getting category")

     }
 }
 useEffect(()=>{
      getAllCategory()
 },[])
  return (
    <Layout>
         <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
            <AdminMenu />
          </div>
          {/* Main Content */}
          <div className="w-3/4 mt-3 ">
               <h2>Create Category</h2>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
