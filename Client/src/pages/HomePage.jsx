import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

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
  }, []);

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
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                    <p className="text-gray-700 text-sm">{p.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
