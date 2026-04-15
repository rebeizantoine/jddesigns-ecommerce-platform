import React, { useState, useRef } from "react";
import axios from "axios";

const AddArtistForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    item_color1: "",
    item_color2: "",
    item_quantityAvailable: "",
    item_dimensions: "",
    item_customizable: false,
    item_image1: null,
    item_image2: null,
    item_image3: null,
    item_description: "",
    item_featuredOnFront: false,
    item_mainTag: "",
    item_additionalTag1: "",
    item_additionalTag2: "",
    item_additionalTag3: "",
  });
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // Handle file inputs separately
    if (name.startsWith("item_image")) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData(formRef.current);
      const response = await axios.post(
        "https://eliowebsite.onrender.com/singleitem/add",
        formDataObject,
      );
      onSuccess(response.data);
      setFormData({
        item_name: "",
        item_price: "",
        item_color1: "",
        item_color2: "",
        item_quantityAvailable: "",
        item_dimensions: "",
        item_customizable: false,
        item_image1: null,
        item_image2: null,
        item_image3: null,
        item_description: "",
        item_featuredOnFront: false,
        item_mainTag: "",
        item_additionalTag1: "",
        item_additionalTag2: "",
        item_additionalTag3: "",
      });
      setError("");
    } catch (error) {
      setError("Failed to add item");
      console.error("Error:", error);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="item_price"
          value={formData.item_price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </div>
      <div className="form-group">
        <label>Color 1</label>
        <input
          type="text"
          name="item_color1"
          value={formData.item_color1}
          onChange={handleChange}
          placeholder="Color 1"
        />
      </div>
      <div className="form-group">
        <label>Color 2</label>
        <input
          type="text"
          name="item_color2"
          value={formData.item_color2}
          onChange={handleChange}
          placeholder="Color 2"
        />
      </div>
      <div className="form-group">
        <label>Quantity Available</label>
        <input
          type="number"
          name="item_quantityAvailable"
          value={formData.item_quantityAvailable}
          onChange={handleChange}
          placeholder="Quantity Available"
          required
        />
      </div>
      <div className="form-group">
        <label>Dimensions</label>
        <textarea
          name="item_dimensions"
          value={formData.item_dimensions}
          onChange={handleChange}
          placeholder="Dimensions"
          required
        />
      </div>
      <div className="form-group">
        <label>Customizable</label>
        <input
          type="checkbox"
          name="item_customizable"
          checked={formData.item_customizable}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Item Image 1</label>
        <input
          type="file"
          name="item_image1"
          onChange={handleChange}
          accept="image/*"
          required
        />
        {formData.item_image1 && (
          <img
            src={URL.createObjectURL(formData.item_image1)}
            alt="Item"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group">
        <label>Item Image 2</label>
        <input
          type="file"
          name="item_image2"
          onChange={handleChange}
          accept="image/*"
          required
        />
        {formData.item_image2 && (
          <img
            src={URL.createObjectURL(formData.item_image2)}
            alt="Item"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group">
        <label>Item Image 3</label>
        <input
          type="file"
          name="item_image3"
          onChange={handleChange}
          accept="image/*"
        />
        {formData.item_image3 && (
          <img
            src={URL.createObjectURL(formData.item_image3)}
            alt="Item"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="item_description"
          value={formData.item_description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        <label>Featured On Front</label>
        <input
          type="checkbox"
          name="item_featuredOnFront"
          checked={formData.item_featuredOnFront}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Main Tag(COLLECTION NAME)</label>
        <input
          type="text"
          name="item_mainTag"
          value={formData.item_mainTag}
          onChange={handleChange}
          placeholder="Main Tag"
        />
      </div>
      <div className="form-group">
        <label>Additional Tag 1</label>
        <input
          type="text"
          name="item_additionalTag1"
          value={formData.item_additionalTag1}
          onChange={handleChange}
          placeholder="Additional Tag 1"
        />
      </div>
      <div className="form-group">
        <label>Additional Tag 2</label>
        <input
          type="text"
          name="item_additionalTag2"
          value={formData.item_additionalTag2}
          onChange={handleChange}
          placeholder="Additional Tag 2"
        />
      </div>
      <div className="form-group">
        <label>Additional Tag 3</label>
        <input
          type="text"
          name="item_additionalTag3"
          value={formData.item_additionalTag3}
          onChange={handleChange}
          placeholder="Additional Tag 3"
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddArtistForm;
