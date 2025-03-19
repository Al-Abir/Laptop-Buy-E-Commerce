import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.error('Error during search:', error);
      // Optionally, set an error state and display it to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            className="w-[360px] px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-r-lg"
          >
            🔍
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;