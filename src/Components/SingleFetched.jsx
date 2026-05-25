import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  MessageCircle,
  Ruler,
  HelpCircle,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { addToCart } from "../redux/cartSlice";
import "../Styles/single.css";

// Assets (Replace with your actual imports)
import image1 from "../Images/imagelittle1.jpg";
import image2 from "../Images/imagelittle2.jpg";
import image3 from "../Images/imagelittle3.jpg";

const SingleFetched = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);

  // State for the main displayed image
  const [activeImage, setActiveImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // State for the toast displayed
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const itemId = localStorage.getItem("currentItemId");
    axios
      .get(`https://eliowebsite.onrender.com/singleitem/${itemId}`)
      .then((res) => {
        setItem(res.data);
        setActiveImage(res.data.item_image1);
      })
      .catch((err) => console.error(err));
  }, [name]);

  if (!item) return <div className="loading">Loading...</div>;

  // Restore the functionality
  const handleAddToCart = () => {
    dispatch(addToCart(item));

    setToastMessage(
      `"${item.item_name}" added successfully for standardization`,
    );

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const galleryImages = [item.item_image1, item.item_image1, item.item_image1]; // Swap with real refs if available

  const accordionData = [
    {
      title: "Dimensions & Specifications",
      icon: <Ruler size={16} />,
      content: item.item_dimensions,
    },
    {
      title: "Will the ordered item look like?",
      icon: <HelpCircle size={16} />,
      content: "Each piece is handcrafted...",
    },
    {
      title: "Where is your location?",
      icon: <MapPin size={16} />,
      content: "Adonis, Zouk Mosbeh, Lebanon",
    },
    {
      title: "Can I customize this piece?",
      icon: <HelpCircle size={16} />,
      content: "Yes, we offer custom sizing.",
    },
  ];

  return (
    <>
      {showToast && (
        <div className="custom-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="single-wrapper">
        <div className="product-container">
          {/* LEFT: Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-box">
              <img src={activeImage} alt="Product" />
            </div>
            <div className="thumbnail-row">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumb-box ${activeImage === img ? "active" : ""}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details (Strictly sized) */}
          <div className="details-section">
            <div className="brand-subtitle">
              DESIGNED & PRODUCED BY JDDESIGNS SARL
            </div>
            <h1 className="product-title">{item.item_name}</h1>
            <div className="product-price">${item.item_price} USD</div>

            <div className="product-meta">
              <p>Paid cash on delivery after 2-3 weeks of production.</p>
              <p>
                Transportation and additional services calculated at checkout.
              </p>
              <p className="stock">Quantity available: {item.quantity || 20}</p>
            </div>

            {/* The 3 Uniform Buttons */}
            <div className="button-stack">
              <button href="https://wa.me/yournumber" className="btn btn-wa">
                <MessageCircle size={14} /> Order on Whatsapp
              </button>
              <button className="btn btn-custom">Customise</button>
              <button className="btn btn-cart" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>

            <div className="pickup-info">
              <CheckCircle size={14} className="check-icon" />
              <div>
                <p>Pickup available at Adonis, Zouk Mosbeh, Lebanon</p>
                <span>Usually ready in up to 2 weeks</span>
              </div>
            </div>

            {/* Accordion */}
            <div className="accordion-container">
              {accordionData.map((tab, i) => (
                <div key={i} className="accordion-item">
                  <div
                    className="accordion-header"
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  >
                    <div className="accordion-title">
                      <span className="acc-icon">{tab.icon}</span>
                      {tab.title}
                    </div>
                    <div className="acc-toggle">
                      {activeIndex === i ? "−" : "+"}
                    </div>
                  </div>
                  {activeIndex === i && (
                    <div className="accordion-content">{tab.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFetched;
