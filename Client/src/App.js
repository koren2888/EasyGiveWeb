import { Navigate, useRoutes } from 'react-router-dom';
import Basket from './pages/Basket/Basket';
import Header from './layout/Header/Header';
import Products from './pages/Products/Products';
import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(res => {
      setProducts(res.data)
    })
  }, [])

  const addToCart = (productToAdd) => {
    if (!cartProducts.find(product => product._id == productToAdd._id))
      setCartProducts(current => [...current, productToAdd])
  }

  let router = useRoutes([
    { path: '/', element: <Products products={products} addToCart={addToCart} /> },
    { path: '/basket', element: <Basket products={products} cartProducts={cartProducts} emptyCart={() => setCartProducts([])} /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])

  return (
    <>
      <Header cartProducts={cartProducts} />
      {router}
    </>
  );
}

export default App;
