import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Logo2 from "../Images/Artboard 3.png";
import smartphone2 from "../Images/smartphone-free-svgrepo-com.svg";
import location2 from "../Images/location2.svg";
import closeIcon from "../Images/close-circle-svgrepo-com.svg";

import { emptyCart } from "../redux/cartSlice";
import "../Styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [contact, setContact] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  // Toggle cart popup
  const toggleCartPopup = () => setShowCartPopup(!showCartPopup);

  // Fetch contact info
  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/contactsjdd/")
      .then((res) => {
        if (res.data.length > 0) setContact(res.data[0]);
      })
      .catch((err) => console.error("Error fetching contact:", err));
  }, []);

  // Animate badge when cart changes
  useEffect(() => {
    if (cartItems.length === 0) return;
    setAnimateBadge(true);
    const timer = setTimeout(() => setAnimateBadge(false), 300);
    return () => clearTimeout(timer);
  }, [cartItems.length]);

  // Cart item count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      {/* Top Header */}
      <div className="header-top">
        <div className="logo-container">
          <img
            src={Logo2}
            className="header-logo"
            alt="Logo"
            onClick={() => handleNavigation("/")}
          />
        </div>

        <div className="big-box-left">
          {/* Cart Icon */}
          <div className="cart-icon-container" onClick={toggleCartPopup}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.3 5H21L19 12H7.38M20 16H8L6 3H3M9 20C9 20.5523 8.5523 21 8 21C7.4477 21 7 20.5523 7 20C7 19.4477 7.4477 19 8 19C8.5523 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#ede4d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && (
              <div
                className={`cart-icon-number ${animateBadge ? "badge-animate" : ""}`}
              >
                {cartItems.length}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="phone-box">
            <div className="icon-box">
              <img className="header-phone" src={smartphone2} alt="Phone" />
            </div>
            <div className="heading">
              <h4>Phone</h4>
              <p>{contact.contact_phonenumber}</p>
            </div>
          </div>
          <div className="phone-box">
            <div className="icon-box">
              <img className="header-location" src={location2} alt="Location" />
            </div>
            <div className="heading">
              <h4>Showroom</h4>
              <p>{contact.contact_location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-container">
        <nav className="nav-menu">
          {["/", "/artworks", "/collection", "/abouttrial", "/contactus"].map(
            (path, i) => (
              <span
                key={i}
                className="hideOnMobile nav-item"
                onClick={() => handleNavigation(path)}
              >
                {
                  ["Home", "Artworks", "Collections", "About Us", "Contact Us"][
                    i
                  ]
                }
              </span>
            ),
          )}
          <li className="menu-button" onClick={() => setShowSidebar(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26">
              <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
            </svg>
          </li>
        </nav>

        {/* Sidebar */}
        {showSidebar && (
          <nav className="bigger-1">
            <ul className="sidebar123">
              <li onClick={() => setShowSidebar(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26">
                  <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231-231 231Z" />
                </svg>
              </li>
              {[
                "/",
                "/artworks",
                "/collection",
                "/abouttrial",
                "/contactus",
              ].map((path, i) => (
                <li key={i}>
                  <a href="#" onClick={() => handleNavigation(path)}>
                    {
                      [
                        "Home",
                        "Artworks",
                        "Collections",
                        "About Us",
                        "Contact Us",
                      ][i]
                    }
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Info Bar */}
      <div className="info-bar">
        <span>Fast delivery</span>
        <span>Cash on delivery</span>
        <span>We can discuss prices</span>
      </div>

      {/* Cart Popup */}
      {showCartPopup && (
        <div className="cart-popup">
          <h3>Cart Items</h3>
          <button
            className="close-popup"
            onClick={() => setShowCartPopup(false)}
          >
            <img src={closeIcon} alt="Close" />
          </button>

          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.item_image1}
                    alt={item.item_name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p>{item.item_name}</p>
                    {item.item_color1 && <p>Color: {item.item_color1}</p>}
                    <p>
                      ${item.item_price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div className="cart-popup-actions">
            <button
              onClick={() => {
                dispatch(emptyCart());
                setShowCartPopup(false);
              }}
            >
              Empty Cart
            </button>
            <button
              onClick={() => {
                handleNavigation("/checkout");
                setShowCartPopup(false);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
