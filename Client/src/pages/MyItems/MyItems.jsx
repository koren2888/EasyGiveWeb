import React, { useContext, useState, useEffect } from "react";
import "./MyItems.css";
import Card from "../../components/Card/Card";
import { Button } from "react-bootstrap";
import AddItemModal from "./AddItemModal";

export default function MyItems(props) {
  const [items, setItems] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>My Items</h1>
        <Button variant="info" onClick={() => setShowModal(true)}>Add Item</Button>
      </div>
      {items.length > 0 ? (
          items.map((item) => <Card key={item.id} {...item} addToCart={() => props.addToCart(item)} />)
      ) : (
          <div className="not_products">
          <img
              className="products_empty_img"
              src="images/bare-tree.png"
              alt=""
          />
          </div>
      )}
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        />
    </div>
  );
}