import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./aboutdashboard.css";

function DashboardAbout() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    // Fetch all about details when the component mounts
    axios
      .get("https://eliowebsite.onrender.com/about/")
      .then((response) => {
        setAboutData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching about details:", error);
        toast.error("Error fetching about details.");
      });
  }, []);

  const handleEdit = (id) => {
    const newData = aboutData.map((item) =>
      item._id === id ? { ...item, editable: true } : item,
    );
    setAboutData(newData);
  };

  const handleSave = (id) => {
    const aboutItem = aboutData.find((item) => item._id === id);
    const formData = new FormData();
    formData.append("abouttext1", aboutItem.abouttext1);
    formData.append("abouttext2", aboutItem.abouttext2);
    if (aboutItem.aboutimg1 instanceof File) {
      formData.append("aboutimg1", aboutItem.aboutimg1);
    }
    if (aboutItem.aboutimg2 instanceof File) {
      formData.append("aboutimg2", aboutItem.aboutimg2);
    }
    if (aboutItem.aboutimg3 instanceof File) {
      formData.append("aboutimg3", aboutItem.aboutimg3);
    }

    axios
      .put(`https://eliowebsite.onrender.com/about/${id}`, formData)
      .then((response) => {
        const newData = aboutData.map((item) =>
          item._id === id ? { ...response.data, editable: false } : item,
        );
        setAboutData(newData);
        toast.success("Changes saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
        toast.error("Error saving changes.");
      });
  };

  const handleCancel = (id) => {
    const newData = aboutData.map((item) =>
      item._id === id ? { ...item, editable: false } : item,
    );
    setAboutData(newData);
    toast.error("Changes discarded.");
  };

  const handleInputChange = (e, id) => {
    const { name, value, files } = e.target;
    const newData = aboutData.map((item) =>
      item._id === id ? { ...item, [name]: files ? files[0] : value } : item,
    );
    setAboutData(newData);
  };

  return (
    <div className="about-section">
      <h2>About Section</h2>
      {aboutData.map((item) => (
        <Draggable key={item._id}>
          <div className="about-item">
            <div className="about-text-img">
              <div className="about-text-img-item">
                <label>About Text 1</label>
                {item.editable ? (
                  <textarea
                    name="abouttext1"
                    value={item.abouttext1}
                    onChange={(e) => handleInputChange(e, item._id)}
                    className="about12345"
                  />
                ) : (
                  <p className="about12345">{item.abouttext1}</p>
                )}
                {item.editable ? (
                  <input
                    type="file"
                    accept="image/*"
                    name="aboutimg1"
                    onChange={(e) => handleInputChange(e, item._id)}
                  />
                ) : (
                  <img
                    src={item.aboutimg1}
                    alt="About Image 1"
                    className="about-img"
                  />
                )}
                <div className="about-actions">
                  {item.editable ? (
                    <>
                      <button onClick={() => handleSave(item._id)}>Save</button>
                      <button onClick={() => handleCancel(item._id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                  )}
                </div>
              </div>
            </div>

            <div className="about-text-img">
              <div className="about-text-img-item">
                <label>About Text 2</label>
                {item.editable ? (
                  <textarea
                    name="abouttext2"
                    value={item.abouttext2}
                    onChange={(e) => handleInputChange(e, item._id)}
                    className="about12345"
                  />
                ) : (
                  <p className="about12345">{item.abouttext2}</p>
                )}
                {item.editable ? (
                  <input
                    type="file"
                    accept="image/*"
                    name="aboutimg2"
                    onChange={(e) => handleInputChange(e, item._id)}
                  />
                ) : (
                  <img
                    src={item.aboutimg2}
                    alt="About Image 2"
                    className="about-img"
                  />
                )}
                <div className="about-actions">
                  {item.editable ? (
                    <>
                      <button onClick={() => handleSave(item._id)}>Save</button>
                      <button onClick={() => handleCancel(item._id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                  )}
                </div>
              </div>
            </div>

            <div className="about-img">
              <div className="about-img-item">
                <label>About Image 3</label>
                {item.editable ? (
                  <input
                    type="file"
                    accept="image/*"
                    name="aboutimg3"
                    onChange={(e) => handleInputChange(e, item._id)}
                  />
                ) : (
                  <img
                    src={item.aboutimg3}
                    alt="About Image 3"
                    className="about-img"
                  />
                )}
                <div className="about-actions">
                  {item.editable && (
                    <>
                      <button onClick={() => handleSave(item._id)}>Save</button>
                      <button onClick={() => handleCancel(item._id)}>
                        Cancel
                      </button>
                    </>
                  )}
                  {!item.editable && (
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      ))}
      <ToastContainer />
    </div>
  );
}

export default DashboardAbout;
