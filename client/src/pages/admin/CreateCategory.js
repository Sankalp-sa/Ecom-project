import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Forms/CategoryForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

export default function CreateCategory() {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );

      console.log(res.data);
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
      // setCategories(await res.json());
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name: newCategory,
        }
      );

      if (res.data.success === true) {
        toast.success(`Category ${res.data.category.name} created`);
        fetchCategories();
      } else {
        toast.error(`Error in creating category`);
      }

      console.log(res);
      setNewCategory("");
    } catch (error) {
      console.log(error);
      toast.error("Error in creating category");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        {
          name: updatedName,
        }
      );
      if (res.data.success === true) {
        toast.success(`Category ${res.data.category.name} updated`);
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        fetchCategories();
      } else {
        toast.error(`Error in updating category`);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error in updating category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (res.data.success === true) {
        toast.success(`Category ${res.data.category.name} deleted`);
        fetchCategories();
      } else {
        toast.error(`Error in deleting category`);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting category");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 py-5 px-0 m-0 bg-danger">
            <AdminMenu />
          </div>
          <div className="col-md-10 w-75" style={{padding: "7% 15%"}}>
            <h3>Manage Category</h3>
            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                category={newCategory}
                setCategory={setNewCategory}
                icon={<AddIcon />}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" style={{width: "85%"}}>Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category._id);
                          }}
                        >
                          <EditIcon />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              handleSubmit={handleUpdateSubmit}
              category={updatedName}
              setCategory={setUpdatedName}
              icon={<DoneIcon />}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
