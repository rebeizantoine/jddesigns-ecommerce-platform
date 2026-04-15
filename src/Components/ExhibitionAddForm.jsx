import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExhibitionAddForm = ({ onCancel, onSuccess = () => {} }) => {
  const [formData, setFormData] = useState({
    exhibition_name: "",
    exhibition_description: "",
    exhibition_country: "",
    exhibition_city: "",
    exhibition_featured1name: "",
    exhibition_featured1image: null,
    exhibition_featured2name: "",
    exhibition_featured2image: null,
    exhibition_featured3name: "",
    exhibition_featured3image: null,
    exhibition_opening_hours: "",
    exhibition_closing_hours: "",
  });

  const [imagePreviews, setImagePreviews] = useState({
    exhibition_featured1image: null,
    exhibition_featured2image: null,
    exhibition_featured3image: null,
  });

  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }

    const newValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData(formRef.current);
      const response = await axios.post(
        "https://eliowebsite.onrender.com/exhibitions/exhibition/add",
        formDataObject,
      );
      onSuccess(response.data);
      setFormData({
        exhibition_name: "",
        exhibition_description: "",
        exhibition_country: "",
        exhibition_city: "",
        exhibition_featured1name: "",
        exhibition_featured1image: null,
        exhibition_featured2name: "",
        exhibition_featured2image: null,
        exhibition_featured3name: "",
        exhibition_featured3image: null,
        exhibition_opening_hours: "",
        exhibition_closing_hours: "",
      });
      setImagePreviews({
        exhibition_featured1image: null,
        exhibition_featured2image: null,
        exhibition_featured3image: null,
      });
      setError("");
      toast.success("Exhibition added successfully!");
    } catch (error) {
      setError("Failed to create exhibition");
      console.error("Error:", error);
      toast.error("Failed to create exhibition");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Exhibition Name</label>
        <input
          type="text"
          name="exhibition_name"
          value={formData.exhibition_name}
          onChange={handleChange}
          placeholder="Exhibition Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Exhibition Description</label>
        <textarea
          name="exhibition_description"
          value={formData.exhibition_description}
          onChange={handleChange}
          placeholder="Exhibition Description"
          required
        />
      </div>
      <div className="form-group">
        <label>Exhibition Country</label>
        <input
          type="text"
          name="exhibition_country"
          value={formData.exhibition_country}
          onChange={handleChange}
          placeholder="Exhibition Country"
          required
        />
      </div>
      <div className="form-group">
        <label>Exhibition City</label>
        <input
          type="text"
          name="exhibition_city"
          value={formData.exhibition_city}
          onChange={handleChange}
          placeholder="Exhibition City"
          required
        />
      </div>
      <div className="form-group">
        <label>Exhibition Opening Hours</label>
        <input
          type="text"
          name="exhibition_opening_hours"
          value={formData.exhibition_opening_hours}
          onChange={handleChange}
          placeholder="Exhibition Opening Hours"
          required
        />
      </div>
      <div className="form-group">
        <label>Exhibition Closing Hours</label>
        <input
          type="text"
          name="exhibition_closing_hours"
          value={formData.exhibition_closing_hours}
          onChange={handleChange}
          placeholder="Exhibition Closing Hours"
          required
        />
      </div>
      <div className="form-group">
        <label>Featured Art 1 Name</label>
        <input
          type="text"
          name="exhibition_featured1name"
          value={formData.exhibition_featured1name}
          onChange={handleChange}
          placeholder="Featured Artist 1 Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Featured Art 1 image</label>
        <input
          type="file"
          name="exhibition_featured1image"
          onChange={handleChange}
          accept="image/*"
          required
        />
        {imagePreviews.exhibition_featured1image && (
          <img
            src={imagePreviews.exhibition_featured1image}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group">
        <label>Featured Art 2 Name</label>
        <input
          type="text"
          name="exhibition_featured2name"
          value={formData.exhibition_featured2name}
          onChange={handleChange}
          placeholder="Featured Artist 2 Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Featured Art 2 image</label>
        <input
          type="file"
          name="exhibition_featured2image"
          onChange={handleChange}
          accept="image/*"
          required
        />
        {imagePreviews.exhibition_featured2image && (
          <img
            src={imagePreviews.exhibition_featured2image}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group">
        <label>Featured Art 3 Name</label>
        <input
          type="text"
          name="exhibition_featured3name"
          value={formData.exhibition_featured3name}
          onChange={handleChange}
          placeholder="Featured Artist 3 Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Featured Art 3 image</label>
        <input
          type="file"
          name="exhibition_featured3image"
          onChange={handleChange}
          accept="image/*"
          required
        />
        {imagePreviews.exhibition_featured3image && (
          <img
            src={imagePreviews.exhibition_featured3image}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <ToastContainer />
    </form>
  );
};

export default ExhibitionAddForm;
