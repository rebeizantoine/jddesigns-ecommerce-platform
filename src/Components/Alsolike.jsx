import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/alsolike.css";

const Alsolike = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch items that you may also like
    axios
      .get("https://eliowebsite.onrender.com/singleitem/maylike")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  // Function to handle image hover
  const handleImageHover = (event, newImageSrc) => {
    event.currentTarget.src = newImageSrc;
  };

  // Function to handle item click and navigate to the single item page
  const handleItemClick = (id) => {
    navigate(`/single/${id}`);
  };

  return (
    <div>
      <div className="also-like-all">
        <h2 className="alsolike-h2">You may also like</h2>
        <div className="item-grid-container">
          {items.map((item) => (
            <div
              key={item._id}
              className="item-grid-1"
              onClick={() => handleItemClick(item._id)} // Pass the item ID here
            >
              <img
                src={item.item_image1}
                alt={item.item_name}
                className="image-alsolike2"
                onMouseOver={(e) => handleImageHover(e, item.item_image2)}
                onMouseOut={(e) => handleImageHover(e, item.item_image1)}
              />
              <div className="alsolike">
                <h1>{item.item_name}</h1>
                <p>From ${item.item_price} USD</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alsolike;
