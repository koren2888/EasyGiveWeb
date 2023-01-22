import { Navigate, useRoutes } from 'react-router-dom';
import Basket from './pages/Basket/Basket';
import Header from './layout/Header/Header';
import Products from './pages/Products/Products';
import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import MyItems from './pages/MyItems/MyItems';
import { Container } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(res => {
      setItems(res.data)
    })
  }, [])

  const addToCart = (productToAdd) => {
    if (!cartProducts.find(product => product._id == productToAdd._id))
      setCartProducts(current => [...current, productToAdd])
  }

  let router = useRoutes([
    { path: '/', element: <Products products={items} addToCart={addToCart} /> },
    { path: '/my-items', element: <MyItems items={items} addToCart={addToCart} /> },
    { path: '/basket', element: <Basket products={items} cartProducts={cartProducts} emptyCart={() => setCartProducts([])} /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])

  return (
    <>
      <Header cartProducts={cartProducts} />
      <Container className='app-container'>
        {router}
      </Container>
    </>
  );
}

export default App;
