import React, { useState, useEffect } from "react";
import "./MyItems.css";
import { Button } from "react-bootstrap";
import AddItemModal from "./AddItemModal";
import MyItemCard from "../../components/MyItemCard/MyItemCard";

export default function MyItems(props) {
  const [items, setItems] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/items")
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
            <div className="items-holder">
             {items.map((item) => <MyItemCard key={item.id} {...item} addToCart={() => props.addToCart(item)} />)}
            </div>
        ) : (
            <div className="no-items">
            <img
                className="no-items-img"
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