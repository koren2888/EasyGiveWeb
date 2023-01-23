import React, { useState, useCallback } from "react";
import "./MyItems.css";
import { Button } from "react-bootstrap";
import AddItemModal from "../../components/Modals/AddItemModal";
import DeleteItemModal from "../../components/Modals/DeleteItemModal";
import MyItemCard from "../../components/MyItemCard/MyItemCard";
import { useEffect } from "react";

export default function MyItems(props) {
  const [items, setItems] = useState([]);

  const [openedModal, setOpenedModal] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const updateItems = useCallback(async () => {
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [setItems]);

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  const deleteItem = () => {
    setOpenedModal(null);
    fetch(`http://localhost:3001/item/${currentItem._id}`, {
        method: "delete"
    }).then((response) => updateItems())
  }

  const openModal = (modalName, item) => {
    setCurrentItem(item);
    setOpenedModal(modalName);
  }

  return (
    <div>
        <div className="page-header">
            <h1>My Items</h1>
            <Button variant="info" onClick={() => setOpenedModal(AddItemModal.name)}>Add Item</Button>
        </div>
        {items.length > 0 ? (
            <div className="items-holder">
             {items.map((item) => <MyItemCard
                                        key={item._id}
                                        {...item}
                                        deleteItem={() => {openModal(DeleteItemModal.name, item)}}
                                    />)}
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
            show={openedModal === AddItemModal.name}
            handleClose={() => setOpenedModal(null)}
        />
        {currentItem && (
            <DeleteItemModal
                show={openedModal === DeleteItemModal.name}
                handleClose={() => setOpenedModal(null)}
                item={currentItem}
                deleteItem={deleteItem}
            />
        )}
    </div>
  );
}