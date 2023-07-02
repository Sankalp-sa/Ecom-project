import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({}); // product is an object

  const [relatedProducts, setRelatedProducts] = useState([]);

  const { auth } = useAuth();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

 const getProducts = async () => {

    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`);
        console.log(response);  

        setProduct(response.data.product);

    } catch (error) {
        console.log(error);
    }
 } 

  useEffect(() => {
    if(params?.slug) getProducts();
  }, [params?.slug]) // eslint-disable-line react-hooks/exhaustive-deps

  // get similar products

  const getRelatedProducts = async (pid, cid) => {

    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`);
        console.log(response);  

        setRelatedProducts(response.data.products);

    } catch (error) {
        console.log(error);
    }

  }

  useEffect(() => {
    if(product?._id && product?.category?._id) getRelatedProducts(product._id, product.category._id);
  }, [product]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <div className="container-fluid" style={{padding: "5% 17%"}}>
        <div className="row pt-4">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} alt={product.name} className='img img-thumbnail h-100 w-100'/>
          </div>
          <div className="col-md-6" style={{padding: "5% 7%"}}>
            <h1>Product Details</h1>
            <h3>{product.name}</h3>
            <p>
              {product.description}
            </p>
            <p>
              ${product.price}
            </p>
            <p>
              {product.category?.name}
            </p>
            <div className="d-flex align-items-start justify-content-start gap-3">
              <button className="btn btn-secondary"
                onClick={() => {
                  if (auth && auth.token) {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success(`${product.name} added to cart`);
                  } else {
                    toast.error("Please login to add to cart");
                    navigate("/login"); 
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-md-12">
            <h1>Related Products</h1>
            <div className="row">
              {relatedProducts?.map((product) => (
                <div className="col-md-4 d-flex align-items-center justify-content-center" key={product._id}>
                  <div className="shadow card m-3 " style={{ width: "18rem" }}>
                    <img

                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                      className="card-img-top shadow"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">${product.price}</p>
                      <p className="card-text">
                        {product.category?.name}
                      </p>
                      <div className="d-flex align-items-start justify-content-start gap-3">
                        <button className="btn btn-secondary"
                        onClick={() => {
                          if (auth && auth.token) {
                            setCart([...cart, product]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, product])
                            );
                            toast.success(`${product.name} added to cart`);
                          } else {
                            toast.error("Please login to add to cart");
                            navigate("/login"); 
                          }
                        }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}  
              </div>
            </div>
           </div> 
      </div>
    </Layout>

  )
}
