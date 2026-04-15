import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/dashboardcv.css";

const Collections123 = () => {
  const [collections, setCollections] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentCollection, setCurrentCollection] = useState({});
  const [newCollection, setNewCollection] = useState({
    collection_name: "",
    collection_image: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = () => {
    axios
      .get("https://eliowebsite.onrender.com/collections/")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the collections!", error);
      });
  };

  const handleDelete = (collectionId) => {
    axios
      .delete(`https://eliowebsite.onrender.com/collections/${collectionId}`)
      .then(() => {
        setCollections((prevCollections) =>
          prevCollections.filter(
            (collection) => collection._id !== collectionId,
          ),
        );
        toast.success("Collection deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the collection!", error);
      });
  };

  const handleEditClick = (collection) => {
    setCurrentCollection(collection);
    setIsEditing(true);
    setImagePreview(collection.collection_image);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentCollection((prevCollection) => ({
      ...prevCollection,
      collection_image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEditSave = () => {
    const formData = new FormData();
    formData.append("collection_name", currentCollection.collection_name);
    formData.append("collection_image", currentCollection.collection_image);

    axios
      .put(
        `https://eliowebsite.onrender.com/collections/${currentCollection._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(() => {
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection._id === currentCollection._id
              ? currentCollection
              : collection,
          ),
        );
        setIsEditing(false);
        setCurrentCollection({});
        setImagePreview("");
        toast.success("Collection updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the collection!", error);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentCollection({});
    setImagePreview("");
  };

  const handleAddClick = () => {
    setNewCollection({
      collection_name: "",
      collection_image: "",
    });
    setIsAdding(true);
    setImagePreview("");
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleImageAddChange = (e) => {
    const file = e.target.files[0];
    setNewCollection((prevCollection) => ({
      ...prevCollection,
      collection_image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddSave = () => {
    const formData = new FormData();
    formData.append("collection_name", newCollection.collection_name);
    formData.append("collection_image", newCollection.collection_image);

    axios
      .post("https://eliowebsite.onrender.com/collections/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setCollections([...collections, response.data]);
        setNewCollection({
          collection_name: "",
          collection_image: "",
        });
        setIsAdding(false);
        setImagePreview("");
        toast.success("Collection added successfully");
      })
      .catch((error) => {
        console.error("There was an error adding the collection!", error);
      });
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setNewCollection({
      collection_name: "",
      collection_image: "",
    });
    setImagePreview("");
  };

  return (
    <div className="dashboard-cv">
      <ToastContainer />
      <fieldset className="cv-fieldset">
        <div className="cv" id="cv">
          <h1>Collections</h1>
          <button className="add-btn" onClick={handleAddClick}>
            Add Collection
          </button>
          <table className="items-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection._id}>
                  <td>{collection.collection_name}</td>
                  <td>
                    <img
                      src={collection.collection_image}
                      alt={collection.collection_name}
                      className="item-img"
                      onClick={() =>
                        window.open(collection.collection_image, "_blank")
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(collection)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(collection._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isEditing && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit Collection</h2>
                  <span className="modal-close" onClick={handleEditCancel}>
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="collection_name"
                      value={currentCollection.collection_name || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Image:
                    <input
                      type="file"
                      name="collection_image"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imagePreview && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                    </div>
                  )}
                </div>
                <button className="save-btn" onClick={handleEditSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleEditCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isAdding && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Add Collection</h2>
                  <span className="modal-close" onClick={handleAddCancel}>
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="collection_name"
                      value={newCollection.collection_name || ""}
                      onChange={handleAddChange}
                    />
                  </label>
                  <label>
                    Image:
                    <input
                      type="file"
                      name="collection_image"
                      onChange={handleImageAddChange}
                    />
                  </label>
                  {imagePreview && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                    </div>
                  )}
                </div>
                <button className="save-btn" onClick={handleAddSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleAddCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default Collections123;
