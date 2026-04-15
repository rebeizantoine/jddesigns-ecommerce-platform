import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/collections.css";
import axios from "axios";

// import image1 from "../Images/collection1.jpg";
// import image2 from "../Images/collection2.jpg";
// import image3 from "../Images/collection3.jpg";
// import image4 from "../Images/collection4.jpg";
// import image5 from "../Images/collection5.jpg";
// import image6 from "../Images/collection5.jpg";
import Arrowleft from "../Images/arrowright.svg";

const Collections = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/collections/")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("error fetching", error);
      });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // Scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const handleClick = (collectionName) => {
    navigate(`/collection/${collectionName}`);
  };

  return (
    <div>
      <h2 className="priceand-h2">Our Collections</h2>
      <div className="collections-main-all12" ref={sliderRef}>
        {collections.map((collection) => (
          <div
            key={collection._id}
            className="all-main12"
            onClick={() => handleClick(collection.collection_name)}
          >
            <img
              src={collection.collection_image}
              alt={collection.collection_name}
            />
            <div className="under-main112">
              <span>
                <h3>{collection.collection_name}</h3>
                <img src={Arrowleft} alt="Arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
