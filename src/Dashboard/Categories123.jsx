import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/dashboardcv.css";

const Categories123 = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    category_image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("https://eliowebsite.onrender.com/categoriesjdd/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  };

  const handleDelete = (categoryId) => {
    axios
      .delete(`https://eliowebsite.onrender.com/categoriesjdd/${categoryId}`)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId),
        );
        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the category!", error);
      });
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    axios
      .put(
        `https://eliowebsite.onrender.com/categoriesjdd/${currentCategory._id}`,
        currentCategory,
      )
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === currentCategory._id ? currentCategory : category,
          ),
        );
        setIsEditing(false);
        setCurrentCategory({});
        toast.success("Category updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the category!", error);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentCategory({});
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAddSave = () => {
    axios
      .post("https://eliowebsite.onrender.com/categoriesjdd/", newCategory)
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategory({
          category_name: "",
          category_image: "",
        });
        setIsAdding(false);
        toast.success("Category added successfully");
      })
      .catch((error) => {
        console.error("There was an error adding the category!", error);
      });
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setNewCategory({
      category_name: "",
      category_image: "",
    });
  };

  return (
    <div className="dashboard-cv">
      <ToastContainer />
      <fieldset className="cv-fieldset">
        <div className="cv" id="cv">
          <h1>Categories</h1>
          {/* <button className="add-btn" onClick={handleAddClick}>
            Add Category
          </button> */}
          <table className="items-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.category_name}</td>
                  <td>
                    <img
                      src={category.category_image}
                      alt={category.category_name}
                      className="item-img"
                      onClick={() =>
                        window.open(category.category_image, "_blank")
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(category._id)}
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
                  <h2>Edit Category</h2>
                  <span className="modal-close" onClick={handleEditCancel}>
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="category_name"
                      value={currentCategory.category_name || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Image URL:
                    <input
                      type="text"
                      name="category_image"
                      value={currentCategory.category_image || ""}
                      onChange={handleEditChange}
                    />
                  </label>
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
                  <h2>Add Category</h2>
                  <span className="modal-close" onClick={handleAddCancel}>
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="category_name"
                      value={newCategory.category_name || ""}
                      onChange={handleAddChange}
                    />
                  </label>
                  <label>
                    Image URL:
                    <input
                      type="text"
                      name="category_image"
                      value={newCategory.category_image || ""}
                      onChange={handleAddChange}
                    />
                  </label>
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

export default Categories123;
