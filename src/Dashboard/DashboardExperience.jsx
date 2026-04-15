import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./dashboardcv.css";
import AddExhibitionForm from "../Components/ExhibitionAddForm";

const DashboardExperience = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExhibition, setCurrentExhibition] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios
      .get("https://eliowebsite.onrender.com/exhibitions")
      .then((response) => {
        setExhibitions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the exhibitions!", error);
      });
  }, []);

  const handleDelete = (exhibitionId) => {
    axios
      .delete(`https://eliowebsite.onrender.com/exhibitions/${exhibitionId}`)
      .then(() => {
        setExhibitions((prevExhibitions) =>
          prevExhibitions.filter(
            (exhibition) => exhibition._id !== exhibitionId,
          ),
        );
        toast.success("Exhibition deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the exhibition!", error);
      });
  };

  const openImageInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleEditClick = (exhibition) => {
    setCurrentExhibition(exhibition);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentExhibition((prevExhibition) => ({
      ...prevExhibition,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    axios
      .put(
        `https://eliowebsite.onrender.com/exhibitions/${currentExhibition._id}`,
        currentExhibition,
      )
      .then(() => {
        setExhibitions((prevExhibitions) =>
          prevExhibitions.map((exhibition) =>
            exhibition._id === currentExhibition._id
              ? currentExhibition
              : exhibition,
          ),
        );
        setIsEditing(false);
        setCurrentExhibition(null);
        toast.success("Exhibition updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the exhibition!", error);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentExhibition(null);
  };

  const handleImageUpload = (e, imageName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentExhibition((prevExhibition) => ({
        ...prevExhibition,
        [imageName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="dashboard-cv">
      <ToastContainer />
      <fieldset className="cv-fieldset">
        <div className="cv" id="cv">
          <h1>Exhibitions</h1>
          <button className="add-btn" onClick={handleAddClick}>
            Add Exhibition
          </button>
          <table className="exhibitions-table">
            <thead>
              <tr>
                <th>Exhibition Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Opening Hours</th>
                <th>Closing Hours</th>
                <th>Description</th>
                <th>Featured Artist 1</th>
                <th>Image 1</th>
                <th>Featured Artist 2</th>
                <th>Image 2</th>
                <th>Featured Artist 3</th>
                <th>Image 3</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibitions.map((exhibition) => (
                <tr key={exhibition._id}>
                  <td>{exhibition.exhibition_name}</td>
                  <td>{exhibition.exhibition_country}</td>
                  <td>{exhibition.exhibition_city}</td>
                  <td>{exhibition.exhibition_opening_hours}</td>
                  <td>{exhibition.exhibition_closing_hours}</td>
                  <td>
                    <ResizableBox
                      width={200}
                      height={100}
                      minConstraints={[200, 100]}
                      maxConstraints={[600, 300]}
                      lockAspectRatio={true}
                    >
                      <div style={{ overflow: "auto" }}>
                        {exhibition.exhibition_description}
                      </div>
                    </ResizableBox>
                  </td>
                  <td>{exhibition.exhibition_featured1name}</td>
                  <td>
                    <img
                      src={exhibition.exhibition_featured1image}
                      alt={exhibition.exhibition_featured1name}
                      className="artist-img"
                      onClick={() =>
                        openImageInNewTab(exhibition.exhibition_featured1image)
                      }
                    />
                  </td>
                  <td>{exhibition.exhibition_featured2name}</td>
                  <td>
                    <img
                      src={exhibition.exhibition_featured2image}
                      alt={exhibition.exhibition_featured2name}
                      className="artist-img"
                      onClick={() =>
                        openImageInNewTab(exhibition.exhibition_featured2image)
                      }
                    />
                  </td>
                  <td>{exhibition.exhibition_featured3name}</td>
                  <td>
                    <img
                      src={exhibition.exhibition_featured3image}
                      alt={exhibition.exhibition_featured3name}
                      className="artist-img"
                      onClick={() =>
                        openImageInNewTab(exhibition.exhibition_featured3image)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(exhibition)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(exhibition._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isEditing && (
            <div className="edit-form">
              <h2>Edit Exhibition</h2>
              <label>
                Exhibition Name:
                <input
                  type="text"
                  name="exhibition_name"
                  value={currentExhibition.exhibition_name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="exhibition_country"
                  value={currentExhibition.exhibition_country}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="exhibition_city"
                  value={currentExhibition.exhibition_city}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Opening Hours:
                <input
                  type="text"
                  name="exhibition_opening_hours"
                  value={currentExhibition.exhibition_opening_hours}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Closing Hours:
                <input
                  type="text"
                  name="exhibition_closing_hours"
                  value={currentExhibition.exhibition_closing_hours}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="exhibition_description"
                  value={currentExhibition.exhibition_description}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Featured Artist 1:
                <input
                  type="text"
                  name="exhibition_featured1name"
                  value={currentExhibition.exhibition_featured1name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Image 1 URL:
                <input
                  type="text"
                  name="exhibition_featured1image"
                  value={currentExhibition.exhibition_featured1image}
                  onChange={handleEditChange}
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageUpload(e, "exhibition_featured1image")
                  }
                />
              </label>
              <label>
                Featured Artist 2:
                <input
                  type="text"
                  name="exhibition_featured2name"
                  value={currentExhibition.exhibition_featured2name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Image 2 URL:
                <input
                  type="text"
                  name="exhibition_featured2image"
                  value={currentExhibition.exhibition_featured2image}
                  onChange={handleEditChange}
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageUpload(e, "exhibition_featured2image")
                  }
                />
              </label>
              <label>
                Featured Artist 3:
                <input
                  type="text"
                  name="exhibition_featured3name"
                  value={currentExhibition.exhibition_featured3name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Image 3 URL:
                <input
                  type="text"
                  name="exhibition_featured3image"
                  value={currentExhibition.exhibition_featured3image}
                  onChange={handleEditChange}
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageUpload(e, "exhibition_featured3image")
                  }
                />
              </label>
              <button className="save-btn" onClick={handleEditSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleEditCancel}>
                Cancel
              </button>
            </div>
          )}

          {isAdding && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleAddCancel}>
                  &times;
                </span>
                <h2>Add Artist</h2>
                <AddExhibitionForm
                  onCancel={handleAddCancel}
                  onSuccess={() => {
                    setIsAdding(false);
                    toast.success("Exhibition added successfully");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default DashboardExperience;
