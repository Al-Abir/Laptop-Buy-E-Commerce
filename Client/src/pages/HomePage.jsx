import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  // pagination
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  //get all catefgories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/category-all`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // get filtered product
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-5 flex flex-col md:flex-row">
        {/* Sidebar: Category Filter */}
        <div className="md:w-1/4 w-full p-4 border-r">
          <h2 className="text-center font-semibold text-lg">
            Filter by Category
          </h2>
          <div className="flex flex-col p-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="mt-3 text-xl"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h2 className="text-center font-semibold text-lg">Filter by Price</h2>
          <div className="flex flex-col p-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.Array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col p-2">
            <button
              className="px-2 py-2 border bg-red-500 text-white rounded-lg "
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Main Content: Products */}
        <div className="md:w-3/4 w-full p-4">
          <h1 className="text-start text-xl font-bold">All Products</h1>
          {JSON.stringify(radio, null, 4)}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="max-w-sm rounded overflow-hidden shadow-lg border p-4 bg-white hover:shadow-xl transition"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="px-4 py-2">
                    <h2 className="font-bold text-lg">{p.name}</h2>
                    <h2 className="font-bold text-lg"> ৳ {p.price}</h2>

                    <p className="text-gray-700 text-sm">
                      {p.description.substring(0, 30)}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <button
                      className="px-4 py-2  border bg-blue-500 text-white rounded-lg  "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="px-4 py-3 border bg-slate-500 text-white rounded-lg"
                      onClick={() => {
                        console.log("Current Cart:", cart); // Debugging
                        setCart([...cart, p]); // Ensure cart is always an array
                        toast.success("Item Added successfully");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                No products available.
              </p>
            )}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="px-4 py-2 border rounded-lg bg-gray-600 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
