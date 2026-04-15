import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/contactdash.css";
import axios from "axios";

function DashboardCV() {
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get(
          "https://eliowebsite.onrender.com/contactsjdd",
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(
        `https://eliowebsite.onrender.com/contactsjdd/${contactId}`,
      );
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId),
      );
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact");
    }
  };

  const handleEditContactClick = (contact) => {
    setCurrentContact(contact);
    setIsEditing(true);
  };

  const handleEditContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleEditContactSave = async () => {
    try {
      const { _id, ...updatedContact } = currentContact;
      const response = await axios.put(
        `https://eliowebsite.onrender.com/contactsjdd/${_id}`,
        updatedContact,
      );
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === currentContact._id
            ? { ...contact, ...updatedContact }
            : contact,
        ),
      );
      toast.success("Contact updated successfully");
      setIsEditing(false);
      setCurrentContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error updating contact");
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentContact(null);
  };

  return (
    <div className="dashboard-cv">
      <ToastContainer />
      <fieldset className="cv-fieldset">
        <div className="contact-us" id="contact-us">
          <h1>Contact Us</h1>
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) =>
                  Object.entries(contact).map(([key, value]) => {
                    if (key !== "_id" && key !== "__v") {
                      return (
                        <tr key={key}>
                          <td>{key.replace("contact_", "").toUpperCase()}</td>
                          <td>{value}</td>
                          <td>
                            <button
                              className="edit-btn"
                              onClick={() => handleEditContactClick(contact)}
                            >
                              Edit
                            </button>
                            {/* <button
                              className="delete-btn"
                              onClick={() => handleDeleteContact(contact._id)}
                            >
                              Delete
                            </button> */}
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  }),
                )
              ) : (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isEditing && currentContact && (
          <div className="edit-form">
            <h2>Edit Contact</h2>
            <label>
              Platform:
              <input
                type="text"
                name="platform"
                value="Facebook" // Assuming fixed platform
                readOnly
              />
            </label>
            <label>
              URL:
              <input
                type="text"
                name="url"
                value={currentContact.contact_facebook} // Adjust based on the platform being edited
                onChange={handleEditContactChange}
              />
            </label>
            <button className="save-btn" onClick={handleEditContactSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleEditCancel}>
              Cancel
            </button>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default DashboardCV;
