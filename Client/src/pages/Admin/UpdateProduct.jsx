import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product?.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/category-all`,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        }
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Create form data
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category?._id || category); 
      productData.append("quantity", quantity);
      productData.append("shipping", shipping ? "1" : "0"); // sending "1" or "0"
      if (photo) productData.append("photo", photo);

      // API call
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error("Something went wrong while updating the product.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
            <AdminMenu />
          </div>
          {/* Main Content */}
          <div className="w-3/4 mt-3">
            <h2>Update Product</h2>
            <div className="w-[700px] m-1"> {/* Adjusted width */}
              {/* Category Select */}
              <Select
                bordered={true}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full h-12 text-lg mb-3" // Tailwind classes for width, height, and font size
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category ? category._id : undefined} 
            
       
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload */}
              <div className="mt-5 w-[700px] ">
                <label className="px-4 py-2 border border-gray-500 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden w-full" // Hides the default file input
                  />
                </label>
              </div>
              <div className="mt-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height="200"
                      className="mx-auto object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${
                        import.meta.env.VITE_API_URL
                      }/api/v1/product/product-photo/${id}`}
                      alt="product photo"
                      height="200"
                      className="mx-auto object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="mt-5 ">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control w-full p-3 border border-gray-50 bg-blue-50 rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              {/* Description Input */}
              <div className="mt-5 ">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control w-full p-3 border border-gray-50 bg-blue-50 rounded-lg"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Price Input */}
              <div className="mt-5 ">
                <input
                  type="text"
                  value={price}
                  placeholder="Price"
                  className="form-control w-full p-3 border border-gray-50 bg-blue-50 rounded-lg"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>

              {/* Quantity Input */}
              <div className="mt-5 ">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control w-full p-3 border border-gray-50 bg-blue-50 rounded-lg"
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
              </div>

              {/* Shipping Select */}
              <div className="mt-5 ">
                <Select
                  bordered={true}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full h-12 text-lg mb-3" // Tailwind classes for width, height, and font size
                  onChange={(value) => {
                    setShipping(value === "1"); // converts "1" to true, "0" to false
                  }}
                  value={shipping ? "1" : "0"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Update Button */}
              <div className="mb-3">
                <button
                  className=" w-full px-4 py-2 border border-gray-500 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
