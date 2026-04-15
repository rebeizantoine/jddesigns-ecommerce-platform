import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/dashboardcv.css";
import AddArtistForm from "../Components/AddArtistForm";

const ArtistDashboard = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("https://eliowebsite.onrender.com/singleitem/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`https://eliowebsite.onrender.com/singleitem/${itemId}`)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId),
        );
        toast.success("Item deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the item!", error);
      });
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSave = () => {
    axios
      .put(
        `https://eliowebsite.onrender.com/singleitem/${currentItem._id}`,
        currentItem,
      )
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === currentItem._id ? currentItem : item,
          ),
        );
        setIsEditing(false);
        setCurrentItem({});
        toast.success("Item updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the item!", error);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentItem({});
  };

  const handleMayLikeChange = (itemId, value) => {
    const checkedItemsCount = items.filter((item) => item.item_maylike).length;
    if (checkedItemsCount >= 4 && value) {
      toast.error("Only 4 items can be marked as 'May Like' at a time");
      return;
    }

    axios
      .put(`https://eliowebsite.onrender.com/singleitem/${itemId}`, {
        item_maylike: value,
      })
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, item_maylike: value } : item,
          ),
        );
        toast.success("Item updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the item!", error);
      });
  };

  const openImageInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddCancel = () => {
    setIsAdding(false);
  };

  const handleImageUpload = (e, imageName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentItem((prevItem) => ({
        ...prevItem,
        [imageName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="dashboard-cv">
      <ToastContainer />
      <div className="note-box">
        <p>
          Note: Only 8 can be featured on front, and 4 HAVE TO BE IN THE MAYLIKE
          SECTION
        </p>
      </div>
      <fieldset className="cv-fieldset">
        <div className="cv" id="cv">
          <h1>Items</h1>
          <button className="add-btn" onClick={handleAddClick}>
            Add Item
          </button>
          <table className="items-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Color 1</th>
                <th>Color 2</th>
                <th>Quantity Available</th>
                <th>Dimensions</th>
                <th>Customizable</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Image 3</th>
                <th>Description</th>
                <th>Featured On Front</th>
                <th>Main Tag</th>
                <th>Additional Tag 1</th>
                <th>Additional Tag 2</th>
                <th>Additional Tag 3</th>
                <th>May Like</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.item_name}</td>
                  <td>{item.item_price}</td>
                  <td>{item.item_color1}</td>
                  <td>{item.item_color2}</td>
                  <td>{item.item_quantityAvailable}</td>
                  <td>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="textarea"
                        readOnly
                        value={item.item_dimensions}
                      />
                    </div>
                  </td>
                  <td>{item.item_customizable ? "Yes" : "No"}</td>
                  <td>
                    <img
                      src={item.item_image1}
                      alt={item.item_name}
                      className="item-img"
                      onClick={() => openImageInNewTab(item.item_image1)}
                    />
                  </td>
                  <td>
                    <img
                      src={item.item_image2}
                      alt={item.item_name}
                      className="item-img"
                      onClick={() => openImageInNewTab(item.item_image2)}
                    />
                  </td>
                  <td>
                    <img
                      src={item.item_image3}
                      alt={item.item_name}
                      className="item-img"
                      onClick={() => openImageInNewTab(item.item_image3)}
                    />
                  </td>
                  <td>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="textarea"
                        readOnly
                        value={item.item_description}
                      />
                    </div>
                  </td>
                  <td>{item.item_featuredOnFront ? "Yes" : "No"}</td>
                  <td>{item.item_mainTag}</td>
                  <td>{item.item_additionalTag1}</td>
                  <td>{item.item_additionalTag2}</td>
                  <td>{item.item_additionalTag3}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.item_maylike || false}
                      onChange={(e) =>
                        handleMayLikeChange(item._id, e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isAdding && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleAddCancel}>
                  &times;
                </span>
                <h2>Add Item</h2>
                <AddArtistForm
                  onCancel={handleAddCancel}
                  onSuccess={() => {
                    setIsAdding(false);
                    toast.success("Item added successfully");
                    fetchItems(); // Refetch items to update the list
                  }}
                />
              </div>
            </div>
          )}

          {isEditing && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleEditCancel}>
                  &times;
                </span>
                <h2>Edit Item</h2>
                <form>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="item_name"
                      value={currentItem.item_name || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="number"
                      name="item_price"
                      value={currentItem.item_price || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Color 1:
                    <input
                      type="text"
                      name="item_color1"
                      value={currentItem.item_color1 || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Color 2:
                    <input
                      type="text"
                      name="item_color2"
                      value={currentItem.item_color2 || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Quantity Available:
                    <input
                      type="number"
                      name="item_quantityAvailable"
                      value={currentItem.item_quantityAvailable || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Dimensions:
                    <textarea
                      name="item_dimensions"
                      value={currentItem.item_dimensions || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Customizable:
                    <input
                      type="checkbox"
                      name="item_customizable"
                      checked={currentItem.item_customizable || false}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Image 1:
                    <input
                      type="file"
                      name="item_image1"
                      onChange={(e) => handleImageUpload(e, "item_image1")}
                    />
                    {currentItem.item_image1 && (
                      <img
                        src={currentItem.item_image1}
                        alt="Image 1"
                        className="preview-img"
                      />
                    )}
                  </label>
                  <label>
                    Image 2:
                    <input
                      type="file"
                      name="item_image2"
                      onChange={(e) => handleImageUpload(e, "item_image2")}
                    />
                    {currentItem.item_image2 && (
                      <img
                        src={currentItem.item_image2}
                        alt="Image 2"
                        className="preview-img"
                      />
                    )}
                  </label>
                  <label>
                    Image 3:
                    <input
                      type="file"
                      name="item_image3"
                      onChange={(e) => handleImageUpload(e, "item_image3")}
                    />
                    {currentItem.item_image3 && (
                      <img
                        src={currentItem.item_image3}
                        alt="Image 3"
                        className="preview-img"
                      />
                    )}
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="item_description"
                      value={currentItem.item_description || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Featured On Front:
                    <input
                      type="checkbox"
                      name="item_featuredOnFront"
                      checked={currentItem.item_featuredOnFront || false}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Main Tag:
                    <input
                      type="text"
                      name="item_mainTag"
                      value={currentItem.item_mainTag || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Additional Tag 1:
                    <input
                      type="text"
                      name="item_additionalTag1"
                      value={currentItem.item_additionalTag1 || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Additional Tag 2:
                    <input
                      type="text"
                      name="item_additionalTag2"
                      value={currentItem.item_additionalTag2 || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Additional Tag 3:
                    <input
                      type="text"
                      name="item_additionalTag3"
                      value={currentItem.item_additionalTag3 || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <button type="button" onClick={handleEditSave}>
                    Save
                  </button>
                  <button type="button" onClick={handleEditCancel}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default ArtistDashboard;
