import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/dashboardGalleries.css";

const DashboardGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);

  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/gallery/")
      .then((response) => {
        setGalleries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the galleries!", error);
      });
  }, []);

  const handleDelete = (galleryId) => {
    axios
      .delete(`https://eliowebsite.onrender.com/gallery/${galleryId}`)
      .then(() => {
        setGalleries((prevGalleries) =>
          prevGalleries.filter((gallery) => gallery._id !== galleryId),
        );
        toast.success("Gallery deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the gallery!", error);
      });
  };

  const handleEditClick = (gallery) => {
    setCurrentGallery(gallery);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentGallery((prevGallery) => ({
      ...prevGallery,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    axios
      .put(
        `https://eliowebsite.onrender.com/gallery/${currentGallery._id}`,
        currentGallery,
      )
      .then(() => {
        setGalleries((prevGalleries) =>
          prevGalleries.map((gallery) =>
            gallery._id === currentGallery._id ? currentGallery : gallery,
          ),
        );
        setIsEditing(false);
        setCurrentGallery(null);
        toast.success("Gallery updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the gallery!", error);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentGallery(null);
  };

  return (
    <div className="dashboard-galleries">
      <ToastContainer />
      <fieldset className="cv-fieldset">
        <div className="cv" id="cv">
          <h1>Galleries</h1>
          <table className="galleries-table">
            <thead>
              <tr>
                <th>Gallery Name</th>
                <th>Date</th>
                <th>Country</th>
                <th>City</th>
                <th>Host</th>
                <th>Description</th>
                <th>Featured Artist 1</th>
                <th>Featured Artist 2</th>
                <th>Featured Artist 3</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery) => (
                <tr key={gallery._id}>
                  <td>{gallery.gallery_name}</td>
                  <td>{gallery.gallery_date}</td>
                  <td>{gallery.gallery_country}</td>
                  <td>{gallery.gallery_city}</td>
                  <td>{gallery.gallery_host}</td>
                  <td>{gallery.gallery_description}</td>
                  <td>{gallery.gallery_featured_artists1}</td>
                  <td>{gallery.gallery_featured_artists2}</td>
                  <td>{gallery.gallery_featured_artists3}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(gallery)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(gallery._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleEditCancel}>
              &times;
            </span>
            <h2>Edit Gallery</h2>
            <div className="edit-form">
              <label>
                Gallery Name:
                <input
                  type="text"
                  name="gallery_name"
                  value={currentGallery.gallery_name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Date:
                <input
                  type="text"
                  name="gallery_date"
                  value={currentGallery.gallery_date}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="gallery_country"
                  value={currentGallery.gallery_country}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="gallery_city"
                  value={currentGallery.gallery_city}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Host:
                <input
                  type="text"
                  name="gallery_host"
                  value={currentGallery.gallery_host}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="gallery_description"
                  value={currentGallery.gallery_description}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Gallery Image:
                <input
                  type="text"
                  name="gallery_image"
                  value={currentGallery.gallery_image}
                  onChange={handleEditChange}
                />
                <img
                  src={currentGallery.gallery_image}
                  alt="Gallery"
                  className="gallery-image"
                />
              </label>
              <label>
                Featured Artist 1:
                <input
                  type="text"
                  name="gallery_featured_artists1"
                  value={currentGallery.gallery_featured_artists1}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Featured Artist 2:
                <input
                  type="text"
                  name="gallery_featured_artists2"
                  value={currentGallery.gallery_featured_artists2}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Featured Artist 3:
                <input
                  type="text"
                  name="gallery_featured_artists3"
                  value={currentGallery.gallery_featured_artists3}
                  onChange={handleEditChange}
                />
              </label>
              <div className="buttons">
                <button className="save-btn" onClick={handleEditSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleEditCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGalleries;
