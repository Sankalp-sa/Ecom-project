import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { Option } = Select;

  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setID] = useState("");

  const navigate = useNavigate();

  // Get single product

  const fetchSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`
      );
      console.log(res.data);
      if (res.status === 200) {
        setName(res.data.product.name);
        setID(res.data.product._id);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setCategory(res.data.product.category._id);
        setQuantity(res.data.product.quantity);
        setShipping(res.data.product.shipping);
      } else {
        toast.error("Error in fetching product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching product");
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    //eslint-disable-next-line
  }, []);

  // Fetch all categories
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // handle Create Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const product = new FormData();

      product.append("name", name);
      photo && product.append("photo", photo);
      product.append("description", description);
      product.append("price", price);
      product.append("category", category);
      product.append("quantity", quantity);
      product.append("shipping", shipping);

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        product
      );

      console.log(res);

      if (res.data.success === true) {
        toast.success(`Product ${res.data.product.name} Updated successfully`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`Error in updating product`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating product");
    }
  };

  // handle Delete
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            let answer = window.confirm(`Are you sure you want to delete ${name} product?`);
            if (!answer) return;

            const res = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
            );
            console.log(res);
            if (res.data.success === true) {
                toast.success(`Product ${res.data.product.name} Deleted successfully`);
                navigate("/dashboard/admin/products");
            } else {
                toast.error(`Error in deleting product`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in deleting product");
        }
    };



  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 py-5 p-0 m-0 bg-danger">
            <AdminMenu />
          </div>
          <div className="col-md-10" style={{ padding: "2% 17%" }}>
            <h1>Update Product</h1>
            <form onSubmit={handleUpdateProduct}>
              <div>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="larger"
                  showSearch
                  className="form-select mb-3"
                  onChange={(e) => setCategory(e)}
                  value={category}
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="formFile"
                  className="btn btn-outline-dark w-100"
                >
                  {photo ? photo.name : "Upload a photo"}
                </label>
                <input
                  className="form-control"
                  name="photo"
                  type="file"
                  id="formFile"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </div>
              <div className="mb-3 border-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product"
                      className="img-fluid"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`}
                      alt="product"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Product name"
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  placeholder="Product description"
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  placeholder="Product price"
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="number"
                  value={quantity}
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control my-2 me-2"
                  placeholder="Product quantity"
                />
                <Select
                  name="shipping"
                  bordered={false}
                  placeholder="Select shipping"
                  size="larger"
                  showSearch
                  className="form-select my-2 ms-2"
                  onChange={(e) => setShipping(e)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-dark btn-lg">
                  Update Product
                </button>
                <button className="btn btn-danger btn-lg" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
