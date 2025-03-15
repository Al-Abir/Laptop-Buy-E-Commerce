import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Swal from "sweetalert2";  // Import SweetAlert2

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // handle form submission to create a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName(""); // clear input after successful creation
        getAllCategory(); // fetch updated category list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Fetch categories
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
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName) {
      toast.error("Please provide a name");
      return;
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`Category updated to ${updatedName}`);
        setUpdatedName(""); // clear input after successful update
        getAllCategory(); // fetch updated categories list
        setVisible(false); // close modal
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during category update");
    }
  };

  // handle category delete with SweetAlert2 confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${id}`,
            {
              headers: {
                Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
              },
            }
          );
          if (data?.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success",
            });
            getAllCategory(); // fetch updated categories list
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong during category deletion");
        }
      }
    });
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
            <h2>Manage Category</h2>
            <div className="p-4">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-1/2 border-collapse border border-gray-300">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="text-start px-4 py-2">Name</th>
                    <th className="text-start px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2 flex gap-5">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
