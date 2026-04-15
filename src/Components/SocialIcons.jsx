import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/socialicons.css"; // Import your CSS file
import { ReactComponent as InstagramIcon } from "../Images/instagram.svg"; // Import SVG as React component
import { ReactComponent as FacebookIcon } from "../Images/facebook.svg"; // Import SVG as React component
import { ReactComponent as WhatsappIcon } from "../Images/whatsapp.svg"; // Import SVG as React component
import { ReactComponent as GmailIcon } from "../Images/gmail.svg"; // Import SVG as React component

const SocialIcons = () => {
  const [socialLinks, setSocialLinks] = useState(null); // State to hold social media links

  useEffect(() => {
    // Fetch social media links from API
    axios
      .get("https://eliowebsite.onrender.com/contactsjdd/")
      .then((response) => {
        console.log("API response:", response.data);
        if (response.data && response.data.length > 0) {
          setSocialLinks(response.data[0]);
          console.log(
            "Social media links fetched successfully:",
            response.data[0],
          ); // Log fetched data
        } else {
          console.error("No social media links found");
        }
      })
      .catch((error) => {
        console.error("Error fetching social media links:", error); // Log fetch error
      });
  }, []);

  // State to handle hover effect
  const [hovered, setHovered] = useState(null);

  // Function to handle hover
  const handleHover = (icon) => {
    setHovered(icon);
  };

  // Function to handle hover out
  const handleHoverOut = () => {
    setHovered(null);
  };

  // Helper function to ensure URL has http:// or https:// prefix
  const ensureProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  // Function to open Instagram URL in new tab
  const handleInstagramClick = () => {
    if (socialLinks && socialLinks.contact_instagram) {
      window.open(ensureProtocol(socialLinks.contact_instagram), "_blank");
    } else {
      console.error("Instagram link not found");
    }
  };

  // Function to open Facebook URL in current tab
  const handleFacebookClick = () => {
    if (socialLinks && socialLinks.contact_facebook) {
      window.location.href = ensureProtocol(socialLinks.contact_facebook);
    } else {
      console.error("Facebook link not found");
    }
  };

  // Function to open WhatsApp URL in new tab
  const handleWhatsappClick = () => {
    if (socialLinks && socialLinks.contact_whatsapp) {
      window.open(ensureProtocol(socialLinks.contact_whatsapp), "_blank");
    } else {
      console.error("WhatsApp link not found");
    }
  };

  // Function to open Gmail URL in new tab
  const handleGmailClick = () => {
    if (socialLinks && socialLinks.contact_gmail) {
      window.open(ensureProtocol(socialLinks.contact_gmail), "_blank");
    } else {
      console.error("Gmail link not found");
    }
  };

  if (socialLinks === null) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="social-icons-container">
      <div className="social-icons-group social-icons-up">
        <button
          className="social-icon-card social-icon-card1"
          onMouseEnter={() => handleHover("instagram")}
          onMouseLeave={handleHoverOut}
          onClick={handleInstagramClick}
        >
          <InstagramIcon
            className={`social-icon instagram ${
              hovered === "instagram" ? "icon-hovered" : ""
            }`}
          />
        </button>
        <button
          className="social-icon-card social-icon-card2"
          onMouseEnter={() => handleHover("facebook")}
          onMouseLeave={handleHoverOut}
          onClick={handleFacebookClick}
        >
          <FacebookIcon
            className={`social-icon facebook ${
              hovered === "facebook" ? "icon-hovered" : ""
            }`}
          />
        </button>
      </div>
      <div className="social-icons-group social-icons-down">
        <button
          className="social-icon-card social-icon-card3"
          onMouseEnter={() => handleHover("whatsapp")}
          onMouseLeave={handleHoverOut}
          onClick={handleWhatsappClick}
        >
          <WhatsappIcon
            className={`social-icon whatsapp ${
              hovered === "whatsapp" ? "icon-hovered" : ""
            }`}
          />
        </button>
        <button
          className="social-icon-card social-icon-card4"
          onMouseEnter={() => handleHover("gmail")}
          onMouseLeave={handleHoverOut}
          onClick={handleGmailClick}
        >
          <GmailIcon
            className={`social-icon gmail ${
              hovered === "gmail" ? "icon-hovered" : ""
            }`}
          />
        </button>
      </div>
      {/* <div className="debug-data">
        <h3>Fetched Data:</h3>
        <pre>{JSON.stringify(socialLinks, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default SocialIcons;
