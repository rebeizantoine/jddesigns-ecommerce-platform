import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "./Styles/dashboardhome2.css"; // Import your CSS file here

const FeaturedItems = () => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://eliowebsite.onrender.com/singleitem/",
        );

        setItems(response.data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setPreviewImage(items[index].item_image1); // Set preview image to the current item image
  };

  const handleSave = async (index) => {
    try {
      await axios.put(
        `https://eliowebsite.onrender.com/singleitem/${items[index]._id}`,
        items[index],
      );
      setEditIndex(null);
      toast.success("Item details saved successfully!");
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Error saving item. Please try again.");
    }
  };

  const handleChange = (e, index, field) => {
    const newItems = [...items];
    newItems[index][field] = e.target.value;
    setItems(newItems);
  };

  const handleImageChange = (e, index, imageField) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItems = [...items];
        newItems[index][imageField] = reader.result;
        setItems(newItems);
        setPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="dashboard-home" id="featured-items">
      <ToastContainer />
      <div className="note-box">
        <p>Note: These are the items featured in the front, should be 8</p>
      </div>
      <h2>Featured Items</h2>
      <Slider {...settings}>
        {items.slice(0, 8).map((item, index) => (
          <div className="edit-featured-item" key={index}>
            <form>
              <div className="form-group">
                <label htmlFor={`itemName${index}`}>Item Name:</label>
                <input
                  type="text"
                  id={`itemName${index}`}
                  value={item.item_name}
                  onChange={(e) => handleChange(e, index, "item_name")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemPrice${index}`}>Item Price:</label>
                <input
                  type="text"
                  id={`itemPrice${index}`}
                  value={item.item_price}
                  onChange={(e) => handleChange(e, index, "item_price")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemColor1${index}`}>Color 1:</label>
                <input
                  type="text"
                  id={`itemColor1${index}`}
                  value={item.item_color1}
                  onChange={(e) => handleChange(e, index, "item_color1")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemColor2${index}`}>Color 2:</label>
                <input
                  type="text"
                  id={`itemColor2${index}`}
                  value={item.item_color2}
                  onChange={(e) => handleChange(e, index, "item_color2")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemQuantity${index}`}>
                  Quantity Available:
                </label>
                <input
                  type="number"
                  id={`itemQuantity${index}`}
                  value={item.item_quantityAvailable}
                  onChange={(e) =>
                    handleChange(e, index, "item_quantityAvailable")
                  }
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemDimensions${index}`}>Dimensions:</label>
                <textarea
                  id={`itemDimensions${index}`}
                  value={item.item_dimensions}
                  onChange={(e) => handleChange(e, index, "item_dimensions")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemCustomizable${index}`}>
                  Customizable:
                </label>
                <input
                  type="checkbox"
                  id={`itemCustomizable${index}`}
                  checked={item.item_customizable}
                  onChange={(e) => handleChange(e, index, "item_customizable")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`itemImage1${index}`}>Image 1:</label>
                {editIndex === index ? (
                  <>
                    <input
                      type="file"
                      id={`itemImage1${index}`}
                      onChange={(e) =>
                        handleImageChange(e, index, "item_image1")
                      }
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Item Preview"
                        className="item-image"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={item.item_image1}
                    alt="Item"
                    className="item-image"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`itemImage2${index}`}>Image 2:</label>
                {editIndex === index ? (
                  <>
                    <input
                      type="file"
                      id={`itemImage2${index}`}
                      onChange={(e) =>
                        handleImageChange(e, index, "item_image2")
                      }
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Item Preview"
                        className="item-image"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={item.item_image2}
                    alt="Item"
                    className="item-image"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`itemImage3${index}`}>Image 3:</label>
                {editIndex === index ? (
                  <>
                    <input
                      type="file"
                      id={`itemImage3${index}`}
                      onChange={(e) =>
                        handleImageChange(e, index, "item_image3")
                      }
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Item Preview"
                        className="item-image"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={item.item_image3}
                    alt="Item"
                    className="item-image"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`itemDescription${index}`}>Description:</label>
                <textarea
                  id={`itemDescription${index}`}
                  value={item.item_description}
                  onChange={(e) => handleChange(e, index, "item_description")}
                  readOnly={editIndex !== index}
                />
                {editIndex === index && (
                  <p>{50 - wordCount(item.item_description)} words remaining</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`mainTag${index}`}>Main Tag:</label>
                <input
                  type="text"
                  id={`mainTag${index}`}
                  value={item.item_mainTag}
                  onChange={(e) => handleChange(e, index, "item_mainTag")}
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`additionalTag1${index}`}>
                  Additional Tag 1:
                </label>
                <input
                  type="text"
                  id={`additionalTag1${index}`}
                  value={item.item_additionalTag1}
                  onChange={(e) =>
                    handleChange(e, index, "item_additionalTag1")
                  }
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`additionalTag2${index}`}>
                  Additional Tag 2:
                </label>
                <input
                  type="text"
                  id={`additionalTag2${index}`}
                  value={item.item_additionalTag2}
                  onChange={(e) =>
                    handleChange(e, index, "item_additionalTag2")
                  }
                  readOnly={editIndex !== index}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`additionalTag3${index}`}>
                  Additional Tag 3:
                </label>
                <input
                  type="text"
                  id={`additionalTag3${index}`}
                  value={item.item_additionalTag3}
                  onChange={(e) =>
                    handleChange(e, index, "item_additionalTag3")
                  }
                  readOnly={editIndex !== index}
                />
              </div>
              {editIndex === index ? (
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => handleSave(index)}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              )}
            </form>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedItems;
