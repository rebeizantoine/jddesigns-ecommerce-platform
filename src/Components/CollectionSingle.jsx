import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/collectionsingle.css";
import axios from "axios";

const CollectionSingle = () => {
  const { collectionName } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items for collection:", collectionName);
        const response = await axios.get(
          `https://eliowebsite.onrender.com/singleitem/items/tag/${collectionName}`,
        );
        console.log("Axios Response:", response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchItems();
  }, [collectionName]);

  const handleClick = (itemId) => {
    navigate(`/single/${itemId}`);
  };

  return (
    <div>
      <div className="bigupsmyg">
        <h1 className="collection-title-big-one">{collectionName}</h1>
        <p className="collection-p-big-one">
          Explore a wide range of items from the collection "{collectionName}".
        </p>
      </div>
      <p className="priceand-p2131">{items.length} products</p>
      <div className="item-grid-container131">
        {items.map((item) => (
          <div
            className="item-grid-1131"
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            <img
              src={item.item_image1}
              alt={item.item_name}
              className="image-priceand131"
            />
            <div className="priceand131">
              <h1>{item.item_name}</h1>
              <p>{`From $${item.item_price} USD`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSingle;
