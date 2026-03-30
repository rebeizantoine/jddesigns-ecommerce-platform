import React, { useState } from "react";
import welding from "../Images/ABOUTIMAGEWELDING.jpg";
import "../Styles/about.css";
import TallyPopupComponent from "./TallyPopupComponent"; // Adjust path as per your project structure

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  const formId = "n0MloZ"; // Replace with your actual Tally form ID

  const openTallyPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="about-container">
      <div className="about-image">
        <img src={welding} alt="Welding" />
      </div>
      <div className="about-content">
        <h2 className="about-title">Customize your own project</h2>
        <p className="about-description">
          Outbox is set up to take in your most complex steelwork projects.
          Whether you'd like to execute a simple dining room table or you're
          opening an industrial bar pub downtown, we're all in!
        </p>
        <button className="about-button" onClick={openTallyPopup}>
          Explore Ideas
        </button>
      </div>
      {showPopup && <TallyPopupComponent formId={formId} />}
    </div>
  );
};

export default About;
