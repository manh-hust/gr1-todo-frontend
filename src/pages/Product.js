import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
const API_URL = "http://127.0.0.1:8000/api/products";

const Product = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [token]);
  return (
    <div>
      <h1>Product</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
