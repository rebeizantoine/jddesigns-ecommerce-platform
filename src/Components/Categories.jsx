import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/categories.css";
import image1 from "../Images/category1.jpg";
import image2 from "../Images/category2.jpg";
import image3 from "../Images/category3.jpg";
import image4 from "../Images/category4.jpg";
import Arrowleft from "../Images/arrowright.svg";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

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
  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/categoriesjdd")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("error fetching categories", error);
      });
  }, []);

  return (
    <div>
      <div className="categories-main-all" ref={sliderRef}>
        {category.map((categorysmall) => (
          <div key={categorysmall._id} className="item-1-main">
            <img src={categorysmall.category_image} alt="Living Room" />
            <div className="under-main1">
              <span>
                <h3>{categorysmall.category_name}</h3>
                <img src={Arrowleft} alt="Arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
