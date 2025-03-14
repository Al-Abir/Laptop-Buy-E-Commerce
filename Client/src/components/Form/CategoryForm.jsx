import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control border border-gray-950 w-80"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 border bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg "
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
