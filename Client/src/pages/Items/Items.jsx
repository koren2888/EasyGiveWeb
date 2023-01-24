import React, { useState, useCallback, useEffect } from "react";

import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Items.module.css";

export default function MyItems(props) {
  const [items, setItems] = useState([]);

  const updateItems = useCallback(async () => {
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [setItems]);

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  return (
    <div>
        <div className={styles.page_header}>
            {/* <h3>Filter</h3> */}
        </div>
        {items.length > 0 ? (
            <div className={styles.items_holder}>
             {items.map((item) => <ItemCard
                                        key={item._id}
                                        {...item}
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
    </div>
  );
}