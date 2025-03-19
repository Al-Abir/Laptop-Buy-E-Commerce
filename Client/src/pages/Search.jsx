import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={'Search results'}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold my-4">Search Results</h1>
          <h2 className="text-xl mb-6">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {values?.results.length > 0 ? (
              values.results.map((p) => (
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
                    <h2 className="font-bold text-lg">৳ {p.price}</h2>
                    <p className="text-gray-700 text-sm">
                      {p.description.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button className="px-4 py-2 border bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      More Details
                    </button>
                    <button className="px-4 py-2 border bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;