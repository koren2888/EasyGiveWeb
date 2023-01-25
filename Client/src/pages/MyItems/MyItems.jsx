import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";

import AddItemModal from "../../components/Modals/AddItemModal";
import DeleteItemModal from "../../components/Modals/DeleteItemModal";
import EditItemModal from "../../components/Modals/EditItemModal";
import MyItemCard from "../../components/MyItemCard/MyItemCard";
import MyItemsInfo from "../../components/MyItemsInfo/MyItemsInfo";

import styles from "./MyItems.module.css";

export default function MyItems(props) {
  const [items, setItems] = useState([]);

  const [openedModal, setOpenedModal] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  
  const conditionsColors = {
      "Fine": "secondary",
      "Good": "info",
      "Excellent": "success"
  }

  const updateItems = useCallback(async () => {
    fetch("/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [setItems]);

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  const deleteItem = () => {
    setOpenedModal(null);
    fetch(`/item/${currentItem._id}`, {
        method: "DELETE"
    }).then((response) => updateItems())
  }

  const editItem = () => {
    setOpenedModal(null);
    fetch(`/item`, {
        method: "POST"
    }).then((response) => updateItems())
  }

  const openModal = (modalName, item) => {
    setCurrentItem(item);
    setOpenedModal(modalName);
  }

  return (
    <div>
        <div className={styles.page_header}>
            <h1>My Items</h1>
            <MyItemsInfo conditionsColors={conditionsColors} items={items} userId="1" />
            <Button variant="info" onClick={() => setOpenedModal(AddItemModal.name)}>Add Item</Button>
        </div>
        {items.length > 0 ? (
            <div className={styles.items_holder}>
             {items.map((item) => <MyItemCard
                                        key={item._id}
                                        {...item}
                                        conditionsColors={conditionsColors}
                                        deleteItem={() => {openModal(DeleteItemModal.name, item)}}
                                        editItem={() => {openModal(EditItemModal.name, item)}}
                                    />)}
            </div>
        ) : (
            <div className={styles.no_items}>
            <img
                className={styles.no_items_img}
                src="images/bare-tree.png"
                alt=""
            />
            </div>
        )}
        <AddItemModal
            show={openedModal === AddItemModal.name}
            handleClose={() => setOpenedModal(null)}
        />
        {currentItem && (<>
            <DeleteItemModal
                show={openedModal === DeleteItemModal.name}
                handleClose={() => setOpenedModal(null)}
                item={currentItem}
                deleteItem={deleteItem}
            />
            <EditItemModal
                show={openedModal === EditItemModal.name}
                handleClose={() => setOpenedModal(null)}
                item={currentItem}
                editItem={editItem}
            />
        </>)}
    </div>
  );
}