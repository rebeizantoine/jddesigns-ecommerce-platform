import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/section1.css";

const Section1 = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://eliowebsite.onrender.com/singleitem/items/featured",
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchItems();
  }, []);

  const handlenavigateClick = () => {
    navigate(`/artworks`);
  };

  const handleItemClick = (item) => {
    if (item && item.item_name) {
      // Check if item and item_name are defined
      const formattedName = item.item_name.toLowerCase().replace(/\s+/g, "-");
      localStorage.setItem("currentItemId", item._id);
      navigate(`/single/${formattedName}`);
    } else {
      console.error("Item or item_name is undefined");
    }
  };

  return (
    <div>
      <div>
        <h2 className="priceand-h2">Customizable Home Bars</h2>
        <div className="item-grid-container123">
          {items.map((item) => (
            <div
              className="item-grid-1"
              key={item._id}
              onClick={() => handleItemClick(item)} // Ensure item is passed as an argument
            >
              <img
                src={item.item_image1}
                alt={item.item_name}
                className="image-priceand"
              />
              <div className="priceand">
                <h1>{item.item_name}</h1>
                <p>From ${item.item_price} USD</p>
              </div>
            </div>
          ))}
        </div>
        <div className="priceand-viewall">
          <button onClick={handlenavigateClick}>View all</button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
