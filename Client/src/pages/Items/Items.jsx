import React, { useState, useCallback, useEffect } from "react";

import FilterHeader from "../../components/FilterHeader/FilterHeader";
import ItemCard from "../../components/ItemCard/ItemCard";
import styles from "./Items.module.css";

export default function MyItems(props) {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  const updateItems = useCallback(async () => {
    fetch("http://localhost:3001/items?" + new URLSearchParams(filters))
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [setItems, filters]);

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  return (
    <div>
        <div className={styles.page_header}>
            <FilterHeader setFilters={setFilters} />
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